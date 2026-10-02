import { useGo, useModals } from '../nav';
import { Avatar, Badge, Button, Icon, StatCard } from '../ui';
import { funnelColors, funnelStages, srcIcon, temp } from '../data';
import { DAY, dueLabel, firstName, greeting, isOverdue, leadName, money, reached, startOfDay, useStore } from '../store';
import { Empty } from '../modals';

export function Dashboard() {
  const go = useGo(); const { openLead } = useModals();
  const leads = useStore(s => s.leads); const tasks = useStore(s => s.tasks); const user = useStore(s => s.user);
  const week = Date.now() - 7 * DAY, prevWeek = Date.now() - 14 * DAY;
  const newThis = leads.filter(l => l.createdAt >= week).length, newPrev = leads.filter(l => l.createdAt >= prevWeek && l.createdAt < week).length;
  const delta = newPrev ? `${Math.abs(Math.round((newThis - newPrev) / newPrev * 100))}%` : newThis ? 'new' : undefined;
  const qualified = leads.filter(l => ['Qualified', 'Meeting', 'Proposal', 'Negotiation'].includes(l.stage)).length;
  const open = leads.filter(l => !['Won', 'Lost'].includes(l.stage));
  const pipeline = open.reduce((a, l) => a + l.value, 0);
  const won = leads.filter(l => l.stage === 'Won').length;
  const conv = leads.length ? ((won / leads.length) * 100).toFixed(1) + '%' : '—';
  const today = startOfDay(Date.now());
  const due = tasks.filter(t => !t.done && t.dueAt != null && startOfDay(t.dueAt) <= today).sort((a, b) => a.dueAt! - b.dueAt!);
  const overdue = tasks.filter(isOverdue).length;
  const funnel = funnelStages.map(n => [n, reached(leads, n)] as [string, number]);
  const max = Math.max(1, funnel[0][1]);
  const srcs = Object.entries(leads.reduce((a, l) => { a[l.source] = (a[l.source] ?? { n: 0, w: 0 }); a[l.source].n++; if (l.stage === 'Won') a[l.source].w++; return a; }, {} as Record<string, { n: number; w: number }>)).sort((a, b) => b[1].n - a[1].n);
  const unassigned = leads.filter(l => l.rep === 'Unassigned').length;
  const insights = [
    overdue ? ['NEEDS ATTENTION', '#B45309', `${overdue} follow-up${overdue > 1 ? 's are' : ' is'} overdue.`, 'Review tasks →', 'tasks'] : null,
    unassigned ? ['NEEDS ATTENTION', '#B45309', `${unassigned} lead${unassigned > 1 ? 's have' : ' has'} no owner assigned.`, 'Review leads →', 'leads'] : null,
    srcs.length > 1 ? ['OPPORTUNITY', '#5B4FD6', `${srcs[0][0]} is your biggest lead source with ${srcs[0][1].n} of ${leads.length} leads.`, 'View Analytics →', 'analytics'] : null,
  ].filter(Boolean) as string[][];
  return (
    <div className="page" style={{ gap: 20 }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div>
          <h1 className="h1" style={{ fontSize: 28 }}>{greeting()}{user.name ? `, ${firstName(user.name)}` : ''} 👋</h1>
          <p className="sub">Here’s what’s happening with your leads today.</p>
        </div>
        <Button size="sm" onClick={openLead}><Icon n="plus" size={14} />Add lead</Button>
      </div>
      {!leads.length && (
        <div className="card" style={{ background: 'linear-gradient(180deg,#F7F6FF,#fff)', borderColor: '#DEDBFB' }}>
          <Empty icon="rocket" title="Let’s get your first lead in" text="Add a lead manually or connect a lead source. Your dashboard fills in as leads arrive." tone={['#ECEBFD', '#5B4FD6']}>
            <Button size="sm" onClick={openLead}><Icon n="plus" size={14} />Add lead</Button>
            <Button size="sm" variant="secondary" onClick={() => go('integrations')}>Connect lead source</Button>
          </Empty>
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: 16 }}>
        <StatCard label="New Leads (7d)" value={String(newThis)} delta={delta} trend={newThis >= newPrev ? 'up' : 'down'} />
        <StatCard label="Qualified Leads" value={String(qualified)} />
        <StatCard label="Follow-ups Due" value={String(due.length)} delta={overdue ? `${overdue} overdue` : undefined} trend="down" />
        <StatCard label="Pipeline Value" value={money(pipeline)} />
        <StatCard label="Conversion Rate" value={conv} trend="flat" />
      </div>
      <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.6fr) minmax(0,1fr)', gap: 16 }}>
        <div className="card">
          <div className="card-h"><div><div className="card-t">Lead funnel</div><div style={{ font: '500 12px/1.4 var(--font-body)', color: '#64748B', marginTop: 2 }}>All time · {leads.length} leads</div></div><button className="link" onClick={() => go('analytics')}>Full report →</button></div>
          <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {funnel.map(([name, n], i) => (
              <div key={name} style={{ display: 'grid', gridTemplateColumns: '80px minmax(0,1fr) 110px', alignItems: 'center', gap: 12 }}>
                <span style={{ font: '600 13px/1 var(--font-display)', color: '#334155' }}>{name}</span>
                <div style={{ height: 30, background: '#F8FAFC', borderRadius: 8, overflow: 'hidden' }}>
                  <div style={{ width: n ? `${Math.max(8, n / max * 100)}%` : 0, height: '100%', background: funnelColors[i], borderRadius: 8, display: 'flex', alignItems: 'center', paddingLeft: 10, font: '700 12px/1 var(--font-display)', color: '#fff', transition: 'width 600ms var(--ease-out)' }}>{n || ''}</div>
                </div>
                <span style={{ font: '500 12px/1 var(--font-body)', color: '#64748B', textAlign: 'right' }}>{i && funnel[i - 1][1] ? `${Math.round(n / funnel[i - 1][1] * 100)}% from ${funnel[i - 1][0].toLowerCase()}` : ''}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: 'linear-gradient(180deg,#F7F6FF 0%,#fff 60%)', border: '1px solid #DEDBFB', borderRadius: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '16px 20px', borderBottom: '1px solid #ECEBFD' }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: '#5B4FD6', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon n="sparkles" size={15} /></div>
            <div style={{ font: '700 15px/1 var(--font-display)', flex: 1 }}>AI Insights</div>
          </div>
          <div style={{ padding: '8px 20px 18px' }}>
            {insights.length ? insights.map(([tag, c, text, cta, to], i) => (
              <div key={text} style={{ padding: '14px 0', borderBottom: i < insights.length - 1 ? '1px solid #ECEBFD' : 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <span className="eyebrow" style={{ color: c }}>{tag}</span>
                <p style={{ margin: 0, font: '500 14px/1.5 var(--font-body)' }}>{text}</p>
                <button className="link" style={{ color: '#5B4FD6', alignSelf: 'flex-start' }} onClick={() => go(to as any)}>{cta}</button>
              </div>
            )) : <p style={{ margin: '14px 0', font: '500 13.5px/1.5 var(--font-body)', color: '#64748B' }}>Insights appear here once you have leads and tasks to analyze.</p>}
          </div>
        </div>
      </div>
      <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 16 }}>
        <div className="card">
          <div className="card-h"><div className="card-t">Lead sources</div><div style={{ display: 'flex', gap: 16, font: '500 12px/1 var(--font-body)', color: '#64748B' }}><span>Leads</span><span>Won</span></div></div>
          <div style={{ padding: '14px 20px 18px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {srcs.length ? srcs.map(([name, { n, w }]) => (
              <div key={name} style={{ display: 'grid', gridTemplateColumns: '22px 90px minmax(0,1fr) 40px 48px', alignItems: 'center', gap: 10 }}>
                <Icon n={srcIcon(name)} size={15} style={{ color: '#64748B' }} />
                <span style={{ font: '600 13px/1 var(--font-display)', color: '#334155' }}>{name}</span>
                <div style={{ height: 8, background: '#F1F5F9', borderRadius: 99, overflow: 'hidden' }}><div style={{ width: `${n / srcs[0][1].n * 100}%`, height: '100%', background: '#1E88E5', borderRadius: 99 }} /></div>
                <span style={{ font: '600 13px/1 var(--font-display)', textAlign: 'right' }}>{n}</span>
                <span style={{ font: '700 12px/1 var(--font-display)', color: '#15803D', textAlign: 'right' }}>{w}</span>
              </div>
            )) : <p style={{ margin: 0, font: '500 13.5px/1.5 var(--font-body)', color: '#64748B' }}>No leads yet.</p>}
          </div>
        </div>
        <div className="card">
          <div className="card-h"><div className="card-t">Follow-ups due today</div><button className="link" onClick={() => go('tasks')}>All tasks →</button></div>
          <div style={{ padding: '6px 8px 10px' }}>
            {due.length ? due.slice(0, 6).map(t => {
              const l = leads.find(x => x.id === t.leadId);
              return (
                <div key={t.id} onClick={() => l ? go('detail', l.id) : go('tasks')} className="hov" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 12, cursor: 'pointer' }}>
                  <Avatar name={l?.name ?? t.assignee} size={32} />
                  <div style={{ flex: 1, minWidth: 0 }}><div style={{ font: '600 13.5px/1.3 var(--font-display)' }}>{t.title}</div><div style={{ font: '500 12px/1.4 var(--font-body)', color: '#64748B' }}>{leadName(leads, t.leadId) ?? t.assignee}</div></div>
                  {l && <Badge size="sm" tone={temp(l.score)[1]}>{l.score ?? '—'}</Badge>}
                  <span style={{ font: '600 12px/1 var(--font-display)', color: isOverdue(t) ? '#DC2626' : '#334155', minWidth: 62, textAlign: 'right' }}>{dueLabel(t.dueAt)}</span>
                </div>
              );
            }) : <p style={{ margin: '14px 12px', font: '500 13.5px/1.5 var(--font-body)', color: '#64748B' }}>Nothing due today.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
