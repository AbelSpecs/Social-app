import { useEffect, useState } from 'react';
import { postList } from '../components/post/api-post';
import jwt from '../auth/auth-user';

export default function usePostList() {
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        setLoading(true);
    
        postList({
          params: {userId: jwt.id},
          credentials: {divineMole: jwt.token},
          signal
        }).then(data => {
          setLoading(false);
          if(data.error){
            console.log(data.error);
          }else{       
            setPost([...post, data]);
          }
        });
    
        return function cleanup() {
          abortController.abort(); 
        }
    
      },[jwt.id]);

    return { post, setPost, loading, setLoading }; 
}