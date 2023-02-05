import { IonAccordion, IonAccordionGroup, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonNote, IonPage, IonRow, IonSpinner, IonTitle, IonToolbar } from "@ionic/react"
import { arrowBackOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import Plot from 'react-plotly.js';

import axios from 'axios';

interface MetricResponse {
    name: string,
    description?: string,
    plotly?: string,
}

interface Metric {
    name: string;
    title?: string;
    body?: string;
    figure?: any;
    actions?: {href: string, title?: string}[]
}

const MetricCard: React.FC<{name: string}> = ({ name }) => {
    const [metric, setMetric] = useState<Metric>()
 
    useEffect(() => {
        axios.get<Metric>(`https://api.camels-de.org/metrics/${name}`).then(res => {
            if (res.data) setMetric(res.data)
        })
    }, [name])

    if (!metric) {
        return <>
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>Loading...      </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size="12" style={{minHeight: '300px', justifyContent: 'center', display: 'flex', alignItems: 'center'}}>
                            <IonSpinner name="circular" style={{height: '80px', width: '80px'}} />
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonCardContent>
        </IonCard>
    </>
    }
    return <>
        <IonCard>
            { metric.figure ? (
                <Plot 
                    data={metric.figure.data}
                    layout={{...metric.figure.layout, ...{autosize: true, margin: {r: 15}, width: undefined}}}
                    useResizeHandler
                    style={{width: '100%'}}
                />
            ) : null}
            <IonCardHeader>
                <IonCardTitle>{metric?.title ? metric.title : 'Loading...'}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                { metric.body ? metric.body : <IonNote>This metric has no body</IonNote> }
            </IonCardContent>
            { metric.actions ? (metric.actions.map((action, idx) => (
                <IonButton fill="clear" href={action.href} key={idx} target="_blank">
                    {action.title ? action.title : action.href}
                </IonButton>
                ))
            ) : null }
        </IonCard>
    </>
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
                                                <p>
                                                All members of the <a href="https://github.com/CAMELS-DE" target="_blank">CAMELS-DE Github organization</a> can add more metrics. The metrics are visualized by <a href="https://plotly.com/graphing-libraries/" target="_blank">Plotly.js</a>, which is available in many languages.
                                                Currently, there are gists for upload from R or Python. You can copy those snippets to your local environment and the defined function will add the metric via the CAMELS-DE Dataset Metric API.
                                                </p><p>
                                                Alternatively, with access to https://hub.camels-de.org, you can save Plotly.js figures directly into the remote metrics folder.
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