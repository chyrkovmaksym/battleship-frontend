import MainLayout from "@/layouts/MainLayout";
import RoomDetails from "@/components/RoomDetails";
import { useEffect } from "react";
import { getSocket } from "@/lib/socketService";
import { useGetCurrentUserQuery } from "@/features/user/userApi";
import { useParams } from "react-router-dom";
import RoomManager from "@/components/RoomManager";

const AcceptFriendGameRoom = () => {
  const socket = getSocket();
  const { gameId } = useParams();

  const { data: userData } = useGetCurrentUserQuery();

  useEffect(() => {
    if (!userData) return;
    socket.emit("joinRoom", {
      gameId,
      playerId: userData.user._id,
    });
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

export default AcceptFriendGameRoom;
