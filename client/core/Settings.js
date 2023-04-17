import React from 'react';
import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { 
  Menu,
  MenuItem
} from '@material-ui/core';


export default function Settings(props) {
  return (
    <Fragment>
      <Menu className={props.styles}
        id="simple-menu"
        anchorEl={props.open}
        keepMounted
        open={Boolean(props.open)}
        onClose={props.handleClose}
      >
        <MenuItem onClick={props.clear} >Sign Out</MenuItem>
      </Menu>
    </Fragment>
  )
  
}

Settings.propTypes = {};

Settings.defaultProps = {};
