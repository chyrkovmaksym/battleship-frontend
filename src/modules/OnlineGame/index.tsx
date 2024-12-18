import MainLayout from "@/layouts/MainLayout";
import GameField from "@/components/ui/game-field";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMyBoard,
  selectOpponentBoard,
  selectTurn,
} from "@/features/game/gameSelectors";
import { selectCurrentUser } from "@/features/user/userSelectors";
import { toast } from "@/hooks/use-toast";
import { useParams } from "react-router-dom";
import { getSocket } from "@/lib/socketService";
import { useEffect, useState } from "react";
import { setBoard, setTurn } from "@/features/game/gameSlice";
import { mergeUpdatedBoard } from "@/lib/mergeBoards";
import GameResult from "./components/GameResult";

const OnlineGamePage = () => {
  const myBoard = useSelector(selectMyBoard);
  const opponentBoard = useSelector(selectOpponentBoard);
  const playerTurn = useSelector(selectTurn);
  const user = useSelector(selectCurrentUser);

  const [gameResults, setGameResults] = useState<{
    isPlayerWinner: boolean;
  } | null>(null);

  const socket = getSocket();

  const dispatch = useDispatch();

  const { gameId } = useParams();

  const handleCellClick = (x: number, y: number) => {
    if (playerTurn !== user?.id) {
      toast({
        title: "It's not your turn",
      });
      return;
    }
    socket.emit("makeMove", { gameId: gameId || "", playerId: user.id, x, y });
  };

  const handleUpdateBoard = (data: {
    boards: { updatedBoard: string[][] };
    result: string;
    turn: string;
  }) => {
    if (!myBoard) return;

    const {
      boards: { updatedBoard },
      result,
      turn,
    } = data;
    toast({
      title: result,
    });
    dispatch(setTurn(turn));
    if (
      (turn === user?.id && result === "miss") ||
      (turn !== user?.id && result !== "miss")
    ) {
      dispatch(
        setBoard({
          board: mergeUpdatedBoard(myBoard, updatedBoard),
          isMyBoard: true,
        })
      );
    } else {
      dispatch(setBoard({ board: updatedBoard, isMyBoard: false }));
    }
  };

  useEffect(() => {
    if (!myBoard) return;

    socket.on("moveMade", handleUpdateBoard);

    socket.on("gameOver", (data) => {
      const { winner, ...moveData } = data;
      toast({
        title: "Game over!",
      });
      handleUpdateBoard(moveData);
      setGameResults({ isPlayerWinner: winner === user?.id });
    });

    return () => {
      socket.off("moveMade");
      socket.off("gameOver");
    };
  }, [socket, myBoard, user?.id, dispatch]);

  return (
    <MainLayout>
      {gameResults ? (
        <GameResult
          isWinner={gameResults.isPlayerWinner}
        />
      ) : (
        <div className="flex flex-col items-center space-y-6">
          <h1 className="text-xl font-bold">BattleShip Game</h1>
          <h6 className="text-xl font-bold">
            {playerTurn === user?.id ? "Your turn" : "Opponent's turn"}
          </h6>
          <div className="flex space-x-4">
            <div>
              <h2 className="text-lg font-semibold">Your Board</h2>
              <GameField field={myBoard || []} isPlayerBoard={true} />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Opponent's Board</h2>
              <GameField
                field={opponentBoard || []}
                isPlayerBoard={false}
                onCellClick={handleCellClick}
              />
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default OnlineGamePage;
