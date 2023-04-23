import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Avatar, CardHeader, TextField, IconButton, Divider } from '@material-ui/core';
import auth from '../../auth/auth-helper';
import DeleteIcon from '@material-ui/icons/Delete';
import { comments, deleteComments } from '../../services/api-post';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  comment: {
    textDecoration: 'none',
    color: 'black'
  }
}));

export default function Comments(props) {
  const userData = auth.getData();
  const photoUrl = userData ? '/api/users/photo/' + userData.id
                            : '/api/users/defaultphoto';
  const classes = useStyles();
  const [value, setValue] = useState({
    text: ''
  });

  const handleChange = (event) => {
    let text = event.target.value;

    setValue({...value, text: text});
  } 

  const addComment = (event) => {
    if(event.keyCode === 13){
      event.preventDefault();
      comments({
        params: {userId: userData.id, postId: props.postId},
        credentials: {divineMole: userData.token},
        comment: {text: value.text}
      }).then(data => {
        if(data.error){
          console.log(data.error);
        }else{
          console.log(data);
          props.updateComments(data.comments);
          setValue({...value, text: ''});
        }
      });
    }
  }

  const deleteComment = (comment) => {
    deleteComments({
      params: {userId: userData.id, postId: props.postId},
      credentials: {divineMole: userData.token},
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
        <Link className={classes.comment} to={'/user/'+comment.postedBy._id}>{comment.postedBy.name}</Link>
        <br/>
        {comment.text} | { userData.id === comment.postedBy._id && 
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
      {
        !props.profile &&
        <CardHeader 
          avatar={
            <Avatar className={classes.smallAvatar} src={photoUrl}/>}
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
      }
      <Divider/>
      {
        props.comments.map((item, i) => {
          const photoUserUrl = '/api/users/photo/' + item.postedBy._id;
          
          return (
            <CardHeader avatar={ 
                        <Avatar className={classes.smallAvatar} src={photoUserUrl}/>
                        }
                        title={commentBody(item)}
                        key={i}
                        className={classes.cardHeader}
            >           
            </CardHeader>)
          })
      }

    </div>
  )
} 

Comments.propTypes = {};

Comments.defaultProps = {};


