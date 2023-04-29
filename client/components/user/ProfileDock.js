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
import { useNavigate, useParams } from "react-router";
import useUser from '../../hooks/useUser';
import { ModeContext }  from "../core/Mode";
import { useContext } from "react";
import Brightness4Icon from '@material-ui/icons/Brightness4';

const useStyles = makeStyles(theme => ({
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
      height: '100%',
      justifyContent: 'center',
      position: 'relative',
      background: theme.palette.background.default
  },
  gridChild: {
      height: 'max-content',
      position: 'sticky',
      top: 1
  },
  profileGrid: {
    height: 'max-content',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  }
}));

export default function ProfileDock() {
  const id = useParams();
  const navigate = useNavigate();
  const classes = useStyles();
  const mode = useContext(ModeContext);
  const userData = auth.getData();
  const flag = id.userId === userData.id ? true : false;
  const { userView } = useUser(id, flag, userData);

  return (
    <Fragment>
      <Grid container justifyContent="flex-end" spacing={5} className={classes.grid} >
          <Grid item xs={12} sm={12} md={3} className={classes.gridChild}>
            <IconButton onClick={mode}>
                <Brightness4Icon />
            </IconButton>
            <IconButton aria-label="home" onClick={() => {navigate('/')}}>
                <HomeIcon/>
            </IconButton>
            <Followers user={userData} />
          </Grid>
          
          <Grid item xs={12} sm={12} md={5} className={classes.profileGrid}>
            <Profile user={userData} actualuser={userView}/>
          </Grid>
          
          <Grid item xs={12} sm={12} md={3} className={classes.gridChild}>
              <SearchBar user={userData}/>
              <Trends user={userData}/>
              <FindPeople user={userData}/>
          </Grid>
          
      </Grid>
    </Fragment>
  )
}

ProfileDock.propTypes = {};

ProfileDock.defaultProps = {};
