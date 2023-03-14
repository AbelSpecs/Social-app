import { 
    Button,
    Card,
    CardContent,
    Typography,
    TextField,
    CardActions, 
    Icon
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { isNull } from "lodash";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import auth from "../auth/auth-helper";
import { read, update } from "./api-user";
import React from "react";

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
    }
  }))

export default function EditProfile() {
    const classes = useStyles();
    const userId = useParams();
    const navigate = useNavigate();
    const jwt = auth.isAuthenticated();
    const [user, setUser] = useState({
        name: '',
        email: ''
    });
    const [redirectToSigin, setRedirectToSignin] = useState(false);
    const [values, setValues] = useState({
        name: '',
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
                setRedirectToSignin(true);
            else
                setUser(data);
        });

        return function cleanup() {
            abortController.abort();
        } 
    }, [userId.userId]);

    const handleChange = name => event => {
        let value = event.target.value;

        setValues({...values, [name]: value});
    }

    const clickSubmit = () => {
        const { password } = values;

        const user = {
            name: values.name || undefined,
            email: values.email || undefined,
            password: values.password || undefined
        }

        if(isNull(password))
            delete user.password;

        update({
            params: { userId: userId.userId },
            credentials: { divineMole: jwt.token },
            user
        }).then(data => {
            if(data && data.error)
                // setRedirectToSignin(true);
                setValues({...values, error: data.error});
            else
                setValues({...values, redirectToProfile: true});
        })
    }

    if(redirectToSigin)
        // return (<redirect to='/signin'/>);
        navigate('/signin');

    if(values.redirectToProfile)
        // return (<redirect to={'/user/' + userId.userId}/>)
        navigate('/user/' + userId.userId);
    
    return(
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Typography>
                        Edit Profile
                    </Typography>
                    <TextField id="name" label="Name" className={classes.textField}
                                value={values.name || user.name} onChange={handleChange('name')}
                                margin="normal"/>
                    <br/>
                    <TextField id="email" type="email" label="Email" className={classes.textField}
                                value={values.email || user.email} onChange={handleChange('email')}
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