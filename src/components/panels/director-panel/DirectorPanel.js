import React from 'react';
import {AuthorizationWrapper} from "../../common/AuthorizationWrapper";
import {ROLES} from "../../../utils/constants";
import {DirectorContent} from "./DirectorContent";

const DirectorPanel = () => {
    return <AuthorizationWrapper
        component={<DirectorContent/>}
        anyRoles={[ROLES.DIRECTOR]}
    />
}

export default DirectorPanel;