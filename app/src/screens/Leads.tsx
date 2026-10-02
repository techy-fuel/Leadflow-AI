import { useState } from 'react';
import { useGo, useModals, useParam } from '../nav';
import { Avatar, Badge, Button, Check, Eyebrow, Icon, ProgressRing } from '../ui';
import { chIcon, srcIcon, stageTone, temp } from '../data';
import { STAGES, actions, ago, dueLabel, fmtTime, isOverdue, money, useStore, type Lead } from '../store';
import { Empty } from '../modals';

const tabsDef: [string, (l: Lead, me: string) => boolean][] = [['All leads', () => true], ['My leads', (l, me) => l.rep === me], ['High intent', l => (l.score ?? 0) >= 85], ['Unassigned', l => l.rep === 'Unassigned'], ['Needs follow-up', l => l.messages.length > 0 && l.messages[l.messages.length - 1].dir === 'in']];
const filters: [string, string][] = [['Status', 'circle-dot'], ['Source', 'radio-tower'], ['Lead Score', 'gauge'], ['Assigned To', 'user'], ['Date', 'calendar'], ['Tags', 'tag']];

export function Leads() {
  const go = useGo(); const { openLead } = useModals();
  const leads = useStore(s => s.leads); const tasks = useStore(s => s.tasks); const me = useStore(s => s.team[0]?.name ?? 'You');
  const [tab, setTab] = useState(0); const [q, setQ] = useState('');
  const [stageF, setStageF] = useState(''); const [srcF, setSrcF] = useState('');
  const [sel, setSel] = useState<Set<string>>(new Set());
  const rows = leads.filter(l => tabsDef[tab][1](l, me)).filter(l => (l.name + l.company + l.email).toLowerCase().includes(q.toLowerCase())).filter(l => !stageF || l.stage === stageF).filter(l => !srcF || l.source === srcF);
  const toggle = (id: string) => setSel(s => { const x = new Set(s); x.has(id) ? x.delete(id) : x.add(id); return x; });
  const nextTask = (id: string) => tasks.filter(t => t.leadId === id && !t.done && t.dueAt).sort((a, b) => a.dueAt! - b.dueAt!)[0];
  const exportCsv = () => {
    const csv = [['Name', 'Company', 'Email', 'Phone', 'Source', 'Score', 'Stage', 'Assigned', 'Value'], ...rows.map(l => [l.name, l.company, l.email, l.phone, l.source, l.score ?? '', l.stage, l.rep, l.value])].map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' })); a.download = 'leads.csv'; a.click();
  };
  const importCsv = (f: File) => f.text().then(t => {
    const [head, ...lines] = t.split(/\r?\n/).filter(Boolean); const cols = head.split(',').map(c => c.replace(/"/g, '').trim().toLowerCase());
    lines.forEach(line => { const v = line.split(',').map(c => c.replace(/^"|"$/g, '').trim()); const g = (k: string) => v[cols.indexOf(k)] ?? ''; if (g('name')) actions.addLead({ name: g('name'), company: g('company'), email: g('email'), phone: g('phone'), source: g('source') || 'Other' }); });
  });
  const cols = '36px minmax(170px,1.4fr) minmax(150px,1.2fr) 110px 150px 110px 120px 100px 140px 44px';
  const chip: React.CSSProperties = { height: 32, borderRadius: 9, border: '1px dashed #CBD5E1', background: '#fff', font: '600 12.5px/1 var(--font-display)', color: '#475569', padding: '0 8px' };
  return (
    <div className="page">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div><h1 className="h1">Leads</h1><p className="sub">{leads.length} lead{leads.length === 1 ? '' : 's'}</p></div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <label><input type="file" accept=".csv" hidden onChange={e => e.target.files?.[0] && importCsv(e.target.files[0])} /><span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 34, padding: '0 14px', border: '1px solid #CBD5E1', borderRadius: 10, font: '600 13px/1 var(--font-display)', color: '#0F4C81', cursor: 'pointer', background: '#fff' }}><Icon n="upload" size={14} />Import</span></label>
          <Button variant="secondary" size="sm" onClick={exportCsv} disabled={!rows.length}><Icon n="download" size={14} />Export</Button>
          <Button size="sm" onClick={openLead}><Icon n="plus" size={14} />Add Lead</Button>
        </div>
      </div>
      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: 4, padding: '0 16px', borderBottom: '1px solid #F1F5F9', overflowX: 'auto' }}>
          {tabsDef.map(([label, fn], i) => <div key={label} onClick={() => setTab(i)} style={{ padding: '14px 10px 12px', font: '600 13px/1 var(--font-display)', color: tab === i ? '#0F172A' : '#64748B', borderBottom: `2px solid ${tab === i ? '#0F4C81' : 'transparent'}`, cursor: 'pointer', display: 'flex', gap: 6, whiteSpace: 'nowrap' }}>{label}<span style={{ fontSize: 11, color: '#94A3B8' }}>{leads.filter(l => fn(l, me)).length}</span></div>)}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', borderBottom: '1px solid #F1F5F9', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 240, maxWidth: 380, height: 36, border: '1px solid #E5E7EB', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 8, padding: '0 12px', color: '#94A3B8' }}>
            <Icon n="search" size={15} /><input value={q} onChange={e => setQ(e.target.value)} placeholder="Search leads, companies or conversations..." style={{ flex: 1, border: 0, outline: 0, font: '500 13px/1 var(--font-body)', minWidth: 0 }} />
          </div>
          <select value={stageF} onChange={e => setStageF(e.target.value)} style={chip}><option value="">Status</option>{STAGES.map(s => <option key={s}>{s}</option>)}</select>
          <select value={srcF} onChange={e => setSrcF(e.target.value)} style={chip}><option value="">Source</option>{[...new Set(leads.map(l => l.source))].map(s => <option key={s}>{s}</option>)}</select>
          {(stageF || srcF) && <button className="link" onClick={() => { setStageF(''); setSrcF(''); }}>Clear filters</button>}
        </div>
        {!leads.length ? (
          <Empty icon="users" title="No leads yet" text="Connect your website or import your leads to get started.">
            <Button size="sm" onClick={() => go('integrations')}>Connect Lead Source</Button><Button size="sm" variant="secondary" onClick={openLead}>Add lead manually</Button>
          </Empty>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <div style={{ minWidth: 1100 }}>
              <div style={{ display: 'grid', gridTemplateColumns: cols, alignItems: 'center', padding: '0 16px', height: 40, background: '#F8FAFC', borderBottom: '1px solid #F1F5F9', font: '600 11px/1 var(--font-display)', letterSpacing: '.04em', color: '#64748B', textTransform: 'uppercase' }}>
                <span><Check on={sel.size === rows.length && rows.length > 0} onClick={() => setSel(sel.size === rows.length ? new Set() : new Set(rows.map(r => r.id)))} /></span>
                <span>Lead</span><span>Company</span><span>Source</span><span>Score</span><span>Stage</span><span>Assigned to</span><span>Last activity</span><span>Next follow-up</span><span />
              </div>
              {rows.map(l => {
                const [t, tone] = temp(l.score), on = sel.has(l.id), nt = nextTask(l.id);
                return (
                  <div key={l.id} onClick={() => go('detail', l.id)} className="hov" style={{ display: 'grid', gridTemplateColumns: cols, alignItems: 'center', padding: '0 16px', height: 56, borderBottom: '1px solid #F1F5F9', cursor: 'pointer', background: on ? '#F7FAFE' : '#fff' }}>
                    <span onClick={e => e.stopPropagation()}><Check on={on} onClick={() => toggle(l.id)} /></span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}><Avatar name={l.name} size={30} /><div style={{ minWidth: 0 }}><div style={{ font: '600 13.5px/1.25 var(--font-display)', whiteSpace: 'nowrap' }}>{l.name}</div><div style={{ font: '500 12px/1.3 var(--font-body)', color: '#64748B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.email || '—'}</div></div></div>
                    <span style={{ font: '500 13px/1.3 var(--font-body)', color: '#334155', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.company || '—'}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6, font: '500 13px/1 var(--font-body)', color: '#334155' }}><Icon n={srcIcon(l.source)} size={14} style={{ color: '#64748B' }} />{l.source}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ font: '700 13px/1 var(--font-display)', width: 20 }}>{l.score ?? '—'}</span><Badge tone={tone} size="sm">{t}</Badge></span>
                    <span><Badge tone={stageTone(l.stage)} dot size="sm">{l.stage}</Badge></span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8, font: '500 13px/1 var(--font-body)', color: '#334155' }}>{l.rep !== 'Unassigned' && <Avatar name={l.rep} size={22} />}{l.rep.split(' ')[0]}</span>
                    <span style={{ font: '500 13px/1 var(--font-body)', color: '#64748B' }}>{ago(l.lastActivityAt)}</span>
                    <span style={{ font: '600 12.5px/1.3 var(--font-display)', color: nt && isOverdue(nt) ? '#DC2626' : '#334155' }}>{nt ? dueLabel(nt.dueAt) : '—'}</span>
                    <span onClick={e => { e.stopPropagation(); if (confirm(`Delete ${l.name}?`)) actions.deleteLead(l.id); }} title="Delete" style={{ color: '#94A3B8', textAlign: 'center' }}><Icon n="trash-2" size={15} /></span>
                  </div>
                );
              })}
              {!rows.length && <Empty icon="search" title="No matching leads" text="Try a different search or clear your filters." />}
            </div>
          </div>
        )}
        {!!leads.length && <div style={{ padding: '12px 16px', font: '500 12.5px/1 var(--font-body)', color: '#64748B' }}>{sel.size ? `${sel.size} selected · ` : ''}Showing {rows.length} of {leads.length}</div>}
      </div>
    </div>
  );
}

