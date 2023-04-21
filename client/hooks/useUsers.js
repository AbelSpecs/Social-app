import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { findpeoplebyname } from "../services/api-user";
import jwt from "../auth/auth-user";

export default function useUsers() {
    const location = useLocation(); 
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    
    useEffect(async () => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        const data = await findpeoplebyname({
            params: { name: location.state.name },
            credentials: { divineMole: jwt.token },
            signal
        });
        data.error ? setError(data.error) : setUsers(data);
        
        return function cleanup(){
            abortController.abort();
        }
    }, []);

    return { users, error };
}