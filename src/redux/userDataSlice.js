import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

export const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        addUserData: (state, action) => {
            // You need to return the new state, not modify the existing state directly.
            return { ...state, ...action.payload };
        },
    },
});

export const { addUserData } = userDataSlice.actions;

export default userDataSlice.reducer;
