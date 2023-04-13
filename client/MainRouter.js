import React from "react";
import { Route, Routes } from 'react-router-dom';
//import Home from './core/Home';
// import Profile from "./user/Profile";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
// import Users from './user/Users';
import EditProfile from "./user/EditProfile";
import Menu from "./core/Menu";
import CircularProgress from '@material-ui/core/CircularProgress';

const Home = React.lazy(() => import('./core/Home'));
const Profile = React.lazy(() => import('./user/Profile'));
const Users = React.lazy(() => import('./user/Users'));

const MainRouter = () => {
    return (<div>
            <Menu/>
            <Routes>
                <Route index path="/" element={<React.Suspense fallback={<CircularProgress />}><Home/></React.Suspense>}/>
                <Route path="/users" element={<React.Suspense fallback={<CircularProgress />}><Users/></React.Suspense>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/signin" element={<Signin/>}/>
                <Route path="/user/:userId" element={<React.Suspense fallback={<CircularProgress />}><Profile/></React.Suspense>}/>
                <Route path="/user/:userId/edit" element={<EditProfile/>}/>
                
            </Routes>
        </div>)
}

export default MainRouter;