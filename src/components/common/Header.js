import {jwtUtils} from "../../utils/utils";

export const Header = () => {
    console.log(jwtUtils.parse(jwtUtils.decode()));
    return<>header</>
}