const stageOrder = ['New', 'Contacted', 'Qualified', 'Meeting', 'Proposal', 'Negotiation', 'Won'];

function draft(l: Lead, tone: string) {
  const n = l.name.split(' ')[0];
  const base = `Thanks for getting in touch${l.company ? ` from ${l.company}` : ''}, ${n}. Would you like to schedule a quick 15-minute call to discuss what you need?`;
  if (tone === 'Shorter') return `Hi ${n}, free for a quick 15-minute call?`;
  if (tone === 'More Professional') return `Dear ${n}, thank you for reaching out${l.company ? ` on behalf of ${l.company}` : ''}. May we arrange a brief 15-minute call to discuss your requirements?`;
  if (tone === 'More Friendly') return `Hey ${n}, thanks so much for reaching out! Fancy a quick 15-minute chat about what you need?`;
  return base;
}

export function LeadDetail() {
  const go = useGo(); const id = useParam(); const { openLead, openTask } = useModals();
  const lead = useStore(s => s.leads.find(l => l.id === id));
  const team = useStore(s => s.team); const allTasks = useStore(s => s.tasks); const tasks = allTasks.filter(t => t.leadId === id);
  const [reply, setReply] = useState(''); const [loading, setLoading] = useState(false);
  const [draftTxt, setDraftTxt] = useState(''); const [toast, setToast] = useState(''); const [sheet, setSheet] = useState(false);
  const [channel, setChannel] = useState('WhatsApp');
  if (!lead) return <div className="page"><Empty icon="user-x" title="Lead not found" text="This lead may have been deleted."><Button size="sm" onClick={() => go('leads')}>Back to leads</Button><Button size="sm" variant="secondary" onClick={openLead}>Add lead</Button></Empty></div>;
  const say = (t: string) => { setToast(t); setTimeout(() => setToast(''), 2200); };
  const gen = (tone: string) => { setLoading(true); setTimeout(() => { setReply(draft(lead, tone)); setLoading(false); }, 600); };
  const send = () => { if (!draftTxt.trim()) return; actions.addMessage(lead.id, 'out', channel, draftTxt.trim()); setDraftTxt(''); say('Message logged'); };
  const cur = Math.max(0, stageOrder.indexOf(lead.stage));
  const [t, tone] = temp(lead.score);
  const info: [string, string, string?][] = [['Name', lead.name], ['Company', lead.company || '—'], ['Email', lead.email || '—', lead.email ? '#1E88E5' : undefined], ['Phone', lead.phone || '—'], ['Source', lead.source], ['Deal value', lead.value ? money(lead.value) : '—'], ['Sales rep', lead.rep], ['Created', new Date(lead.createdAt).toLocaleDateString()]];
  return (
    <div className="page" style={{ padding: '22px 28px 28px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, font: '500 13px/1 var(--font-body)', color: '#64748B' }}><span onClick={() => go('leads')} style={{ cursor: 'pointer' }}>Leads</span><Icon n="chevron-right" size={13} /><span style={{ color: '#0F172A' }}>{lead.name}</span></div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <Avatar name={lead.name} size={56} />
        <div style={{ flex: 1, minWidth: 240 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}><h1 className="h1">{lead.name}</h1><Badge tone={stageTone(lead.stage)} dot>{lead.stage}</Badge>{lead.score != null && <Badge tone={tone}>{lead.score} / 100 — {t}</Badge>}</div>
          <div style={{ marginTop: 6, font: '500 14px/1.4 var(--font-body)', color: '#64748B' }}>{lead.company || 'No company'}</div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <a href={lead.phone ? `tel:${lead.phone}` : undefined}><Button variant="secondary" size="sm" disabled={!lead.phone}><Icon n="phone" size={14} />Call</Button></a>
          <Button variant="secondary" size="sm" onClick={() => document.getElementById('composer')?.focus()}><Icon n="message-circle" size={14} />Message</Button>
          <a href={lead.email ? `mailto:${lead.email}` : undefined}><Button variant="secondary" size="sm" disabled={!lead.email}><Icon n="mail" size={14} />Email</Button></a>
          <Button size="sm" onClick={openTask}><Icon n="calendar-plus" size={14} />Add task</Button>
          <Button variant="ghost" size="sm" onClick={() => { if (confirm(`Delete ${lead.name}?`)) { actions.deleteLead(lead.id); go('leads'); } }}><Icon n="trash-2" size={15} /></Button>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${stageOrder.length},minmax(0,1fr))`, background: '#fff', border: '1px solid #E5E7EB', borderRadius: 14, overflow: 'hidden' }}>
        {stageOrder.map((s, i) => <div key={s} onClick={() => setSheet(true)} title="Change stage" style={{ padding: '11px 4px', textAlign: 'center', font: '600 12px/1 var(--font-display)', background: lead.stage === 'Lost' ? '#fff' : i < cur ? '#EEF5FD' : i === cur ? '#0F4C81' : '#fff', color: lead.stage === 'Lost' ? '#94A3B8' : i < cur ? '#0F4C81' : i === cur ? '#fff' : '#94A3B8', borderRight: '1px solid #F1F5F9', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', cursor: 'pointer' }}>{s}</div>)}
      </div>
      {sheet && (
        <div onClick={() => setSheet(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,.36)', zIndex: 50, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <div onClick={e => e.stopPropagation()} style={{ width: 'min(420px,100%)', background: '#fff', borderRadius: '24px 24px 0 0', padding: '10px 18px 30px', display: 'flex', flexDirection: 'column', gap: 6, animation: 'lfIn 180ms' }}>
            <span style={{ alignSelf: 'center', width: 40, height: 5, borderRadius: 3, background: '#CBD5E1', marginBottom: 8 }} />
            <b style={{ font: '800 18px/1 var(--font-display)', marginBottom: 8 }}>Move to stage</b>
            {STAGES.map(s => <div key={s} onClick={() => { actions.updateLead(lead.id, { stage: s }); setSheet(false); say(`Moved to ${s}`); }} className="hov" style={{ height: 50, display: 'flex', alignItems: 'center', gap: 12, padding: '0 14px', borderRadius: 12, background: s === lead.stage ? '#EEF5FD' : 'transparent', font: '600 15px/1 var(--font-display)', color: s === lead.stage ? '#0F4C81' : '#0F172A', cursor: 'pointer' }}><span style={{ flex: 1 }}>{s}</span>{s === lead.stage && <Icon n="check" size={18} />}</div>)}
          </div>
        </div>
      )}
      <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'minmax(260px,330px) minmax(0,1fr)', gap: 18, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div className="card">
            <div className="card-h"><span className="card-t">Lead information</span></div>
            <div style={{ padding: '8px 20px 14px' }}>
              {info.map(([k, v, c]) => <div key={k} style={{ display: 'grid', gridTemplateColumns: '100px minmax(0,1fr)', gap: 10, padding: '9px 0', borderBottom: '1px solid #F8FAFC' }}><span style={{ font: '500 12.5px/1.4 var(--font-body)', color: '#64748B' }}>{k}</span><span style={{ font: '600 13px/1.4 var(--font-display)', color: c ?? '#0F172A', overflowWrap: 'anywhere' }}>{v}</span></div>)}
              <div style={{ display: 'grid', gridTemplateColumns: '100px minmax(0,1fr)', gap: 10, padding: '9px 0', alignItems: 'center' }}><span style={{ font: '500 12.5px/1.4 var(--font-body)', color: '#64748B' }}>Assign</span>
                <select value={lead.rep} onChange={e => actions.updateLead(lead.id, { rep: e.target.value })} style={{ height: 32, border: '1px solid #E5E7EB', borderRadius: 8, font: '600 13px/1 var(--font-display)' }}>{['Unassigned', ...team.map(m => m.name)].map(n => <option key={n}>{n}</option>)}</select></div>
            </div>
          </div>
          <div className="card" style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span className="card-t">Notes</span>
            <textarea value={lead.notes} onChange={e => actions.updateLead(lead.id, { notes: e.target.value })} placeholder="Add notes about this lead…" style={{ minHeight: 90, border: '1px solid #E5E7EB', borderRadius: 12, padding: 10, font: '500 13.5px/1.5 var(--font-body)', resize: 'vertical' }} />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, minWidth: 0 }}>
          {lead.score != null ? (
            <div style={{ background: 'linear-gradient(180deg,#F7F6FF 0%,#fff 100%)', border: '1px solid #DEDBFB', borderRadius: 18, padding: 20, display: 'flex', gap: 22, alignItems: 'center', flexWrap: 'wrap' }}>
              <ProgressRing value={lead.score} sublabel="of 100" />
              <div style={{ flex: 1 }}><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Icon n="sparkles" size={15} style={{ color: '#5B4FD6' }} /><span className="card-t">Lead score</span></div><div style={{ marginTop: 8, font: '500 13px/1.5 var(--font-body)', color: '#475569' }}>Score set manually. Automated AI scoring needs an AI provider connected in Settings.</div></div>
            </div>
          ) : (
            <div style={{ background: '#F7F6FF', border: '1px solid #DEDBFB', borderRadius: 18, padding: 16, display: 'flex', alignItems: 'center', gap: 12 }}><Icon n="sparkles" size={16} style={{ color: '#5B4FD6' }} /><span style={{ flex: 1, font: '500 13.5px/1.5 var(--font-body)', color: '#475569' }}>No score yet. Set a score from 0–100 to rank this lead.</span>
              <input type="number" min={0} max={100} placeholder="0–100" onBlur={e => e.target.value !== '' && actions.updateLead(lead.id, { score: Math.max(0, Math.min(100, Number(e.target.value))) })} style={{ width: 80, height: 34, border: '1px solid #DEDBFB', borderRadius: 10, padding: '0 8px' }} /></div>
          )}
          <div className="card">
            <div className="card-h" style={{ padding: '14px 20px' }}><span className="card-t">Conversation</span><span style={{ font: '500 12px/1 var(--font-body)', color: '#64748B' }}>{lead.messages.length} message{lead.messages.length === 1 ? '' : 's'}</span></div>
            <div style={{ padding: '16px 20px 8px' }}>
              <TimelineItem icon="globe" who="Lead created" meta={`${new Date(lead.createdAt).toLocaleString()} · ${lead.source}`} />
              {lead.messages.map(m => <TimelineItem key={m.id} icon={m.dir === 'in' ? (chIcon[m.channel]?.[0] ?? 'message-circle') : 'user'} who={m.dir === 'in' ? lead.name.split(' ')[0] : 'You'} meta={`${new Date(m.at).toLocaleDateString()} ${fmtTime(m.at)} · ${m.channel}`} text={m.text} out={m.dir === 'out'} />)}
              {tasks.filter(x => !x.done && x.dueAt).map(x => <TimelineItem key={x.id} icon="calendar-clock" who={x.title} meta={`Due ${dueLabel(x.dueAt)}`} />)}
            </div>
            <div style={{ margin: '0 16px 16px', border: '1px solid #E5E7EB', borderRadius: 16, overflow: 'hidden' }}>
              {(reply || loading) && (
                <div style={{ background: '#F7F6FF', borderBottom: '1px solid #ECEBFD', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Icon n="sparkles" size={14} style={{ color: '#5B4FD6' }} /><span style={{ font: '700 12px/1 var(--font-display)', color: '#5B4FD6' }}>Suggested draft</span><span style={{ font: '500 11px/1 var(--font-body)', color: '#64748B' }}>Template-based</span></div>
                  {loading ? <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{[92, 78, 54].map((w, i) => <div key={i} style={{ height: 10, width: `${w}%`, borderRadius: 6, background: '#E6E3FB', animation: `lfPulse 1.1s ease-in-out ${i * .15}s infinite` }} />)}</div> : <p style={{ margin: 0, font: '500 14px/1.55 var(--font-body)' }}>{reply}</p>}
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    <Button variant="ai" size="sm" style={{ height: 30, fontSize: 12.5 }} onClick={() => { setDraftTxt(reply); say('Draft inserted'); }}><Icon n="corner-down-left" size={13} />Insert</Button>
                    {['Regenerate', 'Shorter', 'More Professional', 'More Friendly'].map(k => <button key={k} onClick={() => gen(k)} className="hov" style={{ height: 30, padding: '0 12px', borderRadius: 9, background: '#fff', border: '1px solid #DEDBFB', color: '#4C41C2', font: '600 12.5px/1 var(--font-display)', cursor: 'pointer' }}>{k}</button>)}
                  </div>
                </div>
              )}
              <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <input id="composer" value={draftTxt} onChange={e => setDraftTxt(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Write a message..." style={{ flex: '1 1 160px', border: 0, outline: 0, font: '500 14px/1 var(--font-body)', minWidth: 0 }} />
                <select value={channel} onChange={e => setChannel(e.target.value)} style={{ height: 30, borderRadius: 9, border: '1px solid #E5E7EB', font: '600 12px/1 var(--font-display)' }}>{Object.keys(chIcon).map(c => <option key={c}>{c}</option>)}</select>
                <span onClick={() => gen('Regenerate')} style={{ display: 'flex', alignItems: 'center', gap: 6, height: 30, padding: '0 10px', borderRadius: 9, color: '#5B4FD6', font: '600 12.5px/1 var(--font-display)', cursor: 'pointer' }}><Icon n="sparkles" size={13} />Generate Reply</span>
                <button onClick={send} aria-label="Send" style={{ width: 34, height: 34, borderRadius: 10, border: 0, background: '#0F4C81', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Icon n="send-horizontal" size={15} /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {toast && <div style={{ position: 'fixed', bottom: 80, left: '50%', transform: 'translateX(-50%)', background: '#0F172A', color: '#fff', padding: '10px 16px', borderRadius: 12, font: '600 13px/1 var(--font-display)', display: 'flex', gap: 8, alignItems: 'center', animation: 'lfIn 180ms', zIndex: 60 }}><Icon n="circle-check" size={15} style={{ color: '#22C55E' }} />{toast}</div>}
    </div>
  );
}

function TimelineItem({ icon, who, meta, text, out }: { icon: string; who: string; meta: string; text?: string; out?: boolean }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '32px minmax(0,1fr)', gap: 12 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><div style={{ width: 30, height: 30, borderRadius: '50%', background: out ? '#E3EFFB' : '#F1F5F9', color: out ? '#0F4C81' : '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon n={icon} size={14} /></div><div style={{ flex: 1, width: 1.5, background: '#E5E7EB', margin: '4px 0', minHeight: 14 }} /></div>
      <div style={{ paddingBottom: 16, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}><span style={{ font: '700 13px/1.2 var(--font-display)' }}>{who}</span><span style={{ font: '500 12px/1 var(--font-body)', color: '#94A3B8' }}>{meta}</span></div>
        {text && <div style={{ marginTop: 6, maxWidth: 560, padding: '10px 14px', borderRadius: '4px 14px 14px 14px', background: out ? '#EEF5FD' : '#F8FAFC', border: `1px solid ${out ? '#D6E7FA' : '#E5E7EB'}`, font: '500 13.5px/1.5 var(--font-body)' }}>{text}</div>}
      </div>
    </div>
  );
}
