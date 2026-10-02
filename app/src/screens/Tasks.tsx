import { useState } from 'react';
import { Avatar, Badge, Button, Check, Icon, IconButton, PillTabs } from '../ui';
import { CAL, calEvents, taskGroups } from '../data';

export function Tasks() {
  const [tab, setTab] = useState('Mine');
  const [done, setDone] = useState<Set<string>>(new Set(['Confirm kickoff date']));
  const toggle = (t: string) => setDone(s => { const x = new Set(s); x.has(t) ? x.delete(t) : x.add(t); return x; });
  const tone = { High: 'red', Medium: 'amber', Low: 'slate' } as Record<string, string>;
  return (
    <div className="page" style={{ maxWidth: 1080 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div><h1 className="h1">Tasks</h1><p className="sub">7 due today · 1 overdue</p></div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><PillTabs tabs={['Mine', 'Team', 'Completed']} value={tab} onChange={setTab} /><Button size="sm"><Icon n="plus" size={14} />New task</Button></div>
      </div>
      {taskGroups.map(([name, items]) => {
        const rows = items.filter(t => tab === 'Completed' ? done.has(t[0] as string) : tab === 'Mine' ? t[2] === 'Sarah Mitchell' || t[2] === 'Maya Johnson' || t[2] === 'Daniel Park' : true);
        if (!rows.length) return null;
        return (
          <div key={name} className="card" style={{ overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 20px', borderBottom: '1px solid #F1F5F9' }}><span className="card-t">{name}</span><span style={{ font: '600 12px/1 var(--font-display)', color: '#94A3B8' }}>{rows.length}</span></div>
            {rows.map(([title, lead, who, pr, due, , rem]) => {
              const d = done.has(title as string);
              return (
                <div key={title} className="hov" style={{ display: 'grid', gridTemplateColumns: '24px minmax(0,1fr) auto auto auto', alignItems: 'center', gap: 14, padding: '12px 20px', borderBottom: '1px solid #F8FAFC' }}>
                  <Check on={d} size={18} onClick={() => toggle(title as string)} />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ font: '600 14px/1.3 var(--font-display)', color: d ? '#94A3B8' : '#0F172A', textDecoration: d ? 'line-through' : 'none' }}>{title}</div>
                    <div style={{ font: '500 12px/1.4 var(--font-body)', color: '#64748B', display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}><Icon n="user" size={11} />{lead}{rem ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: '#94A3B8' }}>· <Icon n="bell-ring" size={11} />Reminder 15m before</span> : null}</div>
                  </div>
                  <span className="hide-sm" style={{ display: 'flex', alignItems: 'center', gap: 6, font: '500 12.5px/1 var(--font-body)', color: '#334155' }}><Avatar name={who as string} size={22} />{(who as string).split(' ')[0]}</span>
                  <Badge size="sm" tone={tone[pr as string]}>{pr}</Badge>
                  <span style={{ font: '600 12.5px/1 var(--font-display)', color: due === 'Overdue' ? '#DC2626' : '#334155', minWidth: 62, textAlign: 'right' }}>{due}</span>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

const fmt = (h: number) => { const hh = Math.floor(h), m = Math.round((h - hh) * 60); return `${((hh + 11) % 12) + 1}:${String(m).padStart(2, '0')}`; };
export function Calendar() {
  const [view, setView] = useState('Week');
  const days: [string, number][] = [['Mon', 5], ['Tue', 6], ['Wed', 7], ['Thu', 8], ['Fri', 9]];
  const hours = ['8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM'];
  return (
    <div className="page">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}><h1 className="h1">October 2026</h1><div style={{ display: 'flex', gap: 4 }}><IconButton icon="chevron-left" label="Previous" style={{ border: '1px solid #E5E7EB' }} /><IconButton icon="chevron-right" label="Next" style={{ border: '1px solid #E5E7EB' }} /></div></div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, font: '600 12px/1 var(--font-display)', color: '#15803D', background: '#F0FDF4', border: '1px solid #BBF7D0', padding: '6px 10px', borderRadius: 99 }}><Icon n="calendar-check" size={12} />Google Calendar synced</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, font: '600 12px/1 var(--font-display)', color: '#1E88E5', background: '#EEF5FD', border: '1px solid #C4DDF7', padding: '6px 10px', borderRadius: 99 }}><Icon n="video" size={12} />Zoom connected</span>
          <PillTabs tabs={['Day', 'Week', 'Month']} value={view} onChange={setView} />
          <Button size="sm"><Icon n="plus" size={14} />Schedule</Button>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 16, font: '500 12.5px/1 var(--font-body)', color: '#475569', flexWrap: 'wrap' }}>
        {Object.entries(CAL).map(([l, [c]]) => <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: c }} />{l}s</span>)}
      </div>
      <div className="card" style={{ overflow: 'auto' }}>
        <div style={{ minWidth: 860 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '64px repeat(5,minmax(0,1fr))', borderBottom: '1px solid #E5E7EB' }}>
            <span />
            {days.map(([dow, n], i) => <div key={dow} style={{ padding: 12, borderLeft: '1px solid #F1F5F9', display: 'flex', alignItems: 'baseline', gap: 8 }}><span style={{ font: '600 12px/1 var(--font-display)', color: '#64748B' }}>{dow}</span><span style={{ font: '800 18px/1 var(--font-display)', color: i === 0 ? '#fff' : '#0F172A', background: i === 0 ? '#0F4C81' : 'transparent', padding: '4px 7px', borderRadius: 8 }}>{n}</span></div>)}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '64px repeat(5,minmax(0,1fr))' }}>
            <div>{hours.map(h => <div key={h} style={{ height: 64, font: '500 11px/1 var(--font-body)', color: '#94A3B8', textAlign: 'right', padding: '6px 10px 0 0' }}>{h}</div>)}</div>
            {days.map((_, d) => (
              <div key={d} style={{ position: 'relative', borderLeft: '1px solid #F1F5F9', backgroundImage: 'repeating-linear-gradient(180deg,transparent 0,transparent 63px,#F1F5F9 63px,#F1F5F9 64px)', height: 576 }}>
                {calEvents.filter(e => e[0] === d).map(([, t, k, s, dur]) => (
                  <div key={t} className="ev" style={{ position: 'absolute', left: 4, right: 4, top: (s - 8) * 64 + 2, height: dur * 64 - 4, borderRadius: 9, background: CAL[k][1], borderLeft: `3px solid ${CAL[k][0]}`, padding: '6px 8px', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 3, cursor: 'pointer' }}>
                    <span style={{ font: '700 12px/1.2 var(--font-display)' }}>{t}</span>
                    <span style={{ font: '500 11px/1.2 var(--font-body)', color: '#475569', display: 'flex', alignItems: 'center', gap: 4 }}><Icon n={CAL[k][2]} size={10} />{fmt(s)}–{fmt(s + dur)}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
