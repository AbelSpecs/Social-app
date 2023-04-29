import { useEffect, useRef, useState } from "react";
import { read } from "../services/api-user";
import { useParams } from "react-router";

export default function useUserPeople(userData){
    const id = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [redirectToSigin, setRedirectToSignin] = useState(false);
    const [following, setFollowing] = useState(false);
    const [userPeople, setUserPeople] = useState({
        following: [],
        followers: []
    });

    useEffect(() => {
        if(!id.userId){
            id.userId = userData.id;
        }

        const abortController = new AbortController();
        const signal = abortController.signal;
        setLoading(true);
        read({
            params: { userId: id.userId },
            credentials: { divineMole: userData.token },
            signal
        }).then(data => {
            setLoading(false);
            if(data && data.error)
            {
                console.log(data.error);
                setRedirectToSignin(true);
            }
            else
            {
                checkData(data);
            }
        });
    
        return function cleanup() {
            abortController.abort();
        }

    }, [id.userId]);

    const checkData = (data) => {
        if(data){
            let following = checkFollow(data);
            setUserPeople(data);
            setFollowing(following);
        }
    }

    const checkFollow = (user) => {
        const match = user.followers.some((follower) => {
            return follower._id === user.id;
        });
        return match;
    }

    return { userPeople, loading, error, setUserPeople, redirectToSigin, following, setFollowing }
}


