import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';
import SignIn from './Signin';
import Signup from './Signup';
import { ModeContext }  from "../core/Mode";
import { useContext } from "react";

const useStyles = makeStyles(theme => ({
  grid: {
    minHeight: 'inherit',
    background: theme.palette.background.default,
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
  const { mode } = useContext(ModeContext);

  const handleHide = () => {
    setHide((prev) => !prev);
  }

  return (
    <Grid container justifyContent="space-around" alignItems="center" className={classes.grid}>
      <Grid item className={classes.gridChild}>
        <SignIn hide={hide} handleHide={handleHide} mode={mode}/>
      </Grid>
        
      <Slide direction="down" in={hide} mountOnEnter unmountOnExit>
        <Grid item className={classes.gridChild}>
          <Signup hide={hide} handleHide={handleHide} mode={mode}/>
        </Grid>
      </Slide>
    </Grid>
  )
}

SignDock.propTypes = {};

SignDock.defaultProps = {};


