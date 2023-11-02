import { Layer, Source } from "react-map-gl";
import { useLayers } from "../../context/layers";

const BaselayerLabels: React.FC = () => {
    // list to active
    const { active } = useLayers()

    return <>
        <Source 
            id="lines"
            type="raster" 
            tiles={['https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}.png']}
            tileSize={256}
        >
            <Layer id="lines" type="raster" source="lines" layout={{'visibility': active.includes('labels') ? 'visible' : 'none'}} />
        </Source>
        <Source 
            id="labels"
            type="raster" 
            tiles={['https://tiles.stadiamaps.com/tiles/stamen_terrain_labels/{z}/{x}/{y}.png']}
            tileSize={256}
        >
            <Layer id="label" type="raster" source="labels" layout={{'visibility': active.includes('labels') ? 'visible' : 'none'}} />
        </Source>
    </>
}

export default BaselayerLabels;
