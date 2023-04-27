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
        setLoading(true);
        findpeople({
          params: { userId: userData.id},
          credentials: { divineMole: userData.token},
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
          console.log('me desmonte');
          abortController.abort();
        }
      
    
    }, [values.users.length])

    return { values, setValues, loading, setLoading };
}