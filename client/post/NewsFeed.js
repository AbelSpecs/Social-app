import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { useState } from 'react';
import NewPost from './NewPost';
import PostList from './PostList';
import { postList } from './api-post';
import auth from '../auth/auth-helper';


export default NewsFeed = function() {
  const [post, setPost] = useState([]);
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    postList({
      params: {userId: jwt.user._id},
      credentials: {divineMole: jwt.token},
      signal
    }).then(data => {
      if(data.error){
        console.log(data.error);
      }else{
        console.log(data);
      }
    });

    return function cleanup() {
      abortController.abort(); 
    }

  },[jwt.user._id]);
  
  const addPost = (post) => {
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
    <Card>
      <Typography type="title">NewsFeed</Typography>
      <Divider/>
        <NewPost addUpdate={addPost}/>
      <Divider/>
        <PostList removeUpdate={removePost} posts={post}/>
    </Card>

  ) 
}

NewsFeed.propTypes = {};

NewsFeed.defaultProps = {};


