import React from "react";
import { Link } from "react-router-dom";
import { Drawer, List, ListItem, ListItemText, Switch } from "@mui/material";

const Navbar = ({ darkMode, setDarkMode }) => {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 200,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: 200, boxSizing: "border-box" },
            }}
        >
            <List>
                <ListItem button component={Link} to="/">
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button component={Link} to="/heroes">
                    <ListItemText primary="Heroes" />
                </ListItem>
                <ListItem button component={Link} to="/about">
                    <ListItemText primary="About" />
                </ListItem>
                <ListItem>
                    <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)}/>
                    Dark mode
                </ListItem>
            </List>
        </Drawer>
    )
}

export default Navbar;