import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Notification {
  _id: string;
  type: "friendRequest" | "gameRequest";
  content: string;
  fromUser: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  isRead: boolean;
  createdAt: string;
  requestId: string;
}

interface NotificationsState {
  list: Notification[];
}

const initialState: NotificationsState = {
  list: [],
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<Notification[]>) => {
      state.list = action.payload;
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.list.find((n) => n._id === action.payload);
      if (notification) {
        notification.isRead = true;
      }
    },
    deleteNotification: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((n) => n._id !== action.payload);
    },
  },
});

export const { setNotifications, markAsRead, deleteNotification } =
  notificationsSlice.actions;
export default notificationsSlice.reducer;
