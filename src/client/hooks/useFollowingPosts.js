import { useEffect, useState } from 'react';
import { postList } from '../services/api-post';
import auth from '../auth/auth-helper';

export default function usePostHome() {
    // const [postsHome, setPostsHome] = useState([]);
    // const [postHomeLoading, setPostHomeLoading] = useState(false);
    // const [transition, setTransition] = useState(false);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        // setPostHomeLoading(true);
    
        postList({
          params: {userId: user.id},
          credentials: {divineMole: user.token},
          signal
        }).then(data => {
          console.log(data);
          setPostHomeLoading(false);
          if(data && data.error){
            console.log(data.error);
          }else{   
            setTransition(true);
            setPostsHome(data);
          }
        });
    
        return function cleanup() {
          abortController.abort(); 
        }

      },[]);

    return { postsHome, setPostsHome, postHomeLoading, setPostHomeLoading, transition }; 
}