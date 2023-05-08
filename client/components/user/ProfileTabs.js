import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import PeopleIcon from '@material-ui/icons/People';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AssignmentIcon from '@material-ui/icons/Assignment';
import FollowGrid from "./FollowGrid";
import PostList from "../post/PostList";
import CircularProgress from '@material-ui/core/CircularProgress';
import { 
  Box,
  BottomNavigation,
  BottomNavigationAction
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  bigAvatar: {
      width: 60,
      height: 60,
      margin: 10
  },
  box: {
    margin: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    color: theme.palette.text.primary
  },
  navigation: {
    width: '100%',
    '& .MuiButtonBase-root.MuiBottomNavigationAction-root.Mui-selected':{
      color: theme.palette.text.primary
    }
  },
  icon: {
    color: theme.palette.text.primary,
    '& .MuiBottomNavigationAction-label':{
      color: theme.palette.text.primary,
    }
  }
}));

export default function ProfileTabs({user, userPeople, postsProfile, profile, removePost, 
                                      updatePostLikes, updatePostComments, loadingPostsProfile,
                                      transition}) {
  const classes = useStyles();
  const [navigation, setNavigation] = useState(0);

  const handleChange = (event, newValue) => {
    setNavigation(newValue);
  }

  return (
    <Box sx={{ width: '100%' }} className={classes.box}>
      <BottomNavigation
        className={classes.navigation}
        showLabels
        value={navigation}
        onChange={handleChange}
      >
        <BottomNavigationAction label="Posts" icon={<AssignmentIcon className={classes.icon} />}/>
        <BottomNavigationAction label="Following" icon={<PeopleIcon className={classes.icon}/>}/>
        <BottomNavigationAction label="Followers" icon={<SupervisorAccountIcon className={classes.icon}/>} />
      </BottomNavigation>
    {
      navigation === 0 && loadingPostsProfile && <CircularProgress/>
    }  
    { 
      navigation === 0 && !loadingPostsProfile &&
      <PostList user={user} 
                removePost={removePost} 
                posts={postsProfile} 
                profile={profile} 
                updatePostLikes={updatePostLikes} 
                updatePostComments={updatePostComments}
      />
        
    }
    {navigation === 1 && <FollowGrid people={userPeople.following}/>}
    {navigation === 2 && <FollowGrid people={userPeople.followers}/>}
    </Box>
  );
}

ProfileTabs.propTypes = {};

ProfileTabs.defaultProps = {};


