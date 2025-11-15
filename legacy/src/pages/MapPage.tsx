import { IonContent, IonPage } from "@ionic/react";
import Map, { NavigationControl, ScaleControl, useMap } from 'react-map-gl';
import maplibregl, { StyleSpecification } from 'maplibre-gl';
import { Style } from 'mapbox-gl'
import 'maplibre-gl/dist/maplibre-gl.css';

import { useEffect } from "react";
import BaselayerLabels from "../components/map-components/BaselayerLabels";
 import LayerDrawer from "../components/map-components/LayerDrawer";
 import LayerDrawerToggle from "../components/map-components/LayerDrawerToggle";
import StationsLayer from "../components/map-components/StationsLayer";
import HomeButton from "../components/map-components/HomeButton";
import FabMenu from "../components/map-components/FabMenu";

const DevelopmentMode: React.FC = () => {
    const map = useMap()
    useEffect(() => {
        if (map?.current) (window as any).map = map.current
    }, [map])
    return null
}

const MapPage: React.FC = () => {
    // onlonad callback handler
    const onLoad = (e: any) => {
        // resize the map
        (e as maplibregl.MapLibreEvent).target.resize()
    }

    const style = {
        version: 8,
        sources: {
            terrain: {
                type: 'raster',
                tiles: ['https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}.png'],
                tileSize: 256,
                attribution: '&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/about/" target="_blank">OpenStreetMap contributors</a>.',
                maxzoom: 19
            },
            mask: {
                type: 'geojson',
                data: 'https://api.camels-de.org/static/germany.geojson'
            },
        },
        layers: [
            {
                id: 'terrain',
                type: 'raster',
                source: 'terrain'
            },
            {
                id: 'mask',
                source: 'mask',
                type: 'fill-extrusion',
                paint: {
                    'fill-extrusion-base': 2500,
                    'fill-extrusion-color': 'white',
                    'fill-extrusion-opacity': 0.6
                }
            },
        ]
    } as Style

    return (
        <LayerDrawer>
        <IonPage id="map-page">

            <IonContent fullscreen>
                <Map mapLib={maplibregl}
                    style={{width: '100%', height: '100%'}}
                    onLoad={m => onLoad(m)}
                    interactiveLayerIds={['stations']}
                    //mapStyle="https://demotiles.maplibre.org/style.json"
                    mapStyle={style}
                >
                    <DevelopmentMode />
                    <LayerDrawerToggle />
                    <HomeButton />
                    <FabMenu />
                    <ScaleControl position="bottom-left"/>
                    <NavigationControl position="bottom-left" />

                    <BaselayerLabels />
                    <StationsLayer />
                </Map>
            </IonContent>
        </IonPage>
        </LayerDrawer>
    )
}

export default MapPage;
