import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentLocation: {
        lat: 0,
        lng: 0,
        address: ""
    },
    locations: [],
    isLocations: false
};

const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setLocation: (state, actions) => {
            state.currentLocation = actions.payload
        },
        setLocations: (state, actions) => {
            state.locations = actions.payload
        },
        pushLocation: (state, action) => {
            state.locations.unshift(action.payload);
        }
    },
});
export const { setLocation, setLocations, pushLocation } = mapSlice.actions;
export default mapSlice.reducer;
