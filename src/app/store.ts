import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "../features/auth/authSlice";
import friendsReducer from "../features/friends/friendsSlice";
import roomReducer from "../features/room/roomSlice";
import userReducer from "../features/user/userSlice";
import gameReducer from "../features/game/gameSlice";

const authPersistConfig = {
  key: "auth",
  storage,
};

const userPersistConfig = {
  key: "user",
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    friends: friendsReducer,
    room: roomReducer,
    user: persistedUserReducer,
    game: gameReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(api.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
