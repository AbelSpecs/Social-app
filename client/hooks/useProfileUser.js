import { useEffect, useState } from "react";
import { read } from "../services/api-user";
import auth from '../auth/auth-helper';

export default function useProfileUser(user){
    const [loading, setLoading] = useState(false);
    const [redirectToSigin, setRedirectToSignin] = useState(false);
    const [following, setFollowing] = useState(false);
    const [users, setUsers] = useState({
        following: [],
        followers: []
    });

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        setLoading(true);
        read({
            params: { userId: user.id },
            credentials: { divineMole: user.token },
            signal
        }).then(data => {
            setLoading(false);
            if(data && data.error)
            {
                setRedirectToSignin(true);
            }
            else
            {
                console.log(data);
                let following = checkFollow(data);
                setUsers(data);
                setFollowing(following);
            }
        });

        return function cleanup() {
            abortController.abort();
        }
    }, []);

    const checkFollow = (user) => {
        const match = user.followers.some((follower) => {
            return follower._id === user.id;
        });
        return match;
    }

    return { users, setUsers, loading, redirectToSigin, following, setFollowing };
}