import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface FriendsState {
  list: User[];
  allUsers: User[];
}

const initialState: FriendsState = {
  list: [],
  allUsers: [],
};

const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    setFriendsList: (state, action: PayloadAction<User[]>) => {
      state.list = action.payload;
    },
    setAllUsers: (state, action: PayloadAction<User[]>) => {
      state.allUsers = action.payload;
    },
  },
});

export const { setFriendsList, setAllUsers } = friendsSlice.actions;
export default friendsSlice.reducer;
