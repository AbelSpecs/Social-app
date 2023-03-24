import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
// import purificationForce from './../assets/images/purificationForce.jpg';
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import FindPeople from "../user/FindPeople";
import auth from "../auth/auth-helper";
import { useState } from 'react';

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
        marginTop: '10px'
    }
}));
    
export default function Home () {
    const [defaultPage, setDefaultPage] = useState(auth.isAuthenticated());
    const classes = useStyles();

    return ( 
        <div>
            <Grid container justifyContent="flex-end" spacing={2} className={classes.grid}>
                <Grid item xs={4}>
                    <Card className={classes.card}>
                        <Typography variant="h6" className={classes.title}>
                            Home Page
                        </Typography>
                        <CardContent>
                            <Typography variant="body2" component="p">
                                Welcome to the MERN Skeleton home page.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                {defaultPage && 
                    <Grid item xs={4}>
                        <FindPeople/>
                    </Grid>
                }
            </Grid>
        </div>
    )
}