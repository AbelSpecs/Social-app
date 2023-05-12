import { useEffect, useState } from 'react';
import { findpeople } from '../services/api-user';
import auth from '../auth/auth-helper';

export default function useFindPeople(user) { 
    const [findPeopleLoading, setFindPeopleLoading] = useState(false);
    const [findPeople, setFindPeople] = useState({ 
        users: [],
        error: '',
        open: false,
        message: ''
    });

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        setFindPeopleLoading(true);
        findpeople({
          params: { userId: user.id},
          credentials: { divineMole: user.token},
          signal
        }).then((data) => {
          setFindPeopleLoading(false);
          if(data && data.error){
            console.log(data.error);
          }
          else{
            setFindPeople({users: data});
          }
        });
        
        return function cleanup(){
          abortController.abort();
        }
      
    
    }, [findPeople.users.length])

    return { findPeople, setFindPeople, findPeopleLoading, setFindPeopleLoading };
}