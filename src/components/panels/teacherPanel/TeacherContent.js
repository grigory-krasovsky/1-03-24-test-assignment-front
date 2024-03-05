import {Fragment, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";
import AggregatedSubjectTable from "../../common/AggregatedSubjectTable";
import {useGetGradesQuery, useRateStudentMutation} from "../../../api/grades";
import {GRADES} from "../../../utils/constants";

export const TeacherContent = () => {

    const {data: grades, status: gradesStatus} = useGetGradesQuery();
    const [rate, rateResponse] = useRateStudentMutation();

    const [currentStudentSubject, setCurrentStudentSubject] = useState(null);

    const handleRate = (gradeValue) => {
        const body = {
            targetStudent: currentStudentSubject.user,
            targetSubject: currentStudentSubject.subjectName,
            grade: gradeValue
        }
        rate({body});
        setCurrentStudentSubject(null);
    }

    const dialog = <Dialog open={currentStudentSubject != null}
                       fullWidth={true}
                       onClose={() => setCurrentStudentSubject(null)}
        >
            <DialogTitle>{`Rate student ${currentStudentSubject && currentStudentSubject.user}`}</DialogTitle>
            <DialogContent>
                {Object.keys(GRADES).map((grade, i) => {
                    return <Button key={i} onClick={() => handleRate(grade)}>{grade}</Button>
                })}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setCurrentStudentSubject(null)}>cancel</Button>
            </DialogActions>
        </Dialog>



    return <Fragment>
        <div style={{ padding: '20px' }}>
            <Typography variant="h5" component="h2">
                Teacher Panel
            </Typography>
            {gradesStatus ==='fulfilled' && <AggregatedSubjectTable sourceData={grades} setCurrentStudentSubject={setCurrentStudentSubject}/>}
            {dialog}
        </div>
    </Fragment>
}