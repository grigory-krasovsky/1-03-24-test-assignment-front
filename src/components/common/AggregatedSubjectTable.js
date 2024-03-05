import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import SubjectComponent from "./SubjectComponent";

const AggregatedSubjectTable = ({sourceData, setCurrentStudentSubject}) => {

    const [selectedSubject, setSelectedSubject] = useState(sourceData[0]);

    const handleTabChange = (event, newValue) => {
        setSelectedSubject(sourceData[newValue]);
    };


    return (
        <div>
            <Tabs value={selectedSubject ? sourceData.map(s => s.subjectName).indexOf(selectedSubject.subjectName)
                : false} onChange={handleTabChange}>
                {sourceData.map((subject, index) => (
                    <Tab key={index} label={subject.subjectName} />
                ))}
            </Tabs>
            {selectedSubject && <SubjectComponent
                subjectName={selectedSubject.subjectName}
                userGradesMap={selectedSubject.userGradesMap}
                setCurrentStudentSubject={setCurrentStudentSubject}/>}
        </div>
    );
};

export default AggregatedSubjectTable;
