import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonNote, IonRow, IonSpinner } from "@ionic/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Plot from "react-plotly.js";

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
        <IonCard style={{padding: '3px', width: '100%'}}>
            { metric.figure ? (
                <Plot 
                    data={metric.figure.data}
                    layout={{...metric.figure.layout, ...{autosize: true, margin: {r: 15, t: 15}, width: undefined}}}
                    useResizeHandler
                    style={{width: '100%', maxHeight: '350px'}}
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

export default MetricCard