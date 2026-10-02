import { useEffect, useState } from 'react';
import { useGo, useParam } from '../nav';
import { Badge, Button, Icon, Toggle } from '../ui';
import { KIND, palette } from '../data';
import { actions, ago, useStore, type Automation, type Step } from '../store';
import { Empty } from '../modals';

const Flow = ({ steps, sel, onSel, big }: { steps: Step[]; sel?: number; onSel?: (i: number) => void; big?: boolean }) => (
  <>{steps.map((st, i) => (
    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: big ? undefined : '100%' }}>
      {i > 0 && <div style={{ width: 2, height: big ? 28 : 18, background: '#CBD5E1' }} />}
      <div onClick={() => onSel?.(i)} style={{ width: big ? 300 : '100%', maxWidth: big ? '100%' : 320, background: '#fff', border: i === sel ? '2px solid #1E88E5' : '1px solid #E5E7EB', borderRadius: big ? 16 : 14, padding: big ? 14 : '12px 14px', display: 'flex', alignItems: 'center', gap: 12, cursor: onSel ? 'pointer' : 'default', boxShadow: i === sel ? '0 0 0 4px rgba(30,136,229,.12),0 8px 20px rgba(15,23,42,.06)' : '0 1px 2px rgba(15,23,42,.05)', transition: 'box-shadow 160ms' }}>
        <span style={{ width: big ? 38 : 34, height: big ? 38 : 34, borderRadius: 11, background: KIND[st.kind][1], color: KIND[st.kind][0], display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon n={st.icon} size={big ? 17 : 16} /></span>
        <div style={{ flex: 1, minWidth: 0 }}><div className="eyebrow" style={{ color: KIND[st.kind][0] }}>{st.kind}</div><div style={{ marginTop: 5, font: '600 14px/1.3 var(--font-display)' }}>{st.label}</div>{st.sub && <div style={{ marginTop: 3, font: '500 12px/1.3 var(--font-body)', color: '#64748B' }}>{st.sub}</div>}</div>
      </div>
    </div>
  ))}</>
);

export function Automations() {
  const go = useGo(); const autos = useStore(s => s.automations);
  return (
    <div className="page">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div><h1 className="h1">Automations</h1><p className="sub">{autos.filter(a => a.active).length} active · {autos.length} total</p></div>
        <Button size="sm" onClick={() => go('builder')}><Icon n="plus" size={14} />Create Automation</Button>
      </div>
      {!autos.length ? <div className="card"><Empty icon="workflow" tone={['#ECEBFD', '#5B4FD6']} title="No automations yet" text="Automate follow-ups, assignment and reminders. Build a workflow from triggers and actions."><Button size="sm" onClick={() => go('builder')}>Create Automation</Button></Empty></div> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 14 }}>
          {autos.map(a => (
            <div key={a.id} onClick={() => go('builder', a.id)} className="acard" style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 18, padding: 16, display: 'flex', flexDirection: 'column', gap: 14, cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: 4 }}>{a.steps.slice(0, 5).map((st, j) => <span key={j} style={{ width: 28, height: 28, borderRadius: 8, background: KIND[st.kind][1], color: KIND[st.kind][0], display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon n={st.icon} size={13} /></span>)}</div>
                <span onClick={e => e.stopPropagation()}><Toggle w={34} on={a.active} color="#16A34A" onChange={() => actions.toggleAutomation(a.id)} /></span>
              </div>
              <div style={{ font: '700 14px/1.3 var(--font-display)' }}>{a.name}</div>
              <Flow steps={a.steps.slice(0, 3)} />
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid #F1F5F9', font: '500 12px/1 var(--font-body)', color: '#64748B' }}><span>{a.steps.length} step{a.steps.length === 1 ? '' : 's'} · edited {ago(a.createdAt)}</span><span style={{ color: a.active ? '#15803D' : '#94A3B8', fontWeight: 600 }}>{a.active ? 'Active' : 'Draft'}</span></div>
            </div>
          ))}
        </div>
      )}
      <style>{`.acard{transition:transform 200ms,box-shadow 200ms}.acard:hover{transform:translateY(-2px);box-shadow:0 12px 28px rgba(15,23,42,.08)}`}</style>
    </div>
  );
}

