import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import { arrowBackOutline, openOutline, logoGithub } from 'ionicons/icons'

const InfoPage: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton routerLink="/map" routerDirection="back">
                            <IonIcon slot="icon-only" icon={arrowBackOutline} />
                        </IonButton>
                    </IonButtons>
                    <IonTitle>CAMELS-DE</IonTitle>
                    <IonButtons slot="end">
                        <IonButton href="https://doi.org/10.5281/zenodo.6517142" target="_blank">
                        <img src="https://zenodo.org/badge/DOI/10.5281/zenodo.6517142.svg" alt="DOI" />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent>

                <IonCard>
                    <IonCardHeader>
                        <IonTitle>What is CAMELS-DE ?</IonTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        CAMELS datasets combine landscape attributes and hydrological and meteorological time series in hundreds of catchments. 
                        These datasets generally offer the possibility to perform and compare modeling and data analysis across a wide range 
                        of different landscapes. 
                        Despite one of the most extensive hydro-meteorological sampling networks in the world, such a data set is not yet 
                        The aim of the "CAMELS-DE" initiative is to provide such a comprehensive data set for Germany to the public. 
                    </IonCardContent>

                    <IonButton href="https://doi.org/10.5281/zenodo.6517142" fill="clear" target="_blank">
                        <IonIcon icon={openOutline} slot="start" />
                        White paper on Zenodo
                    </IonButton>

                    <IonButton href="https://github.com/CAMELS-DE" fill="clear" target="_blank">
                        <IonIcon icon={logoGithub} slot="start" />
                        CAMELS-DE on GitHub
                    </IonButton>
                </IonCard>

            </IonContent>

        </IonPage>
    )
}

export default InfoPage