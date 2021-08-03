//Niko
import React from 'react'; 
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList'; 


const DUMMY_PLACES = [
    {
        id: 'p1', 
        title: 'Empire State Building', 
        description: 'One of the most famous skyscrapers in the world.', 
        imageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg', 
        address: '20 W 34th St, New York, NY 10001', 
        location: {
            lat: 40.784405, 
            lng: -73.9878584
        },
        creator: 'u1'
    },
    {
        id: 'p2', 
        title: 'Emp. State Building', 
        description: 'One of the most famous skyscrapers in the world.', 
        imageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/250px-Empire_State_Building_%28aerial_view%29.jpg', 
        address: '20 W 34th St, New York, NY 10001', 
        location: {
            lat: 40.784405, 
            lng: -73.9878584
        },
        creator: 'u2'
    }
]; 

const UserPlaces = () => {
    const userId = useParams().userId; // allows us to grab dynamic segments of URLs
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);
    return <PlaceList items={loadedPlaces}/>; 
}

export default UserPlaces; 