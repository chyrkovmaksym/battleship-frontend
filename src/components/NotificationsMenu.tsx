import { useState, useEffect, useRef } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NotificationItem } from "./NotificationItem";
import {
  useGetNotificationsQuery,
  useMarkNotificationAsReadMutation,
} from "@/features/notifications/notificationsApi";

export function NotificationsMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const { data: notifications, refetch: refetchNotifications } =
    useGetNotificationsQuery();

  const menuRef = useRef<HTMLDivElement>(null);

  const unreadNotifications = notifications?.filter((n) => !n.isRead);
  const unreadCount = unreadNotifications?.length;

  const [markNotificationAsRead] = useMarkNotificationAsReadMutation();

  const observer = useRef<IntersectionObserver | null>(null);

  const handleMarkAsRead = (notificationId: string) => {
    markNotificationAsRead({ notificationId })
      .unwrap()
      .then(() => {
        console.log("Notification marked as read");
      })
      .catch((error) => {
        console.error("Error marking notification as read", error);
      });
  };

  useEffect(() => {
    if (!isOpen) return;

    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const notificationId = entry.target.getAttribute("data-id");
            if (
              notificationId &&
              unreadNotifications?.some((item) => item._id === notificationId)
            ) {
              handleMarkAsRead(notificationId);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    const notificationItems = document.querySelectorAll(".notification-item");
    notificationItems.forEach((item) => observer.current?.observe(item));

    return () => {
      observer.current?.disconnect();
    };
  }, [isOpen, notifications]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  useEffect(() => {
    refetchNotifications();
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Bell className="h-[1.2rem] w-[1.2rem]" />
        {unreadCount && unreadCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]"
          >
            {unreadCount}
          </Badge>
        )}
      </Button>
      {isOpen && (
        <Card className="absolute right-0 mt-2 w-80 max-h-[400px] overflow-y-auto p-4 shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Notifications</h3>
          {notifications && notifications.length > 0 ? (
            <ul className="space-y-2">
              {notifications.map((notification) => (
                <li
                  key={notification._id}
                  data-id={notification._id}
                  className="notification-item"
                >
                  <NotificationItem notification={notification} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No notifications</p>
          )}
        </Card>
      )}
    </div>
  );
}
