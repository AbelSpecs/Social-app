import React from "react";
import { Route, Routes } from 'react-router-dom';
import Home from './core/Home';
import Profile from "./user/Profile";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import Users from './user/Users';
import EditProfile from "./user/EditProfile";
import Menu from "./core/Menu";

const MainRouter = () => {
    return (<div>
            <Menu/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/users" element={<Users/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/signin" element={<Signin/>}/>
                <Route path="/user/:userId" element={<Profile/>}/>
                <Route path="/user/:userId/edit" element={<EditProfile/>}/>
               
            </Routes>
        </div>)
}

export default MainRouter;