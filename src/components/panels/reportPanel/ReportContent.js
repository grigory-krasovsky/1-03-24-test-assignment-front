import React, {useEffect, useState} from 'react';
import {
    Grid,
    Paper,
    List,
    ListItemText,
    ListItemButton
} from '@mui/material';
import {GenericTableComponent} from "../../common/GenericTableComponent";
import {SpinnerWrapper} from "../../common/SpinnerWrapper";

const ReportContent = ({ data }) => {

    const [dataToView, setDataToView] = useState();
    const [currentStatus, setCurrentStatus] = useState('');

    const handleTypeChange = (name) => {
        setCurrentStatus('fulfilled')
        setDataToView(data.filter(d => d.name===name)[0].data)
    };

    useEffect(() => {
        if (data.some(d => d.status === 'fulfilled')) {
            setCurrentStatus('fulfilled')
            setDataToView(data.filter(d => d.status === 'fulfilled')[0].data)
        }
    }, [data])

    return (
            <Grid container >
                <Grid item xs={2.5}>
                    <Paper style={{ height: '100vh', position: 'sticky', top: 0 }}>
                        <List>
                            {data.map((report, i) => {
                                return <ListItemButton key={i} onClick={() => handleTypeChange(report.name)}>
                                    <ListItemText primary={report.name} />
                                </ListItemButton>
                            })}
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={9.5}>
                    <Paper>
                        <SpinnerWrapper
                            status={currentStatus}
                            component={<GenericTableComponent data={dataToView}/>}
                        />
                    </Paper>
                </Grid>
            </Grid>
    );
};

export default ReportContent;
