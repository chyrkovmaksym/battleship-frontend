import { RootState } from "@/app/store";

export const selectCurrentUser = (state: RootState) => state.user.data;
