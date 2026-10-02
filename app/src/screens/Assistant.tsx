import { useState } from 'react';
import { useGo } from '../nav';
import { Button, Icon } from '../ui';
import { funnelStages } from '../data';
import { isOverdue, money, reached, useStore, getState } from '../store';

const prompts = ['Which leads should I call today?', 'Where am I losing leads?', 'Compare my lead sources', 'Summarize my pipeline'];

function answer(q: string): { text: string; cta?: [string, string] } {
  const { leads, tasks } = getState(); const t = q.toLowerCase();
  if (!leads.length) return { text: "There's no data in your workspace yet. Add or import leads and I can analyze your pipeline.", cta: ['Add leads', 'leads'] };
  const open = leads.filter(l => !['Won', 'Lost'].includes(l.stage));
  if (/call|follow|today|who/.test(t)) {
    const due = tasks.filter(x => !x.done && x.dueAt && (isOverdue(x) || new Date(x.dueAt).toDateString() === new Date().toDateString()));
    const hot = [...open].filter(l => l.score != null).sort((a, b) => b.score! - a.score!).slice(0, 3);
    return { text: `${due.length} follow-up${due.length === 1 ? ' is' : 's are'} due today or overdue${due.length ? ': ' + due.slice(0, 3).map(x => x.title).join(', ') : ''}.${hot.length ? ` Highest-scored open leads: ${hot.map(l => `${l.name} (${l.score})`).join(', ')}.` : ''}`, cta: ['Open tasks', 'tasks'] };
  }
  if (/drop|lose|losing|convert|conversion/.test(t)) {
    const f = funnelStages.map(s => [s, reached(leads, s)] as [string, number]); let worst = 1, rate = 1;
    for (let i = 1; i < f.length; i++) { const r = f[i - 1][1] ? f[i][1] / f[i - 1][1] : 1; if (r < rate) { rate = r; worst = i; } }
    return { text: `Your biggest drop-off is ${f[worst - 1][0]} → ${f[worst][0]}: ${f[worst][1]} of ${f[worst - 1][1]} leads (${Math.round(rate * 100)}%) make it through.`, cta: ['View pipeline', 'pipeline'] };
  }
  if (/source|google|facebook|instagram|website|channel/.test(t)) {
    const by: Record<string, [number, number]> = {}; leads.forEach(l => { by[l.source] = by[l.source] ?? [0, 0]; by[l.source][0]++; if (l.stage === 'Won') by[l.source][1]++; });
    return { text: Object.entries(by).sort((a, b) => b[1][0] - a[1][0]).map(([s, [n, w]]) => `${s}: ${n} lead${n > 1 ? 's' : ''}, ${w} won`).join(' · '), cta: ['Open analytics', 'analytics'] };
  }
  const won = leads.filter(l => l.stage === 'Won').length;
  return { text: `${leads.length} leads in total, ${open.length} open worth ${money(open.reduce((a, l) => a + l.value, 0))}. ${won} won, ${leads.filter(l => l.stage === 'Lost').length} lost.`, cta: ['Open analytics', 'analytics'] };
}

