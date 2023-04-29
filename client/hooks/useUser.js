import { useEffect, useRef, useState } from "react";
import { readComplete } from "../services/api-user";
import auth from '../auth/auth-helper';

export default function useUserPeople(id, flag, userData){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [userView, setUserView] = useState({id: '', name: '', email: '', about: '', background: '', photo: '', created: ''});


    useEffect(() => {
        if(flag){
            setUserView(userData);
            return { userView };
        }

        const abortController = new AbortController();
        const signal = abortController.signal;
        
        setLoading(true);
        readComplete({
            params: { userId: id.userId },
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
                
                setUserView({...userView, id: data._id, name: data.name, email: data.email, about: data.about, 
                            background: data.background, photo: data.photo, created: data.created});
            }
        });
    
        return function cleanup() {
            abortController.abort();
        }

    }, [id.userId]);

    return { userView, loading, error, setUserView }
}


