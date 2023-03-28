import React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import PropTypes from 'prop-types';
import { 
  Box,
  BottomNavigation,
  BottomNavigationAction
} from "@material-ui/core";
import PeopleIcon from '@material-ui/icons/People';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AssignmentIcon from '@material-ui/icons/Assignment';
import FollowGrid from "./FollowGrid";

const useStyles = makeStyles(theme => ({
  bigAvatar: {
      width: 60,
      height: 60,
      margin: 10
  },
  box: {
    margin: 'auto'
  }
}));

export default function ProfileTabs(props) {
  console.log(props);
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  return (
    <Box sx={{ width: 500 }} className={classes.box}>
       <BottomNavigation
        showLabels
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction label="Posts" icon={<AssignmentIcon/>}/>
        <BottomNavigationAction label="Following" icon={<PeopleIcon/>}/>
        <BottomNavigationAction label="Followers" icon={<SupervisorAccountIcon/>} />
      </BottomNavigation>
    {value === 0 && <PostList removeUpdate={props.removePostUpdate} posts={props.posts}/>}
    {value === 1 && <FollowGrid people={props.people.following}/>}
    {value === 2 && <FollowGrid people={props.people.followers}/>}
    </Box>
  );
}

ProfileTabs.propTypes = {};

ProfileTabs.defaultProps = {};


