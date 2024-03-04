import React from 'react';
import AdminPanel from "../panels/AdminPanel";
import {AuthorizationWrapper} from "../common/AuthorizationWrapper";

const HomePage = () => {
    return <AuthorizationWrapper
        component={<AdminPanel/>}
    />
}

export default HomePage;