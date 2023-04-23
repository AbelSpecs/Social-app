import React from "react";
import { Route, Routes } from 'react-router-dom';
import Signin from "./components/user/Signin";
import Signup from "./components/user/Signup";
import AuthDeck from "./components/design/authDeck";
import CircularProgress from '@material-ui/core/CircularProgress';
import PrivateRoute from "./auth/PrivateRoute";
import SignDock from "./components/user/SignDock";
// import ProfileDock from "./user/ProfileDock";

const Home = React.lazy(() => import('./components/core/Home'));
const ProfileDock = React.lazy(() => import('./components/user/ProfileDock'));
const Users = React.lazy(() => import('./components/user/Users'));

const MainRouter = () => {
    return (<div>
            <Routes>
                <Route path="/signin" element={<SignDock/>}/>
                {/*<Route path="/signup" element={<Signup/>}/>*/}
                <Route path="/" element={<React.Suspense fallback={<CircularProgress />}><PrivateRoute><Home/></PrivateRoute></React.Suspense>}/>
                <Route path="/users" element={<React.Suspense fallback={<CircularProgress />}><PrivateRoute><Users/></PrivateRoute></React.Suspense>}/>
                <Route path="/user/:userId" element={<React.Suspense fallback={<CircularProgress />}><PrivateRoute><ProfileDock/></PrivateRoute></React.Suspense>}/>
                {/*<Route path="/auth" element={<AuthDeck/>}/>*/}
                
            </Routes>
        </div>)
}

export default MainRouter;