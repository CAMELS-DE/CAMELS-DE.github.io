import { Layer, Source } from "react-map-gl"
import { useData } from "../../context/data"
import { useLayers } from "../../context/layers"

const StationsLayer: React.FC = () => {
    // subscribe to the stationsSrc
    const { stationSource } = useData()

    // subscribe to the layer context
    const { active } = useLayers()
    
    return <>
        <Source id="stations" type="geojson" data={stationSource}>
            <Layer id="stations" type="circle" source="stations" paint={{'circle-color': 'red', 'circle-radius': 5}} />
        </Source>
    </>
}

export default StationsLayer