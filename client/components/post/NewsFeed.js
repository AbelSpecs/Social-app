import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Card, Divider, Paper } from '@material-ui/core';
import NewPost from './NewPost';
import PostList from './PostList';
import { postList } from './api-post';
import auth from '../../auth/auth-helper';
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  paper: {
      padding: '10px',
      borderRadius: '19px'
  }
}));

export default function NewsFeed() {
  const classes = useStyles();
  const jwt = auth.isAuthenticated();
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    setLoading(true);

    postList({
      params: {userId: jwt.user._id},
      credentials: {divineMole: jwt.token},
      signal
    }).then(data => {
      setLoading(false);
      if(data.error){
        console.log(data.error);
      }else{       
        setPost([...post, data]);
      }
    });

    return function cleanup() {
      abortController.abort(); 
    }

  },[jwt.user._id]);
  
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


