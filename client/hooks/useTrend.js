import { useEffect, useState } from 'react';
import { trendList } from '../services/api-post';
import auth from '../auth/auth-helper';

export default function useTrend(user) {
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({ 
        trends: []
    });

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        setLoading(true);
        
        trendList({
          params: { userId: user.id},
          credentials: { divineMole: user.token},
          signal
        }).then((data) => {
          setLoading(false);
          if(data && data.error){
            console.log(data.error);
          }
          else{
            setValues({...values, trends: data});
          }
        });
    
        return function cleanup(){
          abortController.abort();
        }
    
      }, [values.trends.length]);

    return { values, setValues, loading, setLoading };
}