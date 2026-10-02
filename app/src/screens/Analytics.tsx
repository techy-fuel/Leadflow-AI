import { useState } from 'react';
import { useGo } from '../nav';
import { Avatar, Button, Icon, PillTabs } from '../ui';
import { funnelColors, funnelStages, srcIcon } from '../data';
import { DAY, money, reached, useStore } from '../store';
import { Empty } from '../modals';

export function Analytics({ kind }: { kind: 'analytics' | 'insights' | 'reports' }) {
  const go = useGo(); const all = useStore(s => s.leads); const team = useStore(s => s.team);
  const [range, setRange] = useState('30D');
  const days = { '7D': 7, '30D': 30, '90D': 90, '12M': 365 }[range]!;
  const leads = all.filter(l => l.createdAt >= Date.now() - days * DAY);
  const title = kind === 'insights' ? 'AI Insights' : kind === 'reports' ? 'Reports' : 'Analytics';
  const count = (st: string[]) => leads.filter(l => st.includes(l.stage)).length;
  const perf: [string, number][] = [['Total Leads', leads.length], ['Qualified Leads', reached(leads, 'Qualified')], ['Meetings', reached(leads, 'Meeting')], ['Proposals', reached(leads, 'Proposal')], ['Won', count(['Won'])], ['Lost', count(['Lost'])]];
  const funnel = funnelStages.map(n => [n, reached(leads, n)] as [string, number]); const max = Math.max(1, funnel[0][1]);
  const srcs = Object.entries(leads.reduce((a, l) => { const x = a[l.source] ??= { n: 0, q: 0, w: 0 }; x.n++; if (reached([l], 'Qualified')) x.q++; if (l.stage === 'Won') x.w++; return a; }, {} as Record<string, { n: number; q: number; w: number }>)).sort((a, b) => b[1].n - a[1].n);
  const reps = team.map(m => { const mine = leads.filter(l => l.rep === m.name); const won = mine.filter(l => l.stage === 'Won'); return { n: m.name, leads: mine.length, meetings: reached(mine, 'Meeting'), won: won.length, rev: won.reduce((a, l) => a + l.value, 0) }; });
  const best = srcs.filter(([, v]) => v.n >= 2).sort((a, b) => b[1].q / b[1].n - a[1].q / a[1].n)[0];
  return (
    <div className="page">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div><h1 className="h1">{title}</h1><p className="sub">Leads created in the last {range === '12M' ? '12 months' : `${days} days`}</p></div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><PillTabs tabs={['7D', '30D', '90D', '12M']} value={range} onChange={setRange} /></div>
      </div>
      {!all.length ? <div className="card"><Empty icon="chart-column" title="No data to analyze yet" text="Analytics fill in as leads move through your pipeline."><Button size="sm" onClick={() => go('leads')}>Add leads</Button></Empty></div> : <>
        {best && (
          <div style={{ background: 'linear-gradient(90deg,#F7F6FF 0%,#fff 70%)', border: '1px solid #DEDBFB', borderRadius: 18, padding: '18px 20px', display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ width: 36, height: 36, borderRadius: 10, background: '#5B4FD6', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon n="sparkles" size={16} /></span>
            <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: 6 }}><span className="eyebrow" style={{ color: '#5B4FD6' }}>INSIGHT</span><span style={{ font: '600 15px/1.45 var(--font-display)' }}>{best[0]} leads qualify best: {Math.round(best[1].q / best[1].n * 100)}% reach Qualified ({best[1].q} of {best[1].n}).</span></div>
          </div>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 12 }}>
          {perf.map(([l, v]) => <div key={l} className="card" style={{ borderRadius: 16, padding: 16, display: 'flex', flexDirection: 'column', gap: 10, boxShadow: 'none' }}><span style={{ font: '600 12.5px/1 var(--font-display)', color: '#64748B' }}>{l}</span><span style={{ font: '800 24px/1 var(--font-display)', letterSpacing: '-.02em' }}>{v.toLocaleString()}</span></div>)}
        </div>
        <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.5fr) minmax(0,1fr)', gap: 16 }}>
          <div className="card">
            <div className="card-h"><span className="card-t">Conversion funnel</span><span style={{ font: '500 12px/1 var(--font-body)', color: '#64748B' }}>New → Won</span></div>
            <div style={{ padding: '22px 20px 18px', display: 'grid', gridTemplateColumns: 'repeat(6,minmax(0,1fr))', gap: 10, alignItems: 'end', height: 250 }}>
              {funnel.map(([name, n], i) => <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, height: '100%', justifyContent: 'flex-end' }}><span style={{ font: '700 13px/1 var(--font-display)' }}>{n}</span><div style={{ width: '100%', height: `${Math.max(3, n / max * 80)}%`, background: funnelColors[i], borderRadius: '8px 8px 3px 3px', minHeight: 6, transition: 'height 500ms var(--ease-out)' }} /><span style={{ font: '600 12px/1 var(--font-display)', color: '#475569' }}>{name}</span></div>)}
            </div>
          </div>
          <div className="card">
            <div className="card-h"><span className="card-t">Lead source performance</span></div>
            <div style={{ padding: '6px 20px 14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 50px 70px 40px', gap: 8, padding: '10px 0', font: '600 11px/1 var(--font-display)', letterSpacing: '.04em', color: '#94A3B8', textTransform: 'uppercase' }}><span>Source</span><span style={{ textAlign: 'right' }}>Leads</span><span style={{ textAlign: 'right' }}>Qualified</span><span style={{ textAlign: 'right' }}>Won</span></div>
              {srcs.map(([n, v]) => <div key={n} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 50px 70px 40px', gap: 8, padding: '10px 0', borderTop: '1px solid #F8FAFC', font: '500 13px/1 var(--font-body)', alignItems: 'center' }}><span style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600 }}><Icon n={srcIcon(n)} size={14} style={{ color: '#64748B' }} />{n}</span><span style={{ textAlign: 'right' }}>{v.n}</span><span style={{ textAlign: 'right', fontWeight: 700 }}>{Math.round(v.q / v.n * 100)}%</span><span style={{ textAlign: 'right' }}>{v.w}</span></div>)}
              {!srcs.length && <p style={{ font: '500 13px/1.5 var(--font-body)', color: '#64748B' }}>No leads in this range.</p>}
            </div>
          </div>
        </div>
        <div className="card" style={{ overflow: 'auto' }}>
          <div className="card-h"><span className="card-t">Sales performance</span></div>
          <div style={{ minWidth: 620 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(180px,1.4fr) repeat(4,minmax(0,1fr))', padding: '10px 20px', font: '600 11px/1 var(--font-display)', letterSpacing: '.04em', color: '#94A3B8', textTransform: 'uppercase' }}><span>Team member</span><span>Leads handled</span><span>Meetings</span><span>Won deals</span><span>Revenue</span></div>
            {reps.map(r => <div key={r.n} style={{ display: 'grid', gridTemplateColumns: 'minmax(180px,1.4fr) repeat(4,minmax(0,1fr))', padding: '12px 20px', borderTop: '1px solid #F1F5F9', alignItems: 'center', font: '500 13px/1 var(--font-body)', color: '#334155' }}><span style={{ display: 'flex', alignItems: 'center', gap: 10, font: '600 13.5px/1 var(--font-display)', color: '#0F172A' }}><Avatar name={r.n} size={28} />{r.n}</span><span>{r.leads}</span><span>{r.meetings}</span><span>{r.won}</span><span style={{ fontWeight: 700, color: '#0F172A' }}>{money(r.rev)}</span></div>)}
          </div>
        </div>
      </>}
    </div>
  );
}
