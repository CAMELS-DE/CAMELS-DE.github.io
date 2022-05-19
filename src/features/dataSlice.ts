import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DataSlice {
    pegel?: GeoJSON.FeatureCollection<GeoJSON.Point>;
}

const initialState: DataSlice = {

}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setPegel: (state, action: PayloadAction<GeoJSON.FeatureCollection<GeoJSON.Point>>) => {
            state.pegel = action.payload;
        }
    }
});

export const { setPegel } = dataSlice.actions;

export default dataSlice.reducer;