import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { useState } from 'react';
import NewPost from './NewPost';
import PostList from './PostList';


export default NewsFeed = function() {
  const [post, setPost] = useState([]);
  
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
        <PostList removeUpdate={removePost}/>
    </Card>

  ) 
}

NewsFeed.propTypes = {};

NewsFeed.defaultProps = {};


