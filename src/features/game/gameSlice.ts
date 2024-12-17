import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GameState {
  myBoard: string[][] | null;
  opponentBoard: string[][] | null;
  turn: string | null;
}

const initialState: GameState = {
  myBoard: null,
  opponentBoard: null,
  turn: null,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGameState(state, action: PayloadAction<GameState>) {
      state.myBoard = action.payload.myBoard;
      state.opponentBoard = action.payload.opponentBoard;
      state.turn = action.payload.turn;
    },
    setBoard(
      state,
      action: PayloadAction<{
        isMyBoard: boolean;
        board: string[][];
      }>
    ) {
      const { isMyBoard, board } = action.payload;
      if (isMyBoard) {
        state.myBoard = board;
      } else {
        state.opponentBoard = board;
      }
    },
    setTurn(state, action: PayloadAction<string>) {
      state.turn = action.payload;
    },
    resetGame(state) {
      state.myBoard = null;
      state.opponentBoard = null;
      state.turn = null;
    },
  },
});

export const { setGameState, setBoard, setTurn, resetGame } = gameSlice.actions;

export default gameSlice.reducer;
