import { useEffect, useState } from 'react';
import auth from '../auth/auth-helper';

export default function useEdit() {
    const userData = auth.getData();
    const [values, setValues] = useState({
        id: '',
        name: '',
        about: '',
        email: '',
        password: '',
        error: ''
    });

    useEffect(() => {
        const abortController = new AbortController();

        if(userData){
            setValues({...values, id: userData.id, name: userData.name, email: userData.email, about: userData.about});
        }

        return function cleanup() {
            abortController.abort();
        } 
        
    }, [userData.id]);

    return { values, setValues };
}