import React from 'react';
import PropTypes from 'prop-types';
import { Fragment } from 'react';
import useAuth from '../../hooks/useAuth';
import { 
  Menu,
  MenuItem
} from '@material-ui/core';


export default function Settings(props) {
  const { logout } = useAuth();

  const handleSignOut = () => {
    logout();
    props.clear();
  }

  return (
    <Fragment>
      <Menu className={props.styles}
        id="simple-menu"
        anchorEl={props.open}
        keepMounted
        open={Boolean(props.open)}
        onClose={props.handleClose}
      >
        <MenuItem onClick={handleSignOut} >Sign Out</MenuItem>
      </Menu>
    </Fragment>
  )
  
}

Settings.propTypes = {};

Settings.defaultProps = {};
