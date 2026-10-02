import { useState, type ReactNode } from 'react';
import { Button, Icon, Input, Select } from './ui';
import { SOURCES, STAGES, actions, useStore } from './store';

export function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,.36)', zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div onClick={e => e.stopPropagation()} style={{ width: 'min(440px,100%)', maxHeight: '90vh', overflowY: 'auto', background: '#fff', borderRadius: 20, boxShadow: 'var(--shadow-xl)', padding: 22, display: 'flex', flexDirection: 'column', gap: 14, animation: 'lfIn 180ms var(--ease-out)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><b style={{ font: '700 17px/1 var(--font-display)' }}>{title}</b><button onClick={onClose} aria-label="Close" style={{ border: 0, background: 'none', cursor: 'pointer', color: '#94A3B8' }}><Icon n="x" size={16} /></button></div>
        {children}
      </div>
    </div>
  );
}
const Field = ({ label, children }: { label: string; children: ReactNode }) => <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}><span style={{ font: '600 13px/1 var(--font-display)', color: '#334155' }}>{label}</span>{children}</div>;
const sel: React.CSSProperties = { height: 44, border: '1px solid #CBD5E1', borderRadius: 14, padding: '0 12px', font: '500 14px/1 var(--font-body)', background: '#fff', width: '100%' };

export function LeadModal({ onClose, onCreated }: { onClose: () => void; onCreated?: (id: string) => void }) {
  const team = useStore(s => s.team);
  const [f, setF] = useState({ name: '', company: '', email: '', phone: '', source: 'Website', stage: 'New', rep: 'Unassigned', value: '', score: '' });
  const set = (k: string) => (e: { target: { value: string } }) => setF(x => ({ ...x, [k]: e.target.value }));
  const submit = (e: React.FormEvent) => {
    e.preventDefault(); if (!f.name.trim()) return;
    const id = actions.addLead({ name: f.name.trim(), company: f.company.trim(), email: f.email.trim(), phone: f.phone.trim(), source: f.source, stage: f.stage, rep: f.rep, value: Number(f.value) || 0, score: f.score === '' ? null : Math.max(0, Math.min(100, Number(f.score))) });
    onCreated?.(id); onClose();
  };
  return (
    <Modal title="Add lead" onClose={onClose}>
      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Input label="Name *" placeholder="Full name" value={f.name} onChange={set('name')} autoFocus required />
        <Input label="Company" placeholder="Company" value={f.company} onChange={set('company')} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}><Input label="Email" type="email" value={f.email} onChange={set('email')} /><Input label="Phone" value={f.phone} onChange={set('phone')} /></div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Field label="Source"><select style={sel} value={f.source} onChange={set('source')}>{SOURCES.map(s => <option key={s}>{s}</option>)}</select></Field>
          <Field label="Stage"><select style={sel} value={f.stage} onChange={set('stage')}>{STAGES.map(s => <option key={s}>{s}</option>)}</select></Field>
          <Field label="Assigned to"><select style={sel} value={f.rep} onChange={set('rep')}>{['Unassigned', ...team.map(m => m.name)].map(s => <option key={s}>{s}</option>)}</select></Field>
          <Input label="Deal value ($)" type="number" min="0" value={f.value} onChange={set('value')} />
        </div>
        <Input label="Lead score (0–100, optional)" type="number" min="0" max="100" value={f.score} onChange={set('score')} />
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}><Button type="button" variant="ghost" size="sm" onClick={onClose}>Cancel</Button><Button type="submit" size="sm">Add lead</Button></div>
      </form>
    </Modal>
  );
}

const toLocalInput = (t: number) => { const d = new Date(t - new Date(t).getTimezoneOffset() * 60000); return d.toISOString().slice(0, 16); };
export function TaskModal({ onClose, leadId }: { onClose: () => void; leadId?: string }) {
  const team = useStore(s => s.team);
  const leads = useStore(s => s.leads);
  const [f, setF] = useState({ title: '', leadId: leadId ?? '', assignee: team[0]?.name ?? 'You', priority: 'Medium', type: 'Task', due: toLocalInput(Date.now() + 3600000) });
  const set = (k: string) => (e: { target: { value: string } }) => setF(x => ({ ...x, [k]: e.target.value }));
  const submit = (e: React.FormEvent) => {
    e.preventDefault(); if (!f.title.trim()) return;
    actions.addTask({ title: f.title.trim(), leadId: f.leadId || null, assignee: f.assignee, priority: f.priority as any, type: f.type as any, dueAt: f.due ? new Date(f.due).getTime() : null });
    onClose();
  };
  return (
    <Modal title="New task" onClose={onClose}>
      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Input label="Title *" placeholder="e.g. Call back about proposal" value={f.title} onChange={set('title')} autoFocus required />
        <Field label="Lead"><select style={sel} value={f.leadId} onChange={set('leadId')}><option value="">No lead</option>{leads.map(l => <option key={l.id} value={l.id}>{l.name}{l.company ? ` · ${l.company}` : ''}</option>)}</select></Field>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Field label="Type"><select style={sel} value={f.type} onChange={set('type')}>{['Task', 'Call', 'Meeting', 'Follow-up'].map(s => <option key={s}>{s}</option>)}</select></Field>
          <Field label="Priority"><select style={sel} value={f.priority} onChange={set('priority')}>{['High', 'Medium', 'Low'].map(s => <option key={s}>{s}</option>)}</select></Field>
          <Field label="Assign to"><select style={sel} value={f.assignee} onChange={set('assignee')}>{team.map(m => <option key={m.id}>{m.name}</option>)}</select></Field>
          <Field label="Due"><input type="datetime-local" value={f.due} onChange={set('due')} style={sel} /></Field>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}><Button type="button" variant="ghost" size="sm" onClick={onClose}>Cancel</Button><Button type="submit" size="sm">Create task</Button></div>
      </form>
    </Modal>
  );
}

export function InviteModal({ onClose }: { onClose: () => void }) {
  const [f, setF] = useState({ name: '', email: '', role: 'Sales Agent' });
  return (
    <Modal title="Invite member" onClose={onClose}>
      <form onSubmit={e => { e.preventDefault(); if (!f.email.trim()) return; actions.addMember(f.name.trim(), f.email.trim(), f.role); onClose(); }} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Input label="Name" value={f.name} onChange={e => setF({ ...f, name: e.target.value })} autoFocus />
        <Input label="Work email *" type="email" required value={f.email} onChange={e => setF({ ...f, email: e.target.value })} />
        <Select label="Role" options={['Admin', 'Manager', 'Sales Agent']} defaultValue="Sales Agent" />
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}><Button type="button" variant="ghost" size="sm" onClick={onClose}>Cancel</Button><Button type="submit" size="sm">Send invite</Button></div>
      </form>
    </Modal>
  );
}

export function Empty({ icon, title, text, children, tone = ['#EEF5FD', '#0F4C81'] }: { icon: string; title: string; text: string; children?: ReactNode; tone?: [string, string] }) {
  return (
    <div style={{ padding: '56px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
      <span style={{ width: 56, height: 56, borderRadius: 16, background: tone[0], color: tone[1], display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon n={icon} size={24} /></span>
      <span style={{ font: '800 19px/1.2 var(--font-display)', letterSpacing: '-.015em' }}>{title}</span>
      <span style={{ maxWidth: 360, font: '500 14px/1.55 var(--font-body)', color: '#64748B' }}>{text}</span>
      {children && <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>{children}</div>}
    </div>
  );
}
