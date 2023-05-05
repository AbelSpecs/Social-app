import { useEffect, useRef, useState } from "react";
import { readComplete } from "../services/api-user";
import auth from '../auth/auth-helper';

export default function useUser(id, flag, userData){
    const [userPorfileDataLoading, setUserProfileDataLoading] = useState(false);
    const [error, setError] = useState('');
    const [userProfileData, setUserProfileData] = useState({
        id: '', 
        name: '', 
        email: '', 
        about: '', 
        background: '', 
        photo: '', 
        created: ''
    });


    useEffect(() => {
        if(flag){
            setUserProfileData(userData);
            return { userProfileData };
        }

        const abortController = new AbortController();
        const signal = abortController.signal;
        
        setUserProfileDataLoading(true);
        readComplete({
            params: { userId: id.userId },
            credentials: { divineMole: userData.token },
            signal
        }).then(data => {
            setUserProfileDataLoading(false);
            if(data && data.error)
            {
                console.log(data.error);
            }
            else
            {
                
                setUserProfileData({...userProfileData, id: data._id, name: data.name, email: data.email, about: data.about, 
                            background: data.background, photo: data.photo, created: data.created});
            }
        });
    
        return function cleanup() {
            abortController.abort();
        }

    }, [id.userId, userData.about, userData.name, userData.email]);

    return { userProfileData, userPorfileDataLoading, error, setUserProfileData }
}


