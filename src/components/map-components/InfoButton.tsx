import { IonFab, IonFabButton, IonIcon } from "@ionic/react"
import { informationOutline } from "ionicons/icons"

const InfoButton: React.FC = () => {
    return <>
        <IonFab vertical="top" horizontal="start">
            <IonFabButton routerLink="/info" routerDirection="forward">
                <IonIcon icon={informationOutline} />
            </IonFabButton>
        </IonFab>
    </>
}

export default InfoButton