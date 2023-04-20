import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { useNavigate } from "react-router";
import { signin } from "../../auth/api-auth";
import auth from '../../auth/auth-helper';
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
      maxWidth: 600,
      margin: 'auto',
      textAlign: 'center',
      marginTop: theme.spacing(5),
      paddingBottom: theme.spacing(2),
      borderRadius: '20px'
    },
    error: {
      verticalAlign: 'middle'
    },
    title: {
      marginTop: theme.spacing(2),
      color: theme.palette.openTitle
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
}));

export default function SignIn() {
    const navigate = useNavigate();
    const classes = useStyles();
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: ''
    });

    const handleChange = name => event => {
        let value = event.target.value;

        setValues({...values, [name]: value});
    }

    const clickSubmit = () => {
        const user = {
            email: values.email || undefined,
            password: values.password || undefined
        }

        signin(user).then(data => {
            if(data.error)
            {
                setValues({...values, error: data.error});
            }
            else
            {
                auth.authenticate(data, () => {
                    navigate("/");
                });
            }    
        });
    }

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography>
                    Sign In
                </Typography>
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
    )

} 