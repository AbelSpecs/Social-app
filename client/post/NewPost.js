import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { create } from './api-post';
import auth from '../auth/auth-helper';
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import PhotoIcon from '@material-ui/icons/Photo';
import { 
    Card, 
    CardHeader, 
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
    cardHeader: {
        paddingTop: 0
    },
    button: {
        paddingTop: 0,
        justifyContent: 'flex-end   '
    },
    avatar: {
        marginRight: theme.spacing(1)
    },
    title: {
        '& .MuiOutlinedInput-root': {
        color: '#000000',
        background: '#EEEDE7',
        borderRadius: '19px',
        padding: '12px 14px'
        }
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
            <CardHeader className={classes.cardHeader}
            avatar={
              <Avatar src={'/api/users/photo/'+ jwt.user._id + `?${new Date().getTime()}`} aria-label="recipe" className={classes.avatar} />
            }
            title={
                <TextField className={classes.title}
                    multiline
                    id="outlined-full-width"
                    value={values.text}
                    onChange={handleChange}
                    style={{ margin: 8 }}
                    placeholder="Share what you want..."
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
            }
            />
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
