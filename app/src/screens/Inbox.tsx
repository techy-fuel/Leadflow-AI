import { useState } from 'react';
import { useGo, useModals } from '../nav';
import { Avatar, Badge, Button, Eyebrow, Icon } from '../ui';
import { chIcon, stageTone, temp } from '../data';
import { actions, ago, fmtTime, money, useStore } from '../store';
import { Empty } from '../modals';

const chans = ['All', 'WhatsApp', 'Instagram', 'Facebook', 'Email', 'Website'];

export function Inbox() {
  const go = useGo(); const { openLead } = useModals();
  const leads = useStore(s => s.leads);
  const convos = leads.filter(l => l.messages.length).sort((a, b) => b.lastActivityAt - a.lastActivityAt);
  const [ch, setCh] = useState('All'); const [activeId, setActive] = useState('');
  const [draft, setDraft] = useState(''); const [channel, setChannel] = useState('WhatsApp');
  const list = convos.filter(l => ch === 'All' || l.messages[l.messages.length - 1].channel === ch);
  const active = leads.find(l => l.id === activeId) ?? list[0];
  const send = () => { if (!active || !draft.trim()) return; actions.addMessage(active.id, 'out', channel, draft.trim()); setDraft(''); };
  const logIncoming = () => { const t = prompt('Log a message received from ' + active?.name); if (t && active) actions.addMessage(active.id, 'in', channel, t); };
  const gen = () => active && setDraft(`Thanks for your message, ${active.name.split(' ')[0]}. I'll get back to you shortly with the details. Would a quick call work?`);
  if (!leads.length) return <div className="page"><div className="card"><Empty icon="inbox" title="Your inbox is empty" text="Conversations from connected channels appear here. Connect a channel or add a lead to start logging messages."><Button size="sm" onClick={() => go('integrations')}>Connect channel</Button><Button size="sm" variant="secondary" onClick={openLead}>Add lead</Button></Empty></div></div>;
  return (
    <div className="inbox" style={{ display: 'grid', gridTemplateColumns: '320px minmax(0,1fr) 300px', height: '100%', minHeight: 600 }}>
      <style>{`@media(max-width:1100px){.inbox{grid-template-columns:280px minmax(0,1fr)!important}.inbox-right{display:none!important}}@media(max-width:700px){.inbox{grid-template-columns:1fr!important}.inbox-mid{display:none!important}}`}</style>
      <div style={{ borderRight: '1px solid #E5E7EB', background: '#fff', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div style={{ padding: '18px 16px 12px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span style={{ font: '800 20px/1 var(--font-display)', letterSpacing: '-.02em' }}>Inbox</span>
          <div style={{ display: 'flex', gap: 6, overflowX: 'auto' }}>{chans.map(c => { const on = c === ch; return <span key={c} onClick={() => setCh(c)} style={{ height: 28, padding: '0 10px', borderRadius: 99, display: 'flex', alignItems: 'center', gap: 5, font: '600 12px/1 var(--font-display)', whiteSpace: 'nowrap', cursor: 'pointer', background: on ? '#0F4C81' : '#fff', color: on ? '#fff' : '#475569', border: `1px solid ${on ? '#0F4C81' : '#E5E7EB'}` }}>{c !== 'All' && <Icon n={chIcon[c][0]} size={12} />}{c}</span>; })}</div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {list.length ? list.map(l => { const last = l.messages[l.messages.length - 1], on = l.id === active?.id, unread = last.dir === 'in'; return (
            <div key={l.id} onClick={() => setActive(l.id)} className="hov" style={{ display: 'flex', gap: 12, padding: '12px 16px', borderLeft: `3px solid ${on ? '#1E88E5' : 'transparent'}`, background: on ? '#F2F8FE' : '#fff', cursor: 'pointer' }}>
              <div style={{ position: 'relative', height: 'max-content' }}><Avatar name={l.name} size={36} /><span style={{ position: 'absolute', right: -3, bottom: -3, width: 18, height: 18, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 1px #E5E7EB' }}><Icon n={chIcon[last.channel]?.[0] ?? 'message-circle'} size={10} style={{ color: chIcon[last.channel]?.[1] }} /></span></div>
              <div style={{ flex: 1, minWidth: 0 }}><div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}><span style={{ font: `${unread ? 700 : 600} 13.5px/1.3 var(--font-display)` }}>{l.name}</span><span style={{ font: '500 11.5px/1.3 var(--font-body)', color: '#94A3B8' }}>{ago(last.at).replace(' ago', '')}</span></div><div style={{ font: '500 12.5px/1.4 var(--font-body)', color: unread ? '#334155' : '#64748B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{last.text}</div></div>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#1E88E5', marginTop: 6, flexShrink: 0, visibility: unread ? 'visible' : 'hidden' }} />
            </div>); }) : <div style={{ padding: 24, font: '500 13px/1.5 var(--font-body)', color: '#64748B' }}>No conversations in this channel.</div>}
        </div>
      </div>
      {active ? <>
        <div className="inbox-mid" style={{ display: 'flex', flexDirection: 'column', minHeight: 0, background: '#F8FAFC' }}>
          <div style={{ height: 62, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 12, padding: '0 20px', borderBottom: '1px solid #E5E7EB', background: '#fff' }}>
            <div style={{ flex: 1, minWidth: 0 }}><div style={{ font: '700 15px/1.2 var(--font-display)' }}>{active.name}</div><div style={{ font: '500 12px/1.4 var(--font-body)', color: '#64748B' }}>{active.phone || active.email || active.source}</div></div>
            <Button variant="secondary" size="sm" onClick={logIncoming}><Icon n="download" size={14} />Log reply</Button>
            <Button variant="secondary" size="sm" onClick={() => go('detail', active.id)}>Open lead</Button>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {active.messages.map(m => (
              <div key={m.id} style={{ display: 'flex', flexDirection: 'column', alignItems: m.dir === 'in' ? 'flex-start' : 'flex-end', gap: 4 }}>
                <div style={{ maxWidth: '72%', padding: '10px 14px', borderRadius: m.dir === 'out' ? '16px 4px 16px 16px' : '4px 16px 16px 16px', background: m.dir === 'in' ? '#fff' : '#0F4C81', color: m.dir === 'out' ? '#fff' : '#0F172A', border: `1px solid ${m.dir === 'in' ? '#E5E7EB' : '#0F4C81'}`, font: '500 13.5px/1.5 var(--font-body)' }}>{m.text}</div>
                <span style={{ font: '500 11px/1 var(--font-body)', color: '#94A3B8' }}>{fmtTime(m.at)} · {m.channel}</span>
              </div>
            ))}
          </div>
          <div style={{ margin: '0 20px 18px', background: '#fff', border: '1px solid #E5E7EB', borderRadius: 16, boxShadow: 'var(--shadow-sm)' }}>
            <textarea value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }} placeholder="Write a message..." style={{ width: '100%', minHeight: 52, padding: '12px 14px', border: 0, outline: 0, resize: 'none', font: '500 14px/1.5 var(--font-body)', borderRadius: 16, background: 'transparent' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 10px', borderTop: '1px solid #F1F5F9' }}>
              <select value={channel} onChange={e => setChannel(e.target.value)} style={{ height: 30, borderRadius: 9, border: '1px solid #E5E7EB', font: '600 12px/1 var(--font-display)' }}>{Object.keys(chIcon).map(c => <option key={c}>{c}</option>)}</select>
              <span style={{ flex: 1 }} />
              <button onClick={gen} style={{ display: 'flex', alignItems: 'center', gap: 6, height: 32, padding: '0 12px', borderRadius: 9, background: '#F4F3FF', border: '1px solid #DEDBFB', color: '#5B4FD6', font: '600 12.5px/1 var(--font-display)', cursor: 'pointer' }}><Icon n="sparkles" size={13} />Generate Reply</button>
              <Button size="sm" onClick={send}>Send</Button>
            </div>
          </div>
        </div>
        <div className="inbox-right" style={{ borderLeft: '1px solid #E5E7EB', background: '#fff', overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, textAlign: 'center' }}>
            <Avatar name={active.name} size={56} /><div style={{ font: '700 15px/1.2 var(--font-display)' }}>{active.name}</div><div style={{ font: '500 12.5px/1 var(--font-body)', color: '#64748B' }}>{active.company || '—'}</div>
            <div style={{ display: 'flex', gap: 6, marginTop: 4 }}><Badge tone={stageTone(active.stage)} dot size="sm">{active.stage}</Badge>{active.score != null && <Badge tone={temp(active.score)[1]} size="sm">{temp(active.score)[0]} · {active.score}</Badge>}</div>
          </div>
          <div><Eyebrow style={{ display: 'block', marginBottom: 8 }}>DETAILS</Eyebrow>{[['Deal value', active.value ? money(active.value) : '—'], ['Source', active.source], ['Owner', active.rep], ['Created', new Date(active.createdAt).toLocaleDateString()]].map(([k, v]) => <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', font: '500 13px/1.3 var(--font-body)' }}><span style={{ color: '#64748B' }}>{k}</span><span style={{ fontWeight: 600 }}>{v}</span></div>)}</div>
        </div>
      </> : null}
    </div>
  );
}
