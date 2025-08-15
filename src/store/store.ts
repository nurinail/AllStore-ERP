import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "../features/globalSlice ";

export const store = configureStore({
  reducer: {
    globalSlice: globalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
