import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { create } from '../../services/api-post';
import { textCohere } from '../../services/api-cohere';
import { makeStyles } from "@material-ui/core/styles";
import PhotoIcon from '@material-ui/icons/Photo';
import AdjustIcon from '@material-ui/icons/Adjust';
import getMedia from '../../auth/media-helper';
import { 
    Card, 
    CardHeader, 
    Avatar, 
    TextField, 
    CardActions, 
    Button,
    IconButton
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    card: {
        boxShadow: 'none',
        width: '100%'
    },
    cardHeader: {
        paddingTop: 0
    },
    button: {
        paddingTop: 0,
        justifyContent: 'flex-end   '
    },
    avatar: {
        marginRight: theme.spacing(1),
        color: theme.palette.text.primary
    },
    title: {
        '& .MuiOutlinedInput-root': {
        color: '#000000',
        background: '#EEEDE7',
        borderRadius: '19px',
        padding: '9px 14px'
        }
    },
    iconButton: {
        paddingBottom: '7px'
    },
    iconAiButton: {
        marginBottom: 2
    },
    img: {
        display: 'none',
        width: 400,
        height: 'fit-content',
        objectFit: 'contain',
        margin: 'auto',
        borderRadius: 20
    }
  }));

export default function NewPost({user, addPost}){
    const classes = useStyles();
    const photoUrl = getMedia(user.photo);
    const [ai, setAi] = useState(false);
    const [values, setValues] = useState({
        text: '',
        aiText: '',
        photo: '',
        error: '',
        placeholderText: 'Share what you want...'
    });
  
    const clickPost = () => {
        let postData = new FormData();
        postData.append('text', values.text);
        postData.append('photo', values.photo);

        create({
            params: { userId: user.id},
            credentials: { divineMole: user.token},
            post: postData
        }).then(data => {
            if(data.error){
                setValues({...values, error: data.error});
            }
            else{
                setValues({...values, text: '', photo: ''});
                const img = document.querySelector('#image-preview');
                img.src = '';
                img.style.display = 'none';
                addPost(data);
            }
        });
    }

    const clickAi = () => {
        textCohere({
            credentials: { divineMole: user.token},
            text: { text: values.aiText }
        }).then(data => {
            if(data && data.error){
                // setValues({...values, error: data.error});
                console.log(data.error);
            }
            else{
                setValues({...values, aiText: ''});
                addPost(data);
            }
        });
    }

    const handleChange = name => event => {
        const value = name === 'photo' 
        ? event.target.files[0]
        : event.target.value;

        setValues({...values, [name]: value});

        if(name === 'photo'){
            const value = event.target.files[0];
            const img = document.querySelector('#image-preview');
            const reader = new FileReader();
            reader.onload = () => {
                img.src = reader.result;
                img.style.display = 'block';
            }
            reader.readAsDataURL(value);
        }
    }

    const handleCancel = () => {
        setValues({text: '', photo: '', error: ''});
        const img = document.querySelector('#image-preview');
        img.src = '';
        img.style.display = 'none';
    }

    const handleAi = () => {
        !ai 
        ? setValues({...values, placeholderText: 'Tell me what you need...'}) 
        : setValues({...values, placeholderText: 'Share what you want...'});
        setAi(prev => !prev);
    }

    return (
        <Card className={classes.card}>
            <CardHeader className={classes.cardHeader}
            avatar={
              <Avatar src={photoUrl} aria-label="recipe" className={classes.avatar} />
            }
            title={
                !ai 
                ?
                <TextField className={classes.title}
                    multiline
                    id="outlined-full-width"
                    value={values.text}
                    onChange={handleChange('text')}
                    style={{ margin: 8 }}
                    placeholder="Share what you want..."
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
                :
                <TextField className={classes.title}
                    multiline
                    id="outlined-full-width"
                    value={values.aiText}
                    onChange={handleChange('aiText')}
                    style={{ margin: 8 }}
                    placeholder="Tell me what you need..."
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
            }
            />
            <img id='image-preview' className={classes.img}/>
            <CardActions className={classes.button}>
                {
                    !ai &&   
                    <Fragment>
                        <Button onClick={handleCancel}>
                            Cancel
                        </Button>
                        <IconButton className={classes.iconButton}>
                            <input accept="image/*" type="file" onChange={handleChange('photo')}
                                style={{display: 'none'}} id="icon-button-file" />
                            <label htmlFor="icon-button-file" className={classes.avatarLabel}>
                                <PhotoIcon/>
                            </label>
                        </IconButton>
                    </Fragment>
                }
                <IconButton className={classes.iconAiButton} onClick={handleAi}>
                    <AdjustIcon/>
                </IconButton>
                {
                    ai 
                    ?
                    <Button onClick={clickAi}>
                        Ask
                    </Button>
                    :
                    <Button onClick={clickPost}>
                        Post
                    </Button>
                }
            </CardActions>
        </Card>
        
    )
}

NewPost.propTypes = {};

NewPost.defaultProps = {};
