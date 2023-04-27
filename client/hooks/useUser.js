import { useEffect, useRef, useState } from "react";
import { read } from "../services/api-user";
import auth from '../auth/auth-helper';

export default function useUser(userData){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [user, setUser] = useState({
        following: [],
        followers: []
    });

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        setLoading(true);
        read({
            params: { userId: userData.id },
            credentials: { divineMole: userData.token },
            signal
        }).then(data => {
            setLoading(false);
            if(data && data.error)
            {
                console.log(data.error);
            }
            else
            {
                setUser(data);
            }
        });
    
        return function cleanup() {
            abortController.abort();
        }

    }, []);

    return { user, loading, error }
}


