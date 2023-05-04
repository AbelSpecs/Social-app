import { useEffect, useRef, useState } from "react";
import { read } from "../services/api-user";
import { useParams } from "react-router";

export default function useUserPeople(userData){
    const id = useParams();
    const [userPeopleLoading, setUserPeopleLoading] = useState(false);
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
        setUserPeopleLoading(true);
        read({
            params: { userId: id.userId },
            credentials: { divineMole: userData.token },
            signal
        }).then(data => {
            setUserPeopleLoading(false);
            if(data && data.error)
            {
                console.log(data.error);
                setRedirectToSignin(true);
            }
            else
            {
                console.log(data);
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
            return follower._id === userData.id;
        });
        return match;
    }

    return { userPeople, userPeopleLoading, error, setUserPeople, redirectToSigin, following, setFollowing }
}


