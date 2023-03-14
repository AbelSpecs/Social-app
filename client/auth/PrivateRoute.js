import React, { Component } from 'react';
import { Route, redirect, Outlet } from 'react-router-dom';
import auth from './auth-helper';

const PrivateRoute = ({component: Component}) => (
    <Route render={props => (
        auth.isAuthenticated() ? (
            <Outlet {...props}/>
        ) : (
            redirect("/signin")
            // <Redirect to={{
            //     pathname: '/signin',
            //     state: { from: props.location }
            // }}/>
        )

    )}/>
)

export default PrivateRoute;