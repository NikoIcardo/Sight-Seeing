//Niko Icardo 
import React from 'react'; 
import { NavLink } from 'react-router-dom';

import './NavLinks.css';

const NavLinks = props => {
    // note that the exact prop, used in the first Navlink tag below, only marks the link as active and applies the active styling when you are on the exact to= "URL". 
    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/" exact>ALL USERS</NavLink> 
            </li>
            <li>
                <NavLink to="/u1/places">MY PLACES</NavLink>
            </li>
            <li>
                <NavLink to="/places/new">ADD PLACE</NavLink>
            </li>
            <li>
                <NavLink to="/auth">AUTHENTICATE</NavLink>
            </li>
        </ul>
    );
}; 

export default NavLinks;