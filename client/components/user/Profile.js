import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { useNavigate } from "react-router";
import auth from '../../auth/auth-helper';
import DeleteUser from "./DeleteUser";
import FollowButton from "./FollowButton";
import ProfileTabs from "./ProfileTabs";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import EditProfile from "./EditProfile";
import FileUpload from '@material-ui/icons/AddPhotoAlternate';
import Slide from '@material-ui/core/Slide';
import CircularProgress from '@material-ui/core/CircularProgress';
import useProfileUser from "../../hooks/useProfileUser";
import usePosts from "../../hooks/usePosts";
import useImage from "../../hooks/useImage";
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

export default function Profile() {
    const userData = auth.getData();
    const navigate = useNavigate();
    const classes = useStyles();
    const { user, setUser, loading, redirectToSigin, following, setFollowing } = useProfileUser();
    const { posts, setPosts } = usePosts();
    const { values, setValues } = useImage();
    const [edit, setEdit] = useState(false);
    
    const clickFollowButton = (api) => {
        api({
            params: {userId: userData.id},
            credentials: {divineMole: userData.token},
            followId: userData.id
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

    const handleEdit = () => {
        setEdit((prev) => !prev);
    };

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
            {
                loading && <CircularProgress/>
            }
            {
                !loading &&
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
                        <input accept="image/*" type="file" onChange={handlePhoto('background')}
                                style={{display: 'none'}} id="background-button-file" />
                        <label htmlFor="background-button-file" className={classes.backgroundLabel}>
                            <FileUpload/>
                        </label>
                        <Icon aria-label="Edit" className={classes.avatarButton} >
                            <Avatar src={photoUrl} />
                            <input accept="image/*" type="file" onChange={handlePhoto('photo')}
                                style={{display: 'none'}} id="icon-button-file" />
                            <label htmlFor="icon-button-file" className={classes.avatarLabel}>
                                <FileUpload/>
                            </label>
                        </Icon>
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
                        { userData && userData.id == user._id
                            ?
                            (<ListItemSecondaryAction>
                                <IconButton aria-label="Edit" color="primary" onClick={handleEdit}>
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
                    {
                        <Slide direction="down" in={edit} mountOnEnter unmountOnExit>
                            <div className={classes.edit}>
                                <EditProfile />
                            </div>
                        </Slide>
                    }
                </Fragment>
            }
            </Card>
        
            <Paper className={classes.paper} elevation={4}>
                <List dense>
                    <ProfileTabs people={user} posts={posts} profile={true} removeUpdate={removePost}></ProfileTabs>
                </List>
            </Paper>
        </Fragment>
        
    )
}