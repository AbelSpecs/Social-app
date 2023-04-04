import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { create } from './api-post';
import auth from '../auth/auth-helper';
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import PhotoIcon from '@material-ui/icons/Photo';
import { 
    Typography, 
    Card, 
    CardHeader, 
    Divider, 
    Avatar, 
    CardContent, 
    TextField, 
    CardActions, 
    Button,
    IconButton
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    card: {
        boxShadow: 'none'
    },
    button: {
        justifyContent: 'space-between'
    },
    avatar: {
        marginRight: theme.spacing(1)
    }
  }));

export default function NewPost(props){
    const classes = useStyles();
    const jwt = auth.isAuthenticated();
    const [values, setValues] = useState({
        text: '',
        photo: '',
        error: ''
    });
  
    const clickPost = () => {
        let postData = new FormData();
        postData.append('text', values.text);
        postData.append('photo', values.photo);

        create({
            params: { userId: jwt.user._id},
            credentials: { divineMole: jwt.token},
            post: postData
        }).then(data => {
            if(data.error){
                setValues({...values, error: data.error});
            }
            else{
                setValues({...values, text: '', photo: ''});
                props.addUpdate(data);
            }
        });
    }

    const handleChange = (event) => {
        const value = event.target.value;

        setValues({...values, text: value});
    }

    return (
        <Card className={classes.card}>
            <CardHeader
            avatar={
              <Avatar src={'/api/users/photo/'+ jwt.user._id} aria-label="recipe" className={classes.avatar} />
            }
            />
            <CardContent >
                <TextField 
                    multiline
                    value={values.text}
                    onChange={handleChange}
                    placeholder='Your Thoughts ...'
                    className={classes.text}
                    margin="normal"
                    fullWidth
                    //onKeyDown={addComment}
                    />
            </CardContent>
            <CardActions className={classes.button}>
                <IconButton>
                    <PhotoIcon/>
                </IconButton>
                <Button color='primary' onClick={clickPost}>
                    Post
                </Button>
            </CardActions>
        </Card>
        
    )
}

NewPost.propTypes = {};

NewPost.defaultProps = {};
