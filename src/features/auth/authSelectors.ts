import { RootState } from "@/app/store";

export const selectCurrentToken = (state: RootState) => state.auth.token;
