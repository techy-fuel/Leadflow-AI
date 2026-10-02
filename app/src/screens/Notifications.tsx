import { useState } from 'react';
import { useGo } from '../nav';
import { NotificationsList } from './System';

export function Notifications() {
  const go = useGo();
  const [read, setRead] = useState(false);
  return (
    <div className="page" style={{ maxWidth: 720 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div><h1 className="h1">Notifications</h1><p className="sub">{read ? 'All caught up' : '2 unread'}</p></div>
        <button className="link" onClick={() => setRead(true)}>Mark all read</button>
      </div>
      <div className="card" style={{ overflow: 'hidden', opacity: read ? .85 : 1 }}><NotificationsList onAction={a => go(a === 'Reply' ? 'inbox' : 'detail')} /></div>
    </div>
  );
}
