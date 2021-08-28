//Niko

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const UserPlaces = () => {
  const { isLoading, sendRequest } = useHttpClient();
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const userId = useParams().userId; // allows us to grab dynamic segments of URLs

  useEffect(() => {
    const getUserPlaces = async () => {
      try {
        const userPlaces = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`
        );
        await setLoadedPlaces(userPlaces.places);
      } catch (err) {
        console.log(err.message);
      }
    };
    getUserPlaces();
  }, [sendRequest, userId]);

  const placeDeletedHandler = deletedPlaceId => {
    setLoadedPlaces(
      prevPlaces => prevPlaces.filter( 
        place => place.id !== deletedPlaceId
      )
    );

  }

  return (
    <React.Fragment>
      {isLoading && (
        <div className="center">
          <LoadingSpinner/>
        </div>
      )}
      {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler} />}
    </React.Fragment>
  );
};

export default UserPlaces;
