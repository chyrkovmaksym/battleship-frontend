import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ResultProps {
  isWinner: boolean;
}

const GameResult = ({ isWinner }: ResultProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
      <div className="bg-white rounded-lg shadow-xl w-11/12 max-w-md p-6 text-center flex flex-col gap-3">
        {isWinner ? (
          <div>
            <h1 className="text-4xl font-bold text-green-500">
              🎉 You Won! 🎉
            </h1>
            <p className="mt-4 text-lg text-gray-700">
              Congratulations on your strategic victory! 🛳️
            </p>
          </div>
        ) : (
          <div>
            <h1 className="text-4xl font-bold text-red-500">💔 You Lost 💔</h1>
            <p className="mt-4 text-lg text-gray-700">
              Better luck next time! Keep practicing your tactics. 💪
            </p>
          </div>
        )}

        <Link to="/room">
          <Button>Play again</Button>
        </Link>
      </div>
    </div>
  );
};

export default GameResult;
