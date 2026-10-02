import type { ReactNode } from 'react';
import { Avatar, Badge, Button, Eyebrow, Icon, Input, ProgressRing, Select, PillTabs, StatCard, Toggle, Skel } from '../ui';
import { KIND, leads, temp } from '../data';

const Panel = ({ title, children, w, style }: { title: string; children: ReactNode; w?: number; style?: React.CSSProperties }) => (
  <div style={{ background: '#fff', borderRadius: 20, padding: 24, display: 'flex', flexDirection: 'column', gap: 14, width: w, minWidth: 0, ...style }}>
    <Eyebrow style={{ fontSize: 11 }}>{title}</Eyebrow>{children}
  </div>
);
const Section = ({ id, title, children }: { id: string; title: string; children: ReactNode }) => (
  <section id={id} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}><h2 style={{ margin: 0, font: '800 26px/1 var(--font-display)', letterSpacing: '-.02em' }}>{title}</h2>{children}</section>
);
const grid = (min: number): React.CSSProperties => ({ display: 'grid', gridTemplateColumns: `repeat(auto-fit,minmax(${min}px,1fr))`, gap: 24 });

const swatches = [['Deep Blue', '#0F4C81', 'Primary actions, identity'], ['Bright Blue', '#1E88E5', 'Links, focus, charts'], ['AI Violet', '#5B4FD6', 'AI surfaces only'], ['Success', '#16A34A', 'Won, connected, positive'], ['Danger', '#DC2626', 'Overdue, errors'], ['Background', '#F8FAFC', 'App canvas'], ['Card', '#FFFFFF', 'Surfaces'], ['Text', '#0F172A', 'Headings, body'], ['Secondary text', '#64748B', 'Meta, labels'], ['Border', '#E5E7EB', 'Dividers, inputs']];
const typeScale = [['Display 64', '800 40px/1.05', '-.035em', 'Never lose a lead'], ['H1 28', '800 28px/1.15', '-.025em', 'Good morning, Sarah'], ['H2 20', '700 20px/1.2', '-.015em', 'Lead funnel'], ['Card title 15', '700 15px/1.2', '0', 'AI Insights'], ['Body 14', '500 14px/1.5', '0', 'Follow up within the next 4 hours.'], ['Label 11', '700 11px/1', '.08em', 'RECOMMENDED ACTION']];
const stageBadges: [string, string][] = [['New', 'slate'], ['Contacted', 'blue'], ['Qualified', 'navy'], ['Meeting', 'violet'], ['Proposal', 'amber'], ['Won', 'emerald'], ['Lost', 'red']];

