import {jwtUtils} from "../../utils/utils";
import {useSelector} from "react-redux";

export const AuthorizationWrapper = ({anyRoles, component}) => {
    const notAuthorized = !jwtUtils.isAuthorized(useSelector);

    const accessGranted = anyRoles.some(role => jwtUtils.currentRoles().map(cr => cr.authority).includes(role))

    if (notAuthorized || !accessGranted) {
        return <>NOT AUTHORIZED</>
    }
    return component;
}