import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonModal, IonNote, IonPopover, IonRow, IonSpinner, IonText, IonTitle, IonToolbar } from "@ionic/react";
import { codeSlashOutline } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Plot from "react-plotly.js";
import { Prism as SyntaxHighligher } from 'react-syntax-highlighter'
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism'


const ShareButtonPopover: React.FC<{name: string}> = ({ name }) => {
    const ref = useRef<HTMLIonModalElement>(null)
    return <>
        <IonButton fill="clear" id="trigger-share">
            <IonIcon icon={codeSlashOutline} slot="icon-only" />
        </IonButton>
        <IonModal ref={ref} trigger="trigger-share">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Share this Metric</IonTitle>
                    <IonButtons slot="end">
                        <IonButton fill="clear" onClick={() => ref.current?.dismiss()}>CLOSE</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
        {/* <IonPopover trigger="trigger-share" triggerAction="click" side="top" size="auto" alignment="end"> */}
            <IonContent>
                <IonItem lines="none">
                    <IonLabel class="ion-text-wrap">
                        <p>
                        You can share each CAMELS-DE Metric in your own projects indivudually, as long as you attribute the authors.
                        </p>
                    </IonLabel>
                </IonItem>
                <IonItem lines="none">
                    <IonLabel class="ion-text-wrap">
                        <p>
                        Copy the chunk to embed the metric:
                        </p>
                    </IonLabel>
                </IonItem>
                <IonItem>
                    <SyntaxHighligher language="html" style={darcula} wrapLongLines>
                        {`<iframe src="https://camels-de.org/embed/${name}" frameBorder="0"></iframe>`}
                    </SyntaxHighligher>
                </IonItem>
                <IonItem lines="none">
                    <IonLabel class="ion-text-wrap">
                        <p>
                            You can also use the CAMELS-DE API to get the .plotly.json document directly
                        </p>
                    </IonLabel>
                </IonItem>
                <IonItem>
                    <SyntaxHighligher language="bash" style={darcula}>
                        {`https://api.camels-de.org/metrics/${name}.plotly.json`}
                    </SyntaxHighligher>
                </IonItem>
                <IonItem lines="none">
                    <IonLabel class="ion-text-wrap">
                        <p>
                            Please attribute the source of this metric. The Metrics are hosted by <a href="https://hydrocode.de" target="_blank">hydrocode.de</a>
                        </p>
                    </IonLabel>
                </IonItem>
            </IonContent>
        </IonModal>
        </>
} 

interface Metric {
    name: string;
    title?: string;
    body?: string;
    figure?: any;
    actions?: {href: string, title?: string}[]
}

const MetricCard: React.FC<{name: string, embedded?: boolean}> = ({ name, embedded }) => {
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
        <IonCard style={{padding: '3px', }}>
            { metric.figure ? (
                <Plot 
                    data={metric.figure.data}
                    layout={{...metric.figure.layout, ...{autosize: true, margin: {r: 15, t: 15}, width: undefined}}}
                    useResizeHandler
                    style={{width: '100%', maxHeight: '350px'}}
                />
            ) : null}
            <IonCardHeader>
                <IonToolbar>
                <IonCardTitle>{metric?.title ? metric.title : 'Loading...'}</IonCardTitle>
                <IonButtons slot="end">
                    { embedded ? (<IonButton href="https://camels-de.org/metrics" target="_blank">visit CAMELS-DE</IonButton>) : <ShareButtonPopover name={metric.name} /> }
                </IonButtons>
                </IonToolbar>
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