import { Button } from "@/components/ui/button";
import MainLayout from "@/layouts/MainLayout";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <MainLayout>
      <div className="bg-gradient-to-r flex flex-col justify-center">
        <div className="container mx-auto text-center py-16 px-6">
          <img
            src="/logo.svg"
            alt="Battleship Logo"
            className="w-20 h-20 mx-auto mb-6"
          />

          <h1 className="text-4xl sm:text-5xl font-semibold mb-8">
            Welcome to Battleship
          </h1>

          <p className="text-lg sm:text-xl mb-20">
            Experience the classic naval combat game! Challenge your friends or
            play against the AI in this action-packed, strategic game.
          </p>

          <div className="bg-white text-black p-6 shadow-lg rounded-lg mx-auto max-w-lg border">
            <p className="text-base sm:text-lg mb-4">
              Battleship is a game of strategy where you place your fleet on a
              grid and attempt to sink your opponent's ships before they sink
              yours!
            </p>

            <Link to="/room">
              <Button>Start a Game</Button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;
