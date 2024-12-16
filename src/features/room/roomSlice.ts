import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RoomState {
  gameId: string | null;
  players: string[];
}

const initialState: RoomState = {
  gameId: null,
  players: [],
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRoom(
      state,
      action: PayloadAction<{ gameId: string; players: string[] }>
    ) {
      state.gameId = action.payload.gameId;
      state.players = action.payload.players;
    },
  },
});

export const { setRoom } = roomSlice.actions;

export default roomSlice.reducer;
