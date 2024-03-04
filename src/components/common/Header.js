import {jwtUtils} from "../../utils/utils";
import {AppBar, Button, Toolbar, Typography} from "@mui/material";
import {useSelector} from "react-redux";

export const Header = () => {

    const authorized = jwtUtils.isAuthorized(useSelector);
    const parsedJwt = jwtUtils.parse(jwtUtils.decode());

    const content = () => {
        if (!authorized) return "Unauthorized"
        return `Welcome, ${parsedJwt.sub}. Roles: ${parsedJwt.roles.map(r => r.authority).join(", ")}`

    }
    const handleLogOut = () => {
        jwtUtils.removeFromStorage();
        window.location.replace("/")
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {content()}
                </Typography>
                <Button color="inherit" onClick={handleLogOut}>{authorized ? 'Logout' : 'Login'}</Button>
            </Toolbar>
        </AppBar>
    )
}