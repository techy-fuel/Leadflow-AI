import { useState } from 'react';
import { useGo } from '../nav';
import { Badge, Button, Icon, Select, Toggle } from '../ui';
import { KIND, autos, flowSteps, palette } from '../data';

export function Automations() {
  const go = useGo();
  const [on, setOn] = useState(autos.map(a => a[5]));
  return (
    <div className="page">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div><h1 className="h1">Automations</h1><p className="sub">6 active · 1,284 actions run this month · 41 hours saved</p></div>
        <Button size="sm" onClick={() => go('builder')}><Icon n="plus" size={14} />Create Automation</Button>
      </div>
      <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'minmax(320px,440px) minmax(0,1fr)', gap: 18, alignItems: 'start' }}>
        <div className="card" style={{ borderRadius: 20, overflow: 'hidden' }}>
          <div style={{ padding: '18px 20px', borderBottom: '1px solid #F1F5F9', display: 'flex', gap: 12 }}>
            <div style={{ flex: 1 }}><div style={{ font: '700 16px/1.25 var(--font-display)' }}>New Qualified Lead Follow-up</div><div style={{ marginTop: 6, display: 'flex', gap: 12, font: '500 12px/1 var(--font-body)', color: '#64748B' }}><span>Ran 312× · 38% reply rate</span><span>Edited 2d ago</span></div></div>
            <Toggle on color="#16A34A" />
          </div>
          <div style={{ padding: 20, backgroundColor: '#FAFBFC', backgroundImage: 'radial-gradient(#E2E8F0 1px,transparent 1px)', backgroundSize: '16px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {flowSteps.map(([kind, label, icon], i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                {i > 0 && <div style={{ width: 2, height: 18, background: '#CBD5E1' }} />}
                <div style={{ width: '100%', maxWidth: 320, background: '#fff', border: '1px solid #E5E7EB', borderRadius: 14, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 1px 2px rgba(15,23,42,.05)' }}>
                  <span style={{ width: 34, height: 34, borderRadius: 10, background: KIND[kind][1], color: KIND[kind][0], display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon n={icon} size={16} /></span>
                  <div><div className="eyebrow" style={{ color: KIND[kind][0] }}>{kind}</div><div style={{ marginTop: 5, font: '600 13.5px/1.3 var(--font-display)' }}>{label}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 14 }}>
          {autos.map(([name, desc, steps, runs, stat], i) => (
            <div key={name} onClick={() => go('builder')} className="acard" style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 18, padding: 16, display: 'flex', flexDirection: 'column', gap: 14, cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: 4 }}>{steps.map(([k, ic], j) => <span key={j} style={{ width: 28, height: 28, borderRadius: 8, background: KIND[k][1], color: KIND[k][0], display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon n={ic} size={13} /></span>)}</div>
                <span onClick={e => e.stopPropagation()}><Toggle w={34} on={on[i]} color="#16A34A" onChange={v => setOn(o => o.map((x, j) => j === i ? v : x))} /></span>
              </div>
              <div><div style={{ font: '700 14px/1.3 var(--font-display)' }}>{name}</div><div style={{ marginTop: 4, font: '500 12.5px/1.45 var(--font-body)', color: '#64748B' }}>{desc}</div></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid #F1F5F9', font: '500 12px/1 var(--font-body)', color: '#64748B' }}><span>{runs}</span><span style={{ color: on[i] ? '#15803D' : '#94A3B8', fontWeight: 600 }}>{on[i] ? stat : 'Paused'}</span></div>
            </div>
          ))}
          <div onClick={() => go('builder')} className="acard-add" style={{ border: '1.5px dashed #CBD5E1', borderRadius: 18, padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, minHeight: 170, cursor: 'pointer', color: '#64748B' }}><Icon n="plus" size={20} /><span style={{ font: '600 13px/1 var(--font-display)' }}>Start from template</span></div>
        </div>
      </div>
      <style>{`.acard{transition:transform 200ms,box-shadow 200ms}.acard:hover{transform:translateY(-2px);box-shadow:0 12px 28px rgba(15,23,42,.08)}.acard-add:hover{border-color:#1E88E5!important;color:#1E88E5!important}`}</style>
    </div>
  );
}

export function Builder() {
  const go = useGo();
  const [sel, setSel] = useState(3);
  const [bh, setBh] = useState(true);
  const [published, setPublished] = useState(false);
  const s = flowSteps[sel];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 640 }}>
      <div style={{ height: 58, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 12, padding: '0 20px', background: '#fff', borderBottom: '1px solid #E5E7EB' }}>
        <span onClick={() => go('automations')} style={{ display: 'flex', alignItems: 'center', gap: 4, font: '500 13px/1 var(--font-body)', color: '#64748B', cursor: 'pointer' }}><Icon n="arrow-left" size={14} />Automations</span>
        <span style={{ color: '#CBD5E1' }}>/</span>
        <span style={{ font: '700 14px/1 var(--font-display)' }}>New Qualified Lead Follow-up</span>
        <Badge size="sm" tone={published ? 'emerald' : 'slate'}>{published ? 'Live' : 'Draft'}</Badge>
        <span style={{ flex: 1 }} />
        <span className="hide-sm" style={{ font: '500 12px/1 var(--font-body)', color: '#94A3B8' }}>Saved just now</span>
        <Button variant="secondary" size="sm"><Icon n="flask-conical" size={14} />Test</Button>
        <Button size="sm" onClick={() => setPublished(true)}>{published ? 'Published' : 'Publish'}</Button>
      </div>
      <div className="builder" style={{ flex: 1, display: 'grid', gridTemplateColumns: '240px minmax(0,1fr) 320px', minHeight: 0 }}>
        <style>{`@media(max-width:1000px){.builder{grid-template-columns:minmax(0,1fr)!important}.builder>:first-child,.builder>:last-child{display:none}}`}</style>
        <div style={{ background: '#fff', borderRight: '1px solid #E5E7EB', overflowY: 'auto', padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          {palette.map(g => (
            <div key={g.name} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span className="eyebrow" style={{ color: '#94A3B8', padding: '0 8px 6px' }}>{g.name}</span>
              {g.items.map(([label, icon, kk]) => { const k = kk ?? g.k; return (
                <div key={label} className="hov" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 8, borderRadius: 10, cursor: 'grab', font: '600 13px/1 var(--font-display)', color: '#334155' }}>
                  <span style={{ width: 28, height: 28, borderRadius: 8, background: KIND[k][1], color: KIND[k][0], display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon n={icon} size={14} /></span>{label}
                  <Icon n="grip-vertical" size={13} style={{ marginLeft: 'auto', color: '#CBD5E1' }} />
                </div>); })}
            </div>
          ))}
        </div>
        <div style={{ overflow: 'auto', backgroundColor: '#F8FAFC', backgroundImage: 'radial-gradient(#DCE3EC 1px,transparent 1px)', backgroundSize: '18px 18px', padding: '36px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
          {flowSteps.map(([kind, label, icon, sub], i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {i > 0 && <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><div style={{ width: 2, height: 14, background: '#CBD5E1' }} /><span style={{ width: 22, height: 22, borderRadius: '50%', background: '#fff', border: '1px solid #CBD5E1', color: '#94A3B8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon n="plus" size={12} /></span><div style={{ width: 2, height: 14, background: '#CBD5E1' }} /></div>}
              <div onClick={() => setSel(i)} style={{ width: 300, maxWidth: '100%', background: '#fff', border: i === sel ? '2px solid #1E88E5' : '1px solid #E5E7EB', borderRadius: 16, padding: 14, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', boxShadow: i === sel ? '0 0 0 4px rgba(30,136,229,.12),0 8px 20px rgba(15,23,42,.06)' : '0 1px 2px rgba(15,23,42,.05)', transition: 'box-shadow 160ms, border-color 160ms' }}>
                <span style={{ width: 38, height: 38, borderRadius: 11, background: KIND[kind][1], color: KIND[kind][0], display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon n={icon} size={17} /></span>
                <div style={{ flex: 1, minWidth: 0 }}><div className="eyebrow" style={{ color: KIND[kind][0] }}>{kind}</div><div style={{ marginTop: 5, font: '600 14px/1.3 var(--font-display)' }}>{label}</div>{sub && <div style={{ marginTop: 3, font: '500 12px/1.3 var(--font-body)', color: '#64748B' }}>{sub}</div>}</div>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 99, background: '#fff', border: '1px dashed #CBD5E1', font: '600 12px/1 var(--font-display)', color: '#64748B', cursor: 'pointer' }}><Icon n="plus" size={13} />Add step</div>
        </div>
        <div style={{ background: '#fff', borderLeft: '1px solid #E5E7EB', overflowY: 'auto' }}>
          <div style={{ padding: '16px 18px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 32, height: 32, borderRadius: 9, background: KIND[s[0]][1], color: KIND[s[0]][0], display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon n={s[2]} size={16} /></span>
            <div><div className="eyebrow" style={{ color: KIND[s[0]][0] }}>{s[0]}</div><div style={{ marginTop: 4, font: '700 14px/1 var(--font-display)' }}>{s[1]}</div></div>
          </div>
          <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Select label="Send from" options={['Acme Digital · +1 512 555 0100', 'Sarah Mitchell · +1 512 555 0148']} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ font: '600 13px/1 var(--font-display)', color: '#334155' }}>Message</span><span style={{ display: 'flex', alignItems: 'center', gap: 4, font: '600 12px/1 var(--font-display)', color: '#5B4FD6', cursor: 'pointer' }}><Icon n="sparkles" size={12} />Write with AI</span></div>
              <div style={{ border: '1px solid #CBD5E1', borderRadius: 12, padding: 12, font: '500 13.5px/1.55 var(--font-body)' }}>Hi <Chip>first_name</Chip>, just checking in on your <Chip>service</Chip> project. Do you have 15 minutes this week for a quick call?</div>
              <span style={{ font: '500 12px/1.4 var(--font-body)', color: '#94A3B8' }}>Type {'{'} to insert a lead field</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 12, border: '1px solid #E5E7EB', borderRadius: 12 }}>
              <div><div style={{ font: '600 13px/1.2 var(--font-display)' }}>Only during business hours</div><div style={{ font: '500 12px/1.4 var(--font-body)', color: '#64748B' }}>Mon–Fri, 9 AM–6 PM lead's time</div></div>
              <Toggle w={34} on={bh} onChange={setBh} />
            </div>
            <div style={{ background: '#F8FAFC', borderRadius: 12, padding: 12, display: 'flex', gap: 10, font: '500 12.5px/1.45 var(--font-body)', color: '#475569' }}><Icon n="info" size={14} style={{ color: '#1E88E5', marginTop: 1 }} /><span>Based on last month, this step would reach about 26 leads per week.</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
const Chip = ({ children }: { children: string }) => <span style={{ background: '#EEF5FD', color: '#0F4C81', borderRadius: 5, padding: '1px 5px', fontWeight: 600 }}>{`{${children}}`}</span>;
