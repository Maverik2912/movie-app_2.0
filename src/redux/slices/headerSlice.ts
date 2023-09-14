import {createSlice} from "@reduxjs/toolkit";

interface IState {
    selectedValue: {
        genre: string;
        time: string;
    };

}

const initialState: IState = {
    selectedValue: {
        genre: '',
        time: ''
    }
}

const headerSlice = createSlice({
    name: 'headerSlice',
    initialState,
    reducers: {
        setSelectGenre: (state, action) => {
            state.selectedValue.genre = action.payload;
        },
        setSelectTime: (state, action) => {
            state.selectedValue.time = action.payload;
        }
    }
});

const {reducer: headerReducer, actions} = headerSlice;

const headerActions = {
    ...actions
}

export {
    headerActions,
    headerReducer
}