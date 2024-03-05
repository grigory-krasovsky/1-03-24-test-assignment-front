import {Fragment, useState} from "react";
import {SpinnerWrapper} from "../../common/SpinnerWrapper";
import {GenericTableComponent} from "../../common/GenericTableComponent";
import {Button} from "@mui/material";
import {Popup} from "../../common/Popup";
import {CommonSelector} from "../../common/CommonSelector";
import {ROLES} from "../../../utils/constants";

export const GroupsProvider = ({
                                   groupsStatus,
                                   groups,
                                   handleDeleteSubject,
                                   users, usersStatus, handleAddGroup
                               }) => {

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

    const additionalComponents = [
        <CommonSelector
            sourceData={users && users.filter(user => user.role.some(role => role.displayName === ROLES.STUDENT)).map(user => ({
                ...user,
                displayName: user.username
            }))}
            currentValues={subjectForm.students}
            handler={changeStudents}
            title={'Select students'}
        />
    ]

    const getPopup = (openCondition, additionalComponents) => {
        return <Popup
            title={"Add group"}
            initialState={subjectForm}
            changeUserFormHandlers={changeUserFormHandlers}
            open={openCondition}
            setOpen={setOpen}
            handleSave={() => handleAddGroup({body: subjectForm})}
            additionalComponents={additionalComponents}
        />
    }

    return <Fragment>
        <SpinnerWrapper
            status={groupsStatus}
            component={<GenericTableComponent
                data={groups}
                deleteButton={true}
                deleteButtonFunction={handleDeleteSubject}/>}
        />
        <Button onClick={() => setOpen(true)}>Add Group</Button>
        {getPopup(usersStatus === 'fulfilled' && open, additionalComponents)}
    </Fragment>
}