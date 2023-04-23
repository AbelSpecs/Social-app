import { useEffect, useState } from "react";
import { update } from "../services/api-user";
import auth from '../auth/auth-helper';

export default function useImage(){
    const userData = auth.getData();
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
            params: { userId: userData.id },
            credentials: { divineMole: userData.token },
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