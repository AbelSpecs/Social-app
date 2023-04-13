import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Paper, TextField } from "@material-ui/core";
import { Fragment } from "react";
import { findpeoplebyname } from "../user/api-user";
import { useState } from "react";
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import auth from "../auth/auth-helper";

const useStyles = makeStyles(() => ({
  paper: {
      padding: '1px 1px',
      display: 'flex',
      alignItems: 'center',
      width: 200,
      height: 35,
      marginLeft: 'auto',
      boxShadow: 'none',
      borderRadius: '20px'
  },
  autocomplete: {
      display: 'flex',
      width: '100%'
  },
  input: {
      color: '#00000',
      flexDirection: 'unset'
  },
  iconButton: {
      padding: 10,
  },
}));

export default function SearchBar() {
  const classes = useStyles();
  const jwt = auth.isAuthenticated();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const fetchPeople = (event) => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    if(event.target.value.length === 0){
        return;
    }

    findpeoplebyname({
        params: { name: event.target.value },
        credentials: { divineMole: jwt.token },
        signal
    }).then(data => {
        if(data && data.error)
        {
            console.log(data.error);
        }
        else
        {
            setUsers(data);
        }
    });
  }

  const navigateprofile = (event, value) => {
    let user = users.find(element => element.name === value);
    user && navigate(`/user/${user._id}`);
  }

  const navigateusers = (event) => {
    if(event.keyCode === 13 || event.type === 'click'){
      navigate('/users', {state: {name: event.target.value}});
    }
  }

  return (
    <Paper className={classes.paper}>
        <Autocomplete className={classes.autocomplete}
            freeSolo
            id="free-solo-search"
            disableClearable
            onChange={navigateprofile}
            options={users?.map((element) => element.name)}
            renderInput={(params) => (
                <Fragment>
                    <IconButton className={classes.iconButton} aria-label="search" onClick={navigateusers}>
                        <SearchIcon />
                    </IconButton>
                    <TextField
                        {...params}
                        className={classes.input}
                        placeholder="Search..."
                        onChange={fetchPeople}
                        onKeyDown={navigateusers}
                        InputProps={{ ...params.InputProps, type: 'search', disableUnderline: true }}
                    />
                </Fragment>
            )}
        />
    </Paper>
  )
}

SearchBar.propTypes = {};

SearchBar.defaultProps = {};

