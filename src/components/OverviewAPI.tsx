import { useState } from "react";
import { Alert, Box, Card, CardContent, Grid, Link, Tab, Tabs, Typography } from "@mui/material";
import SyntaxHighligher from 'react-syntax-highlighter';
import { a11yDark, a11yLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useSelector } from "react-redux";
import { RootState } from "../store";

const CODE = [
    {
        lang: 'bash',
        label: 'cURL', 
        content: 'curl -X GET https://api.camels-de.org/state/pegel.json'
    },
    {
        lang: 'typescript',
        label: 'TypeScript',
        content: "import axios from 'axios';\n\nconst url = 'https://api.camels-de.org/state/pegel.json';\naxios.get<{GeoJSON.FeatureCollection<GeoJSON.Point>}>(url)\n\t.then(resp => console.log(resp.data));"
    },
    {
        lang: 'python', 
        label: 'Python',
        content: "import geopandas as gpd\n\ngdf = gpd.read_file('https://api.camels-de.org/state/pegel.gpkg')",
    },
    {
        lang: "r",
        label: 'R',
        content: "df <- read.csv('https://api.camels-de.org/state/pegel.csv')"
    }
];


const OverviewAPI: React.FC = () => {
    // some state
    const [tab, setTab] = useState<number>(0);

    // get the theme
    const theme = useSelector((state: RootState) => state.settings.theme);

    return (
        <Box>
            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', boxSizing: 'border-box'}}>
                <Typography variant="h3" component="p">CAMELS-DE has a rich data API</Typography>
                <Alert severity="info" sx={{mt: 3, maxWidth: '650px'}}>
                    The CAMELS-DE dataset is not finished. Thus, the API is reflecting the <strong>processing state</strong>.
                    Once finished, the data itself will be available through the API as well.
                </Alert>
                
                <Typography variant="h4" component="div" sx={{mt: 5, textAlign: 'center', backgroundColor: 'silver', p: 3, borderRadius: '8px'}}>
                    <Link href="https://api.camels-de.org/state" target="_blank" rel="noreferrer" color="inherit" underline="hover">
                        <code>https://api.camels-de.org/state</code>
                    </Link>
                </Typography>
            </Box>

            <Grid container spacing={1} sx={{mt: 6, boxSizing: 'border-box'}}>

                <Grid item xs={12} sm={6} sx={{p: 5}}>
                    <Card>
                        <CardContent>
                        <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="fullWidth">
                            {CODE.map(e => <Tab label={e.label} key={e.label} />)}
                        </Tabs>
                        <Box>
                            <Typography variant="body2" sx={{m: 2}}>You can copy paste the example below and try it locally!</Typography>
                            <SyntaxHighligher language={CODE[tab].lang} style={theme === 'dark' ? a11yDark : a11yLight}>{CODE[tab].content}</SyntaxHighligher>
                        </Box>
                        </CardContent>
                    </Card>
                </Grid>
                
                <Grid item xs={12} sm={6} sx={{p: 5}}>
                    <Typography variant="h4" component="div">State API</Typography>
                    <Typography variant="body1" component="div" sx={{mt: 3, maxWidth: '720px'}}>
                        The state API provides information about the processing state of the CAMELS-DE dataset.
                        The information is provided in real-time and reflects the most recent state.
                    </Typography>
                    <Typography variant="body1" component="div" sx={{mt: 3, maxWidth: '720px'}}>
                        Processing happens on our data processing server and is driven by transparent, 
                        open-source scripts that are hosted on Github (LINK HERE).
                        A new process is invoked, whenever the state of one repository changes.
                    </Typography>
                </Grid>
            
            </Grid>
        </Box>
    );
}

export default OverviewAPI;