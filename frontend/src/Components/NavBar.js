import * as React from "react";
import PropTypes from "prop-types";
import { Toolbar, Box, AppBar, Grid, Container } from "@mui/material/";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";


function NavBar(props) {
    const { sections } = props;

    return (
        <Container maxWidth="sm">
            <Toolbar
                className="navbar"
                component="nav"
                variant="dense"
                sx={{ justifyContent: "space-between", overflowX: "auto" }}
            >
                {sections.map((section) => (
                    <Link style={{ textDecoration: 'none', color:'#151515'}} to={section.url}>
                        {section.title}
                    </Link>
                ))}
            </Toolbar>
        </Container>
    );
}

export default NavBar;


