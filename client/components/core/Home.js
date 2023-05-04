import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import FindPeople from "../user/FindPeople";
import NewsFeed from "../post/NewsFeed";
import ProfileCard from "../user/ProfileCard";
import Followers from "../user/Followers";
import Trends from "../post/Trends";
import SearchBar from "./SearchBar";
import { Fragment } from "react";
import { useContext } from "react";
import { ModeContext }  from "./Mode";
import auth from '../../auth/auth-helper';
import useUserPeople from '../../hooks/useUserPeople';
import usePostHome from "../../hooks/usePostHome";
import useFindPeople from "../../hooks/useFindPeople";

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto'
    },
    title: {
        padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
        color: theme.palette.openTitle
    },
    media: {
        minHeight: 400,
        backgroundSize: "contain"
    },
    grid: {
        justifyContent: 'center',
        position: 'relative',
        background: theme.palette.background.default,
        minHeight: 'inherit',
        marginTop: 1,
    },
    gridChildLeft: {
        height: 'max-content',
        position: 'sticky',
        top: 1,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    gridChildRight: {
        height: 'max-content',
        position: 'sticky',
        top: 1
    }
}));
    
export default function Home () {
    const classes = useStyles();
    const mode = useContext(ModeContext);
    const userData = auth.getData();
    const { userPeople, setUserPeople, following, setFollowing } = useUserPeople(userData);
    const { postsHome, setPostsHome, postHomeLoading, transition } = usePostHome(userData);
    const { findPeople, setFindPeople, findPeopleLoading } = useFindPeople(userData);
    
    return ( 
        <Fragment>
            <Grid container justifyContent="flex-end" spacing={5} className={classes.grid}>
                
                <Grid item xs={12} sm={12} md={3} className={classes.gridChildLeft}>
                    <ProfileCard user={userData} followers={userPeople.followers} following={userPeople.following}/>
                    <Followers user={userData}/>
                </Grid>
                
                <Grid item xs={12} sm={12} md={5} className={classes.gridChild}>
                    <NewsFeed user={userData} postsHome={postsHome} 
                              setPostsHome={setPostsHome} postHomeLoading={postHomeLoading} 
                              transition={transition}/>
                </Grid>
                
                <Grid item xs={12} sm={12} md={3} className={classes.gridChildRight}>
                    <SearchBar user={userData}/>
                    <Trends user={userData}/>
                    <FindPeople user={userData} userPeople={userPeople} 
                                setUserPeople={setUserPeople} findPeople={findPeople} 
                                findPeopleLoading={findPeopleLoading} setFindPeople={setFindPeople} 
                                following={following} setFollowing={setFollowing}
                    />
                </Grid>
                
            </Grid>
        </Fragment>
    )
}