import { Box, Fab } from "@mui/material";
import { useRef } from "react";
import Header from "../components/Header";
import OverviewMap from "../components/OverviewMap";
import OverviewTable from "../components/OverviewTable";
import ViewBox from "../components/ViewBox";
import { ExpandMore } from "@mui/icons-material"
import { table } from "console";

const Home = () => {
    // create some references for scrolling
    const tableRef = useRef<HTMLDivElement>();
    

    return (
        <Box sx={{margin: 0, padding: 0, width: '100vw', overflowX: 'hidden'}}>
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
        </Box>
    )
}

export default Home;