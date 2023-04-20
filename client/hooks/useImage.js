import { useEffect, useState } from "react";
import { update } from "../components/user/api-user";
import jwt from '../auth/auth-user';

export default function useImage(){
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
            params: { userId: jwt.id },
            credentials: { divineMole: jwt.token },
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