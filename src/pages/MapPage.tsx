import { IonContent, IonPage } from "@ionic/react";
import Map, { useMap } from 'react-map-gl';
import maplibregl, { StyleSpecification } from 'maplibre-gl';
import { Style } from 'mapbox-gl'
import 'maplibre-gl/dist/maplibre-gl.css';

import { useEffect } from "react";
import BaselayerLabels from "../components/map-components/BaselayerLabels";
 import LayerDrawer from "../components/map-components/LayerDrawer";
 import LayerDrawerToggle from "../components/map-components/LayerDrawerToggle";
import StationsLayer from "../components/map-components/StationsLayer";
import HomeButton from "../components/map-components/HomeButton";

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
                tiles: ['https://stamen-tiles.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}.jpg'],
                tileSize: 256,
                attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
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
                    style={{width: '100vw', height: '100vh'}}
                    onLoad={m => onLoad(m)}
                    interactiveLayerIds={['stations']}
                    //mapStyle="https://demotiles.maplibre.org/style.json"
                    mapStyle={style}
                >
                    <DevelopmentMode />
                    <LayerDrawerToggle />
                    <HomeButton />

                    <BaselayerLabels />
                    <StationsLayer />
                </Map>
            </IonContent>
        </IonPage>
        </LayerDrawer>
    )
}

export default MapPage;