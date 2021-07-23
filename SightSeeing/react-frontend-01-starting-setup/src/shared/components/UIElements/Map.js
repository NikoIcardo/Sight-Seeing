/*Niko Icardo 
7/11/21*/
import React, { useRef, useEffect } from "react"; // useRef creates references and pointers and real dom nodes, create variables which survice rerender cycles
//use effect allows you to define a function to occur each time a dependency changes. For instance, any time our effect defined below will run any time the zoom or center props are re-evaluated.

import "./Map.css";

const Map = props => {
  const mapRef = useRef();

  const { center, zoom } = props;

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom
    });

    new window.google.maps.Marker({ position: center, map: map });
  }, [center, zoom]);

  //Create a Map object which includes a reference to a DOM location to place the map.

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
};

export default Map;
