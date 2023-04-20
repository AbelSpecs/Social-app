import React from 'react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/styles";
import { trendList } from './api-post';
import auth from '../../auth/auth-helper';
import { Fragment } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { 
  List,
  ListItem, 
  ListItemText,
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
  listItemText: {
  '& .MuiTypography-body1' : {
      fontSize: '0.8rem',
      fontWeight: 'bold' 
    }
  },
  listItemTextSecondary: { 
    fontSize: '0.7rem',
    fontWeight: '400'
  },
  circularProgress: {
    margin: '10% 0 10% 43%'
  }
}));

export default function Trends(){
  const classes = useStyles();
  const jwt = auth.isAuthenticated();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({ 
    trends: []
  });

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    let isMounted = true;
    setLoading(true);
    
    trendList({
      params: { userId: jwt.user._id},
      credentials: { divineMole: jwt.token},
      signal
    }).then((data) => {
      setLoading(false);
      if(data && data.error){
        console.log(data.error);
      }
      else{
        mounted(data);
      }
    });

    function mounted(data) {
      if(isMounted){
        setValues({...values, trends: data});
      }
    }

    return function cleanup(){
      isMounted = false
      abortController.abort();
    }

  }, [values.trends.length]);

  
  return (  
    <Fragment>
      <Paper className={classes.paper}>
        <Typography className={classes.title}>
          Trends For You
        </Typography>
        {
          loading && <CircularProgress className={classes.circularProgress}/>
        }
        { 
          !loading &&
            <List>
            {values.trends.map((item, i) => {
              return <span key={i}>
                <ListItem>
                  <ListItemText 
                    primary={'#'+item.text} 
                    className={classes.listItemText}
                    secondary={
                      <Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                          className={classes.listItemTextSecondary}
                          >
                          72k posts
                        </Typography>
                      </Fragment>}/>
                </ListItem>
              </span>
              })
            }
          </List>
        }
      </Paper>
  </Fragment>
  )
}

Trends.propTypes = {};

Trends.defaultProps = {};


