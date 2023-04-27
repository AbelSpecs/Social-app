import { useEffect, useState } from 'react';
import { postList } from '../services/api-post';
import auth from '../auth/auth-helper';

export default function usePostList(user) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        setLoading(true);
    
        postList({
          params: {userId: user.id},
          credentials: {divineMole: user.token},
          signal
        }).then(data => {
          setLoading(false);
          if(data.error){
            console.log(data.error);
          }else{      
            setPosts(data);
          }
        });
    
        return function cleanup() {
          abortController.abort(); 
        }

      },[]);

    return { posts, setPosts, loading, setLoading }; 
}