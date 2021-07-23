//Niko Icardo 
import React from 'react'; 

import UsersList from '../components/UsersList';
const Users = () => {
    const USERS = [
        {
            id: 'u1', 
            name: 'Niko Icardo', 
            image: 
                "https://venngage-wordpress.s3.amazonaws.com/uploads/2018/09/Colorful-Geometric-Simple-Background-Image.jpg", 
            places: '3'
        }
    ]; 


    return <UsersList items={USERS}/>;
}; 

export default Users; 