import { useEffect, useState, type ReactNode } from 'react';
import { Nav, SCREENS, type Screen } from './nav';
import { Avatar, Icon } from './ui';
import { Dashboard } from './screens/Dashboard';
import { Leads, LeadDetail } from './screens/Leads';
import { Pipeline } from './screens/Pipeline';
import { Inbox } from './screens/Inbox';
import { Tasks, Calendar } from './screens/Tasks';
import { Automations, Builder } from './screens/Automations';
import { Assistant } from './screens/Assistant';
import { Analytics } from './screens/Analytics';
import { Integrations, Team, SettingsScreen } from './screens/Admin';
import { Landing, Login, Onboarding } from './screens/Marketing';
import { System } from './screens/System';
import { Notifications } from './screens/Notifications';

const groups: { label: string; items: [Screen, string, string, number?][] }[] = [
  { label: 'MAIN', items: [['dashboard', 'Dashboard', 'layout-dashboard'], ['leads', 'Leads', 'users', 248], ['pipeline', 'Pipeline', 'kanban'], ['inbox', 'Inbox', 'inbox', 6], ['tasks', 'Tasks', 'circle-check-big', 7], ['calendar', 'Calendar', 'calendar-days']] },
  { label: 'AI', items: [['assistant', 'AI Assistant', 'sparkles'], ['automations', 'Automations', 'workflow'], ['insights', 'AI Insights', 'lightbulb']] },
  { label: 'ANALYTICS', items: [['analytics', 'Analytics', 'chart-column'], ['reports', 'Reports', 'file-chart-column']] },
  { label: 'SETTINGS', items: [['integrations', 'Integrations', 'blocks'], ['team', 'Team', 'users-round'], ['settings', 'Settings', 'settings']] },
];
const activeOf: Partial<Record<Screen, Screen>> = { detail: 'leads', builder: 'automations', billing: 'settings' };
const commands: [string, string, string, Screen, string][] = [
  ['Search leads…', 'search', '#64748B', 'leads', 'Leads'], ['Create lead', 'user-plus', '#0F4C81', 'leads', '⌘N'], ['Create task', 'circle-plus', '#0F4C81', 'tasks', 'T'],
  ['Open pipeline', 'kanban', '#64748B', 'pipeline', 'G P'], ['Generate AI reply', 'sparkles', '#5B4FD6', 'inbox', 'AI'], ['Create automation', 'workflow', '#5B4FD6', 'builder', 'AI'],
  ['Open analytics', 'chart-column', '#64748B', 'analytics', 'G A'], ['Settings', 'settings', '#64748B', 'settings', 'G S'], ['View landing page', 'globe', '#64748B', 'landing', ''], ['Design system & mobile', 'swatch-book', '#64748B', 'system', ''],
];
const mobileTabs: [Screen | 'more', string, string][] = [['dashboard', 'Home', 'house'], ['leads', 'Leads', 'users'], ['inbox', 'Inbox', 'inbox'], ['tasks', 'Tasks', 'circle-check-big'], ['more', 'More', 'menu']];

const fromHash = (): Screen => { const h = location.hash.slice(1) as Screen; return SCREENS.includes(h) ? h : 'landing'; };

