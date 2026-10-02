import { useMemo, useState, type CSSProperties, type ReactNode, type ButtonHTMLAttributes } from 'react';
import { icons } from 'lucide-react';

const pascal = (n: string) => n.split('-').map(s => s[0].toUpperCase() + s.slice(1)).join('');
export function Icon({ n, size = 16, style, className }: { n: string; size?: number; style?: CSSProperties; className?: string }) {
  const C = (icons as Record<string, any>)[pascal(n)] ?? icons.Circle;
  return <C size={size} strokeWidth={2} style={{ flexShrink: 0, ...style }} className={className} />;
}

/* ---------- Avatar ---------- */
const avPalette = ['#0F4C81', '#16A34A', '#2563EB', '#7C3AED', '#D97706', '#0E7490'];
const colorFor = (name = '') => { let h = 0; for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h); return avPalette[Math.abs(h) % avPalette.length]; };
export function Avatar({ name = '', size = 40, status }: { name?: string; size?: number; status?: 'online' | 'away' | 'offline' }) {
  const sc = { online: '#22C55E', away: '#F59E0B', offline: '#CBD5E1' };
  return (
    <span style={{ position: 'relative', display: 'inline-flex', flexShrink: 0 }}>
      <span style={{ width: size, height: size, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: colorFor(name), color: '#fff', font: `700 ${Math.round(size * .38)}px/1 var(--font-display)`, border: '2px solid #fff', boxShadow: 'var(--shadow-xs)' }}>
        {name.split(' ').filter(Boolean).slice(0, 2).map(n => n[0]).join('').toUpperCase()}
      </span>
      {status && <span style={{ position: 'absolute', right: 0, bottom: 0, width: Math.max(8, size * .26), height: Math.max(8, size * .26), borderRadius: '50%', background: sc[status], border: '2px solid #fff' }} />}
    </span>
  );
}

/* ---------- Badge ---------- */
const tones: Record<string, [string, string, string]> = {
  navy: ['var(--navy-50)', 'var(--navy-700)', 'var(--navy-200)'], emerald: ['var(--emerald-50)', 'var(--emerald-700)', 'var(--emerald-200)'],
  amber: ['#FEF3C7', '#D97706', '#FCE3A8'], red: ['#FEE2E2', '#DC2626', '#FBCFCF'], blue: ['#DBEAFE', '#2563EB', '#C3D8FB'],
  violet: ['#ECEBFD', '#5B4FD6', '#DDD2FB'], slate: ['#F1F5F9', '#475569', '#E2E8F0'],
};
export function Badge({ children, tone = 'slate', dot, size = 'md', style }: { children: ReactNode; tone?: string; dot?: boolean; size?: 'sm' | 'md'; style?: CSSProperties }) {
  const [bg, fg, bd] = tones[tone] ?? tones.slate;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: size === 'sm' ? '2px 8px' : '3px 10px', fontSize: size === 'sm' ? 11 : 12, fontWeight: 600, fontFamily: 'var(--font-display)', letterSpacing: '.01em', borderRadius: 999, whiteSpace: 'nowrap', background: bg, color: fg, border: `1px solid ${bd}`, ...style }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: fg }} />}{children}
    </span>
  );
}

