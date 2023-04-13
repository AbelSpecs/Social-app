import React from "react";
import { 
    Avatar, 
    IconButton, 
    List, 
    ListItem, 
    ListItemAvatar, 
    ListItemSecondaryAction, 
    ListItemText, 
    Paper, 
    Typography 
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { findpeoplebyname } from "./api-user";
import { Link, useLocation } from "react-router-dom";
import { ArrowForward } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import Person from '@material-ui/icons/Person';
import Grid from '@material-ui/core/Grid';
import FindPeople from "../user/FindPeople";
import auth from "../auth/auth-helper";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2)
    },
    title: {
      color: theme.palette.openTitle
    },
    textDecoration: {
        textDecoration: 'none'
    },
    grid: {
        marginTop: '10px'
    }
}));

export default function Users() {
    const classes = useStyles();
    const location = useLocation(); 
    const [users, setUsers] = useState([]);
    const jwt = auth.isAuthenticated();
    console.log(location);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        findpeoplebyname({
            params: { name: location.state.name },
            credentials: { divineMole: jwt.token },
            signal
        }).then(data => {
            if(data && data.error)
            {
                console.log(data.error);
            }
            else
            {
                setUsers(data);
            }
        });

        // list(signal).then((data) => {
        //     if(data && data.error) {
        //         console.log(data.error)
        //     }else {
        //         console.log(data);
        //         setUsers(data);
        //     }
        // });

        return function cleanup(){
            abortController.abort();
        }
    }, []);


    return (
        <Grid container justifyContent="flex-end" spacing={2} className={classes.grid}>
            <Grid item xs={4}>
                <Paper elevation={4} className={classes.paper}>
                    <Typography variant="h6" className={classes.title}>
                        All Users
                    </Typography>
                    <List dense>
                        {users.map((item, i) => {
                            return <Link to={"/user/" + item._id} key={i} className={classes.textDecoration}>
                                        <ListItem button>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <Person/>
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={item.name}/>
                                            <ListItemSecondaryAction>
                                                <IconButton>
                                                    <ArrowForward/>
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    </Link>
                        })}
                    </List>
                </Paper>
            </Grid> 
            <Grid item xs={4}>
                <FindPeople/>
            </Grid>   
        </Grid>
    )
}


