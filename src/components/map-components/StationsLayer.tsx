import cloneDeep from "lodash.clonedeep"
import { CirclePaint, MapLayerMouseEvent } from "mapbox-gl"

import { useEffect, useState } from "react"
import { Layer, Source, Popup, useMap } from "react-map-gl"
import { useData } from "../../context/data"
import { StationSource } from "../../context/data.model"
import { useLayers } from "../../context/layers"

const StationsLayer: React.FC = () => {
    // hover state
    const [hoveredId, setHoveredId] = useState<string | null>(null)
    const [src, setSrc] = useState<StationSource>()

    // get a map reference
    const map = useMap()

    // subscribe to the stationsSrc
    const { stationSource } = useData()
    useEffect(() => {
        setSrc(cloneDeep(stationSource))
    }, [stationSource])

    // subscribe to the layer context
    const { active } = useLayers()

    // build the pain
    const paint = {
        'circle-color-transition': {duration: 600},
        'circle-color': ['case', ['boolean', ['feature-state', 'hover'], false], 'purple', 'red'],
        'circle-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 1.0, 0.5],
        'circle-radius': ['case', ['boolean', ['feature-state', 'hover'], false], 8.5, 6],
        'circle-stroke-width': 0.8,
        'circle-stroke-color': 'white',
        
    } as CirclePaint

    // listen to hover events
    useEffect(() => {
        // if the map is already loaded, append the listeners
        if (!map.current) {
            return
        }

        // onEnter
        map.current.on('mousemove', 'stations', (e: MapLayerMouseEvent) => {
            // set all hover to false
            src?.features.forEach(f => {
                map.current?.setFeatureState(
                    {source: 'stations', id: f.id}, {hover: false}
                )
            })
            // activate only the first one
            if (e.features && e.features.length > 0) {
                map.current?.setFeatureState(
                    {source: 'stations', id: e.features[0].id}, {hover: true}
                )
            }
            // change the mouse pointer
            map.current?.getCanvas().style.setProperty('cursor', 'pointer')
        })

        // on mouse leave
        map.current.on('mouseleave', 'stations', (e: MapLayerMouseEvent) => {
            // set all to leave
            src?.features.forEach(f => {
                map.current?.setFeatureState(
                    {source: 'stations', id: f.id}, {hover: false}
                )
            })
            // go back to default mouse style
            map.current?.getCanvas().style.setProperty('cursor', 'default')
        })

        // click Handler
        map.current.on('click', 'stations', (e: MapLayerMouseEvent) => {
            if (e.features && e.features.length > 0) {
                const f = e.features[0] as GeoJSON.Feature<GeoJSON.Point>;
                map.current?.flyTo({
                    center: e.lngLat,
                    zoom: 11,
                    bearing: Math.random() * 360,
                    pitch: Math.random() * 30 + 30
                })
            }
        })
    }, [map, src])
    
    return <>
        <Source id="stations" type="geojson" data={src}>
            <Layer id="stations" type="circle" source="stations" paint={paint} layout={{'visibility': active.includes('stations') ? 'visible' : 'none'}}/>
        </Source>
        
    </>
}

export default StationsLayer