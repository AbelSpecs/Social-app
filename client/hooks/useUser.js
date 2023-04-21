import { useEffect, useState } from "react";
import { read } from "../services/api-user";
import jwt from "../auth/auth-user";

export default function useUser(){
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
            params: { userId: jwt.id },
            credentials: { divineMole: jwt.token },
            signal
        }).then(data => {
            setLoading(false);
            if(data && data.error)
            {
                console.log(data.error);
                setError(data.error);
            }
            else
            {
                setUser(data);
            }
        });
    
        return function cleanup() {
            abortController.abort();
        }

    }, [jwt.id]);

    return { user, loading, error }
}


