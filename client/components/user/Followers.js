import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Fragment } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import useFollowers from '../../hooks/useFollowers';
import getMedia from '../../auth/media-helper';
import { 
  List,
  ListItem, 
  ListItemAvatar, 
  ListItemText,
  Avatar,
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
    width: '100%'
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary
  },
  circularProgress: {
    margin: '10% 0 10% 43%'
  }
}))

export default function Followers({user}) {
  const classes = useStyles();
  const { values, loading } = useFollowers(user);

  return (  
    values.users.length > 0 &&
    <Fragment>
      <Paper className={classes.paper}>
        <Typography className={classes.title}>
          Who are Following you
        </Typography>
        {
          loading && <CircularProgress className={classes.circularProgress}/>
        }
        {
          !loading && 
          <List>
          {values.users.map((item, i) => {
            const avatar = getMedia(item?.photo);
            return (
              <span key={i}>
                <ListItem>
                  <ListItemAvatar className={classes.avatar}>
                    <Avatar src={avatar} className={classes.avatar}/>
                  </ListItemAvatar>
                  <Link to={"/user/" + item._id} className={classes.link}>
                    <ListItemText primary={item.name}/>
                  </Link>
                </ListItem>
              </span>
              )
            })
          }
          </List>
        }
      </Paper>
  </Fragment>
  )
}

Followers.propTypes = {};

Followers.defaultProps = {};

