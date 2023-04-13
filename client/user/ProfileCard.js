import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/styles";
import auth from '../auth/auth-helper';
import image from '../assets/images/cherryblossom.png';
import { read } from "./api-user";
import { Link } from "react-router-dom";
import { 
  Avatar,
  Button, 
  Card, 
  CardActions, 
  CardActionArea, 
  CardMedia, 
  CardContent, 
  Divider,
  Typography
} from '@material-ui/core';


const useStyles = makeStyles(() => ({
  card: {
    borderRadius: '38px'
  },
  avatarCard: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 60,
    height: 60
  },
  cardContent: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '-20px'
  },
  text: {
    textAlign: 'center',
    flexBasis: '100%'
  },
  cardAction: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  divider: {
    marginLeft: '16px'
  },
  link: {
    textDecoration: 'none'
  },
  profileButton: {
    textTransform: 'capitalize'
  },
  
}));

export default function ProfileCard() {
  const jwt = auth.isAuthenticated();
  const photoUrl = `/api/users/photo/${jwt.user._id}?${new Date().getTime()}`
  const classes = useStyles();
  const [user, setUser] = useState({
    following: [],
    followers: []
});

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    read({
        params: { userId: jwt.user._id },
        credentials: { divineMole: jwt.token },
        signal
    }).then(data => {
        if(data && data.error)
        {
            console.log(data.error);
        }
        else
        {
            setUser(data);
        }
    });

    return function cleanup() {
        abortController.abort();
    }
}, [jwt.user._id]);

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Background"
          height="140"
          src={image}
          title="Background"
        />
        <Avatar src={photoUrl} className={classes.avatarCard}/>
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h6" component="h6" className={classes.text}>
            {user.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.text}>
            {user.about}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Divider/>
      <CardActions className={classes.cardAction} disableSpacing>
        <div>
          <Typography variant='body2' component="p" style={{textAlign: 'center'}}>
            {user.followers.length}
          </Typography>
          <Typography variant='body2' component="p">
            Followers
          </Typography>
        </div>
        <Divider variant="middle" orientation="vertical" flexItem className={classes.divider}/>
        <div>
          <Typography variant='body2' component="p" style={{textAlign: 'center'}}>
            {user.following.length}
          </Typography>
          <Typography variant='body2' component="p">
            Following
          </Typography>
        </div>
      </CardActions>
      <Divider/>
      <CardActions className={classes.cardAction} disableSpacing>
      <Link to={"/user/" + jwt.user._id} className={classes.link}>
        <Button color='primary' className={classes.profileButton}>
          My Profile
        </Button>
      </Link>
      </CardActions>
    </Card>
  )
}

ProfileCard.propTypes = {};

ProfileCard.defaultProps = {};


