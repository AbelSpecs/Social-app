import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
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
import CommentIcon from '@material-ui/icons/Comment';
import jwt from '../../auth/auth-user';
import { Link } from "react-router-dom";
import { useState } from 'react';
import { remove } from '../../services/api-post';
import Comments from './Comments';

const useStyles = makeStyles(() => ({
  card: {
    boxShadow: 'none'
  },
  cardName: {
    textDecoration: 'none',
    color: 'black'
  }
}));

export default function Post(props) {
  const userId = jwt.id;
  const userPostId = props.post[props.index].postedBy._id;
  const classes = useStyles();
  const photoUrl = userPostId
  ? '/api/users/photo/' + userPostId + `?${new Date().getTime()}`
  : '/api/users/defaultphoto';
  
  const checkLike = (likes) => {
    let match = likes.indexOf(jwt.id) !== -1;
    return match;
  }

  const [values, setValues] = useState({
    like: checkLike(props.post[props.index].likes),
    likes: props.post[props.index].likes.length,
    comment: false,
    comments: props.post[props.index].comments
  });
  
  const deletePost = () => {
    remove({
      params: { postId: props.post._id},
      credentials: { divineMole: jwt.token }
    }).then(data => {
      if(data.error){
        console.log(data.error);
      }else{
        props.onRemove(props.posts);
      }
    });
  }

  const clickLike = () => {
    let callApi = values.like ? like : dislike;
    callApi({
      params: {userId: userId},
      credentials: {divineMole: jwt.token},
      postId: props.posts._id 
    }).then(data => {
      if(data.error){
        console.log(error);
      }else{
        setValues({...values, like: !values.like, likes: data.likes.length});
      }
    })
  } 

  const updateComments = (comment) => {
    setValues({...values, comments: comment})
  }

  const makeComment = () => {
    setValues({...values, comment: !values.comment});
  }

  return (
    <Fragment>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar src={photoUrl} className={classes.avatar}/>
          }
          action={ userPostId === userId && 
            (<IconButton onClick={deletePost}>
                <DeleteIcon />               
              </IconButton>)}
          title={ <Link className={classes.cardName} to={"/user/" + userPostId}>{props.post[props.index].postedBy.name}</Link>}
          subheader={(new Date(props.post[props.index].created)).toDateString()}
          className={classes.cardHeader}
        />
        <CardContent className={classes.cardContent}>
          <Typography className={classes.text} component="p">
            {props.post[props.index].text}
          </Typography>
        </CardContent>
        {props.post[props.index].photo &&
          (<CardMedia src={'/api/posts/photo/' + props.post[props.index]._id}/>)}
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
          <IconButton className={classes.button} aria-label="Comment" color="secondary" onClick={makeComment}>
            <CommentIcon />
          </IconButton>
          <span>{values.comments.length}</span>
        </CardActions>
        {values.comment && 
          <Comments postId={props.post[props.index]._id} comments={values.comments} updateComments={updateComments} profile={props.profile}/>
        }
      </Card>
    </Fragment>
  )
}

Post.propTypes = {};

Post.defaultProps = {};


