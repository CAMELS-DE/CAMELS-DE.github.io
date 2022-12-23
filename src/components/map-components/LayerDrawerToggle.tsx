import { IonFab, IonFabButton, IonIcon, IonMenuToggle } from "@ionic/react";
import { layersOutline } from 'ionicons/icons'

const LayerDrawerToggle: React.FC = () => (
    <IonFab vertical="bottom" horizontal="end" className='ion-margin'>
        <IonMenuToggle>
            <IonFabButton>
                <IonIcon icon={layersOutline} />
            </IonFabButton>
        </IonMenuToggle>
    </IonFab>
)

export default LayerDrawerToggle