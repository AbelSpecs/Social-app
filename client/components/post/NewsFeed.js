import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Paper } from '@material-ui/core';
import NewPost from './NewPost';
import PostList from './PostList';
import { makeStyles } from "@material-ui/styles";
import usePostList from '../../hooks/usePostList';

const useStyles = makeStyles(() => ({
  paper: {
      padding: '10px',
      borderRadius: '19px'
  }
}));

export default function NewsFeed() {
  const classes = useStyles();
  const { post, setPost } = usePostList();
  
  const addPost = (post) => {
    console.log(post);
    const updatedPosts = [...post];
    updatedPosts.unshift(post);
    setPost(updatedPosts);
  }

  const removePost = (post) => {
    const updatedPosts = [...post];
    const index = updatedPosts.indexOf(post);
    updatedPosts.splice(index);
    setPost(updatedPosts);
  }

  return (
    <Paper className={classes.paper}>
      <NewPost addUpdate={addPost}/>
      <Divider/>
      <PostList removeUpdate={removePost} posts={post} profile={false}/>
    </Paper>

  ) 
}

NewsFeed.propTypes = {};

NewsFeed.defaultProps = {};


