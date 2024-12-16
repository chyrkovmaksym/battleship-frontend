import { RootState } from "@/app/store";

export const selectRoomState = (state: RootState) => state.room;
export const selectGameId = (state: RootState) => state.room.gameId;
export const selectPlayers = (state: RootState) => state.room.players;
