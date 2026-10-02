import { useState } from 'react';
import { useGo, useParam } from '../nav';
import { Button, Icon, Input } from '../ui';
import { Logo } from './Marketing';
import { logIn, signUp, pwIssue } from '../auth';

const feed: [string, string, string, string, string, string][] = [['user-plus', '#0F4C81', '#EEF5FD', 'New lead from Facebook', 'Captured instantly', 'now'], ['sparkles', '#5B4FD6', '#F4F3FF', 'Lead scored', 'Know who to call first', '2s'], ['message-circle', '#15803D', '#F0FDF4', 'Follow-up sent', 'On the right channel', '41s']];

export function Login() {
  const go = useGo(); const mode = useParam() === 'signup' ? 'signup' : 'login';
  const [f, setF] = useState({ name: '', email: '', password: '' });
  const [err, setErr] = useState(''); const [busy, setBusy] = useState(false); const [show, setShow] = useState(false);
  const signup = mode === 'signup';
  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setErr(''); setBusy(true);
    const r = signup ? await signUp(f.name, f.email, f.password) : await logIn(f.email, f.password);
    setBusy(false);
    if (!r.ok) return setErr(r.error);
    go(signup ? 'onboarding' : 'dashboard');
  };
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => { setF(x => ({ ...x, [k]: e.target.value })); setErr(''); };
  const hint = signup && f.password ? pwIssue(f.password) : '';
  return (
    <div className="login" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', minHeight: '100%' }}>
      <style>{`@media(max-width:900px){.login{grid-template-columns:1fr!important}.login-side{display:none!important}}`}</style>
      <div style={{ display: 'flex', flexDirection: 'column', padding: '32px clamp(20px,4vw,48px)', background: '#fff' }}>
        <Logo onClick={() => go('landing')} />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <form onSubmit={submit} noValidate style={{ width: '100%', maxWidth: 380, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <h1 style={{ margin: 0, font: '800 28px/1.15 var(--font-display)', letterSpacing: '-.025em' }}>{signup ? 'Create your account' : 'Welcome back'}</h1>
              <p style={{ margin: '8px 0 0', font: '500 14px/1.5 var(--font-body)', color: '#64748B' }}>{signup ? 'Start your 14-day free trial. No credit card required.' : 'Log in to your LeadFlow workspace.'}</p>
            </div>
            {signup && <Input label="Full name" placeholder="Your name" autoComplete="name" value={f.name} onChange={set('name')} autoFocus />}
            <Input label="Work email" type="email" placeholder="you@company.com" autoComplete="email" value={f.email} onChange={set('email')} autoFocus={!signup} />
            <div style={{ position: 'relative' }}>
              <Input label="Password" type={show ? 'text' : 'password'} placeholder={signup ? 'At least 8 characters' : 'Your password'} autoComplete={signup ? 'new-password' : 'current-password'} value={f.password} onChange={set('password')} />
              <button type="button" onClick={() => setShow(s => !s)} aria-label={show ? 'Hide password' : 'Show password'} style={{ position: 'absolute', right: 12, bottom: 12, border: 0, background: 'none', color: '#94A3B8', cursor: 'pointer' }}><Icon n={show ? 'eye-off' : 'eye'} size={16} /></button>
            </div>
            {hint && <span style={{ font: '500 12px/1.4 var(--font-body)', color: '#B45309', marginTop: -8 }}>{hint}</span>}
            {err && <div role="alert" style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '10px 12px', borderRadius: 12, background: '#FEF2F2', border: '1px solid #FBCFCF', font: '500 13px/1.4 var(--font-body)', color: '#B91C1C' }}><Icon n="circle-alert" size={15} />{err}</div>}
            <Button size="lg" full type="submit" disabled={busy}>{busy ? 'Please wait…' : signup ? 'Create account' : 'Log in'}</Button>
            <p style={{ margin: 0, textAlign: 'center', font: '500 13px/1.5 var(--font-body)', color: '#64748B' }}>
              {signup ? 'Already have an account? ' : "Don't have an account? "}
              <a href={signup ? '#login' : '#login/signup'} style={{ fontWeight: 600 }}>{signup ? 'Log in' : 'Sign up'}</a>
            </p>
            <p style={{ margin: 0, textAlign: 'center', font: '500 11.5px/1.5 var(--font-body)', color: '#94A3B8' }}>Accounts are stored locally in this browser until a server is connected.</p>
          </form>
        </div>
      </div>
      <div className="login-side" style={{ background: '#0F4C81', padding: 48, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 28 }}>
        <div style={{ maxWidth: 440, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {feed.map(([icon, c, bg, t, d, w]) => <div key={t} style={{ background: '#fff', borderRadius: 16, padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'center', boxShadow: '0 12px 30px rgba(0,0,0,.18)' }}><span style={{ width: 34, height: 34, borderRadius: 10, background: bg, color: c, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon n={icon} size={16} /></span><div style={{ flex: 1 }}><div style={{ font: '700 13.5px/1.3 var(--font-display)' }}>{t}</div><div style={{ font: '500 12px/1.4 var(--font-body)', color: '#64748B' }}>{d}</div></div><span style={{ font: '500 11px/1 var(--font-body)', color: '#94A3B8' }}>{w}</span></div>)}
        </div>
        <p style={{ margin: 0, maxWidth: 440, font: '600 22px/1.4 var(--font-display)', color: '#fff' }}>Never lose a lead again.</p>
      </div>
    </div>
  );
}
