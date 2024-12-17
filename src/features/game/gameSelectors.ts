import { RootState } from "@/app/store";

export const selectGameState = (state: RootState) => state.game;

export const selectTurn = (state: RootState) => state.game.turn;

export const selectMyBoard = (state: RootState) => state.game.myBoard;

export const selectOpponentBoard = (state: RootState) =>
  state.game.opponentBoard;
