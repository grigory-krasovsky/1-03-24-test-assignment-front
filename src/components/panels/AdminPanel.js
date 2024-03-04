import {useAddUserMutation, useDeleteUserMutation, useGetUsersQuery} from "../../api/users";
import {GenericTableComponent} from "../common/GenericTableComponent";
import {SpinnerWrapper} from "../common/SpinnerWrapper";
import {Fragment, useEffect, useState} from "react";
import {Button} from "@mui/material";
import {Popup} from "../common/Popup";

const AdminPanel = () => {
    let [deleteUser, deleteUserResponse] = useDeleteUserMutation();
    let [addUser, addUserResponse] = useAddUserMutation();

    const [open, setOpen] = useState(false);

    const [userForm, setUserForm] = useState({
        username: "",
        password: "",
        active: false
    });

    useEffect(() => {
        setUserForm({username: "",
            password: "",
            active: false})
    }, [open]);


    const changeUserFormString = (event) => {
        let newUserForm = {...userForm};
        newUserForm[event.target.id] = event.target.value;
        setUserForm(newUserForm);
    }
    const changeUserFormBoolean = (event) => {
        let newUserForm = {...userForm};
        newUserForm[event.target.id] = event.target.checked;
        setUserForm(newUserForm);
    }

    const changeUserFormHandlers = {
        changeUserFormString : changeUserFormString,
        changeUserFormBoolean : changeUserFormBoolean
    }

    let {data : users,
        status
    } = useGetUsersQuery();

    const handleDeleteUser = (id) => {
        deleteUser({id});
    }

    const handleAddUser = () => {
debugger
        addUser({body : userForm})
    }

    return <Fragment>
        <SpinnerWrapper
            status={status}
            component={<GenericTableComponent
                data={users}
                deleteButton={true}
                deleteButtonFunction={handleDeleteUser}/>}
        />
        <Button onClick={() => setOpen(true)}>Add</Button>
        <Popup
            title={"Add user"}
            initialState={userForm}
            changeUserFormHandlers={changeUserFormHandlers}
            open={open}
            setOpen={setOpen}
            handleSave={handleAddUser}
        />
    </Fragment>
}

export default AdminPanel;