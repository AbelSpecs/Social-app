import { Button ,AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home'
import { useLocation, useNavigate } from "react-router-dom";
import auth from "../../auth/auth-helper";
import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import SearchBar from "./SearchBar";


const useStyles = makeStyles(() => ({
    link: {
        textDecoration: 'none'
    }
  }));

const isActive = (location, path) => {
    if(location.pathname == path)
        return {color: '#ff4081'};
    else
        return {color: '#ffffff'};
} 

export default function Menu() {
    const classes = useStyles();
    const location = useLocation();
    const navigate = useNavigate();
    
    return(<AppBar position="static">
        <Toolbar>
            <Typography variant="h6" color="inherit">
                GG Videos
            </Typography>
            <Link to="/">
                <IconButton aria-label="Home" style={isActive(location, "/")}>
                    <HomeIcon/>
                </IconButton>
            </Link>
            <Link to="/users" className={classes.link}>
                <Button style={isActive(location,"/users")}>Users</Button>
            </Link>
            {
                !auth.isAuthenticated() && (
                    <span>
                        <Link to="/signup" className={classes.link}>
                            <Button style={isActive(location, "/signup")}>Sign Up</Button>
                        </Link>
                        <Link to="/signin" className={classes.link}>
                            <Button style={isActive(location, "/signin")}>Sign In</Button>
                        </Link>
                    </span>
                    )
            }
            {
                auth.isAuthenticated() && (
                    <span>
                        <Link to={"/user/" + auth.isAuthenticated().user._id} className={classes.link}>
                            <Button style={isActive(location,"/user/" + auth.isAuthenticated().user._id)}>
                                Profile
                            </Button>
                        </Link>
                        <Button color="inherit"
                            onClick={() => auth.clearJWT(() => navigate("/"))}>
                            Sign Out    
                        </Button>
                    </span>
                )
            }
            <SearchBar />
        </Toolbar>
    </AppBar>)

    
}

