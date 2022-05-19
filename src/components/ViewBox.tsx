import { Box, SxProps } from "@mui/material"

interface ViewBoxProps {
    centering?: boolean;
    withHeader?: boolean;
}

const ViewBox = ({ children, centering, withHeader }: React.PropsWithChildren<ViewBoxProps>) => {
    const sx: SxProps  = {minHeight: withHeader ? 'calc(100vh - 64px)' : '100vh', width: '100vw'};
    if (centering) {
        sx.display = 'flex';
        sx.flexDirection = 'column';
        sx.justifyContent = 'center';
        sx.alignItems = 'center';
    }

    return (
        <Box sx={sx}>
            { children }
        </Box>
    )
}

export default ViewBox;