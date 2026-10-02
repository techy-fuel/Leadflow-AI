import { useMemo, useState } from 'react';
import { useGo } from '../nav';
import { Avatar, Badge, Button, Check, Eyebrow, Icon, ProgressRing, Skel } from '../ui';
import { leadEmail, leads, srcIcon, stageTone, temp } from '../data';

const tabs: [string, number, (l: (typeof leads)[0]) => boolean][] = [['All leads', 248, () => true], ['My leads', 64, l => l.rep === 'Sarah Mitchell'], ['High intent', 23, l => l.score >= 85], ['Unassigned', 11, l => l.rep === 'Unassigned'], ['Needs follow-up', 7, l => l.next === 'Overdue' || l.next.startsWith('Today')]];
const filters: [string, string, boolean?][] = [['Status', 'circle-dot'], ['Source', 'radio-tower'], ['Lead Score: 70+', 'gauge', true], ['Assigned To', 'user'], ['Date', 'calendar'], ['Tags', 'tag']];

export function Leads() {
  const go = useGo();
  const [tab, setTab] = useState(0);
  const [q, setQ] = useState('');
  const [sel, setSel] = useState<Set<string>>(new Set(['Ahmed Khan', 'Emily Carter']));
  const [loading, setLoading] = useState(true);
  useMemo(() => { setTimeout(() => setLoading(false), 450); }, []);
  const rows = leads.filter(tabs[tab][2]).filter(l => (l.name + l.company).toLowerCase().includes(q.toLowerCase()));
  const toggle = (n: string) => setSel(s => { const x = new Set(s); x.has(n) ? x.delete(n) : x.add(n); return x; });
  const cols = '36px minmax(170px,1.4fr) minmax(150px,1.2fr) 110px 150px 110px 120px 100px 140px 44px';
  return (
    <div className="page">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div><h1 className="h1">Leads</h1><p className="sub">248 leads · 42 new this week</p></div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Button variant="secondary" size="sm"><Icon n="upload" size={14} />Import</Button>
          <Button variant="secondary" size="sm"><Icon n="download" size={14} />Export</Button>
          <Button size="sm"><Icon n="plus" size={14} />Add Lead</Button>
        </div>
      </div>
      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: 4, padding: '0 16px', borderBottom: '1px solid #F1F5F9', overflowX: 'auto' }}>
          {tabs.map(([label, n], i) => <div key={label} onClick={() => setTab(i)} style={{ padding: '14px 10px 12px', font: '600 13px/1 var(--font-display)', color: tab === i ? '#0F172A' : '#64748B', borderBottom: `2px solid ${tab === i ? '#0F4C81' : 'transparent'}`, cursor: 'pointer', display: 'flex', gap: 6, whiteSpace: 'nowrap' }}>{label}<span style={{ fontSize: 11, color: '#94A3B8' }}>{n}</span></div>)}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', borderBottom: '1px solid #F1F5F9', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 240, maxWidth: 380, height: 36, border: '1px solid #E5E7EB', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 8, padding: '0 12px', color: '#94A3B8' }}>
            <Icon n="search" size={15} />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search leads, companies or conversations..." style={{ flex: 1, border: 0, outline: 0, font: '500 13px/1 var(--font-body)', minWidth: 0 }} />
          </div>
          {filters.map(([label, icon, on]) => <div key={label} style={{ height: 32, display: 'flex', alignItems: 'center', gap: 6, padding: '0 10px', border: `1px dashed ${on ? '#93C5F3' : '#CBD5E1'}`, background: on ? '#EEF5FD' : '#fff', borderRadius: 9, font: '600 12.5px/1 var(--font-display)', color: on ? '#0F4C81' : '#475569', cursor: 'pointer', whiteSpace: 'nowrap' }}><Icon n={icon} size={13} />{label}</div>)}
          <div style={{ flex: 1 }} />
          <span style={{ font: '600 12.5px/1 var(--font-display)', color: '#64748B', display: 'flex', gap: 6, alignItems: 'center' }}><Icon n="sliders-horizontal" size={14} />Filters</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <div style={{ minWidth: 1100 }}>
            <div style={{ display: 'grid', gridTemplateColumns: cols, alignItems: 'center', padding: '0 16px', height: 40, background: '#F8FAFC', borderBottom: '1px solid #F1F5F9', font: '600 11px/1 var(--font-display)', letterSpacing: '.04em', color: '#64748B', textTransform: 'uppercase' }}>
              <span><Check on={sel.size === rows.length && rows.length > 0} onClick={() => setSel(sel.size === rows.length ? new Set() : new Set(rows.map(r => r.name)))} /></span>
              <span>Lead</span><span>Company</span><span>Source</span><span>Score</span><span>Stage</span><span>Assigned to</span><span>Last activity</span><span>Next follow-up</span><span />
            </div>
            {loading && Array.from({ length: 6 }).map((_, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0 16px', height: 56, borderBottom: '1px solid #F8FAFC' }}>
                <Skel w={32} h={32} style={{ borderRadius: '50%' }} /><div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}><Skel w="30%" /><Skel w="20%" h={8} /></div><Skel w={56} h={20} style={{ borderRadius: 99 }} />
              </div>
            ))}
            {!loading && rows.map(l => {
              const [t, tone] = temp(l.score), on = sel.has(l.name);
              return (
                <div key={l.name} onClick={() => go('detail')} className="hov" style={{ display: 'grid', gridTemplateColumns: cols, alignItems: 'center', padding: '0 16px', height: 56, borderBottom: '1px solid #F1F5F9', cursor: 'pointer', background: on ? '#F7FAFE' : '#fff' }}>
                  <span onClick={e => e.stopPropagation()}><Check on={on} onClick={() => toggle(l.name)} /></span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                    <Avatar name={l.name} size={30} />
                    <div style={{ minWidth: 0 }}><div style={{ font: '600 13.5px/1.25 var(--font-display)', whiteSpace: 'nowrap' }}>{l.name}</div><div style={{ font: '500 12px/1.3 var(--font-body)', color: '#64748B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{leadEmail(l)}</div></div>
                  </div>
                  <span style={{ font: '500 13px/1.3 var(--font-body)', color: '#334155', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.company}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6, font: '500 13px/1 var(--font-body)', color: '#334155' }}><Icon n={srcIcon(l.source)} size={14} style={{ color: '#64748B' }} />{l.source}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ font: '700 13px/1 var(--font-display)', width: 20, fontVariantNumeric: 'tabular-nums' }}>{l.score}</span><Badge tone={tone} size="sm">{t}</Badge></span>
                  <span><Badge tone={stageTone(l.stage)} dot size="sm">{l.stage}</Badge></span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8, font: '500 13px/1 var(--font-body)', color: '#334155' }}>{l.rep !== 'Unassigned' && <Avatar name={l.rep} size={22} />}{l.rep.split(' ')[0]}</span>
                  <span style={{ font: '500 13px/1 var(--font-body)', color: '#64748B' }}>{l.last}</span>
                  <span style={{ font: '600 12.5px/1.3 var(--font-display)', color: l.next === 'Overdue' ? '#DC2626' : l.next.startsWith('Today') ? '#0F4C81' : '#334155' }}>{l.next}</span>
                  <span style={{ color: '#94A3B8', textAlign: 'center' }}><Icon n="ellipsis" size={16} /></span>
                </div>
              );
            })}
            {!loading && !rows.length && (
              <div style={{ padding: '56px 20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 56, height: 56, borderRadius: 16, background: '#EEF5FD', color: '#0F4C81', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon n="users" size={24} /></span>
                <span style={{ font: '800 19px/1.2 var(--font-display)' }}>No leads yet</span>
                <span style={{ font: '500 14px/1.55 var(--font-body)', color: '#64748B' }}>Connect your website or import your leads to get started.</span>
                <Button size="sm">Connect Lead Source</Button>
              </div>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', font: '500 12.5px/1 var(--font-body)', color: '#64748B' }}>
          <span>{sel.size ? `${sel.size} selected · ` : ''}Showing 1–{rows.length} of 248</span>
          <div style={{ display: 'flex', gap: 6 }}><span style={{ padding: '7px 10px', border: '1px solid #E5E7EB', borderRadius: 8 }}>Previous</span><span style={{ padding: '7px 10px', border: '1px solid #E5E7EB', borderRadius: 8, color: '#0F172A' }}>Next</span></div>
        </div>
      </div>
    </div>
  );
}

const stageOrder = ['New', 'Contacted', 'Qualified', 'Meeting', 'Proposal', 'Negotiation', 'Won'];
const info: [string, string, string?][] = [['Name', 'John Smith'], ['Company', 'ABC Construction'], ['Email', 'john@abcconstruction.com', '#1E88E5'], ['Phone', '+1 (512) 555-0148'], ['Source', 'Facebook Lead Ads'], ['Campaign', 'Fall Website Promo'], ['Budget', '$8,000 – $12,000'], ['Timeline', 'Within 30 days'], ['Industry', 'Construction'], ['Sales rep', 'Sarah Mitchell']];
const timeline: [string, string, string, string, boolean, string?, string?][] = [
  ['globe', 'Lead captured', 'Today — 10:31 AM · Facebook Lead Ads', 'Form submitted: “Website redesign for multiple brands, budget $8–12k.”', false],
  ['message-circle', 'John', 'Today — 10:42 AM · WhatsApp', 'Hi, I need a website for my dental clinic.', true, '#F8FAFC', '#E5E7EB'],
  ['sparkles', 'AI', 'Today — 10:42 AM · Auto-reply', "Thanks John! We'd be happy to help. Could you share a bit about your clinic and what you need the site to do?", true, '#F7F6FF', '#ECEBFD'],
  ['user', 'Sarah', 'Today — 11:15 AM · WhatsApp', 'Would you like to schedule a quick call?', true, '#EEF5FD', '#D6E7FA'],
  ['calendar-clock', 'Follow-up scheduled', 'Tomorrow · 10:00 AM', 'Assigned to Sarah Mitchell', false],
];
const dot: Record<string, [string, string]> = { 'message-circle': ['#DCFCE7', '#15803D'], sparkles: ['#ECEBFD', '#5B4FD6'], user: ['#E3EFFB', '#0F4C81'], 'calendar-clock': ['#FEF3C7', '#B45309'], globe: ['#F1F5F9', '#475569'] };
const REPLY = "Thanks for sharing your requirements, John. Based on what you've described, our team can build a professional website tailored to your dental clinic. Would you like to schedule a quick 15-minute call?";
const variants: Record<string, string> = {
  Regenerate: REPLY,
  Shorter: "Thanks John! We can build your clinic's website. Free for a quick 15-minute call?",
  'More Professional': 'Dear John, thank you for outlining your requirements. Our team can deliver a bespoke website for your dental clinic. May we arrange a brief 15-minute call to discuss next steps?',
  'More Friendly': "Hey John, thanks so much for the details! We'd love to build a great site for your clinic. Fancy a quick 15-minute chat?",
};

export function LeadDetail() {
  const go = useGo();
  const cur = 2;
  const [reply, setReply] = useState(REPLY);
  const [loading, setLoading] = useState(false);
  const [draft, setDraft] = useState('');
  const [toast, setToast] = useState('');
  const regen = (k: string) => { setLoading(true); setTimeout(() => { setReply(variants[k]); setLoading(false); }, 1100); };
  return (
    <div className="page" style={{ padding: '22px 28px 28px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, font: '500 13px/1 var(--font-body)', color: '#64748B' }}><span onClick={() => go('leads')} style={{ cursor: 'pointer' }}>Leads</span><Icon n="chevron-right" size={13} /><span style={{ color: '#0F172A' }}>John Smith</span></div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <Avatar name="John Smith" size={56} />
        <div style={{ flex: 1, minWidth: 240 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}><h1 className="h1">John Smith</h1><Badge tone="navy" dot>Qualified</Badge><Badge tone="violet">87 / 100 — High Intent</Badge></div>
          <div style={{ marginTop: 6, font: '500 14px/1.4 var(--font-body)', color: '#64748B' }}>ABC Construction · Owner · Austin, TX</div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Button variant="secondary" size="sm"><Icon n="phone" size={14} />Call</Button>
          <Button variant="secondary" size="sm"><Icon n="message-circle" size={14} />Message</Button>
          <Button variant="secondary" size="sm"><Icon n="mail" size={14} />Email</Button>
          <Button size="sm"><Icon n="calendar-plus" size={14} />Book Meeting</Button>
          <Button variant="ghost" size="sm"><Icon n="ellipsis" size={16} /></Button>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${stageOrder.length},minmax(0,1fr))`, background: '#fff', border: '1px solid #E5E7EB', borderRadius: 14, overflow: 'hidden' }}>
        {stageOrder.map((s, i) => <div key={s} style={{ padding: '11px 4px', textAlign: 'center', font: '600 12px/1 var(--font-display)', background: i < cur ? '#EEF5FD' : i === cur ? '#0F4C81' : '#fff', color: i < cur ? '#0F4C81' : i === cur ? '#fff' : '#94A3B8', borderRight: '1px solid #F1F5F9', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s}</div>)}
      </div>
      <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'minmax(260px,330px) minmax(0,1fr)', gap: 18, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div className="card">
            <div className="card-h"><span className="card-t">Lead information</span><Icon n="pencil" size={14} style={{ color: '#94A3B8' }} /></div>
            <div style={{ padding: '8px 20px 14px' }}>
              {info.map(([k, v, c]) => <div key={k} style={{ display: 'grid', gridTemplateColumns: '100px minmax(0,1fr)', gap: 10, padding: '9px 0', borderBottom: '1px solid #F8FAFC' }}><span style={{ font: '500 12.5px/1.4 var(--font-body)', color: '#64748B' }}>{k}</span><span style={{ font: '600 13px/1.4 var(--font-display)', color: c ?? '#0F172A', overflowWrap: 'anywhere' }}>{v}</span></div>)}
            </div>
          </div>
          <div className="card" style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span className="card-t">Tags</span>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{['Website build', 'SEO', 'Q4 budget'].map(t => <Badge key={t} size="sm">{t}</Badge>)}</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, minWidth: 0 }}>
          <div style={{ background: 'linear-gradient(180deg,#F7F6FF 0%,#fff 100%)', border: '1px solid #DEDBFB', borderRadius: 18, padding: 20, display: 'flex', flexWrap: 'wrap', gap: 22, alignItems: 'center' }}>
            <ProgressRing value={87} sublabel="of 100" />
            <div style={{ flex: '1 1 320px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}><Icon n="sparkles" size={15} style={{ color: '#5B4FD6' }} /><span className="card-t">AI Lead Analysis</span><span style={{ font: '600 13px/1 var(--font-display)', color: '#5B4FD6' }}>Lead Score: 87/100</span></div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '6px 16px' }}>
                {['Clear business requirement', 'High commercial intent', 'Specific service requested', 'Engaged with previous message'].map(r => <span key={r} style={{ display: 'flex', gap: 8, alignItems: 'center', font: '500 13px/1.4 var(--font-body)', color: '#334155' }}><Icon n="circle-check" size={14} style={{ color: '#16A34A' }} />{r}</span>)}
              </div>
            </div>
            <div style={{ flex: '1 1 220px', maxWidth: 300, background: '#fff', border: '1px solid #DEDBFB', borderRadius: 14, padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Eyebrow color="#5B4FD6">RECOMMENDED ACTION</Eyebrow>
              <span style={{ font: '600 14px/1.4 var(--font-display)' }}>Follow up within the next 4 hours.</span>
              <Button variant="ai" size="sm" onClick={() => regen('Regenerate')}><Icon n="sparkles" size={14} />Generate Follow-up</Button>
            </div>
          </div>
          <div className="card">
            <div className="card-h" style={{ padding: '14px 20px' }}>
              <span className="card-t">Conversation</span>
              <div style={{ display: 'flex', gap: 6 }}><Badge tone="navy" size="sm">All</Badge><Badge size="sm">WhatsApp</Badge><Badge size="sm">Email</Badge></div>
            </div>
            <div style={{ padding: '16px 20px 8px' }}>
              {timeline.map(([icon, who, meta, text, msg, bg, bd], i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '32px minmax(0,1fr)', gap: 12 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: 30, height: 30, borderRadius: '50%', background: dot[icon][0], color: dot[icon][1], display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon n={icon} size={14} /></div>
                    <div style={{ flex: 1, width: 1.5, background: '#E5E7EB', margin: '4px 0', minHeight: 14 }} />
                  </div>
                  <div style={{ paddingBottom: 16, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}><span style={{ font: '700 13px/1.2 var(--font-display)' }}>{who}</span><span style={{ font: '500 12px/1 var(--font-body)', color: '#94A3B8' }}>{meta}</span></div>
                    {msg ? <div style={{ marginTop: 6, maxWidth: 560, padding: '10px 14px', borderRadius: '4px 14px 14px 14px', background: bg, border: `1px solid ${bd}`, font: '500 13.5px/1.5 var(--font-body)', color: '#1E293B' }}>{text}</div>
                      : <div style={{ marginTop: 4, font: '500 13px/1.4 var(--font-body)', color: '#475569' }}>{text}</div>}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ margin: '0 16px 16px', border: '1px solid #E5E7EB', borderRadius: 16, overflow: 'hidden' }}>
              <div style={{ background: '#F7F6FF', borderBottom: '1px solid #ECEBFD', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}><Icon n="sparkles" size={14} style={{ color: '#5B4FD6' }} /><span style={{ font: '700 12px/1 var(--font-display)', color: '#5B4FD6' }}>Suggested reply</span><span style={{ font: '500 11px/1 var(--font-body)', color: '#64748B' }}>Based on 3 messages and his requirements</span></div>
                {loading ? <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{[92, 78, 54].map((w, i) => <div key={i} style={{ height: 10, width: `${w}%`, borderRadius: 6, background: '#E6E3FB', animation: `lfPulse 1.1s ease-in-out ${i * .15}s infinite` }} />)}</div>
                  : <p style={{ margin: 0, font: '500 14px/1.55 var(--font-body)', textWrap: 'pretty' }}>{reply}</p>}
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  <Button variant="ai" size="sm" style={{ height: 30, fontSize: 12.5 }} onClick={() => { setDraft(reply); setToast('Reply inserted into composer'); setTimeout(() => setToast(''), 2200); }}><Icon n="corner-down-left" size={13} />Insert</Button>
                  {Object.keys(variants).map(k => <button key={k} onClick={() => regen(k)} className="hov" style={{ height: 30, padding: '0 12px', borderRadius: 9, background: '#fff', border: '1px solid #DEDBFB', color: '#4C41C2', font: '600 12.5px/1 var(--font-display)', cursor: 'pointer' }}>{k}</button>)}
                </div>
              </div>
              <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <input value={draft} onChange={e => setDraft(e.target.value)} placeholder="Write a message..." style={{ flex: '1 1 160px', border: 0, outline: 0, font: '500 14px/1 var(--font-body)', minWidth: 0 }} />
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, height: 30, padding: '0 10px', borderRadius: 9, border: '1px solid #E5E7EB', font: '600 12px/1 var(--font-display)', color: '#334155' }}><Icon n="message-circle" size={13} style={{ color: '#16A34A' }} />WhatsApp<Icon n="chevron-down" size={12} style={{ color: '#94A3B8' }} /></span>
                <span onClick={() => regen('Regenerate')} style={{ display: 'flex', alignItems: 'center', gap: 6, height: 30, padding: '0 10px', borderRadius: 9, color: '#5B4FD6', font: '600 12.5px/1 var(--font-display)', cursor: 'pointer' }}><Icon n="sparkles" size={13} />Generate Reply</span>
                <button onClick={() => { setDraft(''); setToast('Message sent'); setTimeout(() => setToast(''), 2200); }} aria-label="Send" style={{ width: 34, height: 34, borderRadius: 10, border: 0, background: '#0F4C81', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Icon n="send-horizontal" size={15} /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {toast && <div style={{ position: 'fixed', bottom: 80, left: '50%', transform: 'translateX(-50%)', background: '#0F172A', color: '#fff', padding: '10px 16px', borderRadius: 12, font: '600 13px/1 var(--font-display)', display: 'flex', gap: 8, alignItems: 'center', animation: 'lfIn 180ms', zIndex: 60 }}><Icon n="circle-check" size={15} style={{ color: '#22C55E' }} />{toast}</div>}
    </div>
  );
}
