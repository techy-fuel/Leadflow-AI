import { useState } from 'react';
import { useGo, useModals } from '../nav';
import { Avatar, Badge, Button, Check, Icon, IconButton, PillTabs } from '../ui';
import { CAL } from '../data';
import { DAY, actions, dueLabel, fmtTime, isOverdue, leadName, startOfDay, useStore, type Task } from '../store';
import { Empty } from '../modals';

export function Tasks() {
  const go = useGo(); const { openTask } = useModals();
  const tasks = useStore(s => s.tasks); const leads = useStore(s => s.leads); const me = useStore(s => s.team[0]?.name ?? 'You');
  const [tab, setTab] = useState('Mine');
  const tone = { High: 'red', Medium: 'amber', Low: 'slate' } as Record<string, string>;
  const today = startOfDay(Date.now());
  const pool = tasks.filter(t => tab === 'Completed' ? t.done : !t.done && (tab === 'Team' || t.assignee === me));
  const bucket = (t: Task) => tab === 'Completed' ? 'Completed' : isOverdue(t) ? 'Overdue' : t.dueAt == null ? 'No date' : startOfDay(t.dueAt) === today ? 'Today' : startOfDay(t.dueAt) === today + DAY ? 'Tomorrow' : startOfDay(t.dueAt) < today + 8 * DAY ? 'This Week' : 'Later';
  const order = ['Overdue', 'Today', 'Tomorrow', 'This Week', 'Later', 'No date', 'Completed'];
  const groups = order.map(n => [n, pool.filter(t => bucket(t) === n).sort((a, b) => (a.dueAt ?? 1e15) - (b.dueAt ?? 1e15))] as [string, Task[]]).filter(g => g[1].length);
  const dueToday = tasks.filter(t => !t.done && t.dueAt != null && startOfDay(t.dueAt) === today).length, over = tasks.filter(isOverdue).length;
  return (
    <div className="page" style={{ maxWidth: 1080 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div><h1 className="h1">Tasks</h1><p className="sub">{dueToday} due today · {over} overdue</p></div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><PillTabs tabs={['Mine', 'Team', 'Completed']} value={tab} onChange={setTab} /><Button size="sm" onClick={openTask}><Icon n="plus" size={14} />New task</Button></div>
      </div>
      {!groups.length && <div className="card"><Empty icon="circle-check-big" tone={['#F0FDF4', '#15803D']} title={tab === 'Completed' ? 'Nothing completed yet' : "You're all caught up"} text="New tasks appear here when leads need attention.">{tab !== 'Completed' && <Button size="sm" onClick={openTask}>Create task</Button>}</Empty></div>}
      {groups.map(([name, items]) => (
        <div key={name} className="card" style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 20px', borderBottom: '1px solid #F1F5F9' }}><span className="card-t" style={{ color: name === 'Overdue' ? '#DC2626' : undefined }}>{name}</span><span style={{ font: '600 12px/1 var(--font-display)', color: '#94A3B8' }}>{items.length}</span></div>
          {items.map(t => (
            <div key={t.id} className="hov" style={{ display: 'grid', gridTemplateColumns: '24px minmax(0,1fr) auto auto auto 28px', alignItems: 'center', gap: 14, padding: '12px 20px', borderBottom: '1px solid #F8FAFC' }}>
              <Check on={t.done} size={18} onClick={() => actions.toggleTask(t.id)} />
              <div style={{ minWidth: 0 }}>
                <div style={{ font: '600 14px/1.3 var(--font-display)', color: t.done ? '#94A3B8' : '#0F172A', textDecoration: t.done ? 'line-through' : 'none' }}>{t.title}</div>
                <div style={{ font: '500 12px/1.4 var(--font-body)', color: '#64748B', display: 'flex', gap: 6, alignItems: 'center' }}>{t.leadId ? <span onClick={() => go('detail', t.leadId!)} style={{ cursor: 'pointer', display: 'inline-flex', gap: 6, alignItems: 'center' }}><Icon n="user" size={11} />{leadName(leads, t.leadId)}</span> : <span>{t.type}</span>}</div>
              </div>
              <span className="hide-sm" style={{ display: 'flex', alignItems: 'center', gap: 6, font: '500 12.5px/1 var(--font-body)', color: '#334155' }}><Avatar name={t.assignee} size={22} />{t.assignee.split(' ')[0]}</span>
              <Badge size="sm" tone={tone[t.priority]}>{t.priority}</Badge>
              <span style={{ font: '600 12.5px/1 var(--font-display)', color: isOverdue(t) ? '#DC2626' : '#334155', minWidth: 62, textAlign: 'right' }}>{t.dueAt ? (bucket(t) === 'Today' || bucket(t) === 'Overdue' ? dueLabel(t.dueAt) : dueLabel(t.dueAt)) : '—'}</span>
              <span onClick={() => actions.deleteTask(t.id)} title="Delete" style={{ color: '#94A3B8', cursor: 'pointer' }}><Icon n="trash-2" size={15} /></span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

const fmt = (t: number) => fmtTime(t).replace(/\s?(AM|PM)/i, '');
export function Calendar() {
  const { openTask } = useModals(); const go = useGo();
  const tasks = useStore(s => s.tasks); const connected = useStore(s => s.connected);
  const [view, setView] = useState('Week'); const [off, setOff] = useState(0);
  const base = startOfDay(Date.now()) + off * (view === 'Day' ? 1 : view === 'Week' ? 7 : 0) * DAY;
  const dow = (new Date(base).getDay() + 6) % 7;
  const days = view === 'Day' ? [base] : Array.from({ length: 7 }, (_, i) => base - dow * DAY + i * DAY);
  const month = new Date(Date.now()); month.setMonth(month.getMonth() + (view === 'Month' ? off : 0), 1); month.setHours(0, 0, 0, 0);
  const title = view === 'Month' ? month.toLocaleDateString([], { month: 'long', year: 'numeric' }) : new Date(days[0]).toLocaleDateString([], { month: 'long', year: 'numeric' });
  const hours = Array.from({ length: 12 }, (_, i) => i + 8);
  const ev = (d: number) => tasks.filter(t => t.dueAt != null && startOfDay(t.dueAt) === d);
  const monthStart = month.getTime() - ((month.getDay() + 6) % 7) * DAY;
  return (
    <div className="page">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}><h1 className="h1">{title}</h1><div style={{ display: 'flex', gap: 4 }}><IconButton icon="chevron-left" label="Previous" onClick={() => setOff(o => o - 1)} style={{ border: '1px solid #E5E7EB' }} /><IconButton icon="chevron-right" label="Next" onClick={() => setOff(o => o + 1)} style={{ border: '1px solid #E5E7EB' }} /><Button variant="ghost" size="sm" onClick={() => setOff(0)}>Today</Button></div></div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          {connected['Google Calendar'] && <span style={{ display: 'flex', alignItems: 'center', gap: 6, font: '600 12px/1 var(--font-display)', color: '#15803D', background: '#F0FDF4', border: '1px solid #BBF7D0', padding: '6px 10px', borderRadius: 99 }}><Icon n="calendar-check" size={12} />Google Calendar connected</span>}
          {connected['Zoom'] && <span style={{ display: 'flex', alignItems: 'center', gap: 6, font: '600 12px/1 var(--font-display)', color: '#1E88E5', background: '#EEF5FD', border: '1px solid #C4DDF7', padding: '6px 10px', borderRadius: 99 }}><Icon n="video" size={12} />Zoom connected</span>}
          {!connected['Google Calendar'] && <button className="link" onClick={() => go('integrations')}>Connect Google Calendar</button>}
          <PillTabs tabs={['Day', 'Week', 'Month']} value={view} onChange={v => { setView(v); setOff(0); }} />
          <Button size="sm" onClick={openTask}><Icon n="plus" size={14} />Schedule</Button>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 16, font: '500 12.5px/1 var(--font-body)', color: '#475569', flexWrap: 'wrap' }}>{Object.entries(CAL).map(([l, [c]]) => <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: c }} />{l}s</span>)}</div>
      <div className="card" style={{ overflow: 'auto' }}>
        {view === 'Month' ? (
          <div style={{ minWidth: 700 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', borderBottom: '1px solid #E5E7EB' }}>{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => <div key={d} style={{ padding: 10, font: '600 12px/1 var(--font-display)', color: '#64748B' }}>{d}</div>)}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)' }}>
              {Array.from({ length: 42 }, (_, i) => monthStart + i * DAY).map(d => { const inM = new Date(d).getMonth() === month.getMonth(), items = ev(d); return (
                <div key={d} style={{ minHeight: 92, padding: 8, borderTop: '1px solid #F1F5F9', borderLeft: '1px solid #F1F5F9', background: inM ? '#fff' : '#FAFBFC', display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ font: '700 12px/1 var(--font-display)', color: d === startOfDay(Date.now()) ? '#fff' : inM ? '#0F172A' : '#94A3B8', background: d === startOfDay(Date.now()) ? '#0F4C81' : 'transparent', padding: '3px 6px', borderRadius: 6, alignSelf: 'flex-start' }}>{new Date(d).getDate()}</span>
                  {items.slice(0, 2).map(t => <span key={t.id} style={{ font: '600 11px/1.2 var(--font-display)', background: CAL[t.type === 'Task' ? 'Task' : t.type][1], borderLeft: `3px solid ${CAL[t.type][0]}`, padding: '3px 5px', borderRadius: 5, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{t.title}</span>)}
                  {items.length > 2 && <span style={{ font: '500 11px/1 var(--font-body)', color: '#64748B' }}>+{items.length - 2} more</span>}
                </div>); })}
            </div>
          </div>
        ) : (
          <div style={{ minWidth: view === 'Day' ? 0 : 860 }}>
            <div style={{ display: 'grid', gridTemplateColumns: `64px repeat(${days.length},minmax(0,1fr))`, borderBottom: '1px solid #E5E7EB' }}>
              <span />{days.map(d => { const t = d === startOfDay(Date.now()); return <div key={d} style={{ padding: 12, borderLeft: '1px solid #F1F5F9', display: 'flex', alignItems: 'baseline', gap: 8 }}><span style={{ font: '600 12px/1 var(--font-display)', color: '#64748B' }}>{new Date(d).toLocaleDateString([], { weekday: 'short' })}</span><span style={{ font: '800 18px/1 var(--font-display)', color: t ? '#fff' : '#0F172A', background: t ? '#0F4C81' : 'transparent', padding: '4px 7px', borderRadius: 8 }}>{new Date(d).getDate()}</span></div>; })}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: `64px repeat(${days.length},minmax(0,1fr))` }}>
              <div>{hours.map(h => <div key={h} style={{ height: 64, font: '500 11px/1 var(--font-body)', color: '#94A3B8', textAlign: 'right', padding: '6px 10px 0 0' }}>{h > 12 ? h - 12 : h} {h >= 12 ? 'PM' : 'AM'}</div>)}</div>
              {days.map(d => (
                <div key={d} style={{ position: 'relative', borderLeft: '1px solid #F1F5F9', backgroundImage: 'repeating-linear-gradient(180deg,transparent 0,transparent 63px,#F1F5F9 63px,#F1F5F9 64px)', height: hours.length * 64 }}>
                  {ev(d).map(t => { const dt = new Date(t.dueAt!), h = dt.getHours() + dt.getMinutes() / 60; if (h < 8 || h >= 20) return null; const c = CAL[t.type === 'Task' ? 'Task' : t.type]; return (
                    <div key={t.id} style={{ position: 'absolute', left: 4, right: 4, top: (h - 8) * 64 + 2, height: 56, borderRadius: 9, background: c[1], borderLeft: `3px solid ${c[0]}`, padding: '6px 8px', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 3, opacity: t.done ? .5 : 1 }}>
                      <span style={{ font: '700 12px/1.2 var(--font-display)' }}>{t.title}</span><span style={{ font: '500 11px/1.2 var(--font-body)', color: '#475569', display: 'flex', alignItems: 'center', gap: 4 }}><Icon n={c[2]} size={10} />{fmt(t.dueAt!)}</span>
                    </div>); })}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {!tasks.some(t => t.dueAt) && <p style={{ margin: 0, font: '500 13.5px/1.5 var(--font-body)', color: '#64748B' }}>Nothing scheduled yet. Tasks, calls and meetings with a due date show up here.</p>}
    </div>
  );
}
