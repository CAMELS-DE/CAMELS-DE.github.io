import { Layer, Source } from "react-map-gl";

const BaselayerLabels: React.FC = () => {
    return <>
        <Source 
            id="lines"
            type="raster" 
            tiles={['https://stamen-tiles.a.ssl.fastly.net/terrain-lines/{z}/{x}/{y}.jpg']}
            tileSize={256}
        >
            <Layer id="lines" type="raster" source="lines" />
        </Source>
        <Source 
            id="labels"
            type="raster" 
            tiles={['https://stamen-tiles.a.ssl.fastly.net/terrain-labels/{z}/{x}/{y}.jpg']}
            tileSize={256}
        >
            <Layer id="label" type="raster" source="labels" />
        </Source>
    </>
}

export default BaselayerLabels;