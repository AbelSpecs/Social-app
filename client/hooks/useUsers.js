import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { findpeoplebyname } from "../services/api-user";
import auth from '../auth/auth-helper';

export default function useUsers() {
    const userData = auth.getData();
    const location = useLocation(); 
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    
    useEffect(async () => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        let isMounted = true;

        const data = await findpeoplebyname({
            params: { name: location.state.name },
            credentials: { divineMole: userData.token },
            signal
        });
        data.error ? setError(data.error) : mounted(data);
        
        function mounted(data) {
            if(isMounted){
                setUsers(data);
            }
        }

        return function cleanup(){
            abortController.abort();
        }
    }, []);

    return { users, error };
}