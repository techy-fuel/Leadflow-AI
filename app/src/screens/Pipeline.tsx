import { useState } from 'react';
import { useGo, useModals } from '../nav';
import { Avatar, Button, Icon, PillTabs } from '../ui';
import { stageColor, stageTone, temp } from '../data';
import { STAGES, actions, ago, money, useStore } from '../store';
import { Badge } from '../ui';
import { Empty } from '../modals';

const scoreStyle: Record<string, [string, string]> = { violet: ['#5B4FD6', '#F4F3FF'], red: ['#DC2626', '#FEF2F2'], amber: ['#B45309', '#FEF7EA'], blue: ['#2563EB', '#EFF4FE'], slate: ['#64748B', '#F1F5F9'] };

export function Pipeline() {
  const go = useGo(); const { openLead } = useModals();
  const leads = useStore(s => s.leads);
  const [drag, setDrag] = useState<string | null>(null);
  const [over, setOver] = useState<string | null>(null);
  const [view, setView] = useState('Board');
  const open = leads.filter(l => !['Won', 'Lost'].includes(l.stage));
  const total = open.reduce((a, l) => a + l.value, 0);
  const drop = (stage: string) => { if (drag) actions.updateLead(drag, { stage }); setDrag(null); setOver(null); };
  return (
    <div style={{ padding: '28px 0 28px 28px', display: 'flex', flexDirection: 'column', gap: 18, height: '100%', minHeight: 560 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', paddingRight: 28 }}>
        <div><h1 className="h1">Pipeline</h1><p className="sub">{money(total)} open across {open.length} deal{open.length === 1 ? '' : 's'} · drag cards to change stage</p></div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><PillTabs tabs={['Board', 'List']} value={view} onChange={setView} /><Button size="sm" onClick={openLead}><Icon n="plus" size={14} />Add deal</Button></div>
      </div>
      {!leads.length ? <div style={{ paddingRight: 28 }}><div className="card"><Empty icon="kanban" title="Your pipeline is empty" text="Add a lead and drag it through stages as the deal progresses."><Button size="sm" onClick={openLead}>Add lead</Button></Empty></div></div>
      : view === 'Board' ? (
        <div style={{ flex: 1, overflowX: 'auto', paddingBottom: 8 }}>
          <div style={{ display: 'flex', gap: 14, paddingRight: 28, width: 'max-content', alignItems: 'flex-start' }}>
            {STAGES.map(stage => {
              const cards = leads.filter(l => l.stage === stage);
              return (
                <div key={stage} onDragOver={e => { e.preventDefault(); setOver(stage); }} onDragLeave={() => setOver(o => o === stage ? null : o)} onDrop={() => drop(stage)}
                  style={{ width: 268, flexShrink: 0, background: over === stage && drag ? '#E3EFFB' : '#F1F5F9', outline: over === stage && drag ? '2px dashed #93C5F3' : '2px dashed transparent', borderRadius: 16, padding: 10, display: 'flex', flexDirection: 'column', gap: 8, transition: 'background 160ms', minHeight: 120 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 6px 6px' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: stageColor[stage] }} />
                    <span style={{ font: '700 11.5px/1 var(--font-display)', letterSpacing: '.06em', color: '#334155' }}>{stage.toUpperCase()}</span>
                    <span style={{ font: '600 11px/1 var(--font-display)', color: '#94A3B8' }}>{cards.length}</span><span style={{ flex: 1 }} />
                    <span style={{ font: '600 12px/1 var(--font-display)', color: '#475569' }}>{money(cards.reduce((a, c) => a + c.value, 0))}</span>
                  </div>
                  {cards.map(l => {
                    const m = scoreStyle[temp(l.score)[1]], dragging = drag === l.id;
                    return (
                      <div key={l.id} draggable onDragStart={() => setDrag(l.id)} onDragEnd={() => { setDrag(null); setOver(null); }} onClick={() => go('detail', l.id)}
                        style={{ background: '#fff', border: `1px solid ${dragging ? '#93C5F3' : '#E5E7EB'}`, borderRadius: 13, padding: 12, display: 'flex', flexDirection: 'column', gap: 10, boxShadow: dragging ? '0 14px 30px rgba(15,76,129,.16)' : '0 1px 2px rgba(15,23,42,.04)', opacity: dragging ? .55 : 1, transform: dragging ? 'rotate(-1.5deg)' : 'none', cursor: 'grab', transition: 'box-shadow 160ms, transform 160ms' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                          <div style={{ minWidth: 0 }}><div style={{ font: '700 13.5px/1.25 var(--font-display)' }}>{l.name}</div><div style={{ font: '500 12px/1.35 var(--font-body)', color: '#64748B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.company || '—'}</div></div>
                          {l.score != null && <span style={{ font: '700 11px/1 var(--font-display)', color: m[0], background: m[1], borderRadius: 7, padding: '5px 6px', height: 'max-content' }}>{l.score}</span>}
                        </div>
                        <div style={{ font: '800 16px/1 var(--font-display)', letterSpacing: '-.01em' }}>{money(l.value)}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 10, borderTop: '1px solid #F1F5F9' }}>{l.rep !== 'Unassigned' && <Avatar name={l.rep} size={22} />}<span style={{ font: '500 11.5px/1 var(--font-body)', color: '#94A3B8' }}>{ago(l.lastActivityAt)}</span></div>
                      </div>
                    );
                  })}
                  <div onClick={openLead} style={{ height: 34, border: '1px dashed #CBD5E1', borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, font: '600 12px/1 var(--font-display)', color: '#94A3B8', cursor: 'pointer' }}><Icon n="plus" size={13} />Add</div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div style={{ paddingRight: 28 }}><div className="card" style={{ overflow: 'hidden' }}>
          {leads.map(l => <div key={l.id} onClick={() => go('detail', l.id)} className="hov" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', borderBottom: '1px solid #F1F5F9', cursor: 'pointer' }}><Avatar name={l.name} size={30} /><div style={{ flex: 1 }}><div style={{ font: '600 13.5px/1.3 var(--font-display)' }}>{l.name}</div><div style={{ font: '500 12px/1.3 var(--font-body)', color: '#64748B' }}>{l.company}</div></div><Badge tone={stageTone(l.stage)} dot size="sm">{l.stage}</Badge><span style={{ font: '800 14px/1 var(--font-display)', width: 80, textAlign: 'right' }}>{money(l.value)}</span></div>)}
        </div></div>
      )}
    </div>
  );
}
