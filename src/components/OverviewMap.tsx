import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveFeatureByName } from "../features/dataSlice";
import { RootState } from "../store";

mapboxgl.accessToken = "pk.eyJ1IjoiY2FtZWxzLWRlIiwiYSI6ImNsM2NzdHB0MjAxcjgzZHBoeWduY2swb2UifQ.GI3UTNL-MEvdmEo-OI84Cg";
const OverviewMap = () => {
    // get the current application theme
    const theme = useSelector((state: RootState) => state.settings.theme);

    // get a dispatcher
    const dispatch = useDispatch();

    // get the pegel data 
    const pegel = useSelector((state: RootState) => state.data.pegel);

    // map state
    const [center, setCenter] = useState<[number, number]>([15.5, 58.4]);
    const [zoom, setZoom] = useState<number>(2);
    const [mapTheme, setMapTheme] = useState<string>("");
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map>();

    // change the maptheme whenever the app changes
    useEffect(() => {
        if (theme==='light') setMapTheme("mapbox://styles/mapbox/light-v10");
        if (theme==='dark') setMapTheme("mapbox://styles/mapbox/dark-v10");
    }, [theme]);

    // update the map
    useEffect(() => {
        if (map.current) {
            map.current.setStyle(mapTheme);
        }
    }, [mapTheme])

    // handle pegel updates
    useEffect(() => {
        if (!map.current || !pegel) return;

        if (map.current.getSource('pegel')) return;
        map.current.addSource('pegel', {type: 'geojson', data: pegel});

        // make the default layer
        map.current.addLayer({
            id: 'pegel',
            source: 'pegel',
            type: 'circle',
            paint: {
                "circle-color": ['match', ['get', 'has_output'], "true", 'blue', 'red'],
                "circle-stroke-width": 1.2,
                "circle-radius": ['case', ['boolean', ['feature-state', 'hover'], false], 8, 5]
            }
        })
    }, [pegel])

    // handle map creation
    useEffect(() => {
        if (map.current) return;      // map already exists
        
        // create map
        map.current = new mapboxgl.Map({
            container: mapContainer.current ? mapContainer.current : 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: center,
            zoom: zoom
        });

        // onLoad handler
        map.current.on('load', () => {
            if (!map.current) return;
            map.current.resize();
            setTimeout(() => {
                if (!map.current) return;
                map.current.flyTo({center: [8.676, 51.375], zoom: 5.89, pitch: 55});
            }, 600);
        });

        // onMove handler
        map.current.on('move', () => {
            if (!map.current) return;
            setCenter([map.current.getCenter().lng, map.current.getCenter().lat]);
            setZoom(map.current.getZoom());
        });

        // hover handling
        map.current.on('mouseenter', 'pegel', (e) => {
            if (!map.current) return;
            map.current.getCanvas().style.cursor = 'pointer';
        });

        let hoverId: number | string | undefined | null = null;
        map.current.on('mousemove', 'pegel', (e) => {
            if (!map.current) return;
            if (e.features && e.features.length > 0) {
                if (hoverId !== null) {
                    map.current.setFeatureState({source: 'pegel', id: hoverId}, {hover: false});
                }
                hoverId = e.features![0].id;
                map.current.setFeatureState({source: 'pegel', id: hoverId}, {hover: true})
            }
        });
        map.current.on('mouseleave', 'pegel', (e) => {
            if (!map.current) return;
            map.current.getCanvas().style.cursor = '';
            // unmark as hovered
            if (hoverId !== null) {
                map.current.setFeatureState({source: 'pegel', id: hoverId}, {hover: false})
            }
            hoverId = null;
        });
        map.current.on('click', 'pegel', e => {
            if (e.features && e.features.length > 0) {
                dispatch(setActiveFeatureByName(e.features[0].properties?.name));
            }
        });

        // for debugging put map into window
        (window as any).map = map.current;
    })
    return (
        <div>
            <div ref={mapContainer} id="map" style={{height: '50vh', width: '100vw'}} />
        </div>
    );
}

export default OverviewMap;