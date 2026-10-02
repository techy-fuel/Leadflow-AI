import { useState } from 'react';
import { Avatar, Button, Icon, PillTabs } from '../ui';
import { funnel, funnelColors } from '../data';

const perf = [['Total Leads', '1,000', '+14.2%'], ['Qualified Leads', '310', '+9.8%'], ['Meetings', '140', '+4.1%'], ['Proposals', '65', '+12.0%'], ['Won', '24', '+20.0%'], ['Lost', '31', '−6.0%']];
const srcPerf: [string, string, number, string, number][] = [['Website', 'globe', 312, '41%', 9], ['Google', 'search', 264, '36%', 7], ['WhatsApp', 'message-circle', 148, '29%', 4], ['Facebook', 'facebook', 121, '22%', 2], ['Instagram', 'instagram', 59, '19%', 1]];
const reps = [['Sarah Mitchell', 96, '14m', 31, 9, '$41,800'], ['Daniel Park', 88, '22m', 27, 7, '$33,500'], ['Maya Johnson', 74, '9m', 24, 6, '$27,900'], ['Leo Martins', 52, '1h 40m', 11, 2, '$8,200']] as [string, number, string, number, number, string][];

export function Analytics({ kind }: { kind: 'analytics' | 'insights' | 'reports' }) {
  const [range, setRange] = useState('30D');
  const title = kind === 'insights' ? 'AI Insights' : kind === 'reports' ? 'Reports' : 'Analytics';
  const mult = { '7D': .25, '30D': 1, '90D': 2.8, '12M': 11 }[range]!;
  return (
    <div className="page">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div><h1 className="h1">{title}</h1><p className="sub">Sep 2 – Oct 1, 2026 compared with previous 30 days</p></div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><PillTabs tabs={['7D', '30D', '90D', '12M']} value={range} onChange={setRange} /><Button variant="secondary" size="sm"><Icon n="download" size={14} />Export</Button></div>
      </div>
      <div style={{ background: 'linear-gradient(90deg,#F7F6FF 0%,#fff 70%)', border: '1px solid #DEDBFB', borderRadius: 18, padding: '18px 20px', display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ width: 36, height: 36, borderRadius: 10, background: '#5B4FD6', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon n="sparkles" size={16} /></span>
        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span className="eyebrow" style={{ color: '#5B4FD6' }}>AI INSIGHT</span>
          <span style={{ font: '600 15px/1.45 var(--font-display)' }}>Your website leads have a 34% higher qualification rate than social media leads.</span>
          <span style={{ font: '500 13px/1.4 var(--font-body)', color: '#475569' }}><b style={{ color: '#0F172A', fontWeight: 600 }}>Recommended action:</b> Increase website lead acquisition.</span>
        </div>
        <Button variant="secondary" size="sm" style={{ height: 36, color: '#5B4FD6', borderColor: '#DEDBFB' }}>View Recommendation →</Button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 12 }}>
        {perf.map(([l, v, d]) => <div key={l} className="card" style={{ borderRadius: 16, padding: 16, display: 'flex', flexDirection: 'column', gap: 10, boxShadow: 'none' }}><span style={{ font: '600 12.5px/1 var(--font-display)', color: '#64748B' }}>{l}</span><span style={{ font: '800 24px/1 var(--font-display)', letterSpacing: '-.02em', fontVariantNumeric: 'tabular-nums' }}>{Math.round(parseInt(v.replace(',', '')) * mult).toLocaleString()}</span><span style={{ font: '700 12px/1 var(--font-display)', color: '#15803D' }}>{d}</span></div>)}
      </div>
      <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.5fr) minmax(0,1fr)', gap: 16 }}>
        <div className="card">
          <div className="card-h"><span className="card-t">Conversion funnel</span><span style={{ font: '500 12px/1 var(--font-body)', color: '#64748B' }}>New → Won</span></div>
          <div style={{ padding: '22px 20px 18px', display: 'grid', gridTemplateColumns: 'repeat(6,minmax(0,1fr))', gap: 10, alignItems: 'end', height: 250 }}>
            {funnel.map(([name, n], i) => (
              <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, height: '100%', justifyContent: 'flex-end' }}>
                <span style={{ font: '700 13px/1 var(--font-display)', fontVariantNumeric: 'tabular-nums' }}>{Math.round(n * mult).toLocaleString()}</span>
                <div style={{ width: '100%', height: `${Math.max(3, n / 10)}%`, background: funnelColors[i], borderRadius: '8px 8px 3px 3px', minHeight: 6, transition: 'height 500ms var(--ease-out)' }} />
                <span style={{ font: '600 12px/1 var(--font-display)', color: '#475569' }}>{name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="card-h"><span className="card-t">Lead source performance</span></div>
          <div style={{ padding: '6px 20px 14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 56px 70px 50px', gap: 8, padding: '10px 0', font: '600 11px/1 var(--font-display)', letterSpacing: '.04em', color: '#94A3B8', textTransform: 'uppercase' }}><span>Source</span><span style={{ textAlign: 'right' }}>Leads</span><span style={{ textAlign: 'right' }}>Qualified</span><span style={{ textAlign: 'right' }}>Won</span></div>
            {srcPerf.map(([n, icon, leads, q, won]) => <div key={n} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 56px 70px 50px', gap: 8, padding: '10px 0', borderTop: '1px solid #F8FAFC', font: '500 13px/1 var(--font-body)', color: '#334155', fontVariantNumeric: 'tabular-nums', alignItems: 'center' }}><span style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600, color: '#0F172A' }}><Icon n={icon} size={14} style={{ color: '#64748B' }} />{n}</span><span style={{ textAlign: 'right' }}>{leads}</span><span style={{ textAlign: 'right', fontWeight: 700, color: parseInt(q) >= 30 ? '#15803D' : '#64748B' }}>{q}</span><span style={{ textAlign: 'right' }}>{won}</span></div>)}
          </div>
        </div>
      </div>
      <div className="card" style={{ overflow: 'auto' }}>
        <div className="card-h"><span className="card-t">Sales performance</span></div>
        <div style={{ minWidth: 720 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(180px,1.4fr) repeat(5,minmax(0,1fr))', padding: '10px 20px', font: '600 11px/1 var(--font-display)', letterSpacing: '.04em', color: '#94A3B8', textTransform: 'uppercase' }}><span>Team member</span><span>Leads handled</span><span>Response time</span><span>Meetings</span><span>Won deals</span><span>Revenue</span></div>
          {reps.map(([n, leads, rt, m, w, rev]) => <div key={n} style={{ display: 'grid', gridTemplateColumns: 'minmax(180px,1.4fr) repeat(5,minmax(0,1fr))', padding: '12px 20px', borderTop: '1px solid #F1F5F9', alignItems: 'center', font: '500 13px/1 var(--font-body)', color: '#334155', fontVariantNumeric: 'tabular-nums' }}><span style={{ display: 'flex', alignItems: 'center', gap: 10, font: '600 13.5px/1 var(--font-display)', color: '#0F172A' }}><Avatar name={n} size={28} />{n}</span><span>{leads}</span><span style={{ color: rt.includes('h') ? '#DC2626' : '#334155', fontWeight: 600 }}>{rt}</span><span>{m}</span><span>{w}</span><span style={{ fontWeight: 700, color: '#0F172A' }}>{rev}</span></div>)}
        </div>
      </div>
    </div>
  );
}
