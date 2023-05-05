import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate, useParams } from "react-router";
import auth from '../../auth/auth-helper';
import DeleteUser from "./DeleteUser";
import FollowButton from "./FollowButton";
import ProfileTabs from "./ProfileTabs";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import EditProfile from "./EditProfile";
import FileUpload from '@material-ui/icons/AddPhotoAlternate';
import Slide from '@material-ui/core/Slide';
import CircularProgress from '@material-ui/core/CircularProgress';
import useImage from "../../hooks/useImage";
import getMedia from "../../auth/media-helper";
import { 
    Card,
    CardHeader,
    CardActions,
    CardActionArea,
    CardMedia,
    CardContent,
    Icon,
    IconButton, 
    ListItemSecondaryAction, 
    Paper, 
    Typography, 
    List,
    Avatar
} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    // Profile Card
    card: {
        borderRadius: '38px',
        position: 'relative',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        alignContent: 'center'
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
    avatar: {
        color: theme.palette.text.primary
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
        }
    },
    avatarLabel: {
        position: 'absolute',
        cursor: 'pointer',
        color: '#ffffff',
        opacity: 0,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        transition: 'all .4s ease-out',
        '&:hover':{
            opacity: 1
        }
    },
    backgroundLabel: {
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
    edit: {
        width: '100%'
    },

// Paper
    paper: {
      margin: 'auto',
      padding: theme.spacing(3),
      marginTop: theme.spacing(5),
      borderRadius: '19px',
      width: '100%'
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

export default function Profile({user, setUserData, userProfileData, postsProfile, setPostsProfile, 
                                loadingPostsProfile, transition, userPeople, setUserPeople, 
                                userPeopleLoading, redirectToSigin, following,
                                setFollowing, findPeople, setFindPeople}) {

    const navigate = useNavigate();
    const classes = useStyles();
    const [edit, setEdit] = useState(false);
    const { values, setValues } = useImage(user);
    const photoUrl = getMedia(userProfileData.photo);
    const hasBackground = userProfileData.background ? true : false;
    const backgroundUrl = getMedia(userProfileData.background, hasBackground); 
    
    const clickFollowButton = (api) => {
        api({
            params: {userId: user.id},
            credentials: {divineMole: user.token},
            followId: userProfileData.id
        }).then((data) => {
            if(data.error){
                console.log(data.error);
                setUserPeople({...values, error: data.error});
            }
            else{
                setFollowing(!following);
                api.name === 'unfollow' ? addFindPeople(data) : removeFindPeople(data);
                api.name === 'unfollow' ? removeUserPeople(user) : addUserPeople(user);
            }
        })
    }

    const addUserPeople = (user) => {
        if(!userPeople){
            setUserPeople({followers: [{_id: user.id, name: user.name}]});
        }
        const followers = [...userPeople.followers];
        followers.push({_id: user.id, name: user.name});
        setUserPeople({following: [...userPeople.following], followers: followers});
    }

    const removeUserPeople = (user) => {
        const followers = [...userPeople.followers];
        const index = followers.findIndex(f => f._id === user.id);
        followers.splice(index, 1);
        setUserPeople({following: [...userPeople.following], followers: followers});
    }

    const addFindPeople = (data) => {
        const addFindPeople = [...findPeople.users];
        const newFindPeople = {_id: data._id, name: data.name};
        addFindPeople.push(newFindPeople);
        setFindPeople({...findPeople, users: addFindPeople});
    }

    const removeFindPeople = (data) => {
        const deleteFindPeople = [...findPeople.users];
        const itemFindPeople = {_id: data._id, name: data.name};
        const index = deleteFindPeople.indexOf(itemFindPeople);
        deleteFindPeople.splice(index, 1);
        setFindPeople({findPeople, users: deleteFindPeople});
    }

    const updatePostLikes = (id, likes) => {
        const index = postsProfile.findIndex(p => p._id === id);
        const postsList = [...postsProfile];
        const updatedPost = {...postsList[index], likes: likes};
        postsList[index] = updatedPost;
        setPostsProfile(postsList);
    }
    
    const updatePostComments = (id, comments) => {
        const index = postsProfile.findIndex(p => p._id === id);
        const postsList = [...postsProfile];
        const updatedPost = {...postsList[index], comments: comments};
        postsList[index] = updatedPost;
        setPostsProfile(postsList);
    }

    const removePost = (post) => {
        const updatedPosts = [...postsProfile];
        const index = updatedPosts.indexOf(post);
        updatedPosts.splice(index, 1);
        setPostsProfile(updatedPosts);
    }

    const handleEdit = () => {
        setEdit((prev) => !prev);
    };

    const handlePhoto = name => event => {
        const value = event.target.files[0];
        setValues({...values, [name]: value});
    }

    if(redirectToSigin)
        navigate('/signin');

    return (
        <Fragment>
            <Card className={classes.card}>
            {
                userPeopleLoading && <CircularProgress/>
            }
            {
                !userPeopleLoading &&
                <Fragment>
                    <CardHeader className={classes.settingsButton}/>
                    <CardActionArea className={classes.cardActionArea}>
                        <CardMedia
                        component="img"
                        alt="Background"
                        height="200"
                        src={backgroundUrl}
                        title="Background"
                        />
                        {
                            user && user.id == userPeople._id &&
                            <Fragment>
                                <input accept="image/*" type="file" onChange={handlePhoto('background')}
                                        style={{display: 'none'}} id="background-button-file" />
                                <label htmlFor="background-button-file" className={classes.backgroundLabel}>
                                    <FileUpload/>
                                </label>
                            </Fragment>
                        }
                        <Icon aria-label="Edit" className={classes.avatarButton} >
                            <Avatar src={photoUrl} className={classes.avatar}/>
                            {
                                user && user.id == userPeople._id &&
                                <Fragment>
                                    <input accept="image/*" type="file" onChange={handlePhoto('photo')}
                                        style={{display: 'none'}} id="icon-button-file" />
                                    <label htmlFor="icon-button-file" className={classes.avatarLabel}>
                                        <FileUpload/>
                                    </label>
                                </Fragment>
                            }
                        </Icon>
                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h6" component="h6" className={classes.text}>
                                {userProfileData.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p" className={classes.text}>
                                {userProfileData.about}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p" className={classes.text}>
                                {"Joined: " + (new Date(userProfileData.created)).toDateString()}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions className={classes.cardAction} disableSpacing>
                        { user && user.id == userPeople._id
                            ?
                            (<ListItemSecondaryAction>
                                <IconButton aria-label="Edit" onClick={handleEdit}>
                                    <EditOutlinedIcon className={classes.editIcon}/>
                                </IconButton>
                                <DeleteUser userId={user.id}/>
                            </ListItemSecondaryAction>)
                            :
                            (
                                <ListItemSecondaryAction>
                                    <FollowButton following={following} onButtonClick={clickFollowButton}/>
                                </ListItemSecondaryAction>
                            )
                        }
                    </CardActions>
                    {
                        <Slide direction="down" in={edit} mountOnEnter unmountOnExit>
                            <div className={classes.edit}>
                                <EditProfile user={user} setUserData={setUserData}/>
                            </div>
                        </Slide>
                    }
                </Fragment>
            }
            </Card>
        
            <Paper className={classes.paper}>
                <List dense>
                    <ProfileTabs 
                        user={user} 
                        userPeople={userPeople} 
                        postsProfile={postsProfile} 
                        profile={true} 
                        removePost={removePost}
                        updatePostLikes={updatePostLikes}
                        updatePostComments={updatePostComments}
                        loadingPostsProfile={loadingPostsProfile}
                        transition={transition}
                        >
                    </ProfileTabs>
                </List>
            </Paper>
        </Fragment>
        
    )
}