import { IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonTitle, IonToggle, IonToolbar } from "@ionic/react"
import React, { useRef } from "react"
import { useLayers } from "../../context/layers"

const LayerDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
    const ref = useRef<HTMLIonMenuElement>(null)

    // use the layers context
    const {available, active, activate, deactivate} = useLayers()

    const onToggle = (layerName: string, checked: boolean) => {
        if (checked) {
            activate(layerName)
        } else {
            deactivate(layerName)
        }
        ref.current?.close()
    }

    return <>
        <IonMenu ref={ref} contentId="map-page" side="end">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Layers</IonTitle>
                    <IonButtons slot="end">
                        <IonMenuButton />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    { available.map(layer => {
                        return (
                            <IonItem key={layer}>
                                <IonToggle slot="start" color="success" mode="ios" checked={active.includes(layer)} onIonChange={e => onToggle(layer, e.target.checked)} />
                                <IonLabel>{layer}</IonLabel>
                            </IonItem>
                        )
                    }) }

                </IonList>
            </IonContent>
        </IonMenu>
        { children }
    </>
}

export default LayerDrawer