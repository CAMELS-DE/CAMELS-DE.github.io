import { IonFab, IonFabButton, IonFabList, IonIcon } from "@ionic/react"
import { chevronDown, informationOutline, statsChartOutline } from 'ionicons/icons'

const FabMenu: React.FC = () => {
    return (
        <IonFab slot="fixed" vertical="top" horizontal="start">
            <IonFabButton>
                <IonIcon icon={chevronDown} />
            </IonFabButton>
            <IonFabList side="bottom">
                <IonFabButton color="primary" routerLink="/info" routerDirection="forward">
                    <IonIcon icon={informationOutline} />
                </IonFabButton>
                <IonFabButton color="primary" routerLink="/metrics" routerDirection="forward">
                    <IonIcon icon={statsChartOutline} />
                </IonFabButton>
            </IonFabList>
        </IonFab>
    )
}

export default FabMenu