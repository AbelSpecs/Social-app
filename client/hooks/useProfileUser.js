import { useEffect, useState } from "react";
import { read } from "../services/api-user";
import auth from '../auth/auth-helper';

export default function useProfileUser(){
    const userData = auth.getData();
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
            params: { userId: userData.id },
            credentials: { divineMole: userData.token },
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
            return follower._id === userData.id;
        });
        return match;
    }

    return { user, setUser, loading, redirectToSigin, following, setFollowing };
}