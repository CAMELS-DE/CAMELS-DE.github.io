import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react"
import React from "react"
import { RouteComponentProps } from "react-router"
import MetricCard from "../components/MetricCard"

const EmbedMetricPage: React.FC<RouteComponentProps<{name: string}>> = ({ match }) => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <IonGrid>
                    <IonRow>
                        <IonCol size="12">
                        <MetricCard name={match.params.name} embedded />
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default EmbedMetricPage