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
    padding: '10px',
    borderRadius: '19px',
    marginTop: `${theme.spacing(3)}px`
  },
  link: {
    textDecoration: 'none',
    color: '#000000'
  },
  circularProgress: {
    margin: '10% 0 10% 43%'
  }
}));

export default function FindPeople ({user}) {
  const classes = useStyles();
  const { values, setValues, loading } = useFindPeople(user);
  
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
        let newToFollow = values.users;
        newToFollow.splice(index, 1);
        setValues({...values, users: newToFollow, open: true, message: `Following ${item.name}!`});
       
      }
    })
  }

  const handleClose = () => {
    setValues({...values, open: false});
  }

  return (
    <Fragment>
      <Paper className={classes.paper}>
        <Typography className={classes.title}>
          Who to follow
        </Typography>
        {
          loading && <CircularProgress className={classes.circularProgress}/>
        }
        {
          !loading && 
          <List>
            {values.users.map((item, i) => {
              const avatar = getMedia(item?.photo);

              return <span key={i}>
                <ListItem>
                  <ListItemAvatar className={classes.avatar}>
                    <Avatar src={avatar}/>
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
          open={values.open}
          autoHideDuration={3000}
          onClose={handleClose}
          message={values.message}
          anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
      />
    </Fragment>
  )
}

FindPeople.propTypes = {};

FindPeople.defaultProps = {};

