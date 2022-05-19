import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./features/dataSlice";
import settingsReducer from "./features/settingsSlice";

export const store = configureStore({
    reducer: {
        settings: settingsReducer,
        data: dataReducer
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch