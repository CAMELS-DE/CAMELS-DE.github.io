import React, { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import cloneDeep from "lodash.clonedeep";

import { Station, StationSource } from "./data.model";
import { isNull } from "lodash";



interface DataState {
    stationSource: StationSource
    stations: Station[]
}

// define initial empty state
const initialState: DataState = {
    stationSource: {type: 'FeatureCollection', features: []},
    stations: []
}

// create the context
const DataContext = createContext(initialState);

// context provider
export const DataProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    // build the initial state
    const [stationSource, setStationSource] = useState<StationSource>({type: 'FeatureCollection', features: []})
    const [stations, setStations] = useState<Station[]>([])

    // reach out to the CAMELS-de process state API to get the latest metadata
    useEffect(() => {
        axios.get<StationSource>(`https://api.camels-de.org/state/metadata.geojson`)
        .then(response => {
            // filter the geojson for the features with geometries
            const stSrc = {
                type: 'FeatureCollection', 
                bbox: response.data.bbox, 
                features: [...cloneDeep(response.data.features.filter(f => !!f.geometry))]
            } as StationSource

            // copy all stations
            const newStats = [...cloneDeep(response.data.features.map(f => f.properties))]

            // set the new values
            setStationSource(stSrc)
            setStations(newStats)
        })
        .catch(error =>  console.log(error))
    }, [])

    // build the final context value
    const value = {
        stationSource,
        stations
    }

    return (
        <DataContext.Provider value={value}>
            { children }
        </DataContext.Provider>
    )
}

// create a hook
export const useData = () => {
    return useContext(DataContext)
}


