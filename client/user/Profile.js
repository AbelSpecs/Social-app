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
import { loadPostsByUser } from "../post/api-post";
import auth from "../auth/auth-helper";
import { makeStyles } from "@material-ui/styles";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import React from "react";
import Edit from '@material-ui/icons/Edit';
import DeleteUser from "./DeleteUser";
import FollowButton from "./FollowButton";
import ProfileTabs from "./ProfileTabs";


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
    },
    bigAvatar: {
        width: 60,
        height: 60,
        margin: 10
    }
  }));

export default function Profile() {
    const userId = useParams();
    const navigate = useNavigate();
    const classes = useStyles();
    const [user, setUser] = useState({
        following: [],
        followers: []
    });
    const [redirectToSigin, setRedirectToSignin] = useState(false);
    const [following, setFollowing] = useState(false);
    const [posts, setPosts] = useState([]);
    const jwt = auth.isAuthenticated();

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        read({
            params: { userId: userId.userId },
            credentials: { divineMole: jwt.token },
            signal
        }).then(data => {
            if(data && data.error)
            {
                setRedirectToSignin(true);
            }
            else
            {
                let following = checkFollow(data);
                setUser(data);
                setFollowing(following);
                console.log(data);
                console.log(following);
            }
        });

        return function cleanup() {
            abortController.abort();
        }
    }, [userId]);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        loadPostsByUser({
            params: { params: userId },
            credentials: { divineMole: jwt.token },
            signal
        }).then(data => {
            if(data.error){
                console.log(data.error);
            }else{
                setPosts(data);
            }
        })

    }, [userId])

    
    const checkFollow = (user) => {
        const match = user.followers.some((follower) => {
            return follower._id === jwt.user._id;
        });
        return match;
    }

    const clickFollowButton = (api) => {
        console.log(api);
        api({
            params: {userId: userId.userId},
            credentials: {divineMole: jwt.token},
            followId: jwt.user._id
        }).then((data) => {
            if(data.error){
                console.log('error');
                setUser({...values, error: data.error});
            }
            else{
                console.log('no dio error');
                console.log(data);
                setUser(data);
                setFollowing(!following);
            }
        })
    }

    const photoUrl = user._id
    ? `/api/users/photo/${user._id}?${new Date().getTime()}`
    : '/api/users/defaultphoto';

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
                        <Avatar src={photoUrl} className={classes.bigAvatar}/>
                    </ListItemAvatar>
                    <ListItemText primary={user.name} secondary={user.email}/>
                    <ListItemText primary={user.about}/>
                    { auth.isAuthenticated().user && auth.isAuthenticated().user._id == user._id
                        ?
                        (<ListItemSecondaryAction>
                            <Link to={"/user/" + user._id + "/edit"}>
                                <IconButton aria-label="Edit" color="primary"><Edit/></IconButton>
                            </Link>
                            <DeleteUser userId={user._id}/>
                        </ListItemSecondaryAction>)
                        :
                        (<ListItemSecondaryAction>
                            <FollowButton following={following} onButtonClick={clickFollowButton}/>
                        </ListItemSecondaryAction>)
                    }
                    
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemText primary={"Joined: " + (new Date(user.created)).toDateString()}/>
                </ListItem>
                <ProfileTabs people={user} posts={posts}></ProfileTabs>
            </List>
        </Paper>
    )
}