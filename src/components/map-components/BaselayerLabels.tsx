import { Layer, Source } from "react-map-gl";
import { useLayers } from "../../context/layers";

const BaselayerLabels: React.FC = () => {
    // list to active
    const { active } = useLayers()

    return <>
        <Source 
            id="lines"
            type="raster" 
            tiles={['https://stamen-tiles.a.ssl.fastly.net/terrain-lines/{z}/{x}/{y}.jpg']}
            tileSize={256}
        >
            <Layer id="lines" type="raster" source="lines" layout={{'visibility': active.includes('labels') ? 'visible' : 'none'}} />
        </Source>
        <Source 
            id="labels"
            type="raster" 
            tiles={['https://stamen-tiles.a.ssl.fastly.net/terrain-labels/{z}/{x}/{y}.jpg']}
            tileSize={256}
        >
            <Layer id="label" type="raster" source="labels" layout={{'visibility': active.includes('labels') ? 'visible' : 'none'}} />
        </Source>
    </>
}

export default BaselayerLabels;