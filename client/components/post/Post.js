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
import auth from '../../auth/auth-helper';
import { Link } from "react-router-dom";
import { useState } from 'react';
import { remove } from '../../services/api-post';
import Comments from './Comments';
import { like, dislike } from '../../services/api-post';
import getMedia from '../../auth/media-helper';

const useStyles = makeStyles(() => ({
  card: {
    boxShadow: 'none'
  },
  cardName: {
    textDecoration: 'none',
    color: 'black'
  },
  img: {
        width: 400,
        objectFit: 'contain',
        margin: 'auto',
        borderRadius: 20
  }
}));

export default function Post({user, profile, updatePostComments, updatePostLikes, onRemove, post}) {
  const classes = useStyles();
  const userPostId = post.postedBy._id;
  const existLike = post.likes.indexOf(user.id) !== -1;
  const photoUrl = getMedia(post.postedBy.photo);
  const [openComments, setOpenComments] = useState(false);
  const photoPostUrl = getMedia(post.photo);

  const deletePost = () => {
    remove({
      params: { postId: post._id},
      credentials: { divineMole: user.token }
    }).then(data => {
      if(data.error){
        console.log(data.error);
      }else{
        onRemove(post);
      }
    });
  }

  const clickLike = () => {
    let callApi = !existLike ? like : dislike;
    callApi({
      params: {userId: user.id},
      credentials: {divineMole: user.token},
      postId: post._id 
    }).then(data => {
      if(data.error){
        console.log(error);
      }else{
        updatePostLikes(data._id, data.likes);
      }
    });
  } 

  const makeComment = () => {
    setOpenComments(!openComments);
  }

  return (
    <Fragment>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar src={photoUrl} className={classes.avatar}/>
          }
          action={ userPostId === user.id && 
            (<IconButton onClick={deletePost}>
                <DeleteIcon />               
              </IconButton>)}
          title={ <Link className={classes.cardName} to={"/user/" + userPostId}>{post.postedBy.name}</Link>}
          subheader={(new Date(post.created)).toDateString()}
          className={classes.cardHeader}
        />
        <CardContent className={classes.cardContent}>
          <Typography className={classes.text} component="p">
            {post.text}
          </Typography>
        </CardContent>
        {
          post.photo &&
          (<CardMedia component="img"
                      alt="PhotoPost"
                      height="fit-content" 
                      src={photoPostUrl}
                      className={classes.img}
                      />)
        }
        <CardActions>
          {
            post.likes.length
            ? <IconButton onClick={clickLike} className={classes.button} aria-label="Like" color="secondary">
                <FavoriteIcon />
              </IconButton>  
            : <IconButton onClick={clickLike} className={classes.button} aria-label="Dislike" color="secondary">
                <FavoriteBorderIcon/>
              </IconButton>
          }
          <span>{post.likes.length}</span>
          <IconButton className={classes.button} aria-label="Comment" color="secondary" onClick={makeComment}>
            <CommentIcon />
          </IconButton>
          <span>{post.comments.length}</span>
        </CardActions>
        {
          openComments && 
          <Comments postId={post._id} comments={post.comments} updatePostComments={updatePostComments} profile={profile} user={user}/>
        }
      </Card>
    </Fragment>
  )
}

Post.propTypes = {};

Post.defaultProps = {};


