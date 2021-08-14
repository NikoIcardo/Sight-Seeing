//Niko Icardo
import React, { useEffect, useState } from 'react';

import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

const Users = () => {
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedUsers, setLoadedUsers] = useState([]);

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/users'); // GET request by default and has no body because we are not sending any data.

        const responseData = await response.json();
        console.log(responseData.users);
        setLoadedUsers(responseData.users);

        if (!responseData.ok) {
          throw new Error(responseData.message);
        }
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    };
    sendRequest();

    /* Passing useEffect an async function is not in line with what useEffect
     expects. It does not expect a function with a promise. Instead, create 
     another function that is async within the passed function. */
  }, []); //leaving the second argument empty causes the useEffect hook to only run once.

  const errorHandler = () => {
    setError(null);
  };


  return (<React.Fragment>
    <ErrorModal error={error} onClear={errorHandler} />
    {loading && <div className="center">
       <LoadingSpinner />
    </div>}
    {!loading && loadedUsers && <UsersList items={loadedUsers} />} 
  </React.Fragment>);
};

export default Users;
