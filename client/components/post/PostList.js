import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';


export default function PostList({removePost, updatePostLikes, updatePostComments, posts, user, profile}) {
  return (
    <div style={{marginTop: '24px', width: '100%'}}>
      {posts?.map((item, i) => {
        return <Post post={item} 
                      key={i} 
                      removePost={removePost} 
                      updatePostLikes={updatePostLikes}
                      updatePostComments={updatePostComments}
                      profile={profile} 
                      user={user}
                      >
                </Post>
      })}
    </div>
  )
} 

PostList.propTypes = { };

PostList.defaultProps = { removePost: PropTypes.func.isRequired };
