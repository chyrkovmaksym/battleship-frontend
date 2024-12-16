import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  data: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  } | null;
}

const initialState: UserState = {
  data: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState["data"]>) {
      state.data = action.payload;
    },
    clearUser(state) {
      state.data = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
