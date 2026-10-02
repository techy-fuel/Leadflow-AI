import { useState } from 'react';
import { Avatar, Badge, Button, Check, Eyebrow, Icon, IconButton, Skel } from '../ui';
import { chIcon, convos, thread } from '../data';

const chans = ['All', 'WhatsApp', 'Instagram', 'Facebook', 'Email', 'Website'];
const cannedReply = "Absolutely — I'll send the full pricing breakdown by 2 PM today. Does a 15-minute call tomorrow work to walk through it?";

export function Inbox() {
  const [ch, setCh] = useState('All');
  const [active, setActive] = useState('Ahmed Khan');
  const [msgs, setMsgs] = useState(thread);
  const [draft, setDraft] = useState('');
  const [typing, setTyping] = useState(false);
  const [task, setTask] = useState(false);
  const list = convos.filter(c => ch === 'All' || c[1] === ch);
  const send = () => { if (!draft.trim()) return; setMsgs(m => [...m, ['out', draft, 'Just now · Sarah']]); setDraft(''); };
  const gen = () => { setTyping(true); setDraft(''); setTimeout(() => { setTyping(false); setDraft(cannedReply); }, 1000); };
  return (
    <div className="inbox" style={{ display: 'grid', gridTemplateColumns: '320px minmax(0,1fr) 300px', height: '100%', minHeight: 600 }}>
      <style>{`@media(max-width:1100px){.inbox{grid-template-columns:280px minmax(0,1fr)!important}.inbox-right{display:none!important}}@media(max-width:700px){.inbox{grid-template-columns:1fr!important}.inbox-mid{display:none!important}}`}</style>
      <div style={{ borderRight: '1px solid #E5E7EB', background: '#fff', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div style={{ padding: '18px 16px 12px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><span style={{ font: '800 20px/1 var(--font-display)', letterSpacing: '-.02em' }}>Inbox</span><Icon n="square-pen" size={17} style={{ color: '#64748B' }} /></div>
          <div style={{ display: 'flex', gap: 6, overflowX: 'auto' }}>
            {chans.map(c => { const on = c === ch; return <span key={c} onClick={() => setCh(c)} style={{ height: 28, padding: '0 10px', borderRadius: 99, display: 'flex', alignItems: 'center', gap: 5, font: '600 12px/1 var(--font-display)', whiteSpace: 'nowrap', cursor: 'pointer', background: on ? '#0F4C81' : '#fff', color: on ? '#fff' : '#475569', border: `1px solid ${on ? '#0F4C81' : '#E5E7EB'}` }}>{c !== 'All' && <Icon n={chIcon[c][0]} size={12} />}{c}</span>; })}
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {list.map(([name, c, preview, time, unread]) => {
            const on = name === active;
            return (
              <div key={name} onClick={() => setActive(name)} className="hov" style={{ display: 'flex', gap: 12, padding: '12px 16px', borderLeft: `3px solid ${on ? '#1E88E5' : 'transparent'}`, background: on ? '#F2F8FE' : '#fff', cursor: 'pointer' }}>
                <div style={{ position: 'relative', height: 'max-content' }}>
                  <Avatar name={name} size={36} />
                  <span style={{ position: 'absolute', right: -3, bottom: -3, width: 18, height: 18, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 1px #E5E7EB' }}><Icon n={chIcon[c][0]} size={10} style={{ color: chIcon[c][1] }} /></span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}><span style={{ font: `${unread ? 700 : 600} 13.5px/1.3 var(--font-display)` }}>{name}</span><span style={{ font: '500 11.5px/1.3 var(--font-body)', color: '#94A3B8' }}>{time}</span></div>
                  <div style={{ font: '500 12.5px/1.4 var(--font-body)', color: unread ? '#334155' : '#64748B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{preview}</div>
                </div>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#1E88E5', marginTop: 6, flexShrink: 0, visibility: unread ? 'visible' : 'hidden' }} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="inbox-mid" style={{ display: 'flex', flexDirection: 'column', minHeight: 0, background: '#F8FAFC' }}>
        <div style={{ height: 62, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 12, padding: '0 20px', borderBottom: '1px solid #E5E7EB', background: '#fff' }}>
          <div style={{ flex: 1, minWidth: 0 }}><div style={{ font: '700 15px/1.2 var(--font-display)' }}>{active}</div><div style={{ font: '500 12px/1.4 var(--font-body)', color: '#64748B', display: 'flex', alignItems: 'center', gap: 5 }}><Icon n="message-circle" size={12} style={{ color: '#16A34A' }} />WhatsApp · +1 (713) 555-0192</div></div>
          <Button variant="secondary" size="sm"><Icon n="check" size={14} />Resolve</Button>
          <IconButton icon="ellipsis" label="More" />
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ alignSelf: 'center', font: '600 11px/1 var(--font-display)', color: '#94A3B8', letterSpacing: '.06em' }}>TODAY</div>
          {msgs.map(([k, text, meta], i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: k === 'in' || k === 'ai' ? 'flex-start' : 'flex-end', gap: 4 }}>
              <div style={{ maxWidth: '72%', padding: '10px 14px', borderRadius: k === 'out' ? '16px 4px 16px 16px' : '4px 16px 16px 16px', background: k === 'in' ? '#fff' : k === 'ai' ? '#F4F3FF' : '#0F4C81', color: k === 'out' ? '#fff' : '#0F172A', border: `1px solid ${k === 'in' ? '#E5E7EB' : k === 'ai' ? '#DEDBFB' : '#0F4C81'}`, font: '500 13.5px/1.5 var(--font-body)' }}>{text}</div>
              <span style={{ font: '500 11px/1 var(--font-body)', color: '#94A3B8', display: 'flex', gap: 5, alignItems: 'center' }}>{k === 'ai' && <Icon n="sparkles" size={10} style={{ color: '#5B4FD6' }} />}{meta}</span>
            </div>
          ))}
          {typing && <div style={{ alignSelf: 'flex-start', display: 'flex', gap: 4, padding: '12px 14px', background: '#F4F3FF', border: '1px solid #DEDBFB', borderRadius: '4px 16px 16px 16px' }}>{[0, 1, 2].map(i => <span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#5B4FD6', animation: `lfPulse 1s ${i * .15}s infinite` }} />)}</div>}
        </div>
        <div style={{ margin: '0 20px 18px', background: '#fff', border: '1px solid #E5E7EB', borderRadius: 16, boxShadow: 'var(--shadow-sm)' }}>
          <textarea value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }} placeholder="Write a message..." style={{ width: '100%', minHeight: 52, padding: '12px 14px', border: 0, outline: 0, resize: 'none', font: '500 14px/1.5 var(--font-body)', borderRadius: 16, background: 'transparent' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 10px', borderTop: '1px solid #F1F5F9' }}>
            {['paperclip', 'smile', 'file-text'].map(i => <Icon key={i} n={i} size={16} style={{ color: '#94A3B8', margin: 6 }} />)}
            <span style={{ flex: 1 }} />
            <button onClick={gen} style={{ display: 'flex', alignItems: 'center', gap: 6, height: 32, padding: '0 12px', borderRadius: 9, background: '#F4F3FF', border: '1px solid #DEDBFB', color: '#5B4FD6', font: '600 12.5px/1 var(--font-display)', cursor: 'pointer' }}><Icon n="sparkles" size={13} />Generate Reply</button>
            <Button size="sm" onClick={send}>Send</Button>
          </div>
        </div>
      </div>
      <div className="inbox-right" style={{ borderLeft: '1px solid #E5E7EB', background: '#fff', overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, textAlign: 'center' }}>
          <Avatar name={active} size={56} />
          <div style={{ font: '700 15px/1.2 var(--font-display)' }}>{active}</div>
          <div style={{ font: '500 12.5px/1 var(--font-body)', color: '#64748B' }}>Brightsmile Dental · Houston</div>
          <div style={{ display: 'flex', gap: 6, marginTop: 4 }}><Badge tone="amber" dot size="sm">Proposal</Badge><Badge tone="red" size="sm">Hot · 78</Badge></div>
        </div>
        <div style={{ background: '#F7F6FF', border: '1px solid #ECEBFD', borderRadius: 14, padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span className="eyebrow" style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#5B4FD6' }}><Icon n="sparkles" size={12} />AI SUMMARY</span>
          <p style={{ margin: 0, font: '500 13px/1.5 var(--font-body)', color: '#1E293B' }}>Wants a 6-page clinic site with online booking. Comparing two agencies; price is the deciding factor. Asked for pricing twice.</p>
        </div>
        <div><Eyebrow style={{ display: 'block', marginBottom: 8 }}>DETAILS</Eyebrow>{[['Deal value', '$8,500'], ['Source', 'Website'], ['Owner', 'Sarah Mitchell'], ['First contact', 'Sep 28']].map(([k, v]) => <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', font: '500 13px/1.3 var(--font-body)' }}><span style={{ color: '#64748B' }}>{k}</span><span style={{ fontWeight: 600 }}>{v}</span></div>)}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Eyebrow>TASKS</Eyebrow>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '10px 12px', border: '1px solid #E5E7EB', borderRadius: 12 }}>
            <Check on={task} size={16} onClick={() => setTask(t => !t)} />
            <span style={{ flex: 1, font: '600 13px/1.3 var(--font-display)', textDecoration: task ? 'line-through' : 'none', color: task ? '#94A3B8' : '#0F172A' }}>Send proposal</span>
            <span style={{ font: '600 11.5px/1 var(--font-display)', color: '#0F4C81' }}>11:30 AM</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Eyebrow>RECENT ACTIVITY</Eyebrow>
          {[['Opened proposal email', '1h'], ['Stage → Proposal', 'Yesterday'], ['Score 64 → 78', 'Yesterday']].map(([t, w]) => <div key={t} style={{ display: 'flex', gap: 10, font: '500 12.5px/1.4 var(--font-body)', color: '#334155' }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#CBD5E1', marginTop: 6, flexShrink: 0 }} /><span style={{ flex: 1 }}>{t}</span><span style={{ color: '#94A3B8', whiteSpace: 'nowrap' }}>{w}</span></div>)}
        </div>
      </div>
    </div>
  );
}
export { Skel };
