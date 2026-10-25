import { useEffect, useRef, useState } from "react";
import { getNotifications, markAllNotificationsAsRead, markNotificationAsRead } from "../../lib/notifications";

type Notification = {
  id: string; type: string; message: string; is_read: boolean; created_at: string;
  threads?: { slug: string; title: string } | null;
};

export default function NotificationsPanel() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [working, setWorking] = useState<string | null>(null);
  const busy = useRef(false);

  async function loadNotifications() {
    setLoading(true); setMessage(""); setLoadFailed(false);
    try {
      const data = await getNotifications();
      setNotifications(data.map(item => ({ ...item, threads: Array.isArray(item.threads) ? item.threads[0] ?? null : item.threads })));
    } catch {
      setLoadFailed(true);
      setMessage("Deine Benachrichtigungen konnten nicht geladen werden. Bitte versuche es erneut.");
    } finally { setLoading(false); }
  }
  useEffect(() => { void loadNotifications(); }, []);

  async function handleClick(notification: Notification) {
    if (busy.current) return;
    busy.current = true; setWorking(notification.id); setMessage("");
    try {
      if (!notification.is_read) {
        await markNotificationAsRead(notification.id);
        setNotifications(items => items.map(item => item.id === notification.id ? { ...item, is_read: true } : item));
      }
      if (notification.threads?.slug) window.location.href = `/forum/thread/${notification.threads.slug}`;
    } catch {
      setMessage("Die Benachrichtigung konnte nicht als gelesen markiert werden. Bitte versuche es erneut.");
    } finally { busy.current = false; setWorking(null); }
  }
  async function handleMarkAllRead() {
    if (busy.current) return;
    busy.current = true; setWorking("all"); setMessage("");
    try {
      await markAllNotificationsAsRead();
      setNotifications(items => items.map(item => ({ ...item, is_read: true })));
    } catch {
      setMessage("Die Benachrichtigungen konnten nicht als gelesen markiert werden. Bitte versuche es erneut.");
    } finally { busy.current = false; setWorking(null); }
  }
  const unreadCount = notifications.filter(item => !item.is_read).length;
  if (loading) return <div className="en-state" role="status"><p className="ed-kicker">Einen Moment</p><h2>Wir schauen nach.</h2><p>Deine Benachrichtigungen werden geladen …</p></div>;
  if (loadFailed) return <div className="en-state"><h2>Gerade nicht erreichbar.</h2><p role="alert">{message}</p><button className="ed-button" onClick={() => void loadNotifications()}>Erneut versuchen</button><a href="/account/login">Zum Einloggen</a></div>;
  return <div className="notifications-panel" aria-busy={working !== null}>
    <div className="notifications-toolbar">
      <div><p className="ed-kicker">Dein Posteingang</p><h2>Benachrichtigungen</h2><p role="status">{unreadCount === 1 ? "1 ungelesene Benachrichtigung" : `${unreadCount} ungelesene Benachrichtigungen`}</p></div>
      <button type="button" disabled={working !== null || unreadCount === 0} onClick={handleMarkAllRead}>{working === "all" ? "Wird markiert …" : "Alle als gelesen markieren"}</button>
    </div>
    {message && <p className="en-error" role="alert">{message}</p>}
    {notifications.length ? <ul className="notification-list">
      {notifications.map(notification => <li key={notification.id}>
        <button type="button" className={`notification-card${notification.is_read ? "" : " unread"}`} disabled={working !== null} onClick={() => handleClick(notification)}>
          <span className="en-meta"><span className="en-status">{notification.is_read ? "Gelesen" : "Ungelesen"}</span><time dateTime={notification.created_at}>{new Date(notification.created_at).toLocaleString("de-DE")}</time></span>
          <span>{notification.message}</span>
          {notification.threads?.title && <strong>{notification.threads.title}</strong>}
          <span className="en-action">{working === notification.id ? "Wird geöffnet …" : notification.threads?.slug ? "Zum Gespräch →" : notification.is_read ? "Bereits gelesen" : "Als gelesen markieren"}</span>
        </button>
      </li>)}
    </ul> : <div className="en-state"><p className="ed-kicker">Alles ruhig hier</p><h3>Noch keine Benachrichtigungen.</h3><p>Wenn jemand auf deine Kommentare antwortet, findest du die Nachricht hier.</p><a className="ed-button" href="/forum">Zum Forum <span aria-hidden="true">→</span></a></div>}
    {notifications.length > 0 && <p className="en-footnote">Hier siehst du bis zu 30 deiner neuesten Benachrichtigungen.</p>}
  </div>;
}
