import { configureStore } from "@reduxjs/toolkit";
import events from "./events";
export const store = configureStore({
  reducer: { events },
});
