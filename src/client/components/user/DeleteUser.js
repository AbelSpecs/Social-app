import React, { useState } from "react";
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import auth from '../../auth/auth-helper';
import { remove } from "../../services/api-user";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router";
import { 
    Button,
    Dialog,
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle, 
    IconButton
} from "@material-ui/core";

export default function DeleteUser({userId}) {
    const userData = auth.getData();
    const navigate = useNavigate();
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
        if(userData.id !== userId){
            navigate('/signin');
        }
        
        remove({
            params: userId,
            credentials: { divineMole: userData.token }
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
            <IconButton aria-label="Delete" onClick={clickButton} >
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