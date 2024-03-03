import {useGetUsersQuery} from "../../api/users";
import {GenericTableComponent} from "../common/GenericTableComponent";
import {SpinnerWrapper} from "../common/SpinnerWrapper";

const AdminPanel = () => {

    let {data : users,
        status
    } = useGetUsersQuery();

    return <SpinnerWrapper
        status={status}
        component={<GenericTableComponent data={users}/>}
    />
}

export default AdminPanel;