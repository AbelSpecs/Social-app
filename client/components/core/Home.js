import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import FindPeople from "../user/FindPeople";
import NewsFeed from "../post/NewsFeed";
import auth from "../../auth/auth-helper";
import { useState } from 'react';
import ProfileCard from "../user/ProfileCard";
import Followers from "../user/Followers";
import Trends from "../post/Trends";
import SearchBar from "./SearchBar";
import { Fragment } from "react";

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
        justifyContent: 'center'
    },
    gridChild: {
        height: 'max-content'
    }
}));
    
export default function Home () {
    const [defaultPage, setDefaultPage] = useState(auth.isAuthenticated());
    const classes = useStyles();

    return ( 
        <Fragment>
            <Grid container justifyContent="flex-end" spacing={5} className={classes.grid}>
                <Grid item xs={12} sm={12} md={3} className={classes.gridChild}>
                    <ProfileCard/>
                    <Followers/>
                </Grid>
                {defaultPage && 
                    <Grid item xs={12} sm={12} md={5} className={classes.gridChild}>
                        <NewsFeed/>
                    </Grid>
                }
                {defaultPage && 
                    <Grid item xs={12} sm={12} md={3} className={classes.gridChild}>
                        <SearchBar/>
                        <Trends/>
                        <FindPeople/>
                    </Grid>
                }
            </Grid>
        </Fragment>
    )
}