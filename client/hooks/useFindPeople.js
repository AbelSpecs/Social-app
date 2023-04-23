import { useEffect, useState } from 'react';
import { findpeople } from '../services/api-user';
import auth from '../auth/auth-helper';

export default function useFindPeople() { 
    const userData = auth.getData();
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
        let isMounted = true;
        setLoading(true);
        
        findpeople({
          params: { userId: userData.id},
          credentials: { divineMole: userData.token},
          signal
        }).then((data) => {
          setLoading(false);
          if(data && data.error){
            setValues({...values, error: data.error});
          }
          else{
            mounted(data);
          }
        });
    
        function mounted(data) {
          if(isMounted){
            setValues({...values, users: data});
          }
        }
    
        return function cleanup(){
          isMounted = false;
          abortController.abort();
        }
    
    }, [values.users.length])

    return { values, setValues, loading, setLoading };
}