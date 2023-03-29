import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import DeleteIcon from '@material-ui/icons/Delete';
import auth from '../auth/auth-helper';
import { Link } from "react-router-dom";
import { useState } from 'react';
import { remove } from './api-post';

export default function Post(props) {
  const [values, setValues] = useState({
    like: checkLike(props.post.like),
    likes: props.post.likes.length,
    comments: props.post.comments
  });
  const classes = useStyles();
  const jwt = auth.isAuthenticated();

  const deletePost = () => {
    remove({
      params: { postId: props.post._id},
      credentials: { divineMole: jwt.token }
    }).then(data => {
      if(data.error){
        console.log(data.error);
      }else{
        props.onRemove(props.post);
      }
    });
  }

  const checkLike = (likes) => {
    let match = likes.indexOf(jwt.user._id) !== -1;
    return match;
  }

  const clickLike = () => {
    let callApi = values.like ? like : dislike;

  } 

  return (
    <div>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar src={'/api/users/photo/' + props.post.postedBy._id} className={classes.avatar}/>
          }
          action={ props.post.postedBy._id === auth.isAuthenticated().user._id && 
            (<IconButton onClick={deletePost}>
                <DeleteIcon />               
              </IconButton>)}
          title={ <Link to={"/user/" + props.post.postedBy._id}></Link>}
          subheader={(new Date(props.post.created)).toDateString()}
          className={classes.cardHeader}
        />
        <CardContent className={classes.cardContent}>
          <Typography className={classes.text} component="p">
            {props.post.text}
          </Typography>
        </CardContent>
        {props.post.photo &&
          (<CardMedia src={'/api/posts/photo/' + props.post._id}/>)}
        <CardActions>
          {values.likes
            ? <IconButton onClick={clickLike} className={classes.button} aria-label="Like" color="secondary">
                <FavoriteIcon />
              </IconButton>  
            : <IconButton onClick={clickLike} className={classes.button} aria-label="Dislike" color="secondary">
                <FavoriteBorderIcon/>
              </IconButton>
          }
          <span>{values.likes}</span>
          <IconButton className={classes.button} aria-label="Comment" color="secondary">
            <CommentIcon />
          </IconButton>
          <span>{values.comments.length}</span>
        </CardActions>
        <Comments postId={props.post._id} comments={values.comments} updateComments={updateComments}/>
      </Card>
    </div>
  )
}

Post.propTypes = {};

Post.defaultProps = {};


