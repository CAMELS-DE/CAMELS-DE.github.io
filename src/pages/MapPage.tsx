import { IonContent,  IonPage } from "@ionic/react";
import Map, { useMap, Source, Layer } from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import { useEffect } from "react";


const DevelopmentMode: React.FC = () => {
    const map = useMap()
    useEffect(() => {
        if (map?.current) (window as any).map = map.current
    }, [map])
    return null
}

const MapPage: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <Map mapLib={maplibregl}
                    style={{width: '100%', height: '100%'}}
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
                            }
                        },
                        layers: [
                            {
                                id: 'terrain',
                                type: 'raster',
                                source: 'terrain'
                            }
                        ]
                    }}
                >
                    <DevelopmentMode />
                    <Source 
                        id="labels"
                        type="raster" 
                        tiles={['https://stamen-tiles.a.ssl.fastly.net/terrain-labels/{z}/{x}/{y}.jpg']}
                        tileSize={256}
                    >
                        <Layer id="label" type="raster" source="labels" />
                    </Source>
                </Map>
            </IonContent>
        </IonPage>
    )
}

export default MapPage;