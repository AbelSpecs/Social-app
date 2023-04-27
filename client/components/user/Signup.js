import { Link } from "react-router-dom";
import { create } from "../../services/api-user";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import React, { Fragment } from "react";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { 
    Button, 
    Card, 
    CardActions, 
    CardContent, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle, 
    Icon, 
    TextField, 
    Typography 
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    card: {
      width: '70%',
      textAlign: 'center',
      marginTop: theme.spacing(5),
      paddingBottom: theme.spacing(2),
      borderRadius: 20
    },
    cardAction:{
      '& .MuiButton-root': {
        textTransform: 'capitalize'
      }
    },
    error: {
      verticalAlign: 'middle'
    },
    title: {
      marginTop: theme.spacing(2),
      color: theme.palette.openTitle,
      fontSize: '1.5rem',
      display: 'flex',
      justifyContent: 'flex-start',
      gap: '35%',
      alignItems: 'center'
    },
    backArrow: {
      cursor: 'pointer'
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 300
    },
    submit: {
      margin: 'auto',
      marginBottom: theme.spacing(2),
      width: 300
    }
  }));

export default function Signup(props) {
    const classes = useStyles();
    const [variant, setVariant] = useState("contained");
    const [values, setValues] = useState({
        name: '',
        password: '',
        email: '',
        open: false,
        error: ''
    });

    const handleChange = name => event => {
        let value = event.target.value;

        setValues({...values, [name]: value});
    }

    const handleClose = () => {
        setValues({...values, open: false});
    }

    const handleVariantIn = () => {
        setVariant("outlined");
    }
    
    const handleVariantOut = () => {
        setVariant("contained");
    }

    const clickSubmit = () => {
        const user = {
            name: values.name || undefined,
            email: values.email || undefined,
            password: values.password || undefined
        }

        create(user).then((data) => {
            if(data.error){
                setValues({...values, error: data.error});
            }
            else{
                setValues({...values, error: '', name: '', password: '', email: '', open: true});
                props.handleHide;
            }
        });
    }

    return (
        <Fragment>
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title}>
                        <ArrowBackIcon className={classes.backArrow} onClick={props.handleHide}/>
                        Sign Up
                    </Typography>
                    <TextField id="name" label="Name" className={classes.textField}
                                value={values.name} onChange={handleChange('name')}
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
                <CardActions className={classes.cardAction}>
                    <Button color="primary" variant={variant}
                        onClick={clickSubmit} className={classes.submit}
                        onMouseEnter={handleVariantIn} onMouseLeave={handleVariantOut}>
                        Submit   
                    </Button>
                </CardActions>
            </Card>
            <Dialog open={values.open} onClose={handleClose}>
                <DialogTitle>New Account</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        New account successfully created
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Link to="/signin">
                      <Button color="primary" autoFocus="autoFocus"
                              variant="contained">
                          Sign In
                      </Button>
                    </Link>
                </DialogActions>
            </Dialog>
        </Fragment> 
      )
} 