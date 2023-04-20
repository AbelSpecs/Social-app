import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { findpeoplebyname } from "../components/user/api-user";
import auth from '../auth/auth-helper';

export default function useUsers() {
    const jwt = auth.isAuthenticated();
    const location = useLocation(); 
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    
    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        findpeoplebyname({
            params: { name: location.state.name },
            credentials: { divineMole: jwt.token },
            signal
        }).then(data => {
            if(data && data.error)
            {
                console.log(data.error);
                setError(data.error);
            }
            else
            {
                setUsers(data);
            }
        });

        return function cleanup(){
            abortController.abort();
        }
    }, []);

    return { users, error };
}