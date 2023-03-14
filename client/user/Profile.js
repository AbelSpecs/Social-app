import { 
IconButton, 
ListItem, 
ListItemAvatar, 
ListItemSecondaryAction, 
ListItemText, 
Paper, 
Typography, 
List,
Avatar,
Divider
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { read } from "./api-user";
import auth from "../auth/auth-helper";
import { makeStyles } from "@material-ui/styles";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import React from "react";
import Edit from '@material-ui/icons/Edit';
import Person from '@material-ui/icons/Person';
import DeleteUser from "./DeleteUser";


const useStyles = makeStyles(theme => ({
    root: {
      maxWidth: 600,
      margin: 'auto',
      padding: theme.spacing(3),
      marginTop: theme.spacing(5)
    },
    title: {
      marginTop: theme.spacing(3),
      color: theme.palette.protectedTitle
    }
  }));

export default function Profile() {
    const userId = useParams();
    const navigate = useNavigate();
    const classes = useStyles();
    const [user, setUser] = useState({});
    const [redirectToSigin, setRedirectToSignin] = useState(false);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        const jwt = auth.isAuthenticated();
        console.log(jwt);
        console.log(userId);
        read({
            params: { userId: userId.userId },
            credentials: { divineMole: jwt.token },
            signal
        }).then(data => {
            console.log(data);
            if(data && data.error)
            {
                setRedirectToSignin(true);
                console.log(redirectToSigin);
            }
            else
            {
                setUser(data);
            }
        });

        return function cleanup() {
            abortController.abort();
        }
    }, [userId]);

    if(redirectToSigin)
        navigate('/signin');

    return (
        <Paper className={classes.root} elevation={4}>
            <Typography variant="h6" className={classes.title}>
                Profile
            </Typography>
            <List dense>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <Person/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={user.name} secondary={user.email}/>
                    { auth.isAuthenticated().user && auth.isAuthenticated().user._id == user._id
                        &&
                        (<ListItemSecondaryAction>
                            <Link to={"/user/" + user._id + "/edit"}>
                                <IconButton aria-label="Edit" color="primary"><Edit/></IconButton>
                            </Link>
                            <DeleteUser userId={user._id}/>
                        </ListItemSecondaryAction>)
                    }
                    
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemText primary={"Joined: " + (new Date(user.created)).toDateString()}/>
                </ListItem>
            </List>
        </Paper>
    )
}