export function App() {
  const [screen, setScreen] = useState<Screen>(fromHash);
  const [collapsed, setCollapsed] = useState(false);
  const [cmd, setCmd] = useState(false);
  const [q, setQ] = useState('');
  const [more, setMore] = useState(false);
  const go = (s: Screen) => { setScreen(s); setCmd(false); setMore(false); location.hash = s; };
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setCmd(c => !c); setQ(''); }
      if (e.key === 'Escape') setCmd(false);
    };
    const h = () => setScreen(fromHash());
    window.addEventListener('keydown', k); window.addEventListener('hashchange', h);
    return () => { window.removeEventListener('keydown', k); window.removeEventListener('hashchange', h); };
  }, []);
  useEffect(() => { document.getElementById('scroll')?.scrollTo(0, 0); }, [screen]);

  const inApp = !['landing', 'login', 'onboarding', 'system'].includes(screen);
  const act = activeOf[screen] ?? screen;
  const filtered = commands.filter(c => c[0].toLowerCase().includes(q.toLowerCase()));

  let body: ReactNode;
  switch (screen) {
    case 'landing': body = <Landing />; break;
    case 'login': body = <Login />; break;
    case 'onboarding': body = <Onboarding />; break;
    case 'system': body = <System />; break;
    case 'notifications': body = <Notifications />; break;
    case 'dashboard': body = <Dashboard />; break;
    case 'leads': body = <Leads />; break;
    case 'detail': body = <LeadDetail />; break;
    case 'pipeline': body = <Pipeline />; break;
    case 'inbox': body = <Inbox />; break;
    case 'tasks': body = <Tasks />; break;
    case 'calendar': body = <Calendar />; break;
    case 'automations': body = <Automations />; break;
    case 'builder': body = <Builder />; break;
    case 'assistant': body = <Assistant />; break;
    case 'insights': case 'analytics': case 'reports': body = <Analytics kind={screen} />; break;
    case 'integrations': body = <Integrations />; break;
    case 'team': body = <Team />; break;
    case 'settings': case 'billing': body = <SettingsScreen billing={screen === 'billing'} />; break;
  }

  return (
    <Nav.Provider value={go}>
      <style>{`.side{display:flex}.bottom{display:none}.topbar-search{display:flex}@media(max-width:900px){.side{display:none}.bottom{display:grid}.topbar-search span.ph{display:none}}`}</style>
      <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#F8FAFC' }}>
        {inApp && (
          <aside className="side" style={{ width: collapsed ? 72 : 248, flexShrink: 0, background: '#fff', borderRight: '1px solid #E5E7EB', flexDirection: 'column', transition: 'width 220ms cubic-bezier(.16,1,.3,1)', overflow: 'hidden' }}>
            <div style={{ height: 64, display: 'flex', alignItems: 'center', gap: 10, padding: '0 18px', borderBottom: '1px solid #F1F5F9' }}>
              <div style={{ width: 30, height: 30, borderRadius: 9, background: '#0F4C81', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative' }}>
                <Icon n="waves" size={16} style={{ color: '#fff' }} />
                <span style={{ position: 'absolute', right: -2, top: -2, width: 9, height: 9, borderRadius: '50%', background: '#5B4FD6', border: '2px solid #fff' }} />
              </div>
              {!collapsed && <div style={{ font: '800 14px/1 var(--font-display)', letterSpacing: '.06em', whiteSpace: 'nowrap' }}>LEADFLOW <span style={{ color: '#5B4FD6' }}>AI</span></div>}
            </div>
            {!collapsed && (
              <div style={{ margin: '14px 14px 4px', padding: '8px 10px', border: '1px solid #E5E7EB', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                <div style={{ width: 26, height: 26, borderRadius: 7, background: '#F1F5F9', color: '#0F4C81', font: '700 11px/26px var(--font-display)', textAlign: 'center' }}>AD</div>
                <div style={{ flex: 1, minWidth: 0 }}><div style={{ font: '500 10px/1.2 var(--font-body)', color: '#64748B' }}>Workspace</div><div style={{ font: '600 13px/1.3 var(--font-display)' }}>Acme Digital</div></div>
                <Icon n="chevrons-up-down" size={14} style={{ color: '#94A3B8' }} />
              </div>
            )}
            <nav style={{ flex: 1, overflowY: 'auto', padding: '6px 10px 10px' }}>
              {groups.map(g => (
                <div key={g.label} style={{ marginTop: 14 }}>
                  {!collapsed && <div style={{ font: '700 10px/1 var(--font-display)', letterSpacing: '.08em', color: '#94A3B8', padding: '0 10px 8px' }}>{g.label}</div>}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {g.items.map(([id, label, icon, count]) => {
                      const on = act === id, ai = g.label === 'AI';
                      return (
                        <div key={id} onClick={() => go(id)} title={label} className="navitem" style={{ display: 'flex', alignItems: 'center', gap: 10, height: 34, padding: '0 10px', borderRadius: 9, cursor: 'pointer', background: on ? (ai ? '#F4F3FF' : '#EEF5FD') : 'transparent', color: on ? (ai ? '#5B4FD6' : '#0F4C81') : '#475569', font: `${on ? 600 : 500} 13.5px/1 var(--font-display)`, whiteSpace: 'nowrap' }}>
                          <Icon n={icon} size={17} />
                          {!collapsed && <span style={{ flex: 1 }}>{label}</span>}
                          {!collapsed && count && <span style={{ font: '600 11px/1 var(--font-display)', padding: '3px 7px', borderRadius: 99, background: '#F1F5F9', color: '#475569' }}>{count}</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>
            <div style={{ borderTop: '1px solid #F1F5F9', padding: 10, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <div className="navitem" style={{ display: 'flex', alignItems: 'center', gap: 10, height: 34, padding: '0 10px', borderRadius: 9, color: '#475569', font: '500 13.5px/1 var(--font-display)', cursor: 'pointer', whiteSpace: 'nowrap' }}><Icon n="life-buoy" size={17} />{!collapsed && <span>Help &amp; Support</span>}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 8px', borderRadius: 10 }}>
                <Avatar name="Sarah Mitchell" size={30} status="online" />
                {!collapsed && <div style={{ flex: 1, minWidth: 0, whiteSpace: 'nowrap' }}><div style={{ font: '600 13px/1.2 var(--font-display)' }}>Sarah Mitchell</div><div style={{ font: '500 11px/1.3 var(--font-body)', color: '#64748B' }}>Owner</div></div>}
                <button onClick={() => setCollapsed(c => !c)} title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} className="navitem" style={{ width: 26, height: 26, borderRadius: 7, border: 0, background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B', cursor: 'pointer' }}><Icon n="panel-left" size={15} /></button>
              </div>
            </div>
          </aside>
        )}
        <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {inApp && (
            <header style={{ height: 64, flexShrink: 0, background: '#fff', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', gap: 12, padding: '0 20px' }}>
              <div className="topbar-search" onClick={() => { setCmd(true); setQ(''); }} style={{ flex: 1, maxWidth: 440, height: 38, border: '1px solid #E5E7EB', borderRadius: 11, background: '#F8FAFC', alignItems: 'center', gap: 10, padding: '0 12px', cursor: 'text', color: '#94A3B8' }}>
                <Icon n="search" size={15} />
                <span style={{ flex: 1, font: '500 13px/1 var(--font-body)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Search leads, companies, conversations…</span>
                <span className="ph" style={{ font: '600 11px/1 var(--font-mono)', color: '#64748B', border: '1px solid #E5E7EB', background: '#fff', padding: '3px 6px', borderRadius: 6 }}>⌘K</span>
              </div>
              <div style={{ flex: 1 }} />
              <div className="hide-sm" style={{ height: 36, display: 'flex', alignItems: 'center', gap: 8, padding: '0 12px', border: '1px solid #E5E7EB', borderRadius: 10, font: '600 13px/1 var(--font-display)', color: '#334155', cursor: 'pointer', whiteSpace: 'nowrap' }}><Icon n="calendar" size={15} style={{ color: '#64748B' }} />Last 30 days<Icon n="chevron-down" size={14} style={{ color: '#94A3B8' }} /></div>
              <div onClick={() => go('notifications')} title="Notifications" className="navitem" style={{ position: 'relative', width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569', cursor: 'pointer' }}><Icon n="bell" size={18} /><span style={{ position: 'absolute', top: 8, right: 9, width: 7, height: 7, borderRadius: '50%', background: '#EF4444', border: '1.5px solid #fff' }} /></div>
              <div onClick={() => go('assistant')} style={{ height: 36, display: 'flex', alignItems: 'center', gap: 8, padding: '0 12px', borderRadius: 10, background: '#F4F3FF', border: '1px solid #DEDBFB', color: '#5B4FD6', font: '600 13px/1 var(--font-display)', cursor: 'pointer', whiteSpace: 'nowrap' }}><Icon n="sparkles" size={15} />Ask AI</div>
              <Avatar name="Sarah Mitchell" size={34} />
            </header>
          )}
          <div id="scroll" style={{ flex: 1, overflowY: 'auto', paddingBottom: inApp ? undefined : 0 }}>
            <div key={screen} style={{ animation: 'lfIn 200ms cubic-bezier(.16,1,.3,1)', height: ['pipeline', 'inbox', 'builder', 'assistant'].includes(screen) ? '100%' : undefined, minHeight: '100%' }}>{body}</div>
          </div>
          {inApp && (
            <nav className="bottom" style={{ height: 64, background: '#fff', borderTop: '1px solid #E5E7EB', gridTemplateColumns: 'repeat(5,1fr)', flexShrink: 0 }}>
              {mobileTabs.map(([id, l, i]) => <div key={id} onClick={() => id === 'more' ? setMore(m => !m) : go(id)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, color: (id === 'more' ? more : act === id) ? '#0F4C81' : '#94A3B8', font: '600 10.5px/1 var(--font-display)', cursor: 'pointer' }}><Icon n={i} size={21} />{l}</div>)}
            </nav>
          )}
        </main>
        {more && (
          <div className="bottom" onClick={() => setMore(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,.36)', zIndex: 40, alignItems: 'flex-end' }}>
            <div onClick={e => e.stopPropagation()} style={{ width: '100%', background: '#fff', borderRadius: '24px 24px 0 0', padding: '10px 18px 80px', animation: 'lfIn 180ms', maxHeight: '80vh', overflowY: 'auto' }}>
              <span style={{ display: 'block', margin: '0 auto 12px', width: 40, height: 5, borderRadius: 3, background: '#CBD5E1' }} />
              {([['calendar', 'Calendar', 'calendar-days'], ['pipeline', 'Pipeline', 'kanban'], ['assistant', 'AI Assistant', 'sparkles'], ['automations', 'Automations', 'workflow'], ['analytics', 'Analytics', 'chart-column'], ['notifications', 'Notifications', 'bell'], ['integrations', 'Integrations', 'blocks'], ['team', 'Team', 'users-round'], ['settings', 'Settings', 'settings']] as [Screen, string, string][]).map(([id, l, i]) => <div key={id} onClick={() => go(id)} style={{ height: 50, display: 'flex', alignItems: 'center', gap: 14, padding: '0 8px', font: '600 15px/1 var(--font-display)', borderRadius: 12 }}><Icon n={i} size={19} style={{ color: '#64748B' }} />{l}</div>)}
            </div>
          </div>
        )}
        {cmd && (
          <div onClick={() => setCmd(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,.32)', display: 'flex', justifyContent: 'center', paddingTop: '14vh', zIndex: 50 }}>
            <div onClick={e => e.stopPropagation()} style={{ width: 600, maxWidth: '92vw', height: 'max-content', background: '#fff', borderRadius: 18, boxShadow: '0 24px 64px rgba(15,23,42,.24)', overflow: 'hidden', animation: 'lfIn 180ms cubic-bezier(.16,1,.3,1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 18px', borderBottom: '1px solid #F1F5F9' }}>
                <Icon n="search" size={18} style={{ color: '#94A3B8' }} />
                <input autoFocus value={q} onChange={e => setQ(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && filtered[0]) go(filtered[0][3]); }} placeholder="Search leads or type a command…" style={{ flex: 1, border: 0, outline: 0, font: '500 15px/1 var(--font-body)', background: 'transparent' }} />
                <span style={{ font: '600 11px/1 var(--font-mono)', color: '#64748B', border: '1px solid #E5E7EB', padding: '3px 6px', borderRadius: 6 }}>ESC</span>
              </div>
              <div style={{ padding: 8 }}>
                <div style={{ font: '700 10px/1 var(--font-display)', letterSpacing: '.08em', color: '#94A3B8', padding: '10px 10px 6px' }}>COMMANDS</div>
                {filtered.map(([label, icon, color, to, hint], i) => (
                  <div key={label} onClick={() => go(to)} className="navitem" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 10, borderRadius: 10, cursor: 'pointer', background: i === 0 ? '#F8FAFC' : 'transparent' }}>
                    <Icon n={icon} size={16} style={{ color }} /><span style={{ flex: 1, font: '500 14px/1 var(--font-body)' }}>{label}</span><span style={{ font: '500 12px/1 var(--font-body)', color: '#94A3B8' }}>{hint}</span>
                  </div>
                ))}
                {!filtered.length && <div style={{ padding: 20, textAlign: 'center', font: '500 13px/1 var(--font-body)', color: '#94A3B8' }}>No results</div>}
              </div>
              <div style={{ display: 'flex', gap: 16, padding: '10px 18px', borderTop: '1px solid #F1F5F9', font: '500 11px/1 var(--font-body)', color: '#94A3B8' }}><span>↑↓ Navigate</span><span>↵ Open</span><span>⌘K Toggle</span></div>
            </div>
          </div>
        )}
      </div>
      <style>{`.navitem:hover{background:#F1F5F9}`}</style>
    </Nav.Provider>
  );
}
