import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Paper } from '@material-ui/core';
import NewPost from './NewPost';
import PostList from './PostList';
import { makeStyles } from "@material-ui/core/styles";
import usePostList from '../../hooks/usePostList';

const useStyles = makeStyles(() => ({
  paper: {
      padding: '10px',
      borderRadius: '19px'
  }
}));

export default function NewsFeed({user}) {
  const classes = useStyles();
  const { posts, setPosts } = usePostList(user);

  const updatePostLikes = (id, likes) => {
    const index = posts.findIndex(p => p._id === id);
    const postsList = [...posts];
    const updatedPost = {...postsList[index], likes: likes};
    postsList[index] = updatedPost;
    setPosts(postsList);
  }

  const updatePostComments = (id, comments) => {
    const index = posts.findIndex(p => p._id === id);
    const postsList = [...posts];
    const updatedPost = {...postsList[index], comments: comments};
    postsList[index] = updatedPost;
    setPosts(postsList);
  }

  const removePost = (post) => {
    const updatedPosts = [...posts];
    const index = updatedPosts.indexOf(post);
    updatedPosts.splice(index);
    setPosts(updatedPosts);
  }

  return (
    <Paper className={classes.paper}>
      <NewPost user={user} setPosts={setPosts} posts={posts}/>
      <Divider/>
      <PostList removeUpdate={removePost} 
                updatePostLikes={updatePostLikes} 
                updatePostComments={updatePostComments} 
                posts={posts} 
                user={user}
                profile={false}/>
    </Paper>

  ) 
}

NewsFeed.propTypes = {};

NewsFeed.defaultProps = {};


