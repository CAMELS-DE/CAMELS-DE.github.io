import { Box } from "@mui/material";
import { DataGrid, GridColDef, useGridApiRef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveFeatureByName } from "../features/dataSlice";
import { RootState } from "../store";

const OverviewTable = () => {
    // create a dispatcher
    const dispatch = useDispatch();

    // subscribe to pegel data and active Feature
    const pegel = useSelector((state: RootState) => state.data.pegel);
    const activeFeature = useSelector((state: RootState) => state.data.activeFeature);

    // state
    const [columns, setColumns] = useState<GridColDef[]>([]);
    const [rows, setRows] = useState<{id: number, [key: string]: any}[]>([]);

    // build the Column defs
    useEffect(() => {
        if (!pegel || pegel.features.length === 0) return;
        // map columns
        const cols = Object.keys(pegel.features[0].properties as any).map(key => {
            return ({field: key, headerName: key.toUpperCase(), flex: 1} as GridColDef)
        })
        setColumns(cols);

        // map rows
        const rows = pegel.features.map((feature, index) => {
            return {id: index, ...feature.properties}
        });
        setRows(rows);
    }, [pegel])

    // build the page
    return (
        <Box sx={{width: '100%', height: '100%', margin: 0, paddingRight: '5rem', paddingLeft: '5rem', paddingTop: '5px', position: 'absolute'}}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={25}
                rowsPerPageOptions={[10, 25, 50, 100]}
                onRowClick={e => dispatch(setActiveFeatureByName(e.row.name))}
                selectionModel={activeFeature ? rows.findIndex(r => r.name === activeFeature.properties!.name) : undefined}
            />
        </Box>
    );
}

export default OverviewTable;