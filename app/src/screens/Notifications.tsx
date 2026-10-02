import { useGo } from '../nav';
import { actions, ago, isOverdue, useStore } from '../store';
import { Empty } from '../modals';
import { NotificationsList, type NotifItem } from './System';

export function Notifications() {
  const go = useGo(); const leads = useStore(s => s.leads); const tasks = useStore(s => s.tasks); const readAt = useStore(s => s.notificationsReadAt);
  const items: NotifItem[] = [
    ...tasks.filter(isOverdue).map(t => ['clock', '#B45309', '#FEF7EA', 'Follow-up overdue', t.title, ago(t.dueAt!).replace(' ago', ''), '', t.dueAt! > readAt] as NotifItem),
    ...leads.filter(l => l.messages.length && l.messages[l.messages.length - 1].dir === 'in').map(l => ['message-circle', '#15803D', '#F0FDF4', `${l.name} replied`, l.messages[l.messages.length - 1].text, ago(l.lastActivityAt).replace(' ago', ''), 'Reply', l.lastActivityAt > readAt] as NotifItem),
    ...leads.filter(l => (l.score ?? 0) >= 85 && Date.now() - l.createdAt < 7 * 86400000).map(l => ['flame', '#DC2626', '#FEF2F2', 'High-intent lead', `${l.name} · ${l.source} · score ${l.score}`, ago(l.createdAt).replace(' ago', ''), 'Open lead', l.createdAt > readAt] as NotifItem),
  ];
  const unread = items.filter(i => i[7]).length;
  return (
    <div className="page" style={{ maxWidth: 720 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div><h1 className="h1">Notifications</h1><p className="sub">{unread ? `${unread} unread` : 'All caught up'}</p></div>
        {!!unread && <button className="link" onClick={actions.markNotificationsRead}>Mark all read</button>}
      </div>
      <div className="card" style={{ overflow: 'hidden' }}>
        {items.length ? <NotificationsList items={items} onAction={a => go(a === 'Reply' ? 'inbox' : 'leads')} /> : <Empty icon="bell" title="No notifications" text="Overdue follow-ups, replies and new high-intent leads show up here." />}
      </div>
    </div>
  );
}
