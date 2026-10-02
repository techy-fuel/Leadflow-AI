import { useGo } from '../nav';
import { Avatar, Button, Icon, StatCard, Badge } from '../ui';
import { followups, funnel, funnelColors, sources, temp } from '../data';

export function Dashboard() {
  const go = useGo();
  return (
    <div className="page" style={{ gap: 20 }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div>
          <h1 className="h1" style={{ fontSize: 28 }}>Good morning, Sarah 👋</h1>
          <p className="sub">Here’s what’s happening with your leads today.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="secondary" size="sm"><Icon n="download" size={14} />Export</Button>
          <Button size="sm" onClick={() => go('leads')}><Icon n="plus" size={14} />Add lead</Button>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: 16 }}>
        <StatCard label="New Leads" value="42" delta="18.4%" />
        <StatCard label="Qualified Leads" value="18" delta="12.2%" />
        <StatCard label="Follow-ups Due" value="7" delta="3 overdue" trend="down" />
        <StatCard label="Pipeline Value" value="$24,500" delta="21.5%" />
        <StatCard label="Conversion Rate" value="12.4%" delta="vs 11.1%" trend="flat" />
      </div>
      <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.6fr) minmax(0,1fr)', gap: 16 }}>
        <div className="card">
          <div className="card-h">
            <div><div className="card-t">Lead funnel</div><div style={{ font: '500 12px/1.4 var(--font-body)', color: '#64748B', marginTop: 2 }}>Last 30 days · 2.4% end-to-end</div></div>
            <button className="link" onClick={() => go('analytics')}>Full report →</button>
          </div>
          <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {funnel.map(([name, n], i) => {
              const prev = i ? funnel[i - 1] : null;
              return (
                <div key={name} style={{ display: 'grid', gridTemplateColumns: '80px minmax(0,1fr) 110px', alignItems: 'center', gap: 12 }}>
                  <span style={{ font: '600 13px/1 var(--font-display)', color: '#334155' }}>{name}</span>
                  <div style={{ height: 30, background: '#F8FAFC', borderRadius: 8, overflow: 'hidden' }}>
                    <div style={{ width: `${Math.max(8, n / 10)}%`, height: '100%', background: funnelColors[i], borderRadius: 8, display: 'flex', alignItems: 'center', paddingLeft: 10, font: '700 12px/1 var(--font-display)', color: '#fff', fontVariantNumeric: 'tabular-nums', transition: 'width 600ms var(--ease-out)' }}>{n.toLocaleString()}</div>
                  </div>
                  <span style={{ font: '500 12px/1 var(--font-body)', color: name === 'Meeting' ? '#DC2626' : '#64748B', textAlign: 'right' }}>{prev ? `${Math.round(n / prev[1] * 100)}% from ${prev[0].toLowerCase()}` : '100%'}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ background: 'linear-gradient(180deg,#F7F6FF 0%,#fff 60%)', border: '1px solid #DEDBFB', borderRadius: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '16px 20px', borderBottom: '1px solid #ECEBFD' }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: '#5B4FD6', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon n="sparkles" size={15} /></div>
            <div style={{ font: '700 15px/1 var(--font-display)', flex: 1 }}>AI Insights</div>
            <span style={{ font: '500 11px/1 var(--font-body)', color: '#64748B' }}>Updated 4 min ago</span>
          </div>
          <div style={{ padding: '8px 20px 18px' }}>
            {[['NEEDS ATTENTION', '#B45309', "7 qualified leads haven't received a follow-up in the last 24 hours.", 'Review Leads →', 'leads'], ['OPPORTUNITY', '#5B4FD6', 'Google Ads leads are converting 2.1× better than Facebook leads this month.', 'View Analytics →', 'analytics']].map(([tag, c, text, cta, to], i) => (
              <div key={tag} style={{ padding: '14px 0', borderBottom: i ? 0 : '1px solid #ECEBFD', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <span className="eyebrow" style={{ color: c }}>{tag}</span>
                <p style={{ margin: 0, font: '500 14px/1.5 var(--font-body)', textWrap: 'pretty' }}>{text}</p>
                <button className="link" style={{ color: '#5B4FD6', alignSelf: 'flex-start' }} onClick={() => go(to as any)}>{cta}</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 16 }}>
        <div className="card">
          <div className="card-h"><div className="card-t">Lead sources</div><div style={{ display: 'flex', gap: 16, font: '500 12px/1 var(--font-body)', color: '#64748B' }}><span>Leads</span><span>Conv.</span></div></div>
          <div style={{ padding: '14px 20px 18px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {sources.map(([name, icon, n, conv]) => (
              <div key={name} style={{ display: 'grid', gridTemplateColumns: '22px 90px minmax(0,1fr) 40px 48px', alignItems: 'center', gap: 10 }}>
                <Icon n={icon} size={15} style={{ color: '#64748B' }} />
                <span style={{ font: '600 13px/1 var(--font-display)', color: '#334155' }}>{name}</span>
                <div style={{ height: 8, background: '#F1F5F9', borderRadius: 99, overflow: 'hidden' }}><div style={{ width: `${n / 3.12}%`, height: '100%', background: '#1E88E5', borderRadius: 99 }} /></div>
                <span style={{ font: '600 13px/1 var(--font-display)', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{n}</span>
                <span style={{ font: '700 12px/1 var(--font-display)', color: parseFloat(conv) >= 12 ? '#15803D' : '#64748B', textAlign: 'right' }}>{conv}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="card-h"><div className="card-t">Follow-ups due today</div><button className="link" onClick={() => go('tasks')}>All tasks →</button></div>
          <div style={{ padding: '6px 8px 10px' }}>
            {followups.map(([name, company, what, score, time]) => (
              <div key={name} onClick={() => go('detail')} className="hov" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 12, cursor: 'pointer' }}>
                <Avatar name={name} size={32} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ font: '600 13.5px/1.3 var(--font-display)' }}>{name}</div>
                  <div style={{ font: '500 12px/1.4 var(--font-body)', color: '#64748B' }}>{company} · {what}</div>
                </div>
                <Badge size="sm" tone={temp(score)[1]}>{score}</Badge>
                <span style={{ font: '600 12px/1 var(--font-display)', color: time === 'Overdue' ? '#DC2626' : '#334155', width: 62, textAlign: 'right' }}>{time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
