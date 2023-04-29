import { useEffect, useState } from "react";
import { loadPostsByUser } from "../services/api-post";
import { useParams } from "react-router";

export default function usePosts(user){
    const id = useParams();
    const [posts, setPosts] = useState([]);
    const [loadingPosts, setLoadingPosts] = useState(false);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        setLoadingPosts(true);
        loadPostsByUser({
            params: { userId: id.userId },
            credentials: { divineMole: user.token },
            signal
        }).then(data => {
            setLoadingPosts(false);
            if(data && data.error){
                console.log(data.error);
            }else{
                setPosts(data);
            }
        });

        return function cleanup() {
            abortController.abort();
        }

    }, [id.userId]);

    return { posts, setPosts, loadingPosts }
}