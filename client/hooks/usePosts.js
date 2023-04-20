import { useEffect, useState } from "react";
import { loadPostsByUser } from "../components/post/api-post";
import jwt from '../auth/auth-user';

export default function usePosts(){
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        
        loadPostsByUser({
            params: { userId: jwt.id },
            credentials: { divineMole: jwt.token },
            signal
        }).then(data => {
            if(data.error){
                console.log(data.error);
            }else{
                checkPosts(data);
            }
        });

        const checkPosts = (data) => {
            if(data.length > 0){
                setPosts([...posts, data]);
            }
        }

        return function cleanup() {
            abortController.abort();
        }

    }, []);

    return { posts, setPosts }
}