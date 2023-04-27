import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import FindPeople from "./FindPeople";
import auth from '../../auth/auth-helper';
import { useState } from 'react';
import Followers from "./Followers";
import Trends from "../post/Trends";
import SearchBar from "../core/SearchBar";
import { Fragment } from 'react';
import Profile from './Profile';
import HomeIcon from '@material-ui/icons/Home';
import { useNavigate } from "react-router";

const useStyles = makeStyles(theme => ({
  home: {
    marginLeft: '80%'
  },
  card: {
      maxWidth: 600,
      margin: 'auto'
  },
  title: {
      padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
      color: theme.palette.openTitle
  },
  media: {
      minHeight: 400,
      backgroundSize: "contain"
  },
  grid: {
      marginTop: '10px',
      justifyContent: 'center'
  },
  gridChild: {
      height: 'max-content'
  },
  profileGrid: {
    height: 'max-content',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  }
}));

export default function ProfileDock() {
  const navigate = useNavigate();
  // const [defaultPage, setDefaultPage] = useState(auth.isAuthenticated());
  const classes = useStyles();

  return (
    <Fragment>
      <Grid container justifyContent="flex-end" spacing={5} className={classes.grid}>
          <Grid item xs={12} sm={12} md={3} className={classes.gridChild}>
            <IconButton aria-label="home" className={classes.home} onClick={() => {navigate('/')}}>
                <HomeIcon/>
            </IconButton>
            <Followers/>
          </Grid>
          
          <Grid item xs={12} sm={12} md={5} className={classes.profileGrid} >
              <Profile/>
          </Grid>
          
          <Grid item xs={12} sm={12} md={3} className={classes.gridChild}>
              <SearchBar/>
              <Trends/>
              <FindPeople />
          </Grid>
          
      </Grid>
    </Fragment>
  )
}

ProfileDock.propTypes = {};

ProfileDock.defaultProps = {};
