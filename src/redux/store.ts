import {configureStore} from "@reduxjs/toolkit";
import {headerReducer, moviesReducer, themeReducer} from "./slices";

const store = configureStore({
    reducer: {
        theme: themeReducer,
        header: headerReducer,
        movies: moviesReducer,
    }
});

type AppRootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export type {
    AppDispatch,
    AppRootState
}

export {
    store
}