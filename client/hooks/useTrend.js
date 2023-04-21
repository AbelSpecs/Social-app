import { useEffect, useState } from 'react';
import { trendList } from '../services/api-post';
import jwt from '../auth/auth-user';

export default function Trend() {
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({ 
        trends: []
    });

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        let isMounted = true;
        setLoading(true);
        
        trendList({
          params: { userId: jwt.id},
          credentials: { divineMole: jwt.token},
          signal
        }).then((data) => {
          setLoading(false);
          if(data && data.error){
            console.log(data.error);
          }
          else{
            mounted(data);
          }
        });
    
        function mounted(data) {
          if(isMounted){
            setValues({...values, trends: data});
          }
        }
    
        return function cleanup(){
          isMounted = false
          abortController.abort();
        }
    
      }, [values.trends.length]);

    return { values, setValues, loading, setLoading };
}