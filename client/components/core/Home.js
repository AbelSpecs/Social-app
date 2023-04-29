import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import FindPeople from "../user/FindPeople";
import NewsFeed from "../post/NewsFeed";
import ProfileCard from "../user/ProfileCard";
import Followers from "../user/Followers";
import Trends from "../post/Trends";
import SearchBar from "./SearchBar";
import { Fragment } from "react";
import { IconButton } from "@material-ui/core";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { useContext } from "react";
import { ModeContext }  from "./Mode";
import auth from '../../auth/auth-helper';
import useUserPeople from '../../hooks/useUserPeople';
import Brightness4Icon from '@material-ui/icons/Brightness4';

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto'
    },
    title: {
        padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
        color: theme.palette.openTitle
    },
    media: {
        minHeight: 400,
        backgroundSize: "contain"
    },
    grid: {
        marginTop: '10px',
        justifyContent: 'center',
        position: 'relative'
    },
    gridChild: {
        height: 'max-content',
        position: 'sticky',
        top: 1
    }
}));
    
export default function Home () {
    const classes = useStyles();
    const mode = useContext(ModeContext);
    const userData = auth.getData();
    const { userPeople } = useUserPeople(userData);
    
    return ( 
        <Fragment>
            <Grid container justifyContent="flex-end" spacing={5} className={classes.grid}>
                
                <Grid item xs={12} sm={12} md={3} className={classes.gridChild}>
                    <ProfileCard user={userData} followers={userPeople.followers} following={userPeople.following}/>
                    <Followers user={userData}/>
                </Grid>
                
                <Grid item xs={12} sm={12} md={5} className={classes.gridChild}>
                    <NewsFeed user={userData}/>
                </Grid>
                
                <Grid item xs={12} sm={12} md={3} className={classes.gridChild}>
                    <SearchBar user={userData}/>
                    <Trends user={userData}/>
                    <FindPeople user={userData}/>
                </Grid>
                
            </Grid>
        </Fragment>
    )
}