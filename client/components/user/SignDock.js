import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/styles";
import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';
import SignIn from './Signin';
import Signup from './Signup';

const useStyles = makeStyles(theme => ({
  grid: {
    height: '100vh',
  },
  gridChild: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    flex: '0.5 1 auto',
    justifyContent: 'center'
  }
}));

export default function SignDock() {
  const classes = useStyles();
  const [hide, setHide] = useState(false);

  const handleHide = () => {
    setHide((prev) => !prev);
  }

  return (
    <Grid container justifyContent="space-around" alignItems="center" spacing={2} className={classes.grid}>
      <Grid item className={classes.gridChild}>
        <SignIn hide={hide} handleHide={handleHide}/>
      </Grid>
        
      <Slide direction="down" in={hide} mountOnEnter unmountOnExit>
        <Grid item className={classes.gridChild}>
          <Signup hide={hide} handleHide={handleHide}/>
        </Grid>
      </Slide>
    </Grid>
  )
}

SignDock.propTypes = {};

SignDock.defaultProps = {};


