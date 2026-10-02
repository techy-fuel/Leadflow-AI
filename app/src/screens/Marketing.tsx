import { useState } from 'react';
import { useGo } from '../nav';
import { Button, Icon, Input } from '../ui';
import { actions } from '../store';
import { funnelColors } from '../data';
const funnel: [string, number][] = [['New', 1000], ['Contacted', 620], ['Qualified', 310], ['Meeting', 140], ['Proposal', 65], ['Won', 24]]; // landing-page illustration only

export const Logo = ({ onClick }: { onClick?: () => void }) => (
  <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: onClick ? 'pointer' : 'default' }}>
    <span style={{ width: 30, height: 30, borderRadius: 9, background: '#0F4C81', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon n="waves" size={16} style={{ color: '#fff' }} /></span>
    <span style={{ font: '800 14px/1 var(--font-display)', letterSpacing: '.06em' }}>LEADFLOW <span style={{ color: '#5B4FD6' }}>AI</span></span>
  </div>
);
const features: [string, string, string, string, string, string][] = [['01', 'inbox', '#0F4C81', '#EEF5FD', 'Capture every lead', 'Website forms, Facebook and Google lead ads, Instagram and WhatsApp land in one inbox, instantly.'], ['02', 'sparkles', '#5B4FD6', '#F4F3FF', 'AI qualifies and scores', 'Each lead gets a 0–100 score with the reasons behind it, so your team knows who is ready to buy.'], ['03', 'workflow', '#15803D', '#F0FDF4', 'Follow-ups run themselves', 'Automations send the right message on the right channel and create tasks when a human should step in.'], ['04', 'chart-column', '#B45309', '#FEF7EA', 'Learn what converts', 'See which sources, reps and messages turn into revenue, and where leads are slipping away.']];

export function Landing() {
  const go = useGo();
  return (
    <div style={{ background: '#fff' }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 5, background: 'rgba(255,255,255,.85)', backdropFilter: 'blur(14px)', borderBottom: '1px solid #F1F5F9' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', height: 68, padding: '0 24px', display: 'flex', alignItems: 'center', gap: 28 }}>
          <Logo />
          <div className="hide-sm" style={{ display: 'flex', gap: 24, font: '600 14px/1 var(--font-display)', color: '#475569' }}><span>Product</span><span>Automations</span><span>Pricing</span><span>Customers</span></div>
          <span style={{ flex: 1 }} />
          <span onClick={() => go('login')} style={{ font: '600 14px/1 var(--font-display)', cursor: 'pointer' }}>Log in</span>
          <Button size="sm" onClick={() => go('login', 'signup')}>Start free trial</Button>
        </div>
      </div>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '84px 24px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 22 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 99, background: '#F4F3FF', border: '1px solid #DEDBFB', font: '600 12.5px/1 var(--font-display)', color: '#5B4FD6' }}><Icon n="sparkles" size={13} />AI that replies, scores and follows up for you</span>
        <h1 style={{ margin: 0, maxWidth: 820, font: '800 clamp(38px,7vw,64px)/1.04 var(--font-display)', letterSpacing: '-.035em', textWrap: 'balance' }}>Never lose a lead again.</h1>
        <p style={{ margin: 0, maxWidth: 600, font: '500 18px/1.6 var(--font-body)', color: '#64748B' }}>LeadFlow AI captures every lead from your website, ads and WhatsApp, qualifies it in seconds, and tells your team exactly who to follow up with next.</p>
        <div style={{ display: 'flex', gap: 10, marginTop: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button size="lg" onClick={() => go('login', 'signup')}>Start free trial</Button>
          <Button size="lg" variant="secondary" onClick={() => go('dashboard')}><Icon n="play" size={15} />See it live</Button>
        </div>
        <span style={{ font: '500 13px/1 var(--font-body)', color: '#94A3B8' }}>14-day free trial · No credit card required</span>
      </div>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <div onClick={() => go('dashboard')} style={{ border: '1px solid #E5E7EB', borderRadius: 22, padding: 10, background: '#F8FAFC', boxShadow: '0 30px 80px rgba(15,76,129,.14)', cursor: 'pointer' }}>
          <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 14, padding: 22, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 12, textAlign: 'left' }}>
            {[['New Leads', '42', '▲ 18.4%'], ['Qualified', '18', '▲ 12.2%'], ['Pipeline', '$24,500', '▲ 21.5%'], ['Conversion', '12.4%', '▲ 1.3 pts']].map(([l, v, d]) => <div key={l} style={{ border: '1px solid #F1F5F9', borderRadius: 12, padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}><span style={{ font: '600 12px/1 var(--font-display)', color: '#64748B' }}>{l}</span><span style={{ font: '800 24px/1 var(--font-display)', letterSpacing: '-.02em' }}>{v}</span><span style={{ font: '700 11.5px/1 var(--font-display)', color: '#15803D' }}>{d}</span></div>)}
            <div style={{ gridColumn: 'span 2', border: '1px solid #F1F5F9', borderRadius: 12, padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {funnel.map(([n, v], i) => <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ width: 70, font: '600 11.5px/1 var(--font-display)', color: '#475569' }}>{n}</span><div style={{ flex: 1, height: 16, background: '#F8FAFC', borderRadius: 5 }}><div style={{ width: `${Math.max(6, v / 10)}%`, height: '100%', borderRadius: 5, background: funnelColors[i] }} /></div></div>)}
            </div>
            <div style={{ gridColumn: 'span 2', border: '1px solid #DEDBFB', background: '#F7F6FF', borderRadius: 12, padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}><span className="eyebrow" style={{ color: '#5B4FD6' }}>AI INSIGHT</span><span style={{ font: '600 13px/1.45 var(--font-display)' }}>7 qualified leads haven't received a follow-up in 24 hours.</span><span style={{ font: '600 12px/1 var(--font-display)', color: '#5B4FD6' }}>Review Leads →</span></div>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '96px 24px 40px' }}>
        <div style={{ font: '700 12px/1 var(--font-display)', letterSpacing: '.08em', color: '#1E88E5', marginBottom: 14 }}>HOW IT WORKS</div>
        <h2 style={{ margin: '0 0 40px', maxWidth: 640, font: '800 38px/1.12 var(--font-display)', letterSpacing: '-.03em', textWrap: 'balance' }}>From first message to closed deal, on autopilot.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16 }}>
          {features.map(([n, icon, c, bg, t, d]) => <div key={n} style={{ border: '1px solid #E5E7EB', borderRadius: 18, padding: 22, display: 'flex', flexDirection: 'column', gap: 12 }}><span style={{ font: '700 12px/1 var(--font-mono)', color: '#94A3B8' }}>{n}</span><span style={{ width: 40, height: 40, borderRadius: 11, background: bg, color: c, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon n={icon} size={19} /></span><span style={{ font: '700 17px/1.25 var(--font-display)' }}>{t}</span><span style={{ font: '500 14px/1.55 var(--font-body)', color: '#64748B' }}>{d}</span></div>)}
        </div>
      </div>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '56px 24px 96px' }}>
        <div style={{ background: '#0F4C81', borderRadius: 28, padding: 'clamp(24px,5vw,56px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div><h2 style={{ margin: 0, font: '800 34px/1.15 var(--font-display)', letterSpacing: '-.03em', color: '#fff' }}>Reply to every lead in under a minute.</h2><p style={{ margin: '10px 0 0', font: '500 16px/1.5 var(--font-body)', color: '#C4DDF7' }}>Set up in 10 minutes. Connect your first lead source free.</p></div>
          <span onClick={() => go('login', 'signup')} style={{ height: 50, padding: '0 24px', borderRadius: 14, background: '#fff', color: '#0F4C81', display: 'flex', alignItems: 'center', font: '700 15px/1 var(--font-display)', cursor: 'pointer' }}>Start free trial</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 40, font: '500 13px/1 var(--font-body)', color: '#94A3B8', flexWrap: 'wrap', gap: 12 }}><span>© 2026 LeadFlow AI, Inc.</span><span style={{ display: 'flex', gap: 20 }}><span>Privacy</span><span>Terms</span><span>Security</span><span>Status</span></span></div>
      </div>
    </div>
  );
}

const srcs: [string, string, string, string][] = [['Website', 'globe', '#0F4C81', '#EEF5FD'], ['Facebook Lead Ads', 'facebook', '#1877F2', '#EEF4FE'], ['Google Ads', 'search', '#EA4335', '#FEF1F0'], ['WhatsApp', 'message-circle', '#16A34A', '#F0FDF4'], ['Instagram', 'instagram', '#C026D3', '#FBF0FD'], ['Import CSV', 'file-spreadsheet', '#475569', '#F1F5F9']];
export function Onboarding() {
  const go = useGo();
  const [sel, setSel] = useState<Set<string>>(new Set()); const [ws, setWs] = useState('');
  const toggle = (n: string) => setSel(s => { const x = new Set(s); x.has(n) ? x.delete(n) : x.add(n); return x; });
  const steps = [['Workspace', 2], ['Lead sources', 1], ['Invite team', 0]] as [string, number][];
  return (
    <div style={{ minHeight: '100%', background: '#F8FAFC', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px', background: '#fff', borderBottom: '1px solid #E5E7EB', gap: 12 }}>
        <Logo />
        <div className="hide-sm" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {steps.map(([l, st], i) => <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 8, font: '600 13px/1 var(--font-display)', color: st ? '#0F172A' : '#94A3B8' }}><span style={{ width: 22, height: 22, borderRadius: '50%', background: st ? '#0F4C81' : '#E5E7EB', color: st ? '#fff' : '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center', font: '700 11px/1 var(--font-display)' }}>{st === 2 ? '✓' : i + 1}</span>{l}{i < 2 && <span style={{ width: 28, height: 1.5, background: '#E5E7EB' }} />}</span>)}
        </div>
        <span onClick={() => go('dashboard')} style={{ font: '600 13px/1 var(--font-display)', color: '#64748B', cursor: 'pointer' }}>Skip for now</span>
      </div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '56px 24px' }}>
        <div style={{ width: '100%', maxWidth: 720, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div><span style={{ font: '600 13px/1 var(--font-display)', color: '#1E88E5' }}>Step 2 of 3</span><h1 style={{ margin: '10px 0 0', font: '800 30px/1.15 var(--font-display)', letterSpacing: '-.025em' }}>Where do your leads come from?</h1><p style={{ margin: '8px 0 0', font: '500 15px/1.5 var(--font-body)', color: '#64748B' }}>Connect at least one source. You can add more anytime from Integrations.</p></div>
          <Input label="Workspace name" placeholder="e.g. Acme Digital" value={ws} onChange={e => setWs(e.target.value)} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 12 }}>
            {srcs.map(([n, icon, c, bg]) => { const on = sel.has(n); return (
              <div key={n} onClick={() => toggle(n)} style={{ background: '#fff', border: on ? '2px solid #1E88E5' : '1px solid #E5E7EB', borderRadius: 16, padding: on ? 15 : 16, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', boxShadow: on ? '0 0 0 4px rgba(30,136,229,.1)' : 'none', transition: 'box-shadow 160ms' }}>
                <span style={{ width: 38, height: 38, borderRadius: 11, background: bg, color: c, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon n={icon} size={18} /></span>
                <span style={{ flex: 1, font: '600 14px/1.2 var(--font-display)' }}>{n}</span>
                <span style={{ width: 20, height: 20, borderRadius: 6, border: `1.5px solid ${on ? '#1E88E5' : '#CBD5E1'}`, background: on ? '#1E88E5' : '#fff', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{on && <Icon n="check" size={12} />}</span>
              </div>); })}
          </div>
          <div style={{ display: 'flex', gap: 12, padding: '14px 16px', borderRadius: 14, background: '#F4F3FF', border: '1px solid #ECEBFD', font: '500 13.5px/1.5 var(--font-body)', color: '#334155' }}><Icon n="sparkles" size={16} style={{ color: '#5B4FD6', marginTop: 2 }} /><span>Once connected, I'll import the last 30 days of leads, score them, and flag who needs a follow-up first.</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="ghost" onClick={() => go('dashboard')}>Skip</Button>
            <Button onClick={() => { if (ws.trim()) actions.setUser({ workspace: ws.trim() }); sel.forEach(n => actions.setConnected(n === 'Facebook Lead Ads' ? 'Facebook Lead Ads' : n, true)); go('dashboard'); }}>{sel.size ? `Connect ${sel.size} source${sel.size === 1 ? '' : 's'}` : 'Continue'}<Icon n="arrow-right" size={15} /></Button>
          </div>
        </div>
      </div>
    </div>
  );
}
