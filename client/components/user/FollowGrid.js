import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Link, Avatar, ImageListItem } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import ImageList from '@material-ui/core/ImageList'

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(2),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    background: theme.palette.background.paper,
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 'auto'
  },
  gridList: {
    width: '100%'
  },
  tileText: {
    textAlign: 'center',
    marginTop: 10
  }
}));

export default function FollowGrid(props){
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <ImageList className={classes.gridList} cols={4}>
        {props.people.map((person, i) => {
          const photoUrl = '/api/users/photo/'+person._id;

          return <ImageListItem style={{'height': 120}} key={i}>
            <Link to={"/user/" + person._id}>
              <Avatar src={photoUrl} className={classes.bigAvatar}/>
              <Typography className={classes.tileText}>{person.name}</Typography>
            </Link>
          </ImageListItem>
        })}
      </ImageList>
    </div>
  )
}

FollowGrid.propTypes = { people: PropTypes.array.isRequired };

FollowGrid.defaultProps = {};


