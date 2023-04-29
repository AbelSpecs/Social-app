import { useEffect, useState } from "react";
import { update } from "../services/api-user";
import auth from '../auth/auth-helper';

export default function useImage(user){
    const [values, setValues] = useState({
        photo: '',
        background: ''
    });

    useEffect(() => {
        const abortController = new AbortController();
        let imageData = new FormData();

        values.photo && imageData.append('photo', values.photo);
        values.background && imageData.append('background', values.background);
        
        update({
            params: { userId: user.id },
            credentials: { divineMole: user.token },
            user: imageData
        }).then(data => {
            if(data && data.error)
                console.log(data.error);
            else{
                setValues({...values});
            }
        });

        return function cleanup() {
            abortController.abort();
        }

    }, [values.photo, values.background]);

    return { values, setValues }
}