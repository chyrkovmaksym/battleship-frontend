import MainLayout from "@/layouts/MainLayout";
import RoomDetails from "@/components/RoomDetails";
import RoomManager from "@/components/RoomManager";
import { useEffect } from "react";
import { getSocket } from "@/lib/socketService";
import { useGetCurrentUserQuery } from "@/features/user/userApi";
import { useSendGameRequestMutation } from "@/features/game/gameApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const InviteFriendRoomPage = () => {
  const socket = getSocket();
  const { friendId } = useParams();
  const navigate = useNavigate();

  const { data: userData } = useGetCurrentUserQuery();
  const [sendGameRequest] = useSendGameRequestMutation();

  useEffect(() => {
    if (!userData) return;
    socket.emit("createRoom", { playerId: userData.user._id });

    socket.on("roomCreated", (data) => {
      const gameId = data.gameId;
      if (!gameId || !friendId) {
        navigate("/friends");
        toast({
          title: "Something went wrong",
          variant: "destructive",
        });
        return;
      }
      sendGameRequest({ gameId, toUserId: friendId });
    });

    return () => {
      socket.off("roomCreated");
    };
  }, [userData]);

  return (
    <MainLayout>
      <div className="max-w-md mx-auto mt-10">
        <RoomManager />
        <RoomDetails />
      </div>
    </MainLayout>
  );
};

export default InviteFriendRoomPage;
