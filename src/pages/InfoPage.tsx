import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonNote, IonPage, IonRow, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from "@ionic/react"
import { arrowBackOutline, openOutline, logoGithub } from 'ionicons/icons'
import { Prism as SyntaxHighligher } from 'react-syntax-highlighter'
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useEffect, useState } from "react"

const InfoPage: React.FC = () => {
    // component state
    const [currentStateCode, setCurrentStateCode] = useState<string>('bash')
    const [stateCode, setStateCode] = useState<string>('# Download current metadata as CSV\ncurl https://api.camels-de.org/state/metadata.csv')

    // subscribe to changes in the currently selected segment button
    useEffect(() => {
        if (currentStateCode === 'bash') {
            setStateCode('# Download current metadata as geopackage\ncurl https://api.camels-de.org/state/metadata.gpkg -o ~/metadata.gpkg')
        }
        if (currentStateCode === 'typescript') {
            setStateCode("axios.get('https://api.camels-de.org/state/metadata.geojson')\n\t.then(response => {\n\t\tconsole.log(response.data)\n\t})")
        }
        if (currentStateCode === 'python') {
            setStateCode("# use pandas\nimport pandas as pd\ndf = pd.read_csv('https://api.camels-de.org/state/metadata.csv')\n\n# additionally use geopandas\nimport geopandas as gpd\ngdf = gpd.GeoDataFrame(df, geometry=gdf.points_from_xy(df.x, df.y), crs=3035)")
        }
        if (currentStateCode === 'r') {
            setStateCode("# use base R\nmetadata <- read.csv('https://api.camels-de.org/state/metadata.csv')\n\n# as a tibble\nlibrary(readr)\nmetadata <- read.csv('https://api.camels-de.org/state/metadata.csv')")
        }
    }, [currentStateCode])
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
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size="12" sizeMd="10" pushMd="1" sizeLg="8" pushLg="2">

                    <IonCard>
                        <IonCardHeader>
                            <IonTitle>What is CAMELS-DE ?</IonTitle>
                        </IonCardHeader>
                        <IonItem lines="none">
                        <IonButton fill="clear" href="https://doi.org/10.5281/zenodo.6517142" target="_blank">
                            <img src="https://zenodo.org/badge/DOI/10.5281/zenodo.6517142.svg" alt="DOI" />
                        </IonButton>
                        <IonButton fill="clear" href="https://github.com/CAMELS-DE" target="_blank">
                        <img alt="GitHub Org's stars" src="https://img.shields.io/github/stars/CAMELS-DE?color=brightgreen&logo=github" />
                        </IonButton>
                        </IonItem>
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

                    <IonCard style={{marginTop: '2rem'}}>
                        <IonCardHeader>
                            <IonTitle>CAMELS-DE Data Retrieval API</IonTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonNote color="warning">
                                The CAMELS-DE Data Retrieval API is not productive yet. 
                                The url below might not yet work. Once, the CAMELS-DE dataset is published,
                                the dataset is accessible using the API.
                            </IonNote>
                            <IonItem lines="none" color="light" style={{marginTop: '0.6rem'}} href="https://api.camels-de.org/data" target="_blank">
                            <pre style={{fontSize: '1.3rem', padding: '1rem'}}>
                                <code>https://api.camels-de.org/data</code>
                            </pre>
                            </IonItem>
                        </IonCardContent>
                    </IonCard>

                    <IonCard style={{marginTop: '2rem'}}>
                        <IonCardHeader>
                            <IonTitle>CAMELS-DE Processing State API</IonTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonNote>
                                The CAMELS-DE processing state API can be used to query the current state of
                                processing, as long as the CAMELS-DE dataset has not yet been published.
                            </IonNote>
                            <IonItem lines="none" color="light" style={{marginTop: '0.6rem'}} href="https://api.camels-de.org/state" target="_blank">
                            <pre style={{fontSize: '1.3rem', padding: '0.6rem'}}>
                                <code>https://api.camels-de.org/state</code>
                            </pre>
                            </IonItem>
                            <IonSegment style={{marginTop: '1rem'}} value={currentStateCode} onIonChange={e => setCurrentStateCode(e.target.value as string)}>
                                <IonSegmentButton value="bash">cURL</IonSegmentButton>
                                <IonSegmentButton value="typescript">Typescript</IonSegmentButton>
                                <IonSegmentButton value="python">Python</IonSegmentButton>
                                <IonSegmentButton value="r">R</IonSegmentButton>
                            </IonSegment>
                            <SyntaxHighligher language={currentStateCode} style={darcula}>
                                {stateCode}
                            </SyntaxHighligher>
                        </IonCardContent>
                    </IonCard>

                </IonCol>
                    </IonRow>
                </IonGrid>

            </IonContent>

        </IonPage>
    )
}

export default InfoPage