/* ---------- Button ---------- */
const bSizes = { sm: [34, 13, '0 14px', 6, 'var(--radius-sm)'], md: [42, 14, '0 18px', 8, 'var(--radius-md)'], lg: [50, 15, '0 24px', 10, 'var(--radius-md)'] } as const;
const bVar: Record<string, [CSSProperties, CSSProperties]> = {
  primary: [{ background: '#0F4C81', color: '#fff', border: '1px solid #0F4C81' }, { background: '#0D4170' }],
  ai: [{ background: '#5B4FD6', color: '#fff', border: '1px solid #5B4FD6' }, { background: '#4C41C2' }],
  secondary: [{ background: '#fff', color: '#0F4C81', border: '1px solid #CBD5E1' }, { background: '#F8FAFC', borderColor: '#94A3B8' }],
  ghost: [{ background: 'transparent', color: '#13589A', border: '1px solid transparent' }, { background: '#F1F5F9' }],
  danger: [{ background: '#DC2626', color: '#fff', border: '1px solid #DC2626' }, { background: '#EF4444' }],
};
export function Button({ variant = 'primary', size = 'md', full, style, children, disabled, ...rest }: { variant?: keyof typeof bVar; size?: keyof typeof bSizes; full?: boolean } & ButtonHTMLAttributes<HTMLButtonElement>) {
  const [h, setH] = useState(false), [a, setA] = useState(false);
  const [height, fs, pad, gap, radius] = bSizes[size]; const [base, hover] = bVar[variant];
  return (
    <button type="button" disabled={disabled} onMouseEnter={() => setH(true)} onMouseLeave={() => { setH(false); setA(false); }} onMouseDown={() => setA(true)} onMouseUp={() => setA(false)}
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap, height, padding: pad, width: full ? '100%' : 'auto', font: `600 ${fs}px/1 var(--font-display)`, borderRadius: radius, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? .5 : 1, whiteSpace: 'nowrap', transform: a ? 'translateY(1px)' : 'none', transition: 'background 140ms, transform 140ms, border-color 140ms', ...base, ...(h && !disabled ? hover : {}), ...style }} {...rest}>
      {children}
    </button>
  );
}
export function IconButton({ icon, label, onClick, style }: { icon: string; label: string; onClick?: () => void; style?: CSSProperties }) {
  return <button type="button" aria-label={label} onClick={onClick} className="hov" style={{ width: 34, height: 34, borderRadius: 10, border: '1px solid transparent', background: 'transparent', color: '#64748B', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', ...style }}><Icon n={icon} size={16} /></button>;
}

/* ---------- StatCard ---------- */
export function StatCard({ label, value, delta, trend = 'up' }: { label: string; value: string; delta?: string; trend?: 'up' | 'down' | 'flat' }) {
  const c = trend === 'up' ? '#15803D' : trend === 'down' ? '#DC2626' : '#64748B';
  const bg = trend === 'up' ? '#F0FDF4' : trend === 'down' ? '#FEE2E2' : '#F1F5F9';
  return (
    <div className="card" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <span style={{ font: '600 13px/1 var(--font-display)', color: '#64748B' }}>{label}</span>
      <span style={{ font: '800 30px/1 var(--font-display)', letterSpacing: '-.02em', fontVariantNumeric: 'tabular-nums' }}>{value}</span>
      {delta && <span style={{ alignSelf: 'flex-start', padding: '3px 8px', borderRadius: 999, background: bg, color: c, font: '700 12px/1 var(--font-display)' }}>{trend === 'up' ? '▲' : trend === 'down' ? '▼' : '—'} {delta}</span>}
    </div>
  );
}

/* ---------- ProgressRing ---------- */
export function ProgressRing({ value, size = 92, stroke = 9, color = '#5B4FD6', track = '#ECEBFD', sublabel }: { value: number; size?: number; stroke?: number; color?: string; track?: string; sublabel?: string }) {
  const r = (size - stroke) / 2, c = 2 * Math.PI * r;
  const [on, setOn] = useState(false);
  useMemo(() => { setTimeout(() => setOn(true), 30); }, []);
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={on ? c - value / 100 * c : c} style={{ transition: 'stroke-dashoffset 900ms var(--ease-out)' }} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
        <span style={{ font: `800 ${Math.round(size * .27)}px/1 var(--font-display)`, letterSpacing: '-.02em' }}>{value}</span>
        {sublabel && <span style={{ font: '600 10px/1 var(--font-display)', color: '#64748B', letterSpacing: '.04em', textTransform: 'uppercase' }}>{sublabel}</span>}
      </div>
    </div>
  );
}

/* ---------- Tabs (pill) ---------- */
export function PillTabs({ tabs, value, onChange }: { tabs: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ display: 'inline-flex', gap: 4, padding: 4, background: '#F1F5F9', borderRadius: 14 }}>
      {tabs.map(t => { const on = t === value; return <button key={t} type="button" onClick={() => onChange(t)} style={{ border: 0, cursor: 'pointer', padding: '8px 16px', borderRadius: 10, font: '600 13px/1 var(--font-display)', background: on ? '#fff' : 'transparent', color: on ? '#0F4C81' : '#64748B', boxShadow: on ? 'var(--shadow-sm)' : 'none', transition: 'all 140ms' }}>{t}</button>; })}
    </div>
  );
}

