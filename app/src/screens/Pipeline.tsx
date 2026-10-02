import { useState } from 'react';
import { Avatar, Button, Icon, PillTabs } from '../ui';
import { pipeline, temp } from '../data';

type Card = [string, string, number, number, string, string, string];
const scoreStyle: Record<string, [string, string]> = { violet: ['#5B4FD6', '#F4F3FF'], red: ['#DC2626', '#FEF2F2'], amber: ['#B45309', '#FEF7EA'], blue: ['#2563EB', '#EFF4FE'] };

export function Pipeline() {
  const [cols, setCols] = useState(() => pipeline.map(([name, color, cards]) => ({ name, color, cards: cards as Card[] })));
  const [drag, setDrag] = useState<{ from: number; name: string } | null>(null);
  const [over, setOver] = useState<number | null>(null);
  const [view, setView] = useState('Board');
  const total = cols.reduce((a, c) => a + c.cards.reduce((b, k) => b + k[2], 0), 0);

  const drop = (to: number) => {
    if (!drag) return;
    setCols(cs => {
      const n = cs.map(c => ({ ...c, cards: [...c.cards] }));
      const i = n[drag.from].cards.findIndex(k => k[0] === drag.name);
      if (i < 0 || drag.from === to) return cs;
      n[to].cards.push(n[drag.from].cards.splice(i, 1)[0]);
      return n;
    });
    setDrag(null); setOver(null);
  };
  const flat = cols.flatMap(c => c.cards.map(k => ({ k, stage: c.name, color: c.color })));
  return (
    <div style={{ padding: '28px 0 28px 28px', display: 'flex', flexDirection: 'column', gap: 18, height: '100%', minHeight: 560 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', paddingRight: 28 }}>
        <div><h1 className="h1">Pipeline</h1><p className="sub">${total.toLocaleString()} across {flat.length} deals · drag cards to change stage</p></div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <PillTabs tabs={['Board', 'List']} value={view} onChange={setView} />
          <Button size="sm"><Icon n="plus" size={14} />Add deal</Button>
        </div>
      </div>
      {view === 'Board' ? (
        <div style={{ flex: 1, overflowX: 'auto', paddingBottom: 8 }}>
          <div style={{ display: 'flex', gap: 14, paddingRight: 28, width: 'max-content', alignItems: 'flex-start' }}>
            {cols.map((col, ci) => (
              <div key={col.name} onDragOver={e => { e.preventDefault(); setOver(ci); }} onDragLeave={() => setOver(o => o === ci ? null : o)} onDrop={() => drop(ci)}
                style={{ width: 268, flexShrink: 0, background: over === ci && drag ? '#E3EFFB' : '#F1F5F9', outline: over === ci && drag ? '2px dashed #93C5F3' : '2px dashed transparent', borderRadius: 16, padding: 10, display: 'flex', flexDirection: 'column', gap: 8, transition: 'background 160ms' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 6px 6px' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: col.color }} />
                  <span style={{ font: '700 11.5px/1 var(--font-display)', letterSpacing: '.06em', color: '#334155' }}>{col.name}</span>
                  <span style={{ font: '600 11px/1 var(--font-display)', color: '#94A3B8' }}>{col.cards.length}</span>
                  <span style={{ flex: 1 }} />
                  <span style={{ font: '600 12px/1 var(--font-display)', color: '#475569', fontVariantNumeric: 'tabular-nums' }}>${col.cards.reduce((a, c) => a + c[2], 0).toLocaleString()}</span>
                </div>
                {col.cards.map(([name, company, v, score, rep, last, next]) => {
                  const m = scoreStyle[temp(score)[1]], dragging = drag?.name === name;
                  return (
                    <div key={name} draggable onDragStart={() => setDrag({ from: ci, name })} onDragEnd={() => { setDrag(null); setOver(null); }}
                      className="kcard" style={{ background: '#fff', border: `1px solid ${dragging ? '#93C5F3' : '#E5E7EB'}`, borderRadius: 13, padding: 12, display: 'flex', flexDirection: 'column', gap: 10, boxShadow: dragging ? '0 14px 30px rgba(15,76,129,.16)' : '0 1px 2px rgba(15,23,42,.04)', opacity: dragging ? .55 : 1, transform: dragging ? 'rotate(-1.5deg)' : 'none', cursor: 'grab', transition: 'box-shadow 160ms, transform 160ms' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                        <div style={{ minWidth: 0 }}><div style={{ font: '700 13.5px/1.25 var(--font-display)' }}>{name}</div><div style={{ font: '500 12px/1.35 var(--font-body)', color: '#64748B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{company}</div></div>
                        <span style={{ font: '700 11px/1 var(--font-display)', color: m[0], background: m[1], borderRadius: 7, padding: '5px 6px', height: 'max-content' }}>{score}</span>
                      </div>
                      <div style={{ font: '800 16px/1 var(--font-display)', letterSpacing: '-.01em', fontVariantNumeric: 'tabular-nums' }}>${v.toLocaleString()}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 10, borderTop: '1px solid #F1F5F9' }}>
                        <Avatar name={rep} size={22} /><span style={{ font: '500 11.5px/1 var(--font-body)', color: '#94A3B8' }}>{last}</span><span style={{ flex: 1 }} />
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, font: '600 11.5px/1 var(--font-display)', color: next === 'Overdue' ? '#DC2626' : next === 'Today' ? '#0F4C81' : '#64748B' }}><Icon n="clock" size={12} />{next}</span>
                      </div>
                    </div>
                  );
                })}
                <div style={{ height: 34, border: '1px dashed #CBD5E1', borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, font: '600 12px/1 var(--font-display)', color: '#94A3B8', cursor: 'pointer' }}><Icon n="plus" size={13} />Add</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ paddingRight: 28 }}>
          <div className="card" style={{ overflow: 'hidden' }}>
            {flat.map(({ k, stage, color }) => (
              <div key={k[0]} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', borderBottom: '1px solid #F1F5F9' }}>
                <Avatar name={k[0]} size={30} />
                <div style={{ flex: 1 }}><div style={{ font: '600 13.5px/1.3 var(--font-display)' }}>{k[0]}</div><div style={{ font: '500 12px/1.3 var(--font-body)', color: '#64748B' }}>{k[1]}</div></div>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, font: '700 11px/1 var(--font-display)', color: '#334155' }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />{stage}</span>
                <span style={{ font: '800 14px/1 var(--font-display)', width: 80, textAlign: 'right' }}>${k[2].toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
