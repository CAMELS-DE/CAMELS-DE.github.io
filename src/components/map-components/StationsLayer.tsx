import { IonButton, IonButtons, IonContent, IonItem, IonLabel, IonList, IonModal, IonTitle, IonToolbar } from "@ionic/react"
import cloneDeep from "lodash.clonedeep"
import { CirclePaint, MapLayerMouseEvent } from "mapbox-gl"

import { useEffect, useRef, useState } from "react"
import { Layer, Source, useMap } from "react-map-gl"

import { useData } from "../../context/data"
import { StationFeature, StationSource } from "../../context/data.model"
import { useLayers } from "../../context/layers"

const StationsLayer: React.FC = () => {
    // component state for hovered and selected Features
    const [selected, setSelected] = useState<StationFeature>()
    // const [hovered, setHoverered] = useState<StationFeature>()

    // copy the source GeoJSON over
    const [src, setSrc] = useState<StationSource>()

    // reference to the drawer
    const modalRef = useRef<HTMLIonModalElement>(null)

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
        'circle-color': ['case', ['boolean', ['feature-state', 'hover'], false], 
            'purple',
            ['feature-state', 'color']
        ],
        'circle-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 1.0, 0.5],
        'circle-radius': ['case', ['boolean', ['feature-state', 'hover'], false], 8.5, 6],
        'circle-stroke-width': 0.8,
        'circle-stroke-color': 'white',
        
    } as CirclePaint

    // handle modal if selected changed
    useEffect(() => {
        selected ? modalRef.current?.present() : modalRef.current?.dismiss()
    }, [selected])

    // set a feature state for coloring
    useEffect(() => {
        if (!map) return
        src?.features.forEach(f => {
            map.current?.setFeatureState(
                {source: 'stations', id: f.id},
                {color: !f.properties.has_out ? 'red' : f.properties.q_count > 0 ? 'green' : 'yellow'}
            )
        })
    }, [src, map])

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
                // get the feature
                const f = e.features[0] as GeoJSON.Feature<GeoJSON.Point>;
                setSelected(f as StationFeature)

                map.current?.flyTo({
                    center: e.lngLat,
                    zoom: 11,
                    bearing: Math.random() * 360,
                    pitch: Math.random() * 30 + 30
                })
            }
        })
    }, [map, src, modalRef])
    
    return <>
        { src ? (
            <Source id="stations" type="geojson" data={src}>
                <Layer id="stations" type="circle" source="stations" paint={paint} layout={{'visibility': active.includes('stations') ? 'visible' : 'none'}}/>
            </Source>
        ) : null}
        
        
        <IonModal ref={modalRef} breakpoints={[0., 0.3, 0.6, 0.9, 1.0]} initialBreakpoint={0.3} showBackdrop={false}>
            <IonContent>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton 
                            color="primary" 
                            href={`https://data-reports.camels-de.org/${selected?.properties.camels_id}.html`} 
                            target="_blank"
                        >
                            Report
                        </IonButton>
                    </IonButtons>
                    <IonTitle>{selected?.properties.camels_id}</IonTitle>
                    <IonButtons slot="end">
                        <IonButton fill="clear" onClick={() => setSelected(undefined)}>close</IonButton>
                    </IonButtons>
                </IonToolbar>
                <IonList>
                    <IonItem>
                        <IonLabel slot="start">Federal State</IonLabel>
                        <IonLabel slot="end">{selected?.properties.federal_state}</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel slot="start">Data file:</IonLabel>
                        <IonLabel slot="end">{selected?.properties.has_out   ? 'exists' : 'processing failed'}</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel slot="start">Discharge data:</IonLabel>
                        <IonLabel slot="end">{selected?.properties.q_count} days</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel slot="start">Water level data:</IonLabel>
                        <IonLabel slot="end">{selected?.properties.w_count} days</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel slot="start">Catchment Area</IonLabel>
                        <IonLabel slot="end">{selected?.properties.area} km</IonLabel>
                    </IonItem>
                </IonList>

            </IonContent>
        </IonModal>
    </>
}

export default StationsLayer