import {jwtUtils} from "../../utils/utils";
import {useSelector} from "react-redux";

export const AuthorizationWrapper = ({roles, component}) => {
    const notAuthorized = !jwtUtils.isAuthorized(useSelector);
    if (notAuthorized) {
        return <>NOT AUTHORIZED</>
    }
    return component;
}