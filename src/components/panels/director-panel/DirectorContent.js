import {useAddSubjectMutation, useDeleteSubjectsMutation, useGetSubjectsQuery} from "../../../api/subjects";
import {Fragment, useEffect, useState} from "react";
import {Button, Typography} from "@mui/material";
import {GenericTableComponent} from "../../common/GenericTableComponent";
import {SpinnerWrapper} from "../../common/SpinnerWrapper";
import {Popup} from "../../common/Popup";
import {CommonSelector} from "../../common/CommonSelector";
import {useGetUsersQuery} from "../../../api/users";
import {ROLES} from "../../../utils/constants";

export const DirectorContent = () => {

    const defaultData = {
        name: "",
        students: [{}],
        teachers: [{}],
    }
    const {data: subjects, status: subjectsStatus} = useGetSubjectsQuery();
    let {data: users, status: usersStatus} = useGetUsersQuery();
    const [deleteSubject] = useDeleteSubjectsMutation();
    const [addSubject] = useAddSubjectMutation();

    const [subjectForm, setSubjectForm] = useState(defaultData);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setSubjectForm(defaultData)
    }, [open]);

    const handleAddSubject = () => {
        setOpen(false);
        addSubject({body : subjectForm});
    }

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
        changeUserFormString : changeUserFormString,
        changeUserFormBoolean : changeUserFormBoolean
    }

    const handleDeleteSubject = (id) => {
        deleteSubject({id});
    }

    const changeStudents = (event) => {
        setSubjectForm({
            ...subjectForm,
            students : users.filter(u => event.target.value.includes(u.id))
        });
    }
    const changeTeachers = (event) => {
        setSubjectForm({
            ...subjectForm,
            teachers : users.filter(u => event.target.value.includes(u.id))
        });
    }



    return <Fragment>
        <div style={{ padding: '20px' }}>
            <Typography variant="h5" component="h2">
                Director Panel
            </Typography>
        </div>
        <SpinnerWrapper
            status={subjectsStatus}
            component={<GenericTableComponent
                data={subjects}
                deleteButton={true}
                deleteButtonFunction={handleDeleteSubject}/>}
        />
        <Button onClick={() => setOpen(true)}>Add</Button>
        <Popup
            title={"Add subject"}
            initialState={subjectForm}
            changeUserFormHandlers={changeUserFormHandlers}
            open={usersStatus === 'fulfilled' && open}
            setOpen={setOpen}
            handleSave={handleAddSubject}
            additionalComponents={[
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

            ]}
        />
    </Fragment>
}