/* ---------- Inputs ---------- */
export function Input({ label, ...rest }: { label?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const [f, setF] = useState(false);
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && <span style={{ font: '600 13px/1 var(--font-display)', color: '#334155' }}>{label}</span>}
      <div style={{ display: 'flex', alignItems: 'center', height: 44, padding: '0 14px', background: '#fff', border: `1px solid ${f ? '#1E88E5' : '#CBD5E1'}`, borderRadius: 14, boxShadow: f ? 'var(--shadow-focus)' : 'none', transition: 'border-color 140ms, box-shadow 140ms' }}>
        <input onFocus={() => setF(true)} onBlur={() => setF(false)} {...rest} style={{ flex: 1, minWidth: 0, border: 0, outline: 0, background: 'transparent', font: '500 14px/1 var(--font-body)', color: '#0F172A' }} />
      </div>
    </label>
  );
}
export function Select({ label, options, defaultValue }: { label?: string; options: string[]; defaultValue?: string }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && <span style={{ font: '600 13px/1 var(--font-display)', color: '#334155' }}>{label}</span>}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', height: 44, background: '#fff', border: '1px solid #CBD5E1', borderRadius: 14 }}>
        <select defaultValue={defaultValue} style={{ appearance: 'none', flex: 1, border: 0, outline: 0, background: 'transparent', padding: '0 36px 0 14px', height: '100%', font: '500 14px/1 var(--font-body)', color: '#0F172A', cursor: 'pointer' }}>{options.map(o => <option key={o}>{o}</option>)}</select>
        <Icon n="chevron-down" size={14} style={{ position: 'absolute', right: 14, pointerEvents: 'none', color: '#94A3B8' }} />
      </div>
    </label>
  );
}
export function Toggle({ on, onChange, color = '#1E88E5', w = 38 }: { on: boolean; onChange?: (v: boolean) => void; color?: string; w?: number }) {
  const h = w === 38 ? 22 : 20, k = h - 6;
  return <button type="button" role="switch" aria-checked={on} onClick={() => onChange?.(!on)} style={{ width: w, height: h, borderRadius: 99, border: 0, padding: 0, background: on ? color : '#CBD5E1', position: 'relative', cursor: 'pointer', flexShrink: 0, transition: 'background 160ms' }}><span style={{ position: 'absolute', top: 3, left: on ? w - k - 3 : 3, width: k, height: k, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 2px rgba(0,0,0,.15)', transition: 'left 160ms var(--ease-out)' }} /></button>;
}
export function Check({ on, size = 15, onClick }: { on: boolean; size?: number; onClick?: (e: React.MouseEvent) => void }) {
  return <span role="checkbox" aria-checked={on} onClick={onClick} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: size, height: size, border: `1.5px solid ${on ? '#1E88E5' : '#CBD5E1'}`, borderRadius: size > 16 ? 6 : 4, background: on ? '#1E88E5' : '#fff', color: '#fff', cursor: 'pointer', flexShrink: 0 }}>{on && <Icon n="check" size={size - 5} />}</span>;
}
export const Eyebrow = ({ children, color = '#94A3B8', style }: { children: ReactNode; color?: string; style?: CSSProperties }) => <span className="eyebrow" style={{ color, ...style }}>{children}</span>;
export const Skel = ({ w = '100%', h = 10, style }: { w?: number | string; h?: number; style?: CSSProperties }) => <div className="sk" style={{ width: w, height: h, ...style }} />;
