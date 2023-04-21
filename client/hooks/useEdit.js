import { useEffect, useState } from 'react';
import { read } from '../services/api-user';
import jwt from '../auth/auth-user';

export default function useEdit() {
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

        if(jwt){
            setValues({...values, id: jwt.id, name: jwt.name, email: jwt.email, about: jwt.about});
        }

        return function cleanup() {
            abortController.abort();
        } 
        
    }, [jwt.id]);

    return { values, setValues };
}