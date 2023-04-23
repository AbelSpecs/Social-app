import { useEffect, useState } from "react";
import { read } from "../services/api-user";
import auth from '../auth/auth-helper';

export default function useUser(){
    const userData = auth.getData();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [user, setUser] = useState({
        following: [],
        followers: []
    });

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        let isMounted = true;
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
                setError(data.error);
            }
            else
            {
                mounted(data);
            }
        });

        function mounted(data) {
            if(isMounted){
                setUser(data);
            }
        }
    
        return function cleanup() {
            isMounted = false;
            abortController.abort();
        }

    }, [userData.id]);

    return { user, loading, error }
}


