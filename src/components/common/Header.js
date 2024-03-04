import {jwtUtils} from "../../utils/utils";
import {
    AppBar,
    Box,
    Button,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemText,
    Toolbar,
    Typography
} from "@mui/material";
import {useSelector} from "react-redux";
import MenuIcon from '@mui/icons-material/Menu';
import {Fragment, useState} from "react";

export const Header = () => {

    const authorized = jwtUtils.isAuthorized(useSelector);
    const parsedJwt = jwtUtils.parse(jwtUtils.decode());

    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

    const toggleSidePanel = () => {
        setIsSidePanelOpen(!isSidePanelOpen);
    };

    const content = () => {
        if (!authorized) return "Unauthorized"
        return `Welcome, ${parsedJwt.sub}. Roles: ${parsedJwt.roles.map(r => r.authority).join(", ")}`

    }
    const handleLogOut = () => {
        jwtUtils.removeFromStorage();
        window.location.replace("/");
    }

    const handleDrawerItemClick = (path) => {
        window.location.replace(path);
    }

    const panels = [
        {
            name: "Admin Panel",
            path: "/admin-panel"
        },
        {
            name: "Director Panel",
            path: "/director-panel"
        },
        {
            name: "Teacher Panel",
            path: "/teacher-panel"
        },
        {
            name: "Student Panel",
            path: "/student-panel"
        },

    ]

    return (
        <Fragment>
             <AppBar position="static">
                <Toolbar>
                    {authorized && <Fragment>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                            onClick={toggleSidePanel}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            {content()}
                        </Typography>
                        <Button color="inherit" onClick={handleLogOut}>
                            Logout
                        </Button>
                    </Fragment>}

                </Toolbar>
            </AppBar>
            <Drawer
                anchor="left"
                open={isSidePanelOpen}
                onClose={toggleSidePanel}
                PaperProps={{ style: { width: '15%' } }}
            >
                <Box>
                    <List>
                        {panels.map((panel, index) => {
                            return <ListItemButton key={index}>
                                <ListItemText primary={panel.name}
                                              onClick={() => handleDrawerItemClick(panel.path)}/>
                            </ListItemButton>
                        })}
                    </List>
                </Box>
            </Drawer>
        </Fragment>
    );
}