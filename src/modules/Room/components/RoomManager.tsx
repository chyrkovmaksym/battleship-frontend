import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSocket } from "../../../services/socketService";
import { setRoom } from "../../../features/room/roomSlice";
import { useGetCurrentUserQuery } from "@/features/user/userApi";
import { selectPlayers } from "@/features/room/roomSelectors";
// import { useNavigate } from "react-router-dom";

const RoomManager: React.FC = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const players = useSelector(selectPlayers);

  const socket = getSocket();
  const { data: userData } = useGetCurrentUserQuery();

  const [playerId, setPlayerId] = useState<string>("");
  const [gameId, setGameId] = useState<string>("");

  const handleCreateRoom = () => {
    if (!playerId) return;
    socket.emit("createRoom", { playerId });
  };

  const handleJoinRoom = () => {
    if (!playerId) return;
    socket.emit("joinRoom", { gameId, playerId });
  };

  useEffect(() => {
    if (!userData) return;
    setPlayerId(userData.user._id);

    socket.on("roomCreated", (data) => {
      dispatch(setRoom({ gameId: data.gameId, players: [userData.user._id] }));
    });

    socket.on("playerJoined", (data) => {
      dispatch(setRoom({ gameId: data.gameId, players: data.players }));
    });

    return () => {
      socket.off("roomCreated");
      socket.off("playerJoined");
    };
  }, [userData, socket, dispatch]);

  useEffect(() => {
    socket.connect();
  }, []);

  return (
    <div className="p-4 space-y-4">
      {players.length < 2 ? (
        <>
          <button
            onClick={handleCreateRoom}
            className="bg-blue-500 text-white py-2 px-4 rounded w-full"
          >
            Create Room
          </button>

          <div>
            <input
              type="text"
              placeholder="Game ID"
              value={gameId}
              onChange={(e) => setGameId(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>

          <button
            onClick={handleJoinRoom}
            className="bg-green-500 text-white py-2 px-4 rounded w-full"
          >
            Join Room
          </button>
        </>
      ) : (
        <div>Place your ships</div>
      )}
    </div>
  );
};

export default RoomManager;
