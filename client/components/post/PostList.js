import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';
import { TransitionGroup } from 'react-transition-group';
import Collapse from '@material-ui/core/Collapse';



export default function PostList({removePost, updatePostLikes, updatePostComments, posts, user, profile}) {
  return (
    <div style={{marginTop: '24px', width: '100%'}}>
      <TransitionGroup >
        {posts?.map((item, i) => {
          return ( 
            <Collapse key={i}>
              <Post post={item} 
                    removePost={removePost} 
                    updatePostLikes={updatePostLikes}
                    updatePostComments={updatePostComments}
                    profile={profile} 
                    user={user}
              >
              </Post>
            </Collapse>
          )
        })}
      </TransitionGroup>   
    </div>
  )
} 

PostList.propTypes = { };

PostList.defaultProps = { removePost: PropTypes.func.isRequired };
