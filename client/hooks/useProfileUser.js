import { useEffect, useState } from "react";
import { read } from "../components/user/api-user";
import jwt from '../auth/auth-user';

export default function useProfileUser(){
    const [loading, setLoading] = useState(false);
    const [redirectToSigin, setRedirectToSignin] = useState(false);
    const [following, setFollowing] = useState(false);
    const [user, setUser] = useState({
        following: [],
        followers: []
    });

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        setLoading(true);
        read({
            params: { userId: jwt.id },
            credentials: { divineMole: jwt.token },
            signal
        }).then(data => {
            setLoading(false);
            if(data && data.error)
            {
                setRedirectToSignin(true);
            }
            else
            {
                let following = checkFollow(data);
                setUser(data);
                setFollowing(following);
            }
        });
    
        return function cleanup() {
            abortController.abort();
        }
    }, []);

    const checkFollow = (user) => {
        const match = user.followers.some((follower) => {
            return follower._id === jwt.id;
        });
        return match;
    }

    return { user, setUser, loading, redirectToSigin, following, setFollowing };
}