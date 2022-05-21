import { Box } from "@mui/material";
import Header from "../components/Header";
import OverviewMap from "../components/OverviewMap";
import OverviewTable from "../components/OverviewTable";
import ViewBox from "../components/ViewBox";

const Home = () => {
    return (
        <Box sx={{margin: 0, padding: 0, width: '100vw', overflowX: 'hidden'}}>
            <Header />
            <OverviewMap />

            <ViewBox centering>
                <OverviewTable />
            </ViewBox>
        </Box>
    )
}

export default Home;