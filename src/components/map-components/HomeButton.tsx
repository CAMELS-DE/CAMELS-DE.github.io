import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { homeOutline } from 'ionicons/icons'
import { useEffect } from "react";

import { useMap } from "react-map-gl";
import { useData } from "../../context/data";

const HomeButton: React.FC = () => {
    // get a reference to the map
    const map = useMap()

    // get a reference to the source layer
    const { stationSource } = useData()

    const onClick = () => {
        if (map.current && stationSource) {
            map.current.flyTo({
                center: {lat: 51, lon: 9.2},
                zoom: 5.7,
                bearing: 0,
                pitch: 45
            })
        }
    }

    useEffect(() => {
        if (map.current) {
            setTimeout(onClick, 800)
        }
    }, [map])

    return <>
        <IonFab vertical="top" horizontal="end" className="ion-margin" color="default">
            <IonFabButton onClick={onClick}>
                <IonIcon icon={homeOutline} />
            </IonFabButton>
        </IonFab>
    </>
}

export default HomeButton;