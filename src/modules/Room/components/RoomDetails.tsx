import { selectRoomState } from "@/features/room/roomSelectors";
import React from "react";
import { useSelector } from "react-redux";

const RoomDetails: React.FC = () => {
  const { gameId, players } = useSelector(selectRoomState);

  return (
    <div className="p-4">
      {gameId ? (
        <>
          <h2 className="text-xl font-bold">Game ID: {gameId}</h2>
          <ul className="list-disc list-inside">
            {players.map((player) => (
              <li key={player}>{player}</li>
            ))}
          </ul>
        </>
      ) : (
        <p>No room joined yet.</p>
      )}
    </div>
  );
};

export default RoomDetails;
