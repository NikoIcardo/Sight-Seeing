//Niko Icardo
import React, { useEffect, useState } from 'react';

import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { useHttpClient } from '../../shared/hooks/http-hook';

const Users = () => {
  const [loadedUsers, setLoadedUsers] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/users'); // GET request by default and has no body because we are not sending any data.
        await setLoadedUsers(response.users);
      } catch (err) {}
    };

    getUsers();

    /* Passing useEffect an async function is not in line with what useEffect
     expects. It does not expect a function with a promise. Instead, create 
     another function that is async within the passed function. */
  }, [sendRequest]); //leaving the second argument empty causes the useEffect hook to only run once.

  return (<React.Fragment>
    <ErrorModal error={error} onClear={clearError} />
    {isLoading && <div className="center">
       <LoadingSpinner />
    </div>}
    {!isLoading && loadedUsers && <UsersList items={loadedUsers} />} 
  </React.Fragment>);
};

export default Users;
