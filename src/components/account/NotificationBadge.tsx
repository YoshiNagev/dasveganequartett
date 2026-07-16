import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import {
  getNotifications,
  markNotificationAsRead,
} from "../../lib/notifications";

type Notification = {
  id: string;
  message: string;
  is_read: boolean;
  created_at: string;
  threads?: {
    slug: string;
    title: string;
  } | null;
};

export default function NotificationBadge() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);

  async function loadNotifications() {
    const { data: sessionData } = await supabase.auth.getSession();
    const user = sessionData.session?.user;

    if (!user) {
      setIsLoggedIn(false);
      setNotifications([]);
      return;
    }

    setIsLoggedIn(true);

    const data = await getNotifications();
    setNotifications(data as Notification[]);
  }

  useEffect(() => {
    let userId: string | null = null;

    async function setup() {
      const { data } = await supabase.auth.getSession();
      userId = data.session?.user?.id ?? null;

      await loadNotifications();

      if (!userId) return;

      const channel = supabase
        .channel(`notifications-${userId}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "notifications",
            filter: `user_id=eq.${userId}`,
          },
          () => {
            loadNotifications();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }

    const cleanupPromise = setup();

    return () => {
      cleanupPromise.then((cleanup) => {
        if (cleanup) cleanup();
      });
    };
  }, []);

  async function openNotification(notification: Notification) {
    await markNotificationAsRead(notification.id);

    if (notification.threads?.slug) {
      window.location.href = `/forum/thread/${notification.threads.slug}`;
    } else {
      window.location.href = "/account/notifications";
    }
  }

  if (!isLoggedIn) return null;

  const unreadCount = notifications.filter((item) => !item.is_read).length;
  const latestNotifications = notifications.slice(0, 5);

  return (
    <div className="notification-dropdown-wrapper">
      <button
        type="button"
        className="notification-badge-link"
        onClick={() => setOpen((value) => !value)}
      >
        Hinweise
        {unreadCount > 0 && (
          <span className="notification-badge-count">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="notification-dropdown">
          <div className="notification-dropdown-header">
            <strong>Hinweise</strong>
            <a href="/account/notifications">Alle ansehen</a>
          </div>

          {latestNotifications.length > 0 ? (
            <div className="notification-dropdown-list">
              {latestNotifications.map((notification) => (
                <button
                  key={notification.id}
                  type="button"
                  className={
                    notification.is_read
                      ? "notification-dropdown-item"
                      : "notification-dropdown-item unread"
                  }
                  onClick={() => openNotification(notification)}
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
            <p className="notification-dropdown-empty">
              Noch keine Hinweise.
            </p>
          )}
        </div>
      )}
    </div>
  );
}