export function Assistant() {
  const go = useGo(); const leadCount = useStore(s => s.leads.length);
  const [msgs, setMsgs] = useState<{ q: string; a?: ReturnType<typeof answer> }[]>([]);
  const [input, setInput] = useState('');
  const ask = (q: string) => {
    if (!q.trim()) return; const i = msgs.length; setMsgs(m => [...m, { q }]); setInput('');
    setTimeout(() => setMsgs(m => m.map((x, j) => j === i ? { ...x, a: answer(q) } : x)), 700);
  };
  return (
    <div className="assistant" style={{ display: 'grid', gridTemplateColumns: '260px minmax(0,1fr)', height: '100%', minHeight: 600 }}>
      <style>{`@media(max-width:900px){.assistant{grid-template-columns:1fr!important}.assistant>:first-child{display:none}}.pchip:hover{border-color:#DEDBFB!important;color:#5B4FD6!important}`}</style>
      <div style={{ background: '#fff', borderRight: '1px solid #E5E7EB', padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Button variant="secondary" size="sm" full onClick={() => setMsgs([])}><Icon n="square-pen" size={14} />New chat</Button>
        <span className="eyebrow" style={{ color: '#94A3B8', padding: '6px 8px' }}>THIS CHAT</span>
        {msgs.length ? msgs.map((m, i) => <div key={i} style={{ padding: '9px 10px', borderRadius: 9, font: '500 13px/1.35 var(--font-body)', color: '#475569', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.q}</div>) : <div style={{ padding: '0 10px', font: '500 12.5px/1.45 var(--font-body)', color: '#94A3B8' }}>No conversations yet.</div>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, background: '#fff' }}>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <div style={{ maxWidth: 760, margin: '0 auto', padding: '36px 24px', display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 8 }}>
              <span style={{ width: 44, height: 44, borderRadius: 13, background: '#5B4FD6', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--glow-ai)' }}><Icon n="sparkles" size={20} /></span>
              <h1 style={{ margin: '6px 0 0', font: '800 24px/1.2 var(--font-display)', letterSpacing: '-.02em' }}>LeadFlow AI Assistant</h1>
              <p style={{ margin: 0, font: '500 14px/1.5 var(--font-body)', color: '#64748B' }}>Ask questions about your sales pipeline.</p>
              <p style={{ margin: 0, font: '500 12px/1.5 var(--font-body)', color: '#94A3B8' }}>Answers are calculated from your workspace data ({leadCount} lead{leadCount === 1 ? '' : 's'}).</p>
            </div>
            {msgs.map((m, i) => (
              <div key={i} style={{ display: 'contents' }}>
                <div style={{ alignSelf: 'flex-end', maxWidth: '80%', background: '#0F4C81', color: '#fff', borderRadius: '16px 16px 4px 16px', padding: '12px 16px', font: '500 14.5px/1.5 var(--font-body)' }}>{m.q}</div>
                <div style={{ display: 'flex', gap: 14 }}>
                  <span style={{ width: 30, height: 30, borderRadius: 9, background: '#F4F3FF', border: '1px solid #DEDBFB', color: '#5B4FD6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon n="sparkles" size={14} /></span>
                  {m.a ? <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}><p style={{ margin: 0, font: '500 14.5px/1.6 var(--font-body)', color: '#334155' }}>{m.a.text}</p>{m.a.cta && <div><Button variant="secondary" size="sm" onClick={() => go(m.a!.cta![1] as any)}>{m.a.cta[0]}</Button></div>}</div>
                    : <div style={{ flex: 1, background: '#F7F6FF', border: '1px solid #ECEBFD', borderRadius: 14, padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}><span style={{ display: 'flex', alignItems: 'center', gap: 6, font: '600 12px/1 var(--font-display)', color: '#5B4FD6' }}><Icon n="sparkles" size={13} />Analyzing your leads…</span>{[92, 76, 48].map((w, k) => <div key={k} style={{ height: 10, width: `${w}%`, borderRadius: 5, background: '#E6E3FB', animation: `lfPulse 1.1s ${k * .15}s infinite` }} />)}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ maxWidth: 760, width: '100%', margin: '0 auto', padding: '0 24px 22px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{prompts.map(p => <span key={p} onClick={() => ask(p)} className="pchip" style={{ padding: '7px 12px', borderRadius: 99, border: '1px solid #E5E7EB', font: '500 12.5px/1 var(--font-body)', color: '#475569', cursor: 'pointer', whiteSpace: 'nowrap' }}>{p}</span>)}</div>
          <div style={{ border: '1px solid #CBD5E1', borderRadius: 16, padding: '12px 12px 12px 16px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: 'var(--shadow-sm)' }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && ask(input)} placeholder="Ask about leads, deals, or team performance…" style={{ flex: 1, border: 0, outline: 0, font: '500 14.5px/1.4 var(--font-body)' }} />
            <button onClick={() => ask(input)} aria-label="Send" style={{ width: 36, height: 36, borderRadius: 10, border: 0, background: '#5B4FD6', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Icon n="arrow-up" size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
