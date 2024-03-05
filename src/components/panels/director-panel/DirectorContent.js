import {useAddSubjectMutation, useDeleteSubjectsMutation, useGetSubjectsQuery} from "../../../api/subjects";
import {useState} from "react";
import {Tab, Tabs, Typography} from "@mui/material";
import {useGetUsersQuery} from "../../../api/users";
import {SubjectsProvider} from "./SubjectsProvider";
import {GroupsProvider} from "./GroupsProvider";
import {useAddGroupMutation, useDeleteGroupsMutation, useGetGroupsQuery} from "../../../api/groups";

export const DirectorContent = () => {

    const {data: subjects, status: subjectsStatus} = useGetSubjectsQuery();
    let {data: users, status: usersStatus} = useGetUsersQuery();
    let {data: groups, status: groupsStatus} = useGetGroupsQuery();
    const [deleteSubject] = useDeleteSubjectsMutation();
    const [deleteGroup] = useDeleteGroupsMutation();
    const [addSubject] = useAddSubjectMutation();
    const [addGroup] = useAddGroupMutation();

    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleAddSubject = (body) => {
        addSubject(body);
    }

    const handleAddGroup = (body) => {
        addGroup(body);
    }

    const handleDeleteSubject = (id) => {
        deleteSubject({id});
    }

    const handleDeleteGroup = (id) => {
        deleteGroup({id});
    }


    const TabPanel = (props) => {
        const {children, value, index, ...other} = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`tabpanel-${index}`}
                aria-labelledby={`tab-${index}`}
                {...other}
            >
                {value === index && (
                    <div>
                        {children}
                    </div>
                )}
            </div>
        );
    }


    return (
        <div>
            <div style={{padding: '20px'}}>
                <Typography variant="h5" component="h2">
                    Director Panel
                </Typography>
            </div>
            <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab label="Groups"/>
                <Tab label="Subjects"/>
            </Tabs>
            <TabPanel value={tabValue} index={1}>
                <SubjectsProvider
                    subjectsStatus={subjectsStatus}
                    subjects={subjects}
                    handleDeleteSubject={handleDeleteSubject}
                    users={users}
                    usersStatus={usersStatus}
                    handleAddSubject={handleAddSubject}
                />
            </TabPanel>
            <TabPanel value={tabValue} index={0}>
                <GroupsProvider
                    groupsStatus={groupsStatus}
                    groups={groups}
                    handleDeleteSubject={handleDeleteGroup}
                    handleAddGroup={handleAddGroup}
                    users={users}
                    usersStatus={usersStatus}
                />
            </TabPanel>
        </div>
    );
}