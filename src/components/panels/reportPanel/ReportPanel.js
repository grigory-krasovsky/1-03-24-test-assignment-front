import React from 'react';
import {AuthorizationWrapper} from "../../common/AuthorizationWrapper";
import {ROLES} from "../../../utils/constants";
import ReportContent from "./ReportContent";
import {useGetReportsGroupsQuery, useGetReportsStudentsQuery} from "../../../api/reports";

const ReportPanel = () => {

    let {data: reportsGroups, status: reportsGroupsStatus} = useGetReportsGroupsQuery();
    let {data: reportsStudents, status: reportsStudentsStatus} = useGetReportsStudentsQuery();

    const data = [
        {name: 'Groups', data: reportsGroups, status: reportsGroupsStatus},
        {name: 'Students', data: reportsStudents, status: reportsStudentsStatus},
    ]

    return <AuthorizationWrapper
        component={<ReportContent data = {data}/>}
        anyRoles={[ROLES.REPORTS]}
    />
}

export default ReportPanel;