import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { useNavigate } from "react-router";
import { signin } from "../../services/api-auth";
import auth from '../../auth/auth-helper';
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
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
      width: '70%',
      textAlign: 'center',
      marginTop: theme.spacing(5),
      paddingBottom: theme.spacing(2),
      borderRadius: 20
    },
    error: {
      verticalAlign: 'middle'
    },
    title: {
      marginTop: theme.spacing(2),
      color: ({mode}) => mode === 'light' ? theme.palette.openTitle : theme.palette.text.primary,
      fontSize: '1.5rem',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 300
    },
    cardActions: {
      flexDirection: 'column',
      '& .MuiButton-outlined':{
        marginLeft: 'auto'
      },
      '& .MuiButton-root': {
        textTransform: 'capitalize'
      }
    },
    forgotPassword: {
      fontSize: '0.8rem',
      textDecoration: 'none',
      color: ({mode}) => mode === 'light' ? theme.palette.openTitle : theme.palette.text.primary,
      fontWeight: 'bold',
      marginTop: 10
    },
    submit: {
      margin: 'auto',
      marginBottom: theme.spacing(2),
      width: 300
    },
    bottomTyphography: {
      fontSize: '0.8rem'
    },
    link: {
      textDecoration: 'none',
      color: ({mode}) =>  mode === 'light' ? theme.palette.openTitle : theme.palette.text.primary,
      fontWeight: 'bold'
    }
}));

export default function SignIn(props) {
    const mode = props.mode;
    const navigate = useNavigate();
    const classes = useStyles({mode});
    const { login } = useAuth();
    const [variant, setVariant] = useState("contained");
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: ''
    });

    const handleChange = name => event => {
        let value = event.target.value;

        setValues({...values, [name]: value});
    }

    const handleVariantIn = () => {
        setVariant("outlined");
    }
    
    const handleVariantOut = () => {
        setVariant("contained");
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
                    login();
                    navigate("/");
                });
            }    
        });
    }

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography className={classes.title}>
                    Log in
                </Typography>
                <TextField id="email" type="email" label="Email" className={classes.textField}
                            value={values.email} onChange={handleChange('email')}
                            margin="normal"/>
                <br/>
                <TextField id="pwd" type="password" label="Password" className={classes.textField}
                            value={values.password} onChange={handleChange('password')}
                            margin="normal"/>
                <br/>
                <Typography component="p" className={classes.forgotPassword}>
                        <Link className={classes.link}> Forgot your Password?</Link>
                </Typography>
                {
                    values.error && (<Typography component="p" color="error">
                        <Icon color="error" className={classes.error}>error</Icon>
                        {values.error}</Typography>)
                }
  
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button color="primary" variant={variant}
                    onClick={clickSubmit} onMouseEnter={handleVariantIn} 
                    onMouseLeave={handleVariantOut} className={classes.submit}>
                    Sign in   
                </Button>
                <Typography component="p" className={classes.bottomTyphography}>
                        Don't have an account? 
                        <Link className={classes.link} onClick={props.handleHide}> Sign Up</Link>
                </Typography>
            </CardActions>
        </Card>
      )

} 