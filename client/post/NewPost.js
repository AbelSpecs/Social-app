import React from 'react';
import PropTypes from 'prop-types';
import { create } from './api-post';
import auth from '../auth/auth-helper';


export default function NewPost(props){
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
}

NewPost.propTypes = {};

NewPost.defaultProps = {};
