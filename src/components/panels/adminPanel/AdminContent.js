import {useAddUserMutation, useDeleteUserMutation, useGetUsersQuery} from "../../../api/users";
import {GenericTableComponent} from "../../common/GenericTableComponent";
import {SpinnerWrapper} from "../../common/SpinnerWrapper";
import {Fragment, useEffect, useState} from "react";
import {Button, Typography} from "@mui/material";
import {Popup} from "../../common/Popup";
import {useGetRolesQuery} from "../../../api/roles";
import {CommonSelector} from "../../common/CommonSelector";


const AdminContent = () => {

    const defaultData = {
        username: "",
        password: "",
        active: false,
        roles: [{}]
    }

    const {data : users,
        status : usersStatus
    } = useGetUsersQuery();

    const {data : roles,
        status : rolesStatus
    } = useGetRolesQuery();

    const [deleteUser, deleteUserResponse] = useDeleteUserMutation();
    const [addUser, addUserResponse] = useAddUserMutation();

    const [open, setOpen] = useState(false);

    const [userForm, setUserForm] = useState(defaultData);


    useEffect(() => {
        setUserForm(defaultData)
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

    const changeUserRoles = (event) => {
        setUserForm({
            ...userForm,
            roles : roles.filter(r => event.target.value.includes(r.id))
        });
    }

    const changeUserFormHandlers = {
        changeUserFormString : changeUserFormString,
        changeUserFormBoolean : changeUserFormBoolean
    }

    const handleDeleteUser = (id) => {
        deleteUser({id});
    }

    const handleAddUser = () => {
        setOpen(false);
        addUser({body : userForm});
    }

    return <Fragment>
        <div style={{ padding: '20px' }}>
            <Typography variant="h5" component="h2">
                Admin Panel
            </Typography>
        </div>
        <SpinnerWrapper
            status={usersStatus}
            component={<GenericTableComponent
                data={users && users.map(item => ({
                    ...item,
                    role: item.role.map(role => role.displayName)
                })).map(({ groupResponse, ...item }) => item)}
                deleteButton={true}
                deleteButtonFunction={handleDeleteUser}/>}
        />
        <Button onClick={() => setOpen(true)}>Add</Button>
        <Popup
            title={"Add user"}
            initialState={userForm}
            changeUserFormHandlers={changeUserFormHandlers}
            open={rolesStatus === 'fulfilled' && open}
            setOpen={setOpen}
            handleSave={handleAddUser}
            additionalComponents={[
                <CommonSelector
                    sourceData={roles}
                    currentValues={userForm.roles}
                    handler={changeUserRoles}
                    title={'Select role'}
                />
            ]}
        />
    </Fragment>
}

export default AdminContent;