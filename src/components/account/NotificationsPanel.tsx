import { useEffect, useState } from "react";
import {
  getNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "../../lib/notifications";

type Notification = {
  id: string;
  type: string;
  message: string;
  is_read: boolean;
  created_at: string;
  threads?: {
    slug: string;
    title: string;
  } | null;
};

export default function NotificationsPanel() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [message, setMessage] = useState("");

  async function loadNotifications() {
    try {
      const data = await getNotifications();
      setNotifications(data as Notification[]);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Benachrichtigungen konnten nicht geladen werden."
      );
    }
  }

  useEffect(() => {
    loadNotifications();
  }, []);

  async function handleClick(notification: Notification) {
    await markNotificationAsRead(notification.id);

    if (notification.threads?.slug) {
      window.location.href = `/forum/thread/${notification.threads.slug}`;
    }
  }

  async function handleMarkAllRead() {
    await markAllNotificationsAsRead();
    await loadNotifications();
  }

  const unreadCount = notifications.filter((item) => !item.is_read).length;

  return (
    <div className="notifications-panel">
      <div className="notifications-toolbar">
        <strong>
          {unreadCount === 1
            ? "1 ungelesene Benachrichtigung"
            : `${unreadCount} ungelesene Benachrichtigungen`}
        </strong>

        <button type="button" onClick={handleMarkAllRead}>
          Alle als gelesen markieren
        </button>
      </div>

      {message && <p className="form-message">{message}</p>}

      {notifications.length > 0 ? (
        <div className="notification-list">
          {notifications.map((notification) => (
            <button
              key={notification.id}
              type="button"
              className={
                notification.is_read
                  ? "notification-card"
                  : "notification-card unread"
              }
              onClick={() => handleClick(notification)}
            >
              <span>{notification.message}</span>

              {notification.threads?.title && (
                <strong>{notification.threads.title}</strong>
              )}

              <small>
                {new Date(notification.created_at).toLocaleString("de-DE")}
              </small>
            </button>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>Noch keine Benachrichtigungen</h3>
          <p>Wenn jemand auf deine Kommentare antwortet, erscheint es hier.</p>
        </div>
      )}
    </div>
  );
}