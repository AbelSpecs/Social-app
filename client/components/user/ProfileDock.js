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
import usePostsProfile from "../../hooks/usePostsProfile";
import useUserPeople from "../../hooks/useUserPeople";
import useFindPeople from '../../hooks/useFindPeople';

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
      justifyContent: 'center',
      position: 'relative',
      background: theme.palette.background.default,
      marginTop: 1,
      minHeight: 'inherit'
  },
  gridChildLeft: {
      height: 'max-content',
      position: 'sticky',
      top: 1,
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-end'
  },
  gridChildRight: {
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
  const {handleMode} = useContext(ModeContext);
  const [userData, setUserData] = useState(auth.getData());
  const flag = id.userId === userData.id ? true : false;
  const { userProfileData } = useUser(id, flag, userData);
  const { postsProfile, setPostsProfile, loadingPostsProfile, transition } = usePostsProfile(id, userData);
  const { userPeople, setUserPeople, userPeopleLoading, redirectToSigin, following, setFollowing } = useUserPeople(userData);
  const { findPeople, setFindPeople, findPeopleLoading } = useFindPeople(userData);

  return (
    <Fragment>
      <Grid container justifyContent="flex-end" spacing={5} className={classes.grid} >
          <Grid item xs={12} sm={12} md={3} className={classes.gridChildLeft}>
            <IconButton onClick={handleMode.toggle}>
                <Brightness4Icon />
            </IconButton>
            <IconButton aria-label="home" onClick={() => {navigate('/')}}>
                <HomeIcon/>
            </IconButton>
            <Followers user={userData} />
          </Grid>
          
          <Grid item xs={12} sm={12} md={5} className={classes.profileGrid}>
            <Profile user={userData} setUserData={setUserData} userProfileData={userProfileData} 
                      postsProfile={postsProfile} setPostsProfile={setPostsProfile} 
                      loadingPostsProfile={loadingPostsProfile} 
                      transition={transition} userPeople={userPeople}
                      setUserPeople={setUserPeople} userPeopleLoading={userPeopleLoading}
                      redirectToSigin={redirectToSigin} following={following}
                      setFollowing={setFollowing} findPeople={findPeople}
                      setFindPeople={setFindPeople}
            />
          </Grid>
          
          <Grid item xs={12} sm={12} md={3} className={classes.gridChildRight}>
              <SearchBar user={userData}/>
              <Trends user={userData}/>
              <FindPeople user={userData} setUserPeople={setUserPeople} 
                          findPeople={findPeople} findPeopleLoading={findPeopleLoading}
                          setFindPeople={setFindPeople} following={following}
                          setFollowing={setFollowing}/>
          </Grid>
          
      </Grid>
    </Fragment>
  )
}

ProfileDock.propTypes = {};

ProfileDock.defaultProps = {};
