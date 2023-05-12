import { useEffect, useState, useRef } from 'react';
import { listfollowers } from '../services/api-user';
import auth from '../auth/auth-helper';

export default function useFollowers(user) { 
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({ 
        users: [],
        error: '',
        open: false,
        message: ''
      });

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        setLoading(true);
    
        listfollowers({
          params: { userId: user.id},
          credentials: { divineMole: user.token},
          signal
        }).then((data) => {
          setLoading(false);
          if(data && data.error){
            console.log(data.error);
          }
          else{
            setValues({...values, users: data});
          }
        });
    
        return function cleanup(){
          abortController.abort();
        }
    
    }, [values.users.length])

    return { values, setValues, loading, setLoading };
}