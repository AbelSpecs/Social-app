import React from 'react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/styles";
import { findpeople, follow } from './api-user';
import Snackbar from '@material-ui/core/Snackbar';
import auth from "../auth/auth-helper";
import { Link } from "react-router-dom";
import ViewIcon from '@material-ui/icons/Visibility'
import { 
  IconButton, 
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
    margin: `${theme.spacing(3)}px ${theme.spacing(1)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
    fontSize: '1em'
  },
  avatar: {
    marginRight: theme.spacing(1)
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
    padding: '10px'
  }
}))

export default function FindPeople () {
  const classes = useStyles();
  const jwt = auth.isAuthenticated();
  const [values, setValues] = useState({ 
    users: [],
    error: '',
    open: false,
    message: ''
  });
  
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    let isMounted = true;
    
    findpeople({
      params: { userId: jwt.user._id},
      credentials: { divineMole: jwt.token},
      signal
    }).then((data) => {
      if(data && data.error){
        setValues({...values, error: data.error});
      }
      else{
        mounted(data);
      }
    });

    function mounted(data) {
      if(isMounted){
        setValues({...values, users: data});
      }
    }

    return function cleanup(){
      isMounted = false
      abortController.abort();
    }

  }, [values.users.length])

  const clickfollow = (user, index) => {
    follow({
      params: { userId: jwt.user._id},
      credentials: { divineMole: jwt.token},
      followId: user._id
    }).then(data => {
      if(data.error){
        console.log(error);
      }
      else{
        let newToFollow = values.users;
        newToFollow.splice(index, 1);
        setValues({...values, users: newToFollow, open: true, message: `Following ${user.name}!`});
       
      }
    })
  }

  const handleClose = () => {
    setValues({...values, open: false});
  }

  return (<div>
    <Paper className={classes.paper}>
      <Typography>
        Who to follow
      </Typography>
      <List>
        {values.users.map((item, i) => {
          return <span key={i}>
            <ListItem>
              <ListItemAvatar className={classes.avatar}>
                <Avatar src={'/api/users/photo/'+item._id}/>
              </ListItemAvatar>
              <ListItemText primary={item.name}/>
              <ListItemSecondaryAction>
                <Link to={"/user/" + item._id}>
                  <IconButton variant="contained" color='secondary' className={classes.viewButton}>
                    <ViewIcon/>
                  </IconButton>
                </Link>
                <Button aria-label="Follow" variant="contained" color="primary" onClick={() => {clickfollow(item, i)}}>
                  Follow
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          </span>
        })
      }
      </List>
    </Paper>
    <Snackbar
        open={values.open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={values.message}
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
      />
  </div>
  )
}

FindPeople.propTypes = {};

FindPeople.defaultProps = {};

