import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';


export default function PostList(props) {
  return (
    <div style={{marginTop: '24px'}}>
      {props.posts.map((item, i) => {
        return <Post post={item} key={i} index={i} onRemove={props.removeUpdate}></Post>
      })}
    </div>
  )
} 

PostList.propTypes = { posts: PropTypes.array.isRequired };

PostList.defaultProps = { removeUpdate: PropTypes.func.isRequired };
