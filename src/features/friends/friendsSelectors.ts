import { RootState } from "@/app/store";

export const selectFriends = (state: RootState) => state.friends.list;
export const selectAllUsers = (state: RootState) => state.friends.allUsers;
