import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSocket } from "../../../lib/socketService";
import { setRoom } from "../../../features/room/roomSlice";
import { useGetCurrentUserQuery } from "@/features/user/userApi";
import { selectGameId, selectPlayers } from "@/features/room/roomSelectors";
import {
  createEmptyField,
  generateRandomField,
} from "@/lib/generateRandomField";
import { Button } from "@/components/ui/button";
import GameField from "@/components/ui/game-field";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const RoomManager: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const players = useSelector(selectPlayers);
  const gameId = useSelector(selectGameId);

  const socket = getSocket();
  const { data: userData } = useGetCurrentUserQuery();

  const [playerId, setPlayerId] = useState<string>("");
  const [gameIdInput, setGameIdInput] = useState<string>("");
  const [field, setField] = useState<string[][]>(createEmptyField());
  const [placedShips, setPlacedShips] = useState(false);
  const [isWaitingForOpponent, setIsWaitingForOpponent] = useState(false);

  const handleCreateRoom = () => {
    if (!playerId) return;
    socket.emit("createRoom", { playerId });
  };

  const handleJoinRoom = () => {
    if (!playerId) return;
    socket.emit("joinRoom", { gameId: gameIdInput, playerId });
  };

  const handleGenerateRandomField = () => {
    setPlacedShips(true);
    const field = generateRandomField();
    setField(field);
  };

  const handleStartGame = () => {
    if (!placedShips) return;
    socket.emit("submitBoard", { gameId, playerId, board: field });
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

    socket.on("waitingForOpponent", (data) => {
      toast({
        title: data.message,
      });
      setIsWaitingForOpponent(true);
    });

    socket.on("gameStarted", (data) => {
      toast({
        title: "Game started!",
      });
      navigate(`/online-game/${data.gameId}`);
    });

    return () => {
      socket.off("roomCreated");
      socket.off("playerJoined");
      socket.off("waitingForOpponent");
    };
  }, [userData, socket, dispatch]);

  useEffect(() => {
    socket.connect();
  }, []);

  return (
    <div className="p-4 space-y-4">
      {players.length < 2 ? (
        <>
          <Button variant="outline" onClick={handleCreateRoom}>
            Create Room
          </Button>

          <div>
            <input
              type="text"
              placeholder="Game ID"
              value={gameIdInput}
              onChange={(e) => setGameIdInput(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>

          <Button onClick={handleJoinRoom}>Join Room</Button>
        </>
      ) : !isWaitingForOpponent ? (
        <div className="flex flex-col items-center space-y-6">
          <GameField field={field} isPlayerBoard />
          <div className="flex flex-col space-y-3 w-full">
            <Button onClick={handleGenerateRandomField}>Generate field</Button>
            <Button onClick={handleStartGame}>Start</Button>
          </div>
        </div>
      ) : (
        <div>Waiting for the opponent to place the ships...</div>
      )}
    </div>
  );
};

export default RoomManager;
