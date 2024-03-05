import {Fragment, useState} from "react";
import {SpinnerWrapper} from "../../common/SpinnerWrapper";
import {GenericTableComponent} from "../../common/GenericTableComponent";
import {Button} from "@mui/material";
import {Popup} from "../../common/Popup";
import {CommonSelector} from "../../common/CommonSelector";
import {ROLES} from "../../../utils/constants";

export const SubjectsProvider = ({subjectsStatus,
                                     subjects,
                                     handleDeleteSubject,
                                     users, usersStatus, handleAddSubject}) => {

    const defaultData = {
        name: "",
        students: [{}],
        teachers: [{}],
    }

    const [open, setOpen] = useState(false);
    const [subjectForm, setSubjectForm] = useState(defaultData);

    const changeUserFormString = (event) => {
        let newUserForm = {...subjectForm};
        newUserForm[event.target.id] = event.target.value;
        setSubjectForm(newUserForm);
    }
    const changeUserFormBoolean = (event) => {
        let newUserForm = {...subjectForm};
        newUserForm[event.target.id] = event.target.checked;
        setSubjectForm(newUserForm);
    }

    const changeUserFormHandlers = {
        changeUserFormString: changeUserFormString,
        changeUserFormBoolean: changeUserFormBoolean
    }

    const changeStudents = (event) => {
        setSubjectForm({
            ...subjectForm,
            students: users.filter(u => event.target.value.includes(u.id))
        });
    }
    const changeTeachers = (event) => {
        setSubjectForm({
            ...subjectForm,
            teachers: users.filter(u => event.target.value.includes(u.id))
        });
    }

    const additionalComponents = [
        <CommonSelector
            sourceData={users && users.filter(user => user.role.some(role => role.displayName === ROLES.STUDENT)).map(user => ({
                ...user,
                displayName: user.username
            }))}
            currentValues={subjectForm.students}
            handler={changeStudents}
            title={'Select students'}
        />,
        <CommonSelector
            sourceData={users && users.filter(user => user.role.some(role => role.displayName === ROLES.TEACHER)).map(user => ({
                ...user,
                displayName: user.username
            }))}
            currentValues={subjectForm.teachers}
            handler={changeTeachers}
            title={'Select teachers'}
        />,
    ]

    const getPopup = (openCondition, additionalComponents) => {
        return <Popup
            title={"Add subject"}
            initialState={subjectForm}
            changeUserFormHandlers={changeUserFormHandlers}
            open={openCondition}
            setOpen={setOpen}
            handleSave={() => handleAddSubject({body: subjectForm})}
            additionalComponents={additionalComponents}
        />
    }

    return <Fragment>
        <SpinnerWrapper
            status={subjectsStatus}
            component={<GenericTableComponent
                data={subjects}
                deleteButton={true}
                deleteButtonFunction={handleDeleteSubject}/>}
        />
        <Button onClick={() => setOpen(true)}>Add Subject</Button>
        {getPopup(usersStatus === 'fulfilled' && open, additionalComponents)}
    </Fragment>
}