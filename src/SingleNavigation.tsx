import { IonRouterOutlet } from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router"
import { Redirect, Route } from "react-router"

/* load Pages */
import InfoPage from "./pages/InfoPage"
import MapPage from "./pages/MapPage"

const SingleNavigation: React.FC = () => {
    return (
        <IonReactRouter>
            <IonRouterOutlet>
                <Route exact path="/map">
                    <MapPage />
                </Route>

                <Route exact path="/info">
                    <InfoPage />
                </Route>
                
                <Route exact path="/">
                    <Redirect to="/map" />
                </Route>
            </IonRouterOutlet>
        </IonReactRouter>
    )
}

export default SingleNavigation