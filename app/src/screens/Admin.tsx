import { useState } from 'react';
import { useGo, type Screen } from '../nav';
import { Avatar, Badge, Button, Icon, Input, Select, Toggle } from '../ui';
import { integrations, plans, roles, team } from '../data';

export function Integrations() {
  const [on, setOn] = useState<Record<string, boolean>>(() => Object.fromEntries(integrations.flatMap(g => g.items.map(i => [i[0], i[6]]))));
  const [q, setQ] = useState('');
  const count = Object.values(on).filter(Boolean).length;
  return (
    <div className="page" style={{ maxWidth: 1200, gap: 22 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div><h1 className="h1">Integrations</h1><p className="sub">Connect where your leads come from and where your team works. {count} of 10 connected.</p></div>
        <div style={{ width: 280, height: 38, border: '1px solid #E5E7EB', borderRadius: 11, background: '#fff', display: 'flex', alignItems: 'center', gap: 8, padding: '0 12px', color: '#94A3B8' }}><Icon n="search" size={15} /><input value={q} onChange={e => setQ(e.target.value)} placeholder="Search integrations" style={{ flex: 1, border: 0, outline: 0, font: '500 13px/1 var(--font-body)', minWidth: 0 }} /></div>
      </div>
      {integrations.map(g => {
        const items = g.items.filter(i => i[0].toLowerCase().includes(q.toLowerCase()));
        if (!items.length) return null;
        return (
          <div key={g.name} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span className="card-t">{g.name}</span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 14 }}>
              {items.map(([name, cat, icon, c, bg, desc]) => (
                <div key={name} className="card" style={{ boxShadow: 'none', padding: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ width: 42, height: 42, borderRadius: 12, background: bg, color: c, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon n={icon} size={20} /></span>
                    <div><div style={{ font: '700 14px/1.2 var(--font-display)' }}>{name}</div><div style={{ font: '500 12px/1.3 var(--font-body)', color: '#94A3B8' }}>{cat}</div></div>
                  </div>
                  <p style={{ margin: 0, font: '500 13px/1.5 var(--font-body)', color: '#64748B', flex: 1 }}>{desc}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {on[name] ? <span style={{ display: 'flex', alignItems: 'center', gap: 6, font: '600 12.5px/1 var(--font-display)', color: '#15803D' }}><span style={{ width: 7, height: 7, borderRadius: '50%', background: '#16A34A' }} />Connected</span> : <span style={{ font: '500 12.5px/1 var(--font-body)', color: '#94A3B8' }}>Not connected</span>}
                    <Button size="sm" variant={on[name] ? 'secondary' : 'primary'} style={{ height: 32 }} onClick={() => setOn(o => ({ ...o, [name]: !o[name] }))}>{on[name] ? 'Manage' : 'Connect'}</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function Team() {
  return (
    <div className="page" style={{ maxWidth: 1200 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div><h1 className="h1">Team</h1><p className="sub">6 members · 5 of 10 seats used on Growth</p></div>
        <Button size="sm"><Icon n="user-plus" size={14} />Invite member</Button>
      </div>
      <div className="card" style={{ overflow: 'auto' }}>
        <div style={{ minWidth: 820 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(220px,1.6fr) 130px 120px minmax(160px,1fr) 110px 40px', padding: '12px 20px', background: '#F8FAFC', font: '600 11px/1 var(--font-display)', letterSpacing: '.04em', color: '#64748B', textTransform: 'uppercase' }}><span>Member</span><span>Role</span><span>Assigned leads</span><span>Performance</span><span>Status</span><span /></div>
          {team.map(([n, role, leads, perf, status, presence]) => (
            <div key={n} style={{ display: 'grid', gridTemplateColumns: 'minmax(220px,1.6fr) 130px 120px minmax(160px,1fr) 110px 40px', padding: '12px 20px', borderTop: '1px solid #F1F5F9', alignItems: 'center' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}><Avatar name={n} size={34} status={presence} /><span><span style={{ display: 'block', font: '600 13.5px/1.3 var(--font-display)' }}>{n}</span><span style={{ display: 'block', font: '500 12px/1.3 var(--font-body)', color: '#64748B' }}>{n.split(' ')[0].toLowerCase()}@acmedigital.com</span></span></span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, font: '600 13px/1 var(--font-display)', color: '#334155' }}>{role}<Icon n="chevron-down" size={12} style={{ color: '#94A3B8' }} /></span>
              <span style={{ font: '600 13px/1 var(--font-display)', fontVariantNumeric: 'tabular-nums' }}>{leads}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ flex: 1, maxWidth: 110, height: 6, borderRadius: 99, background: '#F1F5F9' }}><span style={{ display: 'block', width: `${perf}%`, height: '100%', borderRadius: 99, background: perf >= 80 ? '#16A34A' : perf >= 60 ? '#1E88E5' : '#D97706' }} /></span><span style={{ font: '600 12px/1 var(--font-display)', color: '#475569' }}>{perf ? `${perf} / 100` : '—'}</span></span>
              <span><Badge size="sm" tone={status === 'Active' ? 'emerald' : 'amber'}>{status}</Badge></span>
              <Icon n="ellipsis" size={15} style={{ color: '#94A3B8' }} />
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 12 }}>
        {roles.map(([n, d]) => <div key={n} className="card" style={{ boxShadow: 'none', borderRadius: 16, padding: 16, display: 'flex', flexDirection: 'column', gap: 6 }}><span style={{ font: '700 13.5px/1 var(--font-display)' }}>{n}</span><span style={{ font: '500 12.5px/1.45 var(--font-body)', color: '#64748B' }}>{d}</span></div>)}
      </div>
    </div>
  );
}

const sn: [string, string, Screen?][] = [['General', 'sliders-horizontal', 'settings'], ['Workspace', 'building-2'], ['Team', 'users-round', 'team'], ['Lead Pipeline', 'kanban'], ['Custom Fields', 'list-plus'], ['AI Settings', 'sparkles'], ['Automations', 'workflow', 'automations'], ['Notifications', 'bell'], ['Integrations', 'blocks', 'integrations'], ['Billing', 'credit-card', 'billing'], ['Security', 'shield-check']];

export function SettingsScreen({ billing }: { billing: boolean }) {
  const go = useGo();
  const [ai, setAi] = useState([true, true, true, false]);
  const [saved, setSaved] = useState(false);
  const cur = billing ? 'billing' : 'settings';
  const toggles: [string, string][] = [['Auto-reply to new leads', "AI sends a first response within 60 seconds on the lead's channel."], ['Lead scoring', 'Score every lead 0–100 from intent, fit and engagement.'], ['Suggest next actions', 'Show recommended actions on lead profiles and the dashboard.'], ['Draft replies only', 'Never send AI messages without a team member approving them.']];
  const usage: [string, string, number, string][] = [['Seats', '5 of 10', 50, '#1E88E5'], ['Leads this month', '1,000 of 2,500', 40, '#1E88E5'], ['AI credits', '8,420 of 10,000', 84, '#D97706']];
  return (
    <div className="page grid-2" style={{ maxWidth: 1200, display: 'grid', gridTemplateColumns: '220px minmax(0,1fr)', gap: 28, alignItems: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <h1 className="h1" style={{ fontSize: 24, margin: '0 0 14px 10px' }}>Settings</h1>
        {sn.map(([l, icon, to]) => { const on = to === cur; return <div key={l} onClick={() => to && go(to)} className="hov" style={{ display: 'flex', alignItems: 'center', gap: 10, height: 34, padding: '0 10px', borderRadius: 9, cursor: 'pointer', font: `${on ? 600 : 500} 13.5px/1 var(--font-display)`, color: on ? '#0F4C81' : '#475569', background: on ? '#EEF5FD' : 'transparent' }}><Icon n={icon} size={15} />{l}</div>; })}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18, minWidth: 0 }}>
        {!billing ? <>
          <div className="card">
            <div style={{ padding: '18px 22px', borderBottom: '1px solid #F1F5F9' }}><div style={{ font: '700 16px/1.2 var(--font-display)' }}>Workspace</div><div style={{ marginTop: 4, font: '500 13px/1.4 var(--font-body)', color: '#64748B' }}>How your workspace appears to your team and leads.</div></div>
            <div style={{ padding: 22, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 18 }}>
              <Input label="Workspace name" defaultValue="Acme Digital" />
              <Input label="Workspace URL" defaultValue="acme-digital.leadflow.ai" />
              <Select label="Time zone" options={['(GMT−5) Central Time', '(GMT−8) Pacific Time', '(GMT+0) London']} />
              <Select label="Currency" options={['USD — US Dollar', 'EUR — Euro', 'GBP — British Pound']} />
            </div>
          </div>
          <div className="card">
            <div style={{ padding: '18px 22px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: 8 }}><Icon n="sparkles" size={15} style={{ color: '#5B4FD6' }} /><span style={{ font: '700 16px/1.2 var(--font-display)' }}>AI behavior</span></div>
            <div style={{ padding: '6px 22px 10px' }}>
              {toggles.map(([l, d], i) => <div key={l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, padding: '14px 0', borderBottom: '1px solid #F8FAFC' }}><div><div style={{ font: '600 14px/1.3 var(--font-display)' }}>{l}</div><div style={{ marginTop: 2, font: '500 12.5px/1.45 var(--font-body)', color: '#64748B' }}>{d}</div></div><Toggle on={ai[i]} onChange={v => setAi(a => a.map((x, j) => j === i ? v : x))} /></div>)}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 8 }}>
            {saved && <span style={{ font: '600 13px/1 var(--font-display)', color: '#15803D', display: 'flex', gap: 6, alignItems: 'center' }}><Icon n="circle-check" size={14} />Saved</span>}
            <Button variant="ghost" size="sm">Cancel</Button>
            <Button size="sm" onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}>Save changes</Button>
          </div>
        </> : <>
          <div className="card" style={{ padding: 22, display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 320px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ font: '800 20px/1 var(--font-display)' }}>Growth plan</span><Badge tone="emerald" size="sm">Active</Badge></div>
              <div style={{ marginTop: 8, font: '500 13.5px/1.5 var(--font-body)', color: '#64748B' }}>$149 / month · billed monthly · renews Nov 1, 2026</div>
              <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 16 }}>
                {usage.map(([l, v, p, c]) => <div key={l} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}><div style={{ display: 'flex', justifyContent: 'space-between', font: '600 12.5px/1 var(--font-display)', color: '#334155' }}><span>{l}</span><span style={{ color: '#64748B', fontWeight: 500 }}>{v}</span></div><div style={{ height: 6, borderRadius: 99, background: '#F1F5F9' }}><div style={{ width: `${p}%`, height: '100%', borderRadius: 99, background: c }} /></div></div>)}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}><Button size="sm">Upgrade plan</Button><Button variant="ghost" size="sm">Cancel plan</Button></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 14 }}>
            {plans.map(([n, price, tag, f]) => { const cur = !!tag; return (
              <div key={n} style={{ background: '#fff', border: cur ? '2px solid #1E88E5' : '1px solid #E5E7EB', borderRadius: 18, padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span className="card-t">{n}</span><span className="eyebrow" style={{ color: '#1E88E5' }}>{tag}</span></div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}><span style={{ font: '800 30px/1 var(--font-display)', letterSpacing: '-.03em' }}>{price}</span><span style={{ font: '500 13px/1 var(--font-body)', color: '#64748B' }}>/ month</span></div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>{f.map(x => <span key={x} style={{ display: 'flex', gap: 8, alignItems: 'center', font: '500 13px/1.4 var(--font-body)', color: '#334155' }}><Icon n="check" size={14} style={{ color: '#16A34A' }} />{x}</span>)}</div>
                <Button variant={cur ? 'secondary' : 'secondary'} size="sm" disabled={cur} style={cur ? { background: '#EEF5FD', color: '#0F4C81', borderColor: '#C4DDF7', opacity: 1 } : {}}>{cur ? 'Current plan' : 'Switch'}</Button>
              </div>); })}
          </div>
          <div className="card">
            <div className="card-h" style={{ padding: '16px 22px' }}><span className="card-t">Invoices</span><span style={{ display: 'flex', alignItems: 'center', gap: 8, font: '500 13px/1 var(--font-body)', color: '#475569' }}><Icon n="credit-card" size={15} />Visa •••• 4242 · <a href="#billing">Update</a></span></div>
            {[['Oct 1, 2026', '$149.00'], ['Sep 1, 2026', '$149.00'], ['Aug 1, 2026', '$149.00']].map(([d, a]) => <div key={d} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 100px 70px 32px', gap: 10, padding: '12px 22px', borderBottom: '1px solid #F8FAFC', alignItems: 'center', font: '500 13px/1 var(--font-body)', color: '#334155' }}><span>{d}</span><span style={{ fontWeight: 600, color: '#0F172A' }}>{a}</span><span><Badge tone="emerald" size="sm">Paid</Badge></span><Icon n="download" size={15} style={{ color: '#94A3B8' }} /></div>)}
          </div>
        </>}
      </div>
    </div>
  );
}
