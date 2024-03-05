import {Fragment} from "react";
import {Typography} from "@mui/material";
import AggregatedSubjectTable from "../../common/AggregatedSubjectTable";
import {useGetGradesForStudentQuery} from "../../../api/grades";

export const StudentContent = () => {

    const {data: grades, status: gradesStatus} = useGetGradesForStudentQuery();


    return <Fragment>
        <div style={{ padding: '20px' }}>
            <Typography variant="h5" component="h2">
                Student Panel
            </Typography>
            {gradesStatus ==='fulfilled' && <AggregatedSubjectTable sourceData={grades}/>}
        </div>
    </Fragment>
}