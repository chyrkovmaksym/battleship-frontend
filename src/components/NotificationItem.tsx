import { Notification } from "@/features/notifications/notificationsSlice";
import { Check, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface NotificationItemProps {
  notification: Notification;
}

export function NotificationItem({ notification }: NotificationItemProps) {
  const navigate = useNavigate();

  const handleAcceptGameRequest = async () => {
    navigate(`/accept-friend-game-room/${notification.requestId}`);
  };

  return (
    <div className="flex items-start space-x-2 p-2 hover:bg-gray-100 rounded">
      {notification.isRead ? (
        <Check className="h-4 w-4 text-green-500 mt-1" />
      ) : (
        <Circle className="h-2 w-2 text-red-500 fill-red-500 mt-1" />
      )}
      <div className="flex-1">
        <p className="font-semibold">{`${notification.fromUser.firstName} ${notification.fromUser.lastName}`}</p>
        <p className="text-sm text-gray-600">{notification.content}</p>

        {notification.type === "gameRequest" && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleAcceptGameRequest}
            className="mt-2"
          >
            {"Accept"}
          </Button>
        )}
      </div>
    </div>
  );
}
