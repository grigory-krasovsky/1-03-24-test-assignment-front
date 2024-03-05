import React from 'react';
import {AuthorizationWrapper} from "../../common/AuthorizationWrapper";
import {ROLES} from "../../../utils/constants";
import {StudentContent} from "./StudentContent";

const StudentPanel = () => {
    return <AuthorizationWrapper
        component={<StudentContent/>}
        anyRoles={[ROLES.STUDENT]}
    />
}

export default StudentPanel;