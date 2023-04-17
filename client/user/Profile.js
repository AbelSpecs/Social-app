import { 
Card,
CardHeader,
CardActions,
CardActionArea,
CardMedia,
CardContent,
IconButton, 
ListItemSecondaryAction, 
Paper, 
Typography, 
List,
Avatar
} from "@material-ui/core";
import { Fragment, useEffect, useState } from "react";
import { read, update } from "./api-user";
import { loadPostsByUser } from "../post/api-post";
import auth from "../auth/auth-helper";
import { makeStyles } from "@material-ui/styles";
import { useNavigate, useParams } from "react-router";
import React from "react";
import DeleteUser from "./DeleteUser";
import FollowButton from "./FollowButton";
import ProfileTabs from "./ProfileTabs";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import EditProfile from "./EditProfile";
import FileUpload from '@material-ui/icons/AddPhotoAlternate';
import Slide from '@material-ui/core/Slide';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


const useStyles = makeStyles(theme => ({
    // Profile Card
    card: {
        borderRadius: '38px',
        position: 'relative'
    },
    cardActionArea: {
        display: 'flex',
        flexWrap: 'wrap',
        position: 'relative'
    },
    cardAction: {
        display: 'flex',
        flexWrap: 'wrap',
        position: 'absolute',
        width: '90%',
        right: '1%',
        top: '240px'
    },
    avatarButton: {    
        left: '10%',
        transform: 'translate(-70%, -30%)',
        width: 120,
        height: 120,
        padding: 0,
        display: 'inline-flex',
        position: 'relative',
        '& .MuiAvatar-circular': {
            width: '100%',
            height: '100%'
        },
        '& .MuiIconButton-label':{
            height: '100%'
        }
    },
    avatarLabel: {
        position: 'absolute',
        cursor: 'pointer',
        color: '#ffffff',
        opacity: 0,
        transition: 'all .4s ease-out',
        '&:hover':{
            opacity: 1
        }
    },
    backLabel: {
        position: 'absolute',
        top: '20px',
        right: '20px',
        color: '#ffffff',
        opacity: 0.5,
        cursor: 'pointer'
    },
    cardContent: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: '-20px',
        width: '40%'
    },
    text: {
        textAlign: 'left',
        flexBasis: '100%'
    },
    divider: {
        marginLeft: '16px'
    },
    link: {
        textDecoration: 'none'
    },
    profileButton: {
        textTransform: 'capitalize'
    },
    settingsButton: {
        position: 'absolute',
        zIndex: 1,
        left: '70%'
    },
    menu: {
        marginTop: '3.5%',
        '& .MuiPaper-rounded': {
            borderRadius: '20px'
        }
    },

// Paper
    root: {
      margin: 'auto',
      padding: theme.spacing(3),
      marginTop: theme.spacing(5),
      borderRadius: '19px'
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
    const [edit, setEdit] = useState(false);
    const [checked, setChecked] = useState(false);
    const [values, setValues] = useState({
        photo: '',
        background: ''
    })
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
            }
        });

        return function cleanup() {
            abortController.abort();
        }
    }, []);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        
        loadPostsByUser({
            params: { userId: userId.userId },
            credentials: { divineMole: jwt.token },
            signal
        }).then(data => {
            if(data.error){
                console.log(data.error);
            }else{
                checkPosts(data);
            }
        });

        const checkPosts = (data) => {
            if(data.length > 0){
                setPosts([...posts, data]);
            }
        }

        return function cleanup() {
            abortController.abort();
        }

    }, []);

    useEffect(() => {
        const abortController = new AbortController();
        let imageData = new FormData();

        values.photo && imageData.append('photo', values.photo);
        values.background && imageData.append('background', values.background);
        
        update({
            params: { userId: userId.userId },
            credentials: { divineMole: jwt.token },
            user: imageData
        }).then(data => {
            if(data && data.error)
                console.log(data.error);
            else{
                setValues({...values});
            }
        });

        return function cleanup() {
            abortController.abort();
        }

    }, [values.photo, values.background]);

    
    const checkFollow = (user) => {
        const match = user.followers.some((follower) => {
            return follower._id === jwt.user._id;
        });
        return match;
    }

    const clickFollowButton = (api) => {
        api({
            params: {userId: userId.userId},
            credentials: {divineMole: jwt.token},
            followId: jwt.user._id
        }).then((data) => {
            if(data.error){
                console.log(data.error);
                setUser({...values, error: data.error});
            }
            else{
                setUser(data);
                setFollowing(!following);
            }
        })
    }

    const removePost = (post) => {
        const updatedPosts = [...post];
        const index = updatedPosts.indexOf(post);
        updatedPosts.splice(index);
        setPosts(updatedPosts);
    }

    const handleEdition = () => {
        setEdit(!edit);
        // setChecked((prev) => !prev); 
    }

    const handleCheck = () => {
        
    }

    const handlePhoto = name => event => {
        const value = event.target.files[0];

        setValues({...values, [name]: value});
    }

    const photoUrl = user._id
    ? `/api/users/photo/${user._id}?${new Date().getTime()}`
    : '/api/users/defaultphoto';

    const backgroundUrl = user._id
    ? `/api/users/background/${user._id}?${new Date().getTime()}`
    : '/api/users/defaultbackground';

    if(redirectToSigin)
        navigate('/signin');

    return (
        <Fragment>
            <Card className={classes.card}>
                <CardHeader className={classes.settingsButton}/>
                <CardActionArea className={classes.cardActionArea}>
                    <CardMedia
                    component="img"
                    alt="Background"
                    height="200"
                    src={backgroundUrl}
                    title="Background"
                    />
                    <input accept="image/*" type="file" onChange={handlePhoto('background')}
                            style={{display: 'none'}} id="back-button-file" />
                    <label htmlFor="back-button-file" className={classes.backLabel}>
                        <FileUpload/>
                    </label>
                    <IconButton aria-label="Edit" color="primary" className={classes.avatarButton} >
                        <Avatar src={photoUrl} />
                        <input accept="image/*" type="file" onChange={handlePhoto('photo')}
                            style={{display: 'none'}} id="icon-button-file" />
                        <label htmlFor="icon-button-file" className={classes.avatarLabel}>
                            <FileUpload/>
                        </label>
                    </IconButton>
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h6" component="h6" className={classes.text}>
                            {user.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p" className={classes.text}>
                            {user.about}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p" className={classes.text}>
                            {"Joined: " + (new Date(user.created)).toDateString()}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions className={classes.cardAction} disableSpacing>
                    { auth.isAuthenticated().user && auth.isAuthenticated().user._id == user._id
                        ?
                        (<ListItemSecondaryAction>
                            {/*<Link to={"/user/" + user._id + "/edit"}>
                                <IconButton aria-label="Edit" color="primary">
                                    <EditOutlinedIcon/>
                                </IconButton>
                            </Link>*/}
                            {/*<FormControlLabel
                                control={<Switch checked={checked} onChange={handleCheck} />}
                            />*/}
                            <IconButton aria-label="Edit" color="primary" onClick={handleEdition}>
                                <EditOutlinedIcon/>
                            </IconButton>
                            <DeleteUser userId={user._id}/>
                        </ListItemSecondaryAction>)
                        :
                        (<ListItemSecondaryAction>
                            <FollowButton following={following} onButtonClick={clickFollowButton}/>
                        </ListItemSecondaryAction>)
                    }
                </CardActions>
                {edit && 
                    <EditProfile />
                    /*<Slide direction="up" in={edit} mountOnEnter unmountOnExit>
                    </Slide>*/
                }
            </Card>
            
            <Paper className={classes.root} elevation={4}>
                <List dense>
                    <ProfileTabs people={user} posts={posts} profile={true} removeUpdate={removePost}></ProfileTabs>
                </List>
            </Paper>
        </Fragment>
        
    )
}