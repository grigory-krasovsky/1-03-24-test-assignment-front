import React from 'react';
import {AuthorizationWrapper} from "../../common/AuthorizationWrapper";
import {ROLES} from "../../../utils/constants";
import AdminContent from "./AdminContent";

const AdminPanel = () => {
    return <AuthorizationWrapper
        component={<AdminContent/>}
        anyRoles={[ROLES.ADMIN]}
    />
}

export default AdminPanel;