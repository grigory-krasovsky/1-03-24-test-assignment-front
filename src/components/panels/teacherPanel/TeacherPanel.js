import React from 'react';
import {AuthorizationWrapper} from "../../common/AuthorizationWrapper";
import {ROLES} from "../../../utils/constants";
import {TeacherContent} from "./TeacherContent";

const TeacherPanel = () => {
    return <AuthorizationWrapper
        component={<TeacherContent/>}
        anyRoles={[ROLES.TEACHER]}
    />
}

export default TeacherPanel;