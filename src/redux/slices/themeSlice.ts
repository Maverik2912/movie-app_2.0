import {createSlice} from "@reduxjs/toolkit";

interface IState {
    isDark: boolean;
}

const initialState: IState = {
    isDark: true,
}

const themeSlice = createSlice({
    name: 'themeSlice',
    initialState,
    reducers: {
        toggleTheme: state => {state.isDark = !state.isDark}
    }
});

const {reducer: themeReducer, actions} = themeSlice;

const themeActions = {
    ...actions
}

export {
    themeReducer,
    themeActions
}