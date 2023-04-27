import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';


export default function PostList({removeUpdate, updatePostLikes, updatePostComments, posts, user, profile}) {
  return (
    <div style={{marginTop: '24px'}}>
      {posts?.map((item, i) => {
        return <Post post={item} 
                      key={i} 
                      onRemove={removeUpdate} 
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

PostList.propTypes = { posts: PropTypes.array.isRequired };

PostList.defaultProps = { removeUpdate: PropTypes.func.isRequired };
