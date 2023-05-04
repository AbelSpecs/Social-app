import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";
import auth from '../../auth/auth-helper';
import getMedia from '../../auth/media-helper';
import { Link } from "react-router-dom";
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import { useNavigate } from "react-router-dom";
import { Fragment } from 'react';
import Settings from '../core/Settings';
import CircularProgress from '@material-ui/core/CircularProgress';
import useUser from '../../hooks/useUserPeople';
import { 
  Avatar,
  Button, 
  Card, 
  CardActions, 
  CardActionArea, 
  CardMedia, 
  CardContent, 
  Divider,
  IconButton,
  Typography,
  CardHeader
} from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
  card: {
    borderRadius: '38px',
    position: 'relative',
    marginBottom: `${theme.spacing(3)}px`,
    width: '80%'
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
    textTransform: 'capitalize',
    color: theme.palette.text.primary
  },
  settingsButton: {
    position: 'absolute',
    zIndex: 1,
    left: '70%'
  },
  settingsIcon: {
    color: '#ffff'
  },
  menu: {
    marginTop: '3.5%',
    '& .MuiPaper-rounded': {
      borderRadius: '20px',
      backgroundColor: '#ffff' 
    }
  },
  circularProgress: {
    margin: '10% 0 10% 43%'
  }
}));

export default function ProfileCard({user, followers, following}) {
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(null);
  const photoUrl = getMedia(user.photo);
  const backgroundUrl = getMedia(user.background);
  
  const handleClick = (event) => {
    setOpen(event.currentTarget);
  }

  const handleClose = () => {
    setOpen(null);
  }
  
  return (
    <Card className={classes.card}>
      <Fragment>
        <CardHeader className={classes.settingsButton} action={
          <Fragment>
            <IconButton aria-label="settings" onClick={handleClick}>
                <SettingsOutlinedIcon className={classes.settingsIcon}/>
            </IconButton>
            <Settings 
              handleClose={handleClose} 
              open={open} 
              clear={() => auth.clearJWT(() => navigate("/signin"))} 
              styles={classes.menu}/>
          </Fragment>
          }/>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Background"
            height="140"
            src={backgroundUrl}
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
              {followers.length}
            </Typography>
            <Typography variant='body2' component="p">
              Followers
            </Typography>
          </div>
          <Divider variant="middle" orientation="vertical" flexItem className={classes.divider}/>
          <div>
            <Typography variant='body2' component="p" style={{textAlign: 'center'}}>
              {following.length}
            </Typography>
            <Typography variant='body2' component="p">
              Following
            </Typography>
          </div>
        </CardActions>
        <Divider/>
        <CardActions className={classes.cardAction} disableSpacing>
        <Link to={"/user/" + user.id} className={classes.link}>
          <Button color='primary' className={classes.profileButton}>
            My Profile
          </Button>
        </Link>
        </CardActions>
      </Fragment>
    </Card>
  )
}

ProfileCard.propTypes = {};

ProfileCard.defaultProps = {};


