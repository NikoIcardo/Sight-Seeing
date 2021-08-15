// Niko Icardo 8/15/21

import { useState, useCallback, useRef, useEffect } from 'react';


export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(); 

  const activeHttpRequests = useRef([]); 

  const sendRequest = useCallback( async (url, method = 'GET', body =  null, headers = {}) => {
    try {
      setIsLoading(true); 
      const httpAbortCtrl = new AbortController(); 
      activeHttpRequests.current.push(AbortController);

      const response = await fetch(url, {
        method, 
        body, 
        headers, 
        signal: httpAbortCtrl.signal
      });
  
      
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      
      const responseData = response.json();
      return responseData;
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []); 


  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach(abortCtrl.abort());
    }
  }, []);

  return { isLoading, error, sendRequest, clearError }
};