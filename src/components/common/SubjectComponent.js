import React from "react";
import {Table, TableHead, TableBody, TableCell, TableRow, Button} from "@mui/material";

const SubjectComponent = ({ subjectName, userGradesMap, setCurrentStudentSubject }) => {
    return (
        <div>
            <h2>{subjectName}</h2>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell width={'20%'}>User</TableCell>
                        <TableCell width={'70%'}>Grades</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.entries(userGradesMap).map(([user, grades]) => (
                        <TableRow key={user}>
                            <TableCell>{user}</TableCell>
                            <TableCell>{grades.join(", ")}</TableCell>
                            <TableCell><Button onClick={() => setCurrentStudentSubject({user, subjectName})}>Rate student</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default SubjectComponent;
