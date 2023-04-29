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
    justifyContent: 'center'
  },
  navigation: {
    width: '100%'
  }
}));

export default function ProfileTabs({user, people, posts, profile, removeUpdate, 
                                      updatePostLikes, updatePostComments, loadingPosts}) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  return (
    <Box sx={{ width: '100%' }} className={classes.box}>
       <BottomNavigation
        className={classes.navigation}
        showLabels
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction label="Posts" icon={<AssignmentIcon/>}/>
        <BottomNavigationAction label="Following" icon={<PeopleIcon/>}/>
        <BottomNavigationAction label="Followers" icon={<SupervisorAccountIcon/>} />
      </BottomNavigation>
    {
      value === 0 && loadingPosts && <CircularProgress/>
    }  
    { value === 0 && !loadingPosts &&
        <PostList user={user} 
                  removeUpdate={removeUpdate} 
                  posts={posts} 
                  profile={profile} 
                  updatePostLikes={updatePostLikes} 
                  updatePostComments={updatePostComments}
        />
    }
    {value === 1 && <FollowGrid people={people.following}/>}
    {value === 2 && <FollowGrid people={people.followers}/>}
    </Box>
  );
}

ProfileTabs.propTypes = {};

ProfileTabs.defaultProps = {};