function Phone({ label, bg = '#F8FAFC', children, nav, overlay }: { label: string; bg?: string; children: ReactNode; nav?: number; overlay?: ReactNode }) {
  const tabs: [string, string, number?][] = [['Home', 'house'], ['Leads', 'users'], ['Inbox', 'inbox', 6], ['Tasks', 'circle-check-big', 7], ['More', 'menu']];
  return (
    <div data-screen-label={label} style={{ width: 390, height: 844, flexShrink: 0, background: bg, borderRadius: 44, border: '10px solid #0F172A', overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ height: 44, flexShrink: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 24px', font: '600 14px/1 var(--font-display)' }}><span>9:41</span><span style={{ display: 'flex', gap: 5 }}><Icon n="signal" size={14} /><Icon n="wifi" size={14} /><Icon n="battery-full" size={14} /></span></div>
      {children}
      {nav !== undefined && (
        <div style={{ height: 84, flexShrink: 0, background: '#fff', borderTop: '1px solid #E5E7EB', display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', padding: '8px 6px 22px' }}>
          {tabs.map(([l, i, b], k) => <div key={l} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, color: k === nav ? '#0F4C81' : '#94A3B8', font: '600 10.5px/1 var(--font-display)', position: 'relative' }}><Icon n={i} size={21} />{l}{b && <span style={{ position: 'absolute', top: 2, right: 18, minWidth: 16, height: 16, borderRadius: 8, background: '#EF4444', color: '#fff', font: '700 9.5px/16px var(--font-display)', textAlign: 'center' }}>{b}</span>}</div>)}
        </div>
      )}
      {overlay}
    </div>
  );
}

export const notifs: [string, string, string, string, string, string, string, boolean][] = [
  ['flame', '#DC2626', '#FEF2F2', 'New high-intent lead', 'Emily Carter · Google Ads · score 91', '2m', 'Call now', true],
  ['message-circle', '#15803D', '#F0FDF4', 'Ahmed replied on WhatsApp', '“Can you send the pricing breakdown today?”', '8m', 'Reply', true],
  ['clock', '#B45309', '#FEF7EA', 'Follow-up overdue', 'Priya Nair · Lumen Yoga Studio', '1h', '', false],
  ['sparkles', '#5B4FD6', '#F4F3FF', 'AI drafted 3 follow-ups', 'Review and send from your inbox', '2h', '', false],
  ['trophy', '#15803D', '#F0FDF4', 'Deal won — Dupont Florals', '$4,200 · closed by Maya', 'Yesterday', '', false],
];

export function NotificationsList({ onAction }: { onAction?: (a: string) => void }) {
  return <>{notifs.map(([i, ic, ibg, t, d, w, a, unread]) => (
    <div key={t} style={{ display: 'flex', gap: 12, padding: '14px 18px', borderBottom: '1px solid #F1F5F9', background: unread ? '#F7FAFE' : '#fff' }}>
      <span style={{ width: 38, height: 38, borderRadius: 12, background: ibg, color: ic, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon n={i} size={17} /></span>
      <div style={{ flex: 1 }}><div style={{ font: '600 14px/1.35 var(--font-display)' }}>{t}</div><div style={{ marginTop: 2, font: '500 12.5px/1.4 var(--font-body)', color: '#64748B' }}>{d}</div>{a && <Button size="sm" style={{ marginTop: 8, height: 34, fontSize: 12.5 }} onClick={() => onAction?.(a)}>{a}</Button>}</div>
      <span style={{ font: '500 11.5px/1.3 var(--font-body)', color: '#94A3B8' }}>{w}</span>
    </div>))}</>;
}

export function System() {
  const mLeads = leads.slice(0, 7);
  const stages: [string, string][] = [['New', '#94A3B8'], ['Contacted', '#1E88E5'], ['Qualified', '#0F4C81'], ['Meeting', '#5B4FD6'], ['Proposal', '#D97706'], ['Won', '#16A34A'], ['Lost', '#DC2626']];
  return (
    <div style={{ background: '#EEF1F5', padding: 'clamp(20px,4vw,64px)', display: 'flex', flexDirection: 'column', gap: 72 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ font: '700 12px/1 var(--font-display)', letterSpacing: '.08em', color: '#5B4FD6' }}>LEADFLOW AI</span>
        <h1 style={{ margin: 0, font: '800 clamp(30px,4vw,44px)/1.1 var(--font-display)', letterSpacing: '-.03em' }}>Design system, states &amp; mobile</h1>
        <p style={{ margin: 0, font: '500 16px/1.5 var(--font-body)', color: '#64748B' }}>Companion board to the app. <a href="#dashboard">Open the app →</a></p>
      </div>

      <Section id="foundations" title="Foundations">
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <Panel title="COLOR" w={720} style={{ flex: '1 1 520px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(120px,1fr))', gap: 12 }}>
              {swatches.map(([n, hex, use]) => <div key={n} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}><div style={{ height: 64, borderRadius: 12, background: hex, border: '1px solid #E5E7EB' }} /><div style={{ font: '700 12.5px/1.2 var(--font-display)' }}>{n}</div><div style={{ font: '500 11.5px/1.3 var(--font-mono)', color: '#64748B' }}>{hex}</div><div style={{ font: '500 11.5px/1.35 var(--font-body)', color: '#94A3B8' }}>{use}</div></div>)}
            </div>
          </Panel>
          <Panel title="TYPE · PLUS JAKARTA SANS" w={520} style={{ flex: '1 1 400px' }}>
            {typeScale.map(([k, f, ls, s]) => <div key={k} style={{ display: 'flex', alignItems: 'baseline', gap: 16, borderBottom: '1px solid #F1F5F9', paddingBottom: 12 }}><span style={{ width: 90, font: '500 11.5px/1 var(--font-mono)', color: '#94A3B8', flexShrink: 0 }}>{k}</span><span style={{ font: `${f} var(--font-display)`, letterSpacing: ls }}>{s}</span></div>)}
          </Panel>
          <Panel title="RADIUS · SHADOW · SPACING" w={360} style={{ flex: '1 1 320px' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>{[['6', '6px'], ['10', '10px'], ['14', '14px'], ['18', '18px']].map(([k, v]) => <div key={k} style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}><div style={{ width: 52, height: 52, background: '#EEF5FD', border: '1.5px solid #93C5F3', borderRadius: v }} /><span style={{ font: '500 11px/1 var(--font-mono)', color: '#64748B' }}>{k}</span></div>)}</div>
            <div style={{ display: 'flex', gap: 14, padding: '8px 0' }}>
              <div style={{ flex: 1, height: 56, borderRadius: 14, background: '#fff', border: '1px solid #E5E7EB', boxShadow: 'var(--shadow-card)', font: '500 11px/56px var(--font-mono)', textAlign: 'center', color: '#64748B' }}>card</div>
              <div style={{ flex: 1, height: 56, borderRadius: 14, background: '#fff', boxShadow: 'var(--shadow-pop)', font: '500 11px/56px var(--font-mono)', textAlign: 'center', color: '#64748B' }}>popover</div>
            </div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end' }}>{[4, 8, 12, 16, 24, 32, 48].map(sp => <div key={sp} style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}><div style={{ width: sp, height: sp, background: '#1E88E5', borderRadius: 3, opacity: .8 }} /><span style={{ font: '500 10px/1 var(--font-mono)', color: '#94A3B8' }}>{sp}</span></div>)}</div>
            <p style={{ margin: 0, font: '500 12.5px/1.5 var(--font-body)', color: '#64748B' }}>4px base. Cards 18px radius, buttons 14px, chips full. Shadows are soft and blue-tinted; violet is reserved for AI surfaces.</p>
          </Panel>
        </div>
      </Section>

      <Section id="components" title="Components">
        <div style={grid(360)}>
          <Panel title="BUTTONS">
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}><Button>Primary</Button><Button variant="secondary">Secondary</Button><Button variant="ghost">Ghost</Button><Button variant="danger">Delete</Button><Button disabled>Disabled</Button></div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Button size="sm">Small</Button><Button size="md">Medium</Button><Button size="lg">Large</Button></div>
            <Button variant="ai" size="sm" style={{ width: 'max-content', height: 36 }}><Icon n="sparkles" size={14} />AI action</Button>
          </Panel>
          <Panel title="INPUTS · SELECT · SEARCH">
            <Input label="Email" placeholder="john@abcconstruction.com" />
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}><span style={{ font: '600 13px/1 var(--font-display)', color: '#334155' }}>Phone</span><div style={{ height: 44, display: 'flex', alignItems: 'center', padding: '0 14px', border: '1px solid #EF4444', borderRadius: 14, font: '500 14px/1 var(--font-body)' }}>+1 512</div><span style={{ font: '500 12px/1.4 var(--font-body)', color: '#DC2626' }}>Enter a full phone number</span></label>
            <Select label="Stage" options={['Qualified', 'Meeting', 'Proposal']} />
            <div style={{ height: 38, border: '1px solid #E5E7EB', borderRadius: 11, background: '#F8FAFC', display: 'flex', alignItems: 'center', gap: 10, padding: '0 12px', color: '#94A3B8' }}><Icon n="search" size={15} /><span style={{ flex: 1, font: '500 13px/1 var(--font-body)' }}>Search…</span><span style={{ font: '600 11px/1 var(--font-mono)', color: '#64748B', border: '1px solid #E5E7EB', background: '#fff', padding: '3px 6px', borderRadius: 6 }}>⌘K</span></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, font: '500 13px/1 var(--font-body)' }}><Toggle on onChange={() => {}} />Toggle</div>
          </Panel>
          <Panel title="BADGES · LEAD SCORE · AVATARS">
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{[['Cold', 'blue'], ['Warm', 'amber'], ['Hot', 'red'], ['High Intent', 'violet']].map(([l, t]) => <Badge key={l} tone={t}>{l}</Badge>)}</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{stageBadges.map(([l, t]) => <Badge key={l} tone={t} dot size="sm">{l}</Badge>)}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Badge tone="violet">High Intent</Badge><div style={{ width: 64, height: 6, borderRadius: 99, background: '#EDF1F6' }}><div style={{ width: '87%', height: '100%', background: '#5B4FD6', borderRadius: 99 }} /></div><b style={{ font: '700 13px/1 var(--font-display)' }}>87</b></div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Avatar name="Sarah Mitchell" size={40} status="online" /><Avatar name="Daniel Park" size={32} status="away" /><Avatar name="Maya Johnson" size={24} /></div>
          </Panel>
          <Panel title="TABS · DROPDOWN · TOOLTIP">
            <div style={{ display: 'flex', gap: 26, borderBottom: '1px solid #E5E7EB' }}>{['Overview', 'Activity', 'Deals'].map((t, i) => <span key={t} style={{ paddingBottom: 14, position: 'relative', font: `${i ? 500 : 700} 14px/1 var(--font-display)`, color: i ? '#64748B' : '#0F4C81' }}>{t}{!i && <span style={{ position: 'absolute', left: 0, right: 0, bottom: -1, height: 2, background: '#0F4C81', borderRadius: '2px 2px 0 0' }} />}</span>)}</div>
            <PillTabs tabs={['Day', 'Week', 'Month']} value="Week" onChange={() => {}} />
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{ width: 200, background: '#fff', border: '1px solid #E5E7EB', borderRadius: 14, boxShadow: 'var(--shadow-pop)', padding: 6 }}>{[['Assign to…', 'user-round-check', '#334155'], ['Change stage', 'arrow-right-left', '#334155', '#F1F5F9'], ['Add tag', 'tag', '#334155'], ['Delete lead', 'trash-2', '#DC2626']].map(([l, i, c, bg]) => <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 9, font: '500 13px/1 var(--font-body)', color: c, background: bg ?? 'transparent' }}><Icon n={i} size={14} />{l}</div>)}</div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, paddingTop: 6 }}><span style={{ background: '#0F172A', color: '#fff', font: '500 12px/1.3 var(--font-body)', padding: '6px 10px', borderRadius: 8 }}>Score updated 2m ago</span><span style={{ width: 30, height: 30, borderRadius: 9, border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B' }}><Icon n="info" size={14} /></span></div>
            </div>
          </Panel>
          <Panel title="STAT CARD"><StatCard label="Pipeline Value" value="$24,500" delta="21.5%" /></Panel>
          <Panel title="AI INSIGHT · SCORE RING">
            <div style={{ background: 'linear-gradient(180deg,#F7F6FF 0%,#fff 100%)', border: '1px solid #DEDBFB', borderRadius: 16, padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}><span className="eyebrow" style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#5B4FD6' }}><Icon n="sparkles" size={12} />AI INSIGHT</span><span style={{ font: '500 14px/1.5 var(--font-body)' }}>Google Ads leads are converting 2.1× better than Facebook leads this month.</span><span style={{ font: '600 13px/1 var(--font-display)', color: '#5B4FD6' }}>View Analytics →</span></div>
            <ProgressRing value={87} sublabel="of 100" />
          </Panel>
          <Panel title="KANBAN CARD · DRAGGING">
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ flex: 1, border: '1px solid #E5E7EB', borderRadius: 13, padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}><b style={{ font: '700 13px/1.2 var(--font-display)' }}>John Smith</b><span style={{ font: '500 11.5px/1 var(--font-body)', color: '#64748B' }}>ABC Construction</span><b style={{ font: '800 15px/1 var(--font-display)' }}>$9,800</b></div>
              <div style={{ flex: 1, border: '1px solid #93C5F3', borderRadius: 13, padding: 12, display: 'flex', flexDirection: 'column', gap: 8, transform: 'rotate(-2deg)', boxShadow: '0 14px 30px rgba(15,76,129,.16)' }}><b style={{ font: '700 13px/1.2 var(--font-display)' }}>Emily Carter</b><span style={{ font: '500 11.5px/1 var(--font-body)', color: '#64748B' }}>Carter &amp; Co. Law</span><b style={{ font: '800 15px/1 var(--font-display)' }}>$12,000</b></div>
            </div>
            <div style={{ height: 56, border: '1.5px dashed #93C5F3', background: '#F2F8FE', borderRadius: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', font: '600 12px/1 var(--font-display)', color: '#1E88E5' }}>Drop to move to Meeting</div>
          </Panel>
          <Panel title="WORKFLOW NODES">
            {[['WHEN', 'Lead becomes Qualified', 'user-check'], ['WAIT', '24 hours', 'hourglass'], ['IF', 'No response', 'git-branch'], ['THEN', 'Send WhatsApp Message', 'message-circle']].map(([k, l, i]) => <div key={k} style={{ border: '1px solid #E5E7EB', borderRadius: 14, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 12 }}><span style={{ width: 32, height: 32, borderRadius: 9, background: KIND[k][1], color: KIND[k][0], display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon n={i} size={15} /></span><div><div className="eyebrow" style={{ color: KIND[k][0] }}>{k}</div><div style={{ marginTop: 4, font: '600 13px/1.2 var(--font-display)' }}>{l}</div></div></div>)}
          </Panel>
          <Panel title="TOASTS">
            <div style={{ background: '#0F172A', color: '#fff', borderRadius: 14, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: 'var(--shadow-pop)' }}><Icon n="circle-check" size={16} style={{ color: '#4ADE80' }} /><span style={{ flex: 1, font: '500 13px/1.3 var(--font-body)' }}>John Smith moved to Meeting</span><span style={{ font: '600 12.5px/1 var(--font-display)', color: '#93C5F3' }}>Undo</span></div>
            <div style={{ border: '1px solid #E5E7EB', borderRadius: 14, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: 'var(--shadow-pop)' }}><Icon n="sparkles" size={16} style={{ color: '#5B4FD6' }} /><span style={{ flex: 1, font: '500 13px/1.3 var(--font-body)' }}>AI reply sent to Ahmed on WhatsApp</span><Icon n="x" size={14} style={{ color: '#94A3B8' }} /></div>
            <div style={{ border: '1px solid #FBCFCF', borderRadius: 14, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}><Icon n="circle-alert" size={16} style={{ color: '#DC2626' }} /><span style={{ flex: 1, font: '500 13px/1.3 var(--font-body)' }}>Couldn't send email. Gmail disconnected.</span><span style={{ font: '600 12.5px/1 var(--font-display)', color: '#DC2626' }}>Fix</span></div>
          </Panel>
          <Panel title="TIMELINE ITEM">
            <div style={{ display: 'grid', gridTemplateColumns: '30px 1fr', gap: 12 }}><span style={{ width: 30, height: 30, borderRadius: '50%', background: '#DCFCE7', color: '#15803D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon n="message-circle" size={14} /></span><div><div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><b style={{ font: '700 13px/1 var(--font-display)' }}>John</b><span style={{ font: '500 12px/1 var(--font-body)', color: '#94A3B8' }}>Today — 10:42 AM · WhatsApp</span></div><div style={{ marginTop: 6, padding: '10px 12px', borderRadius: '4px 14px 14px 14px', background: '#F8FAFC', border: '1px solid #E5E7EB', font: '500 13px/1.5 var(--font-body)' }}>Hi, I need a website for my dental clinic.</div></div></div>
            <div style={{ display: 'grid', gridTemplateColumns: '30px 1fr', gap: 12 }}><span style={{ width: 30, height: 30, borderRadius: '50%', background: '#ECEBFD', color: '#5B4FD6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon n="sparkles" size={14} /></span><div><div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><b style={{ font: '700 13px/1 var(--font-display)' }}>AI</b><span style={{ font: '500 12px/1 var(--font-body)', color: '#94A3B8' }}>Typing…</span></div><div style={{ marginTop: 8, display: 'flex', gap: 4 }}>{[0, .2, .4].map(d => <span key={d} style={{ width: 7, height: 7, borderRadius: '50%', background: '#A5A0EE', animation: `lfPulse 1s ${d}s infinite` }} />)}</div></div></div>
          </Panel>
          <Panel title="MODAL · DRAWER" style={{ background: '#E7EBF0', position: 'relative', overflow: 'hidden', minHeight: 300, gridColumn: 'span 2' }}>
            <div style={{ width: 'min(380px,100%)', background: '#fff', borderRadius: 20, boxShadow: 'var(--shadow-xl)', padding: 22, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><b style={{ font: '700 17px/1 var(--font-display)' }}>Add lead</b><Icon n="x" size={16} style={{ color: '#94A3B8' }} /></div>
              <Input label="Name" placeholder="Full name" /><Input label="Company" placeholder="Company" />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}><Button variant="ghost" size="sm">Cancel</Button><Button size="sm">Add lead</Button></div>
            </div>
            <div className="hide-sm" style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 300, background: '#fff', boxShadow: '-12px 0 40px rgba(15,23,42,.12)', padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><b style={{ font: '700 15px/1 var(--font-display)' }}>Ahmed Khan</b><Icon n="x" size={15} style={{ color: '#94A3B8' }} /></div>
              <div style={{ display: 'flex', gap: 6 }}><Badge tone="amber" dot size="sm">Proposal</Badge><Badge tone="red" size="sm">Hot · 78</Badge></div>
              <div style={{ font: '500 12.5px/1.5 var(--font-body)', color: '#475569' }}>Quick view drawer — opens from any table row without leaving the list.</div>
            </div>
          </Panel>
        </div>
      </Section>

      <Section id="states" title="Empty, loading & error states">
        <div style={grid(320)}>
          {[['EMPTY · LEADS', 'users', '#0F4C81', '#EEF5FD', 'No leads yet', 'Connect your website or import your leads to get started.', 'Connect Lead Source', 'Import CSV'], ['EMPTY · TASKS', 'circle-check-big', '#15803D', '#F0FDF4', "You're all caught up", 'No follow-ups due today. New tasks appear here when leads need attention.', 'Create task', ''], ['ERROR · SYNC', 'refresh-cw-off', '#DC2626', '#FEF2F2', 'Sync paused', 'Something went wrong while syncing your leads.', 'Try Again', 'View Integration']].map(([tag, i, c, bg, t, d, p, s]) => (
            <div key={tag} style={{ background: '#fff', borderRadius: 20, padding: '24px 36px 48px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 14, minHeight: 340, justifyContent: 'center' }}>
              <Eyebrow style={{ alignSelf: 'flex-start', marginLeft: -12, marginBottom: 18 }}>{tag}</Eyebrow>
              <span style={{ width: 56, height: 56, borderRadius: 16, background: bg, color: c, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon n={i} size={24} /></span>
              <span style={{ font: '800 19px/1.2 var(--font-display)', letterSpacing: '-.015em' }}>{t}</span>
              <span style={{ maxWidth: 340, font: '500 14px/1.55 var(--font-body)', color: '#64748B' }}>{d}</span>
              <div style={{ display: 'flex', gap: 8, marginTop: 6 }}><Button size="sm" style={{ height: 38 }}>{p}</Button>{s && <Button size="sm" variant="secondary" style={{ height: 38 }}>{s}</Button>}</div>
            </div>))}
        </div>
        <div style={grid(320)}>
          <Panel title="LOADING · DASHBOARD">
            <Skel w="55%" h={22} style={{ borderRadius: 8 }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>{[1, 2, 3].map(x => <div key={x} style={{ height: 96, borderRadius: 14, border: '1px solid #F1F5F9', padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}><Skel w="60%" /><Skel w="45%" h={22} /><Skel w="35%" /></div>)}</div>
            <div style={{ height: 150, borderRadius: 14, border: '1px solid #F1F5F9', padding: 14, display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center' }}>{[92, 70, 48, 30, 16].map(w => <Skel key={w} w={`${w}%`} h={14} />)}</div>
          </Panel>
          <Panel title="LOADING · LEADS TABLE & CONVERSATIONS">
            {[[38, 60], [44, 52], [30, 64], [50, 40], [34, 58], [42, 48]].map(([a, b], i) => <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid #F8FAFC' }}><Skel w={32} h={32} style={{ borderRadius: '50%' }} /><div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}><Skel w={`${a}%`} /><Skel w={`${b}%`} h={8} /></div><Skel w={56} h={20} style={{ borderRadius: 99 }} /></div>)}
          </Panel>
          <Panel title="LOADING · ANALYTICS & AI RESPONSE">
            <div style={{ height: 130, borderRadius: 14, border: '1px solid #F1F5F9', padding: 14, display: 'flex', alignItems: 'flex-end', gap: 10 }}>{[40, 62, 50, 78, 58, 88].map((h, i) => <Skel key={i} w="100%" h={h} style={{ flex: 1, height: `${h}%`, borderRadius: '6px 6px 2px 2px' }} />)}</div>
            <div style={{ background: '#F7F6FF', border: '1px solid #ECEBFD', borderRadius: 14, padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}><span style={{ display: 'flex', alignItems: 'center', gap: 6, font: '600 12px/1 var(--font-display)', color: '#5B4FD6' }}><Icon n="sparkles" size={13} />Analyzing 1,000 leads…</span>{[92, 76, 48].map((w, k) => <div key={w} style={{ height: 10, width: `${w}%`, borderRadius: 5, background: '#E6E3FB', animation: `lfPulse 1.1s ${k * .15}s infinite` }} />)}</div>
          </Panel>
        </div>
      </Section>

      <Section id="mobile" title="Mobile · 390">
        <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', overflowX: 'auto', paddingBottom: 16 }}>
          <Phone label="Mobile Home" nav={0}>
            <div style={{ flex: 1, overflow: 'hidden', padding: '8px 18px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><div><div style={{ font: '500 13px/1 var(--font-body)', color: '#64748B' }}>Thursday, Oct 2</div><div style={{ marginTop: 6, font: '800 24px/1.1 var(--font-display)', letterSpacing: '-.02em' }}>Good morning, Sarah 👋</div></div><span style={{ position: 'relative', width: 44, height: 44, borderRadius: 14, background: '#fff', border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon n="bell" size={18} /><span style={{ position: 'absolute', top: 10, right: 11, width: 7, height: 7, borderRadius: '50%', background: '#EF4444' }} /></span></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>{[['New Leads', '42', '▲ 18.4%', '#15803D'], ['Qualified', '18', '▲ 12.2%', '#15803D'], ['Follow-ups Due', '7', '3 overdue', '#DC2626'], ['Pipeline', '$24.5k', '▲ 21.5%', '#15803D']].map(([l, v, d, c]) => <div key={l} style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 16, padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}><span style={{ font: '600 12px/1 var(--font-display)', color: '#64748B' }}>{l}</span><span style={{ font: '800 22px/1 var(--font-display)', letterSpacing: '-.02em' }}>{v}</span><span style={{ font: '700 11.5px/1 var(--font-display)', color: c }}>{d}</span></div>)}</div>
              <div style={{ background: 'linear-gradient(180deg,#F7F6FF,#fff)', border: '1px solid #DEDBFB', borderRadius: 16, padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}><span className="eyebrow" style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#5B4FD6' }}><Icon n="sparkles" size={12} />AI INSIGHT</span><span style={{ font: '600 14px/1.45 var(--font-display)' }}>7 qualified leads haven't received a follow-up in the last 24 hours.</span><span style={{ font: '600 13px/1 var(--font-display)', color: '#5B4FD6' }}>Review Leads →</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><b style={{ font: '700 15px/1 var(--font-display)' }}>Today's follow-ups</b><span style={{ font: '600 13px/1 var(--font-display)', color: '#1E88E5' }}>See all</span></div>
              {[['Call John', 'John Smith · ABC Construction', '10:00'], ['Send proposal to Ahmed', 'Brightsmile Dental', '11:30'], ['Follow up with Sarah', 'Northwind Realty', '2:00']].map(([t, l, w]) => <div key={t} style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 14, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12, minHeight: 56 }}><span style={{ width: 22, height: 22, borderRadius: 7, border: '1.5px solid #CBD5E1' }} /><div style={{ flex: 1 }}><div style={{ font: '600 14px/1.25 var(--font-display)' }}>{t}</div><div style={{ font: '500 12px/1.3 var(--font-body)', color: '#64748B' }}>{l}</div></div><b style={{ font: '700 12px/1 var(--font-display)', color: '#0F4C81' }}>{w}</b></div>)}
            </div>
          </Phone>
          <Phone label="Mobile Leads" bg="#fff" nav={1}>
            <div style={{ padding: '8px 18px 10px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ font: '800 26px/1 var(--font-display)', letterSpacing: '-.02em' }}>Leads</span><span style={{ width: 44, height: 44, borderRadius: 14, background: '#0F4C81', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon n="plus" size={20} /></span></div>
              <div style={{ height: 44, borderRadius: 12, background: '#F1F5F9', display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', color: '#94A3B8', font: '500 14px/1 var(--font-body)' }}><Icon n="search" size={16} />Search leads…</div>
              <div style={{ display: 'flex', gap: 6, overflow: 'hidden' }}>{['All', 'High intent', 'Mine', 'Unassigned'].map((l, i) => <span key={l} style={{ height: 34, padding: '0 14px', borderRadius: 99, display: 'flex', alignItems: 'center', font: '600 13px/1 var(--font-display)', whiteSpace: 'nowrap', background: i ? '#fff' : '#0F4C81', color: i ? '#334155' : '#fff', border: `1px solid ${i ? '#E5E7EB' : '#0F4C81'}` }}>{l}</span>)}</div>
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              {mLeads.map(l => <div key={l.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 18px', borderBottom: '1px solid #F1F5F9', minHeight: 68 }}><Avatar name={l.name} size={40} /><div style={{ flex: 1, minWidth: 0 }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><b style={{ font: '700 14.5px/1.25 var(--font-display)' }}>{l.name}</b><span style={{ font: '500 12px/1.25 var(--font-body)', color: '#94A3B8' }}>{l.last.replace(' ago', '')}</span></div><div style={{ font: '500 12.5px/1.35 var(--font-body)', color: '#64748B' }}>{l.company}</div><div style={{ marginTop: 5, display: 'flex', gap: 6 }}><Badge size="sm" tone={temp(l.score)[1]}>{l.score} · {temp(l.score)[0]}</Badge><Badge size="sm">{l.stage}</Badge></div></div></div>)}
            </div>
          </Phone>
          <Phone label="Mobile Lead + Stage" overlay={<><div style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,.36)' }} /><div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, background: '#fff', borderRadius: '24px 24px 0 0', padding: '10px 18px 30px', display: 'flex', flexDirection: 'column', gap: 6 }}><span style={{ alignSelf: 'center', width: 40, height: 5, borderRadius: 3, background: '#CBD5E1', marginBottom: 8 }} /><b style={{ font: '800 18px/1 var(--font-display)', marginBottom: 8 }}>Move to stage</b>{stages.map(([l, d]) => { const on = l === 'Meeting'; return <div key={l} style={{ height: 50, display: 'flex', alignItems: 'center', gap: 12, padding: '0 14px', borderRadius: 12, background: on ? '#EEF5FD' : 'transparent', font: '600 15px/1 var(--font-display)', color: on ? '#0F4C81' : '#0F172A' }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: d }} /><span style={{ flex: 1 }}>{l}</span>{on && <Icon n="check" size={18} />}</div>; })}</div></>}>
            <div style={{ padding: '6px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><Icon n="chevron-left" size={24} /><Icon n="ellipsis" size={20} /></div>
            <div style={{ padding: '6px 18px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, textAlign: 'center' }}><Avatar name="John Smith" size={64} /><span style={{ font: '800 22px/1.2 var(--font-display)', letterSpacing: '-.02em' }}>John Smith</span><span style={{ font: '500 13.5px/1 var(--font-body)', color: '#64748B' }}>ABC Construction</span><span style={{ marginTop: 4, font: '700 12px/1 var(--font-display)', color: '#5B4FD6', background: '#F4F3FF', border: '1px solid #DEDBFB', borderRadius: 99, padding: '6px 10px' }}>87 / 100 — High Intent</span></div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, padding: '14px 18px' }}>{[['Call', 'phone'], ['Message', 'message-circle'], ['Email', 'mail'], ['Meet', 'calendar-plus']].map(([l, i]) => <div key={l} style={{ height: 64, borderRadius: 14, background: '#fff', border: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, font: '600 11.5px/1 var(--font-display)', color: '#0F4C81' }}><Icon n={i} size={18} />{l}</div>)}</div>
          </Phone>
          <Phone label="Mobile Reply" bg="#F8FAFC">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px 12px', background: '#fff', borderBottom: '1px solid #E5E7EB' }}><Icon n="chevron-left" size={24} /><Avatar name="Ahmed Khan" size={36} /><div style={{ flex: 1 }}><div style={{ font: '700 15px/1.2 var(--font-display)' }}>Ahmed Khan</div><div style={{ font: '500 12px/1.3 var(--font-body)', color: '#16A34A' }}>WhatsApp</div></div><Icon n="phone" size={19} style={{ color: '#0F4C81' }} /></div>
            <div style={{ flex: 1, padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 10, overflow: 'hidden' }}>
              {[['in', 'Around 6 pages. We use Dentrix for scheduling.'], ['out', "Perfect — we've integrated Dentrix before. I'll put a proposal together today."], ['in', 'Can you send the pricing breakdown today?']].map(([k, t]) => <div key={t} style={{ alignSelf: k === 'in' ? 'flex-start' : 'flex-end', maxWidth: '82%', padding: '10px 13px', borderRadius: k === 'in' ? '4px 16px 16px 16px' : '16px 4px 16px 16px', background: k === 'in' ? '#fff' : '#0F4C81', color: k === 'in' ? '#0F172A' : '#fff', border: `1px solid ${k === 'in' ? '#E5E7EB' : '#0F4C81'}`, font: '500 14px/1.45 var(--font-body)' }}>{t}</div>)}
            </div>
            <div style={{ background: '#fff', borderTop: '1px solid #E5E7EB', padding: '12px 14px 30px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ background: '#F7F6FF', border: '1px solid #DEDBFB', borderRadius: 14, padding: 12, display: 'flex', flexDirection: 'column', gap: 10 }}><span style={{ display: 'flex', alignItems: 'center', gap: 6, font: '700 11.5px/1 var(--font-display)', color: '#5B4FD6' }}><Icon n="sparkles" size={13} />Suggested reply</span><span style={{ font: '500 14px/1.45 var(--font-body)' }}>Absolutely — I'll send the full pricing breakdown by 2 PM today. Does a 15-minute call tomorrow work to walk through it?</span><div style={{ display: 'flex', gap: 6 }}><Button variant="ai" size="sm" style={{ height: 36 }}>Insert</Button>{['Shorter', 'Friendlier'].map(l => <Button key={l} variant="secondary" size="sm" style={{ height: 36, color: '#4C41C2', borderColor: '#DEDBFB' }}>{l}</Button>)}</div></div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><div style={{ flex: 1, height: 44, borderRadius: 22, background: '#F1F5F9', display: 'flex', alignItems: 'center', padding: '0 16px', font: '500 14px/1 var(--font-body)', color: '#94A3B8' }}>Write a message...</div><span style={{ width: 44, height: 44, borderRadius: '50%', background: '#0F4C81', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon n="send-horizontal" size={18} /></span></div>
            </div>
          </Phone>
          <Phone label="Mobile Notifications" bg="#fff" nav={0}>
            <div style={{ padding: '8px 18px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ font: '800 26px/1 var(--font-display)', letterSpacing: '-.02em' }}>Notifications</span><span style={{ font: '600 13px/1 var(--font-display)', color: '#1E88E5' }}>Mark all read</span></div>
            <div style={{ flex: 1, overflow: 'hidden' }}><NotificationsList /></div>
          </Phone>
        </div>
      </Section>
    </div>
  );
}
