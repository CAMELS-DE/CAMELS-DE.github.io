import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DataSlice {
    pegel?: GeoJSON.FeatureCollection<GeoJSON.Point>;
    activeFeature?: GeoJSON.Feature;
}

const initialState: DataSlice = {

}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setPegel: (state, action: PayloadAction<GeoJSON.FeatureCollection<GeoJSON.Point>>) => {
            state.pegel = action.payload;
        },
        setActiveFeature: (state, action: PayloadAction<GeoJSON.Feature>) => {
            state.activeFeature = action.payload;
        },
        setActiveFeatureByName: (state, action: PayloadAction<string>) => {
            if (state.pegel && state.pegel.features.length > 0) {
                const feature = state.pegel.features.find(f => f.properties?.name === action.payload);
                if (feature) state.activeFeature = feature;
            }
        },
        resetActiveFeature: (state) => {
            state.activeFeature = undefined;
        }

    }
});

export const { setPegel, setActiveFeature, setActiveFeatureByName, resetActiveFeature } = dataSlice.actions;

export default dataSlice.reducer;