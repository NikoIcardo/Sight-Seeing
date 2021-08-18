// Niko Icardo 8/15/21

import { useState, useCallback, useRef, useEffect } from 'react';


export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(); 

  const activeHttpRequests = useRef([]); 

  const sendRequest = useCallback( 
    async (url, method = 'GET', body =  null, headers = {}) => {
    try {
      setIsLoading(true); 
      const httpAbortCtrl = new AbortController(); 
      activeHttpRequests.current.push(httpAbortCtrl);

      const response = await fetch(url, {
        method, 
        body, 
        headers, 
        signal: httpAbortCtrl.signal
      });
  
      console.log('here');

      const responseData = await response.json();

      console.log('here1');

      activeHttpRequests.current = activeHttpRequests.current.filter(
        reqCtrl => reqCtrl !== httpAbortCtrl
      );

      console.log('here2');

      if (!response.ok) {
        throw new Error(responseData.message);
      }
      
      console.log('here3');

      setIsLoading(false);
      console.log('here4');

      if(method === 'DELETE'){
        console.log('delete');
      }
      
      return responseData;
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      throw err; 
    }
  }, []); 


  const clearError = () => {
    setError(null);
  };

  //executes on dismount and aborts request 
  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
    }
  }, []);

  return { isLoading, error, sendRequest, clearError };
};