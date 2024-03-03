import {CircularProgress} from "@mui/material";

export const SpinnerWrapper = ({status, component}) => {
    if (status === 'fulfilled') {
        return component
    }
    return <CircularProgress />
}