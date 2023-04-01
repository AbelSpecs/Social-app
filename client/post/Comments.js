import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, CardHeader, TextField } from '@material-ui/core';
import auth from '../auth/auth-helper';
import DeleteIcon from '@material-ui/icons/Delete';
import { comments, deleteComments } from './api-post';


export default function Comments(props) {
  const jwt = auth.isAuthenticated();
  const [value, setValue] = useState({
    text: ''
  });

  const handleChange = (event) => {
    let text = event.target.value;

    setValue({...value, text: text});
  } 

  const addComment = () => {
    comments({
      params: {userId: jwt.user._id, postId: props.postId},
      credentials: {divineMole: jwt.token},
      comment: value.txt
    }).then(data => {
      if(data.error){
        console.log(data.error);
      }else{
        console.log(data);
      }
    })
  }

  const deleteComment = (comment) => {
    deleteComments({
      params: {userId: jwt.user._id, postId: props.postId},
      credentials: {divineMole: jwt.token},
      comment
    }).then(data => {
      if(data.error){
        console.log(data.error);
      }else{
        console.log(data);
        // props.updateComments()
      }
    })
  }

  const commentBody = (comment) => {
    return (
      <p className={classes.commentText}>
        <Link to={'/user/'+comment.postedBy._id}>{comment.postedBy.name}</Link>
        <br/>
        {comment.text} | { jwt.user._id === comment.postedBy._id && 
        <IconButton onClick={() => {deleteComment(comment)}}>
          <DeleteIcon />               
        </IconButton>}
        <span className={comment.commentDate}>
          { new Date(comment.created).toDateString() }
        </span>
      </p>
    )
  }

  return (
    <div>
      <CardHeader 
        avatar={
          <Avatar className={classses.smallAvatar} src={'/api/users/photo/' + jwt.user._id}/>}
        title={<TextField 
                multiline
                value={value.text}
                onChange={handleChange}
                placeholder='Write Something ...'
                className={classes.text}
                margin="normal"
                onKeyDown={addComment}
                />}>
      </CardHeader>
      
      {props.comments.map((item, i) => {
        return (
          <CardHeader avatar={ <Avatar className={classes.smallAvatar} src={'/api/users/photo/' + item.postedBy._id}/>}
                      title={commentBody(item)}
                      key={i}
                      className={classes.cardHeader}
          >           
          </CardHeader>)
      })}

    </div>
  )
} 

Comments.propTypes = {};

Comments.defaultProps = {};


