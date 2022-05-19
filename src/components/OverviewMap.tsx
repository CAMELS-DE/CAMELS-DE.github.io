import { Box } from "@mui/material";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

mapboxgl.accessToken = "pk.eyJ1IjoiY2FtZWxzLWRlIiwiYSI6ImNsM2NzdHB0MjAxcjgzZHBoeWduY2swb2UifQ.GI3UTNL-MEvdmEo-OI84Cg";
const OverviewMap = () => {
    // get the current application theme
    const theme = useSelector((state: RootState) => state.settings.theme);

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

        // for debugging put map into window
        (window as any).map = map.current;
    })
    return (
        <div>
            <div ref={mapContainer} id="map" style={{height: 'calc(100vh - 64px)', width: '100vw'}} />
        </div>
    );
}

export default OverviewMap;