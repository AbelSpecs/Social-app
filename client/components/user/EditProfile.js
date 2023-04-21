import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { update } from "../../services/api-user";
import FileUpload from '@material-ui/icons/AddPhotoAlternate';
import jwt from '../../auth/auth-user';
import useEdit from "../../hooks/useEdit";
import { 
    Button,
    Card,
    CardContent,
    Typography,
    TextField,
    CardActions, 
    Icon
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    card: {
        width: '100%',
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
    const { values, setValues } = useEdit();

    const handleChange = name => event => {
        const value = event.target.value;
        setValues({...values, [name]: value});
    }

    const clickSubmit = () => {
        let userData = new FormData();

        values.name && userData.append('name', values.name);
        values.email && userData.append('email', values.email);
        values.about && userData.append('about', values.about);
        values.password && userData.append('password', values.password);

        update({
            params: { userId: jwt.id },
            credentials: { divineMole: jwt.token },
            user: userData
        }).then(data => {
            if(data && data.error)
                setValues({...values, error: data.error});
            else{
                setValues({...values});
                // navigate('/user/' + userId.userId);
            }
        })
    }

    return(
        <Fragment>
            <Card className={classes.card}>
                <CardContent>
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
        </Fragment>
    )    
}