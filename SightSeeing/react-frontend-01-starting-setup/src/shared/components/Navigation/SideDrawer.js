import React from 'react'; 
import ReactDom from 'react-dom';
import { CSSTransition } from 'react-transition-group'; 
/* react-transition-group is used for the CSSTransition JSX below.
 What it does is create a transition animation using predefined classes (slide-in-left classes) that
 are referenced in the index.css file. the mount properties add and remove the sidedrawer from the DOM when transitioning.   */
import './SideDrawer.css'; 


const SideDrawer = props => {
    const content = (    
        <CSSTransition 
            in={props.show}
            timeout={200} 
            classNames="slide-in-left" 
            mountOnEnter 
            unmountOnExit
        > 
            <aside className="side-drawer" onClick={props.onClick}>{props.children}</aside>
        </CSSTransition>
    );

    return ReactDom.createPortal(content, document.getElementById('drawer-hook')); // portals allow you to render content in non-default locations
};

export default SideDrawer; 