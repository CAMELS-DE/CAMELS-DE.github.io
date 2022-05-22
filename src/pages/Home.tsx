import { Box, Fab } from "@mui/material";
import { useRef } from "react";
import Header from "../components/Header";
import OverviewMap from "../components/OverviewMap";
import OverviewTable from "../components/OverviewTable";
import ViewBox from "../components/ViewBox";
import { ExpandMore } from "@mui/icons-material"
import OverviewAPI from "../components/OverviewAPI";


const Home = () => {
    // create some references for scrolling
    const tableRef = useRef<HTMLDivElement>();
    const apiRef = useRef<HTMLDivElement>();
    

    return (
        <Box sx={{width: '100%'}}>
            <Header />
            <OverviewMap />

            <Box sx={{flexGrow: 1, justifyContent: 'center', display: 'flex', marginTop: '-28px'}}>
                <Fab color="primary" onClick={() => tableRef.current?.scrollIntoView({behavior: 'smooth'})}><ExpandMore /></Fab>
            </Box>

            <Box ref={tableRef}>
                <ViewBox centering>
                    <OverviewTable />
                </ViewBox>
            </Box>

            <Box sx={{flexGrow: 1, justifyContent: 'center', display: 'flex', marginTop: '-56px'}}>
                <Fab color="primary" onClick={() => apiRef.current?.scrollIntoView({behavior: 'smooth'})}><ExpandMore /></Fab>
            </Box>

            <Box ref={apiRef}>
                <ViewBox centering>
                    <OverviewAPI />
                </ViewBox>
            </Box>

            {/* <Fab color="secondary" sx={{position: 'fixed', bottom: '12px', right: '28px'}} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>UP</Fab> */}
            
        </Box>
    )
}

export default Home;