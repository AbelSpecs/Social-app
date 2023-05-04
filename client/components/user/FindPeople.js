import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";
import { follow } from '../../services/api-user';
import Snackbar from '@material-ui/core/Snackbar';
import { Link } from "react-router-dom";
import { Fragment } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import useFindPeople from '../../hooks/useFindPeople';
import getMedia from '../../auth/media-helper';
import { 
  List,
  ListItem, 
  ListItemAvatar, 
  ListItemSecondaryAction, 
  ListItemText,
  Avatar,
  Button,
  Paper,
  Typography
} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
    margin: 0
  },
  title: {
    padding: `${theme.spacing(2)}px 0px 0px ${theme.spacing(2)}px`,
  },
  avatar: {
    marginRight: theme.spacing(1),
    
  },
  avatarIcon: {
    color: theme.palette.text.primary
  },
  follow: {
    right: theme.spacing(2)
  },
  snack: {
    color: theme.palette.protectedTitle
  },
  viewButton: {
    verticalAlign: 'middle'
  },
  paper: {
    padding: '10px',
    borderRadius: '19px',
    marginTop: `${theme.spacing(3)}px`
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary
  },
  circularProgress: {
    margin: '10% 0 10% 43%'
  }
}));

export default function FindPeople ({user, userPeople, setUserPeople, findPeople, 
                                      setFindPeople, findPeopleLoading, following, 
                                      setFollowing}) {
  const classes = useStyles();
  
  const clickfollow = (item, index) => {
    follow({
      params: { userId: user.id},
      credentials: { divineMole: user.token},
      followId: item._id
    }).then(data => {
      if(data.error){
        console.log(error);
      }
      else{
        let newToFollow = findPeople.users;
        newToFollow.splice(index, 1);
        setFindPeople({users: newToFollow, open: true, message: `Following ${item.name}!`});
        setFollowing(!following);
        addFollowing(data, user);
      }
    });
  }

  const addFollowing = (data, user) => {
    if(!userPeople){
      setUserPeople({_id: user.id, followers: [], following: [{_id: data._id, name: data.name}]});
      return;
    }
    let follow = [...userPeople.following];
    follow.push({_id: data._id, name: data.name});
    setUserPeople({...userPeople, _id: user.id, following: follow});
  }

  const handleClose = () => {
    setFindPeople({...findPeople, open: false});
  }

  return (
    findPeople.users.length > 0 &&
    <Fragment>
      <Paper className={classes.paper}>
        <Typography className={classes.title}>
          Who to follow
        </Typography>
        {
          findPeopleLoading && <CircularProgress className={classes.circularProgress}/>
        }
        {
          !findPeopleLoading && 
          <List>
            {findPeople.users.map((item, i) => {
              const avatar = getMedia(item?.photo);

              return <span key={i}>
                <ListItem>
                  <ListItemAvatar className={classes.avatar}>
                    <Avatar src={avatar} className={classes.avatarIcon}/>
                  </ListItemAvatar>
                  <Link to={"/user/" + item._id} className={classes.link}>
                    <ListItemText primary={item.name}/>
                  </Link>
                  <ListItemSecondaryAction>
                    <Button aria-label="Follow" variant="contained" color="primary" onClick={() => {clickfollow(item, i)}}>
                      Follow
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              </span>
              })
            }
          </List>
        }
      </Paper>
      <Snackbar
          open={findPeople.open}
          autoHideDuration={3000}
          onClose={handleClose}
          message={findPeople.message}
          anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
      />
    </Fragment>
  )
}

FindPeople.propTypes = {};

FindPeople.defaultProps = {};

