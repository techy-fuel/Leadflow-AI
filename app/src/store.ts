import { useSyncExternalStore } from 'react';

export type Msg = { id: string; dir: 'in' | 'out'; channel: string; text: string; at: number };
export type Lead = { id: string; name: string; company: string; email: string; phone: string; source: string; score: number | null; stage: string; rep: string; value: number; notes: string; createdAt: number; lastActivityAt: number; messages: Msg[] };
export type Task = { id: string; title: string; leadId: string | null; assignee: string; priority: 'High' | 'Medium' | 'Low'; type: 'Task' | 'Call' | 'Meeting' | 'Follow-up'; dueAt: number | null; done: boolean; createdAt: number };
export type Member = { id: string; name: string; email: string; role: string; status: 'Active' | 'Invited' };
export type Step = { kind: 'WHEN' | 'WAIT' | 'IF' | 'THEN' | 'AI'; label: string; icon: string; sub: string };
export type Automation = { id: string; name: string; active: boolean; steps: Step[]; createdAt: number };
export type State = {
  user: { name: string; email: string; workspace: string };
  leads: Lead[]; tasks: Task[]; team: Member[]; automations: Automation[];
  connected: Record<string, boolean>; aiToggles: boolean[]; notificationsReadAt: number;
};

export const STAGES = ['New', 'Contacted', 'Qualified', 'Meeting', 'Proposal', 'Negotiation', 'Won', 'Lost'];
export const SOURCES = ['Website', 'Facebook', 'Instagram', 'Google Ads', 'WhatsApp', 'Referral', 'Other'];

const KEY = 'leadflow.v1';
const initial = (): State => ({
  user: { name: '', email: '', workspace: 'My workspace' },
  leads: [], tasks: [], automations: [], connected: {}, aiToggles: [true, true, true, false], notificationsReadAt: 0,
  team: [{ id: 'owner', name: 'You', email: '', role: 'Owner', status: 'Active' }],
});
const load = (): State => {
  try { const raw = localStorage.getItem(KEY); if (raw) return { ...initial(), ...JSON.parse(raw) }; } catch { /* storage unavailable */ }
  return initial();
};

let state = load();
const subs = new Set<() => void>();
const set = (fn: (s: State) => State) => {
  state = fn(state);
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* ignore */ }
  subs.forEach(f => f());
};
export const useStore = <T,>(sel: (s: State) => T): T => useSyncExternalStore(f => { subs.add(f); return () => subs.delete(f); }, () => sel(state));
export const getState = () => state;
const uid = () => Math.random().toString(36).slice(2, 10);

export const actions = {
  addLead(d: Partial<Lead> & { name: string }) {
    const now = Date.now(); const id = uid();
    set(s => ({ ...s, leads: [{ id, company: '', email: '', phone: '', source: 'Other', score: null, stage: 'New', rep: 'Unassigned', value: 0, notes: '', messages: [], createdAt: now, lastActivityAt: now, ...d }, ...s.leads] }));
    return id;
  },
  updateLead: (id: string, p: Partial<Lead>) => set(s => ({ ...s, leads: s.leads.map(l => l.id === id ? { ...l, ...p, lastActivityAt: Date.now() } : l) })),
  deleteLead: (id: string) => set(s => ({ ...s, leads: s.leads.filter(l => l.id !== id), tasks: s.tasks.filter(t => t.leadId !== id) })),
  addMessage: (leadId: string, dir: Msg['dir'], channel: string, text: string) => set(s => ({ ...s, leads: s.leads.map(l => l.id === leadId ? { ...l, lastActivityAt: Date.now(), messages: [...l.messages, { id: uid(), dir, channel, text, at: Date.now() }] } : l) })),
  addTask: (d: Partial<Task> & { title: string }) => set(s => ({ ...s, tasks: [{ id: uid(), leadId: null, assignee: s.team[0]?.name ?? 'You', priority: 'Medium', type: 'Task', dueAt: null, done: false, createdAt: Date.now(), ...d }, ...s.tasks] })),
  toggleTask: (id: string) => set(s => ({ ...s, tasks: s.tasks.map(t => t.id === id ? { ...t, done: !t.done } : t) })),
  deleteTask: (id: string) => set(s => ({ ...s, tasks: s.tasks.filter(t => t.id !== id) })),
  addMember: (name: string, email: string, role: string) => set(s => ({ ...s, team: [...s.team, { id: uid(), name: name || email.split('@')[0], email, role, status: 'Invited' }] })),
  removeMember: (id: string) => set(s => ({ ...s, team: s.team.filter(m => m.id !== id || m.id === 'owner') })),
  saveAutomation(a: Automation) { set(s => ({ ...s, automations: s.automations.some(x => x.id === a.id) ? s.automations.map(x => x.id === a.id ? a : x) : [a, ...s.automations] })); },
  newAutomationId: uid,
  toggleAutomation: (id: string) => set(s => ({ ...s, automations: s.automations.map(a => a.id === id ? { ...a, active: !a.active } : a) })),
  deleteAutomation: (id: string) => set(s => ({ ...s, automations: s.automations.filter(a => a.id !== id) })),
  setConnected: (name: string, v: boolean) => set(s => ({ ...s, connected: { ...s.connected, [name]: v } })),
  setUser: (p: Partial<State['user']>) => set(s => ({ ...s, user: { ...s.user, ...p }, team: p.name !== undefined ? s.team.map(m => m.id === 'owner' ? { ...m, name: p.name || 'You', email: p.email ?? m.email } : m) : s.team })),
  setAiToggle: (i: number, v: boolean) => set(s => ({ ...s, aiToggles: s.aiToggles.map((x, j) => j === i ? v : x) })),
  markNotificationsRead: () => set(s => ({ ...s, notificationsReadAt: Date.now() })),
  reset: () => set(() => initial()),
};

/* ---------- helpers ---------- */
export const DAY = 86400000;
export const startOfDay = (t: number) => { const d = new Date(t); d.setHours(0, 0, 0, 0); return d.getTime(); };
export const ago = (t: number) => { const m = Math.floor((Date.now() - t) / 60000); if (m < 1) return 'just now'; if (m < 60) return `${m}m ago`; const h = Math.floor(m / 60); if (h < 24) return `${h}h ago`; return `${Math.floor(h / 24)}d ago`; };
export const fmtTime = (t: number) => new Date(t).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
export const dueLabel = (t: number | null) => {
  if (t == null) return 'No date';
  const diff = startOfDay(t) - startOfDay(Date.now());
  const time = fmtTime(t);
  if (diff === 0) return time; if (diff === DAY) return `Tomorrow ${time}`;
  if (diff < 0) return 'Overdue';
  return new Date(t).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
};
export const isOverdue = (t: Task) => !t.done && t.dueAt != null && t.dueAt < Date.now() && startOfDay(t.dueAt) < startOfDay(Date.now());
export const money = (n: number) => '$' + n.toLocaleString();
export const leadName = (leads: Lead[], id: string | null) => leads.find(l => l.id === id)?.name;
export const firstName = (n: string) => n.trim().split(' ')[0];
export const greeting = () => { const h = new Date().getHours(); return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'; };

export const stageRank = (st: string) => st === 'Lost' ? 0 : STAGES.indexOf(st);
export const reached = (leads: Lead[], stage: string) => leads.filter(l => stageRank(l.stage) >= stageRank(stage)).length;
