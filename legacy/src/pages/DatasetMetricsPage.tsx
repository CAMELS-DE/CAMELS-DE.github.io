import { IonAccordion, IonAccordionGroup, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel,  IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react"
import { arrowBackOutline } from "ionicons/icons";
import { useEffect, useState } from "react";

import axios from 'axios';
import MetricCard from "../components/MetricCard";
import CreateMetricSegments from "../components/segments/CreateMetricSegments";

interface MetricResponse {
    name: string,
    description?: string,
    plotly?: string,
}


const DatasetMetricsPage: React.FC = () => {
    // component state
    const [metricsNames, setMetricNames] = useState<string[]>([])

    useEffect(() => {
        // only load if not already loaded
        if (metricsNames.length > 0) return

        axios.get<{count: number, metrics: MetricResponse[]}>('https://api.camels-de.org/metrics/list').then(res => {
            const names = [...res.data.metrics.map(m => m.name)]
            setMetricNames(names)
        })
    }, [])
    
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton routerLink="/map" routerDirection="back">
                            <IonIcon icon={arrowBackOutline} slot="icon-only" />
                        </IonButton>
                    </IonButtons>
                    <IonTitle>CAMELS-DE Metrics</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonGrid>
                    <IonRow>
                        <IonCol size="12" sizeMd="10" pushMd="1" sizeLg="8" pushLg="2">
                            <IonCard>
                                <IonCardHeader>
                                    <IonCardTitle>CAMELS-DE dataset Metrics</IonCardTitle>
                                </IonCardHeader>
                                <IonCardContent>
                                    The following metrics are provided by the CAMELS-DE Dataset Metrics API. Please note that these are dataset-wide metrics and currently reflect the processing state of the CAMELS-DE dataset. All metrics are pre-calculated and might not represent the most
                                    current version.

                                    <IonAccordionGroup style={{marginTop: '2rem'}}>
                                        <IonAccordion value="info">
                                            <IonItem slot="header" color="light">
                                                <IonLabel>Add More Metrics</IonLabel>
                                            </IonItem>
                                            <div className="ion-padding" slot="content">
                                                <p style={{marginBottom: '1rem'}}>
                                                    All members of the <a href="https://github.com/CAMELS-DE" target="_blank">CAMELS-DE Github organization</a> can add more metrics. The metrics are visualized by <a href="https://plotly.com/graphing-libraries/" target="_blank">Plotly.js</a>, which is available in many languages.
                                                    With access to <a href="https://hub.camels-de.org" target="_blank">https://hub.camels-de.org</a>, you can save Plotly.js figures directly into the remote metrics folder.
                                                </p>
                                                <CreateMetricSegments />
                                                <p style={{marginTop: '1.3rem', marginBottom: '1rem'}}>
                                                    If you prefer to work local, there are gists for <a href="https://gist.github.com/mmaelicke/aa64a3de43f7ac5805d9a8eaed0bd39e" target="_blank">upload from R</a> or <a href="https://gist.github.com/mmaelicke/e63996773603c9ae196619a687f16793" target="_blank">Python</a>.
                                                    You can copy those snippets to your local environment and the defined function will add the metric via the CAMELS-DE Dataset Metric API and authorize you via a Github OAuth 2.0 application along the way.
                                                </p>
                                                
                                            </div>
                                        </IonAccordion>
                                    </IonAccordionGroup>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        {metricsNames.map(name => (<IonCol key={name} size="12" sizeLg="6">
                            <MetricCard name={name} />
                        </IonCol>))}
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default DatasetMetricsPage