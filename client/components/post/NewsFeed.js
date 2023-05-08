import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Divider, Paper } from '@material-ui/core';
import NewPost from './NewPost';
import PostList from './PostList';
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(() => ({
  paper: {
      padding: '10px',
      borderRadius: '19px',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center'
  },

}));

export default function NewsFeed({user, postsHome, setPostsHome, postHomeLoading}) {
  const classes = useStyles();

  const addPost = (data) => {
    const updatedPosts = [data, ...postsHome];
    setPostsHome(updatedPosts);
  }
  
  const updatePostLikes = (id, likes) => {
    const index = postsHome.findIndex(p => p._id === id);
    const postsList = [...postsHome];
    const updatedPost = {...postsList[index], likes: likes};
    postsList[index] = updatedPost;
    setPostsHome(postsList);
  }

  const updatePostComments = (id, comments) => {
    const index = postsHome.findIndex(p => p._id === id);
    const postsList = [...postsHome];
    const updatedPost = {...postsList[index], comments: comments};
    postsList[index] = updatedPost;
    setPostsHome(postsList);
  }

  const removePost = (post) => {
    const updatedPosts = [...postsHome];
    const index = updatedPosts.indexOf(post);
    updatedPosts.splice(index, 1);
    setPostsHome(updatedPosts);
  }

  return (
    <Paper className={classes.paper}>
      <NewPost user={user} addPost={addPost}/>
      <Divider style={{width: '100%'}}/>
      {
        postHomeLoading && <CircularProgress style={{margin: '10px 0'}}/>
      }
      {
        !postHomeLoading && 
          <PostList removePost={removePost} 
                    updatePostLikes={updatePostLikes} 
                    updatePostComments={updatePostComments} 
                    posts={postsHome} 
                    user={user}
                    profile={false}
          />
      }
    </Paper>

  ) 
}

NewsFeed.propTypes = {};

NewsFeed.defaultProps = {};


