import { useState } from 'react';
import { useGo } from '../nav';
import { Button, Icon } from '../ui';

const chats = ['Why are my leads not converting?', 'Which reps respond fastest?', 'Forecast for October', 'Best time to contact dental leads', 'Summarize this week'];
const prompts = ['Which leads should I call today?', 'Compare Google vs Facebook', 'Draft a weekly report'];
const bars: [string, number, string][] = [['Followed up < 24h', 36, '#16A34A'], ['Followed up 1–3 days', 41, '#D97706'], ['No follow-up', 23, '#DC2626']];

export function Assistant() {
  const go = useGo();
  const [extra, setExtra] = useState<{ q: string; a?: string }[]>([]);
  const [input, setInput] = useState('');
  const ask = (q: string) => {
    if (!q.trim()) return;
    setExtra(e => [...e, { q }]); setInput('');
    setTimeout(() => setExtra(e => e.map((x, i) => i === e.length - 1 && !x.a ? { ...x, a: `Based on your last 30 days: ${q.toLowerCase().includes('call') ? 'call Emily Carter (score 91), John Smith (87) and Ahmed Khan (78) first — all have a follow-up due today.' : 'Google Ads converts at 15.6% vs Facebook at 7.4%. Shifting 20% of Facebook budget to Google could add about 6 qualified leads per month.'}` } : x)), 1300);
  };
  return (
    <div className="assistant" style={{ display: 'grid', gridTemplateColumns: '260px minmax(0,1fr)', height: '100%', minHeight: 600 }}>
      <style>{`@media(max-width:900px){.assistant{grid-template-columns:1fr!important}.assistant>:first-child{display:none}}`}</style>
      <div style={{ background: '#fff', borderRight: '1px solid #E5E7EB', padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 14, overflowY: 'auto' }}>
        <Button variant="secondary" size="sm" full onClick={() => setExtra([])}><Icon n="square-pen" size={14} />New chat</Button>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="eyebrow" style={{ color: '#94A3B8', padding: '6px 8px' }}>RECENT</span>
          {chats.map((t, i) => <div key={t} className="hov" style={{ padding: '9px 10px', borderRadius: 9, font: '500 13px/1.35 var(--font-body)', color: i ? '#475569' : '#5B4FD6', background: i ? 'transparent' : '#F4F3FF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', cursor: 'pointer' }}>{t}</div>)}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, background: '#fff' }}>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <div style={{ maxWidth: 760, margin: '0 auto', padding: '36px 24px', display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 8 }}>
              <span style={{ width: 44, height: 44, borderRadius: 13, background: '#5B4FD6', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--glow-ai)' }}><Icon n="sparkles" size={20} /></span>
              <h1 style={{ margin: '6px 0 0', font: '800 24px/1.2 var(--font-display)', letterSpacing: '-.02em' }}>LeadFlow AI Assistant</h1>
              <p style={{ margin: 0, font: '500 14px/1.5 var(--font-body)', color: '#64748B' }}>Ask questions about your sales pipeline.</p>
            </div>
            <div style={{ alignSelf: 'flex-end', maxWidth: '80%', background: '#0F4C81', color: '#fff', borderRadius: '16px 16px 4px 16px', padding: '12px 16px', font: '500 14.5px/1.5 var(--font-body)' }}>Why are my leads not converting?</div>
            <div style={{ display: 'flex', gap: 14 }}>
              <AiDot />
              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <p style={{ margin: 0, font: '600 15px/1.5 var(--font-display)' }}>Your biggest drop-off is between Qualified → Meeting.</p>
                <div style={{ border: '1px solid #E5E7EB', borderRadius: 16, padding: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}><span style={{ font: '800 34px/1 var(--font-display)', letterSpacing: '-.03em', color: '#DC2626' }}>64%</span><span style={{ font: '600 14px/1.4 var(--font-display)' }}>of qualified leads don't receive a follow-up within 24 hours.</span></div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {bars.map(([l, v, c]) => <div key={l} style={{ display: 'grid', gridTemplateColumns: '150px minmax(0,1fr) 44px', gap: 10, alignItems: 'center', font: '500 12.5px/1 var(--font-body)', color: '#475569' }}><span>{l}</span><div style={{ height: 8, background: '#F1F5F9', borderRadius: 99 }}><div style={{ width: `${v}%`, height: '100%', borderRadius: 99, background: c }} /></div><span style={{ fontWeight: 700, color: '#0F172A', textAlign: 'right' }}>{v}%</span></div>)}
                  </div>
                </div>
                <p style={{ margin: 0, font: '500 14px/1.6 var(--font-body)', color: '#334155' }}>Leads followed up within 24 hours book a meeting 3.2× more often. The gap is widest for Facebook and Instagram leads that arrive after 6 PM. I recommend an automation that sends a WhatsApp check-in after 24 hours of silence and creates a task for the owner.</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <Button variant="ai" size="sm" style={{ height: 36 }} onClick={() => go('builder')}><Icon n="workflow" size={14} />Create Follow-up Automation</Button>
                  <Button variant="secondary" size="sm" onClick={() => go('leads')}>View Qualified Leads</Button>
                </div>
                <div style={{ display: 'flex', gap: 12, color: '#94A3B8' }}>{['copy', 'thumbs-up', 'thumbs-down', 'refresh-cw'].map(i => <Icon key={i} n={i} size={14} />)}</div>
              </div>
            </div>
            {extra.map((m, i) => (
              <div key={i} style={{ display: 'contents' }}>
                <div style={{ alignSelf: 'flex-end', maxWidth: '80%', background: '#0F4C81', color: '#fff', borderRadius: '16px 16px 4px 16px', padding: '12px 16px', font: '500 14.5px/1.5 var(--font-body)' }}>{m.q}</div>
                <div style={{ display: 'flex', gap: 14 }}><AiDot />
                  {m.a ? <p style={{ margin: 0, font: '500 14px/1.6 var(--font-body)', color: '#334155' }}>{m.a}</p>
                    : <div style={{ flex: 1, background: '#F7F6FF', border: '1px solid #ECEBFD', borderRadius: 14, padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}><span style={{ display: 'flex', alignItems: 'center', gap: 6, font: '600 12px/1 var(--font-display)', color: '#5B4FD6' }}><Icon n="sparkles" size={13} />Analyzing 1,000 leads…</span>{[92, 76, 48].map((w, k) => <div key={k} style={{ height: 10, width: `${w}%`, borderRadius: 5, background: '#E6E3FB', animation: `lfPulse 1.1s ${k * .15}s infinite` }} />)}</div>}
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
      <style>{`.pchip:hover{border-color:#DEDBFB!important;color:#5B4FD6!important}`}</style>
    </div>
  );
}
const AiDot = () => <span style={{ width: 30, height: 30, borderRadius: 9, background: '#F4F3FF', border: '1px solid #DEDBFB', color: '#5B4FD6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon n="sparkles" size={14} /></span>;
