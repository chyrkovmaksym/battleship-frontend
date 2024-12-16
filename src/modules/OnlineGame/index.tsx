import React, { useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import GameField from "@/components/ui/game-field";
import { generateRandomField } from "@/lib/generateRandomField";

// Dummy data for the fields, this should come from the game state in your actual app
const playerField = generateRandomField();
const opponentField = generateRandomField();

const OnlineGamePage = () => {
  const [clickedCoordinates, setClickedCoordinates] = useState<string | null>(
    null
  );

  const handleCellClick = (x: number, y: number) => {
    setClickedCoordinates(`Player clicked on cell: (${x}, ${y})`);
    // Here you can emit an event to the backend or handle the logic as per your game flow
  };

  return (
    <MainLayout>
      <div className="flex flex-col items-center space-y-6">
        <h1 className="text-xl font-bold">BattleShip Game</h1>
        <div className="flex space-x-4">
          <div>
            <h2 className="text-lg font-semibold">Your Board</h2>
            <GameField field={playerField} isPlayerBoard={true} />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Opponent's Board</h2>
            <GameField
              field={opponentField}
              isPlayerBoard={false}
              onCellClick={handleCellClick}
            />
            {clickedCoordinates && (
              <div className="mt-4 text-sm text-gray-700">
                {clickedCoordinates}
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default OnlineGamePage;