export function Builder() {
  const go = useGo(); const id = useParam();
  const existing = useStore(s => s.automations.find(a => a.id === id));
  const [draft, setDraft] = useState<Automation>(() => existing ?? { id: actions.newAutomationId(), name: 'Untitled automation', active: false, steps: [], createdAt: Date.now() });
  useEffect(() => { if (existing) setDraft(existing); }, [id]);
  const [sel, setSel] = useState(-1); const [saved, setSaved] = useState(!!existing);
  const edit = (p: Partial<Automation>) => { setDraft(d => ({ ...d, ...p })); setSaved(false); };
  const setStep = (i: number, p: Partial<Step>) => edit({ steps: draft.steps.map((s, j) => j === i ? { ...s, ...p } : s) });
  const add = (label: string, icon: string, kind: Step['kind']) => { edit({ steps: [...draft.steps, { kind, label, icon, sub: '' }] }); setSel(draft.steps.length); };
  const save = (active?: boolean) => { actions.saveAutomation({ ...draft, active: active ?? draft.active, createdAt: Date.now() }); if (active !== undefined) setDraft(d => ({ ...d, active })); setSaved(true); };
  const s = draft.steps[sel];
  const inp: React.CSSProperties = { height: 40, border: '1px solid #CBD5E1', borderRadius: 12, padding: '0 12px', font: '500 14px/1 var(--font-body)', width: '100%' };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 640 }}>
      <div style={{ height: 58, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 12, padding: '0 20px', background: '#fff', borderBottom: '1px solid #E5E7EB' }}>
        <span onClick={() => go('automations')} style={{ display: 'flex', alignItems: 'center', gap: 4, font: '500 13px/1 var(--font-body)', color: '#64748B', cursor: 'pointer' }}><Icon n="arrow-left" size={14} />Automations</span>
        <span style={{ color: '#CBD5E1' }}>/</span>
        <input value={draft.name} onChange={e => edit({ name: e.target.value })} style={{ border: 0, outline: 0, font: '700 14px/1 var(--font-display)', minWidth: 0, flex: '0 1 280px' }} />
        <Badge size="sm" tone={draft.active ? 'emerald' : 'slate'}>{draft.active ? 'Live' : 'Draft'}</Badge>
        <span style={{ flex: 1 }} />
        <span className="hide-sm" style={{ font: '500 12px/1 var(--font-body)', color: '#94A3B8' }}>{saved ? 'Saved' : 'Unsaved changes'}</span>
        <Button variant="secondary" size="sm" onClick={() => save()} disabled={!draft.steps.length}>Save draft</Button>
        <Button size="sm" onClick={() => { save(true); go('automations'); }} disabled={!draft.steps.length}>Publish</Button>
      </div>
      <div className="builder" style={{ flex: 1, display: 'grid', gridTemplateColumns: '240px minmax(0,1fr) 320px', minHeight: 0 }}>
        <style>{`@media(max-width:1000px){.builder{grid-template-columns:minmax(0,1fr)!important}.builder>:first-child,.builder>:last-child{display:none}}`}</style>
        <div style={{ background: '#fff', borderRight: '1px solid #E5E7EB', overflowY: 'auto', padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          {palette.map(g => (
            <div key={g.name} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span className="eyebrow" style={{ color: '#94A3B8', padding: '0 8px 6px' }}>{g.name}</span>
              {g.items.map(([label, icon, kk]) => { const k = (kk ?? g.k) as Step['kind']; return (
                <div key={label} onClick={() => add(label, icon, k)} className="hov" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 8, borderRadius: 10, cursor: 'pointer', font: '600 13px/1 var(--font-display)', color: '#334155' }}>
                  <span style={{ width: 28, height: 28, borderRadius: 8, background: KIND[k][1], color: KIND[k][0], display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon n={icon} size={14} /></span>{label}<Icon n="plus" size={13} style={{ marginLeft: 'auto', color: '#CBD5E1' }} />
                </div>); })}
            </div>
          ))}
        </div>
        <div style={{ overflow: 'auto', backgroundColor: '#F8FAFC', backgroundImage: 'radial-gradient(#DCE3EC 1px,transparent 1px)', backgroundSize: '18px 18px', padding: '36px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {draft.steps.length ? <Flow big steps={draft.steps} sel={sel} onSel={setSel} /> : (
            <div style={{ marginTop: 60, textAlign: 'center', maxWidth: 320, display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
              <span style={{ width: 48, height: 48, borderRadius: 14, background: '#fff', border: '1px dashed #CBD5E1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8' }}><Icon n="mouse-pointer-click" size={20} /></span>
              <b style={{ font: '700 15px/1.3 var(--font-display)' }}>Start with a trigger</b>
              <span style={{ font: '500 13.5px/1.5 var(--font-body)', color: '#64748B' }}>Pick a trigger from the left panel, then add actions and waits to build your workflow.</span>
            </div>
          )}
          {!!draft.steps.length && <div style={{ marginTop: 18, background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 12, padding: '10px 14px', maxWidth: 360, font: '500 12.5px/1.45 var(--font-body)', color: '#92400E' }}>Workflows are saved to this workspace. Running them needs the automation engine to be connected.</div>}
        </div>
        <div style={{ background: '#fff', borderLeft: '1px solid #E5E7EB', overflowY: 'auto' }}>
          {s ? <>
            <div style={{ padding: '16px 18px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 32, height: 32, borderRadius: 9, background: KIND[s.kind][1], color: KIND[s.kind][0], display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon n={s.icon} size={16} /></span>
              <div style={{ flex: 1 }}><div className="eyebrow" style={{ color: KIND[s.kind][0] }}>{s.kind}</div><div style={{ marginTop: 4, font: '700 14px/1 var(--font-display)' }}>{s.label}</div></div>
              <button aria-label="Remove step" onClick={() => { edit({ steps: draft.steps.filter((_, j) => j !== sel) }); setSel(-1); }} style={{ border: 0, background: 'none', color: '#94A3B8', cursor: 'pointer' }}><Icon n="trash-2" size={16} /></button>
            </div>
            <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}><span style={{ font: '600 13px/1 var(--font-display)', color: '#334155' }}>Step name</span><input style={inp} value={s.label} onChange={e => setStep(sel, { label: e.target.value })} /></label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}><span style={{ font: '600 13px/1 var(--font-display)', color: '#334155' }}>{s.kind === 'WAIT' ? 'Duration (e.g. 24 hours)' : 'Details'}</span><textarea value={s.sub} onChange={e => setStep(sel, { sub: e.target.value })} placeholder={s.kind === 'WAIT' ? '24 hours' : 'Message, condition or assignee…'} style={{ ...inp, height: 90, padding: 12, lineHeight: 1.5, resize: 'vertical' }} /></label>
              <div style={{ display: 'flex', gap: 6 }}><Button variant="secondary" size="sm" disabled={sel === 0} onClick={() => { const a = [...draft.steps];[a[sel - 1], a[sel]] = [a[sel], a[sel - 1]]; edit({ steps: a }); setSel(sel - 1); }}><Icon n="arrow-up" size={13} />Up</Button><Button variant="secondary" size="sm" disabled={sel === draft.steps.length - 1} onClick={() => { const a = [...draft.steps];[a[sel + 1], a[sel]] = [a[sel], a[sel + 1]]; edit({ steps: a }); setSel(sel + 1); }}><Icon n="arrow-down" size={13} />Down</Button></div>
            </div>
          </> : <div style={{ padding: 24, font: '500 13.5px/1.5 var(--font-body)', color: '#64748B' }}>Select a step to configure it.</div>}
          {id && existing && <div style={{ padding: 18 }}><Button variant="danger" size="sm" onClick={() => { actions.deleteAutomation(draft.id); go('automations'); }}>Delete automation</Button></div>}
        </div>
      </div>
    </div>
  );
}
