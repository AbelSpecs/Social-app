import { useEffect, useRef, useState } from 'react';
import { postList } from '../services/api-post';
import auth from '../auth/auth-helper';

export default function usePostHome(user, following) {
    const [postsHome, setPostsHome] = useState([]);
    const [postHomeLoading, setPostHomeLoading] = useState(false);
    const [transition, setTransition] = useState(false);
    const firstRender = useRef(true);

    useEffect(() => {
        if(firstRender.current){
          firstRender.current = false;
          return;
        }

        const abortController = new AbortController();
        const signal = abortController.signal;
        setPostHomeLoading(true);
    
        postList({
          params: {userId: user.id},
          credentials: {divineMole: user.token},
          signal
        }).then(data => {
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

      },[following.length]);

    return { postsHome, setPostsHome, postHomeLoading, setPostHomeLoading, transition }; 
}