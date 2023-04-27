import { useEffect, useState } from 'react';
import { findpeople } from '../services/api-user';
import auth from '../auth/auth-helper';

export default function useFindPeople(user) { 
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
        findpeople({
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