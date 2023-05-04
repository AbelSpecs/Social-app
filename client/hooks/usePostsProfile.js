import { useEffect, useState } from "react";
import { loadPostsByUser } from "../services/api-post";
import { useParams } from "react-router";

export default function usePostsProfile(id, user){
    const [postsProfile, setPostsProfile] = useState([]);
    const [loadingPostsProfile, setLoadingPostsProfile] = useState(false);
    const [ transition, setTransition ] = useState(false);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        setLoadingPostsProfile(true);
        loadPostsByUser({
            params: { userId: id.userId },
            credentials: { divineMole: user.token },
            signal
        }).then(data => {
            setLoadingPostsProfile(false);
            if(data && data.error){
                console.log(data.error);
            }else{
                data && data.length > 0 ? setTransition(true) : setTransition(false);
                setPostsProfile(data);
            }
        });

        return function cleanup() {
            abortController.abort();
        }

    }, [id.userId]);

    return { postsProfile, setPostsProfile, loadingPostsProfile, transition }
}