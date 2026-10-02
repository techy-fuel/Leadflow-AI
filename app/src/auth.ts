import { useSyncExternalStore } from 'react';
import { actions, switchUser } from './store';

/* Local-only auth: accounts live in this browser (localStorage). Passwords are salted + PBKDF2-hashed.
   This gates the UI and separates workspaces per account, but it is NOT server-side security. */
type Account = { id: string; name: string; email: string; salt: string; hash: string; createdAt: number };
const ACCOUNTS = 'leadflow.accounts', SESSION = 'leadflow.session';
const read = <T,>(k: string, d: T): T => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } };
const write = (k: string, v: unknown) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* ignore */ } };

let session: string | null = read<string | null>(SESSION, null);
const subs = new Set<() => void>();
const emit = () => subs.forEach(f => f());
export const useSession = () => useSyncExternalStore(f => { subs.add(f); return () => subs.delete(f); }, () => session);
export const getSession = () => session;

const b64 = (b: ArrayBuffer | Uint8Array) => btoa(String.fromCharCode(...new Uint8Array(b as ArrayBuffer)));
async function hashPw(pw: string, salt: string) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(pw), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', iterations: 120000, salt: Uint8Array.from(atob(salt), c => c.charCodeAt(0)) }, key, 256);
  return b64(bits);
}
const norm = (e: string) => e.trim().toLowerCase();
export const validEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e.trim());
export const pwIssue = (p: string) => p.length < 8 ? 'Use at least 8 characters.' : !/[a-z]/i.test(p) || !/\d/.test(p) ? 'Include at least one letter and one number.' : '';

const fails: Record<string, { n: number; until: number }> = {};

export type AuthResult = { ok: true } | { ok: false; error: string };

export async function signUp(name: string, email: string, password: string): Promise<AuthResult> {
  if (!name.trim()) return { ok: false, error: 'Enter your name.' };
  if (!validEmail(email)) return { ok: false, error: 'Enter a valid email address.' };
  const issue = pwIssue(password); if (issue) return { ok: false, error: issue };
  const accounts = read<Account[]>(ACCOUNTS, []);
  if (accounts.some(a => a.email === norm(email))) return { ok: false, error: 'An account with this email already exists. Log in instead.' };
  const salt = b64(crypto.getRandomValues(new Uint8Array(16)));
  const acc: Account = { id: Math.random().toString(36).slice(2, 12), name: name.trim(), email: norm(email), salt, hash: await hashPw(password, salt), createdAt: Date.now() };
  write(ACCOUNTS, [...accounts, acc]);
  startSession(acc); actions.setUser({ name: acc.name, email: acc.email });
  return { ok: true };
}

export async function logIn(email: string, password: string): Promise<AuthResult> {
  const e = norm(email), f = fails[e];
  if (f && f.until > Date.now()) return { ok: false, error: `Too many attempts. Try again in ${Math.ceil((f.until - Date.now()) / 1000)}s.` };
  const acc = read<Account[]>(ACCOUNTS, []).find(a => a.email === e);
  const ok = acc && (await hashPw(password, acc.salt)) === acc.hash;
  if (!acc || !ok) { const n = (f?.n ?? 0) + 1; fails[e] = { n, until: n >= 5 ? Date.now() + 30000 : 0 }; return { ok: false, error: 'Incorrect email or password.' }; }
  delete fails[e]; startSession(acc); return { ok: true };
}

function startSession(acc: Account) { session = acc.id; write(SESSION, acc.id); switchUser(acc.id); emit(); }
export function logOut() { session = null; try { localStorage.removeItem(SESSION); } catch { /* ignore */ } switchUser(null); emit(); }

export async function changePassword(current: string, next: string): Promise<AuthResult> {
  const accounts = read<Account[]>(ACCOUNTS, []); const acc = accounts.find(a => a.id === session);
  if (!acc) return { ok: false, error: 'Not signed in.' };
  if ((await hashPw(current, acc.salt)) !== acc.hash) return { ok: false, error: 'Current password is incorrect.' };
  const issue = pwIssue(next); if (issue) return { ok: false, error: issue };
  const salt = b64(crypto.getRandomValues(new Uint8Array(16)));
  const hash = await hashPw(next, salt); write(ACCOUNTS, accounts.map(a => a.id === acc.id ? { ...a, salt, hash } : a));
  return { ok: true };
}

export function deleteAccount() {
  const id = session; write(ACCOUNTS, read<Account[]>(ACCOUNTS, []).filter(a => a.id !== id));
  try { localStorage.removeItem(`leadflow.v1:${id}`); } catch { /* ignore */ }
  logOut();
}
