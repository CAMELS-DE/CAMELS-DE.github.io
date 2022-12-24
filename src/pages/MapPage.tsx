import { IonContent, IonPage } from "@ionic/react";
import Map, { MapLayerMouseEvent, useMap } from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import { useEffect } from "react";
import BaselayerLabels from "../components/map-components/BaselayerLabels";
import LayerDrawer from "../components/map-components/LayerDrawer";
import LayerDrawerToggle from "../components/map-components/LayerDrawerToggle";
import StationsLayer from "../components/map-components/StationsLayer";


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
    return (
        <LayerDrawer>
        <IonPage id="map-page">
            <IonContent fullscreen>
                <Map mapLib={maplibregl}
                    style={{width: '100vw', height: '100vh'}}
                    onLoad={m => onLoad(m)}
                    interactiveLayerIds={['stations']}
                    //mapStyle="https://demotiles.maplibre.org/style.json"
                    mapStyle={{
                        version: 8,
                        sources: {
                            terrain: {
                                type: 'raster',
                                tiles: ['https://stamen-tiles.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}.jpg'],
                                tileSize: 256,
                                attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
                                maxzoom: 19
                            },
                        },
                        layers: [
                            {
                                id: 'terrain',
                                type: 'raster',
                                source: 'terrain'
                            },
                        ]
                    }}
                >
                    <DevelopmentMode />
                    <LayerDrawerToggle />
                    <BaselayerLabels />
                    <StationsLayer />
                </Map>
            </IonContent>
        </IonPage>
        </LayerDrawer>
    )
}

export default MapPage;