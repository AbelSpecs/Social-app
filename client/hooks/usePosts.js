import { useEffect, useState } from "react";
import { loadPostsByUser } from "../services/api-post";
import auth from '../auth/auth-helper';

export default function usePosts(){
    const userData = auth.getData();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        
        loadPostsByUser({
            params: { userId: userData.id },
            credentials: { divineMole: userData.token },
            signal
        }).then(data => {
            if(data.error){
                console.log(data.error);
            }else{
                checkPosts(data);
            }
        });

        const checkPosts = (data) => {
            console.log(data);
            if(data.length > 0){
                setPosts(data);
            }
        }

        return function cleanup() {
            abortController.abort();
        }

    }, []);

    return { posts, setPosts }
}