import { useEffect, useState } from 'react';
import { postList } from '../services/api-post';
import auth from '../auth/auth-helper';

export default function usePostList() {
    const userData = auth.getData();
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        setLoading(true);
    
        postList({
          params: {userId: userData.id},
          credentials: {divineMole: userData.token},
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
    
      },[userData.id]);

    return { post, setPost, loading, setLoading }; 
}