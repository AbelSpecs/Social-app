import { 
    Button,
    Card,
    CardContent,
    Typography,
    TextField,
    CardActions, 
    Icon,
    Avatar
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { isNull } from "lodash";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import auth from "../auth/auth-helper";
import { read, update } from "./api-user";
import React from "react";
import FileUpload from '@material-ui/icons/AddPhotoAlternate'

const useStyles = makeStyles(theme => ({
    card: {
      maxWidth: 600,
      margin: 'auto',
      textAlign: 'center',
      marginTop: theme.spacing(5),
      paddingBottom: theme.spacing(2)
    },
    title: {
      margin: theme.spacing(2),
      color: theme.palette.protectedTitle
    },
    error: {
      verticalAlign: 'middle'
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 300
    },
    submit: {
      margin: 'auto',
      marginBottom: theme.spacing(2)
    },
    bigAvatar: {
        width: 60,
        height: 60,
        margin: 'auto'
    },
    filename:{
        display: 'inline-block',
        marginTop:'10px'
    }
  }))

export default function EditProfile() {
    const classes = useStyles();
    const userId = useParams();
    const navigate = useNavigate();
    const jwt = auth.isAuthenticated();
    const [values, setValues] = useState({
        id: '',
        photo: '',
        name: '',
        about: '',
        email: '',
        password: '',
        error: '',
        redirectToProfile: false
    });
    
    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        
        read({
            params: { userId: userId.userId },
            credentials: { divineMole: jwt.token },
            signal
        }).then(data => {
            if(data && data.error)
                setValues({...values, error: data.error})
            else
                setValues({...values, id: data._id, name: data.name, email: data.email, about: data.about});
        });

        return function cleanup() {
            abortController.abort();
        } 
        
    }, [userId.userId]);

    
    const handleChange = name => event => {
        const value = name === 'photo'
        ? event.target.files[0]
        : event.target.value;

        setValues({...values, [name]: value});
    }

    const clickSubmit = () => {
        let userData = new FormData();

        values.name && userData.append('name', values.name);
        values.email && userData.append('email', values.email);
        values.about && userData.append('about', values.about);
        values.password && userData.append('password', values.password);
        values.photo && userData.append('photo', values.photo);

        update({
            params: { userId: userId.userId },
            credentials: { divineMole: jwt.token },
            user: userData
        }).then(data => {
            if(data && data.error)
                setValues({...values, error: data.error});
            else{
                setValues({...values, redirectToProfile: true});
                navigate('/user/' + userId.userId);
            }
        })
    }
    
    const photoUrl = values.id
    ? `/api/users/photo/${values.id}?${new Date().getTime()}`
    : '/api/users/defaultphoto';

    // const photoRoute = !values.id && values.photo
    // ? `${values.photo.name}`
    // : photoUrl

    return(
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Typography>
                        Edit Profile
                    </Typography>
                    <Avatar src={photoUrl} className={classes.bigAvatar}/><br/>
                    <input accept="image/*" type="file" onChange={handleChange('photo')}
                            style={{display: 'none'}} id="icon-button-file" />
                    <label htmlFor="icon-button-file">
                        <Button variant="contained" color="default" component="span">
                            Upload <FileUpload/>
                        </Button>
                    </label>
                    <br/>
                    <span className={classes.filename}>
                        {values.photo ? values.photo.name : ''}
                    </span>
                    <br/>
                    <TextField id="name" label="Name" className={classes.textField}
                                value={values.name} onChange={handleChange('name')}
                                margin="normal"/>
                    <br/>
                    <TextField id="multiline-flexible" label="About" multiline minRows="2" className={classes.textField}
                                value={values.about} onChange={handleChange('about')}
                                margin="normal"/>
                    <br/>
                    <TextField id="email" type="email" label="Email" className={classes.textField}
                                value={values.email} onChange={handleChange('email')}
                                margin="normal"/>
                    <br/>
                    <TextField id="pwd" type="password" label="Password" className={classes.textField}
                                value={values.password} onChange={handleChange('password')}
                                margin="normal"/>
                    <br/>
                    {
                        values.error && (<Typography component="p" color="error">
                            <Icon color="error" className={classes.error}>error</Icon>
                            {values.error}</Typography>)
                    }
                </CardContent>
                <CardActions>
                    <Button color="primary" variant="contained"
                        onClick={clickSubmit} className={classes.submit}>
                        Submit   
                    </Button>
                </CardActions>
            </Card>
        </div>
    )    
}