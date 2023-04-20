import { 
    Button,
    Dialog,
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle, 
    IconButton
} from "@material-ui/core";
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import { useState } from "react";
import auth from '../../auth/auth-helper';
import { remove } from "./api-user";
import PropTypes from 'prop-types';
import React from "react";

export default function DeleteUser({userId}) {
    const [values, setValues] = useState({
        open: false,
        redirect: false
    });

    const clickButton = () => {
        setValues({...values, open: true});
    }

    const handleClose = () =>{
        setValues({...values, open: false});
    }

    const confirmDelete = () =>{
        const jwt = auth.isAuthenticated();
        
        remove({
            params: userId,
            credentials: { divineMole: jwt.token }
        }).then(data => {
            if(data && data.error) 
                console.log(data.error);
            else{
                auth.clearJWT(() => console.log('deleted'));
                setValues({...values, redirect: true});
            }
        })
    }

    return (
        <span>
            <IconButton aria-label="Delete" onClick={clickButton} color="secondary">
                <DeleteOutlineOutlinedIcon/>
            </IconButton>

            <Dialog open={values.open} onClose={handleClose}>
                <DialogTitle>{"Delete Account"}</DialogTitle>
            <DialogContent>
                <DialogContentText>Confirm to delete your account</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Cancel</Button>
                <Button onClick={confirmDelete} color="secondary" autoFocus="autoFocus">Confirm</Button>
            </DialogActions>
            </Dialog>
        </span>
    )
}
DeleteUser.propTypes = {
    userId: PropTypes.string.isRequired
}