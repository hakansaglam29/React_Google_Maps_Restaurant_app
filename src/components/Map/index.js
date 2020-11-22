import React, { useState, useEffect} from "react";
import {GoogleMap, withScriptjs, withGoogleMap, Marker,} from "react-google-maps";
import axios from'axios';
import mapStyle from './mapStyle'

function Map() {
  const [RestaurantData, setRestaurantData] = useState(null)
  // const [selectedPark, setSelectedPark] = useState(null)


  useEffect(() => {
    axios.get('http://opentable.herokuapp.com/api/restaurants', {params: {
      state:"IL",
    }})
      .then((res) => {
        setRestaurantData(res?.data?.restaurants);
      })
  }, [])
 


  return(
    <GoogleMap 
    defaultCenter={{lat:41.878113, lng:-87.629799}} 
    defaultZoom={5}
    defaultOptions={{styles:mapStyle}}>

      {RestaurantData?.map(restaurant => (
      <Marker  
      key={restaurant.id}  

      position={{
        lat: restaurant.lat, 
        lng: restaurant.lng,
      }}
      icon={{
        url:"https://iconarchive.com/download/i107557/google/noto-emoji-travel-places/42486-house.ico", scaledSize: new window.google.maps.Size(25, 25)
      }}/>

      ))}
      
    </GoogleMap>
  )
}

const WrappedMap = withScriptjs(withGoogleMap(Map));


export function Restaurant(props) {


  return (
    <div style={{width:"100vw", height:"100vh"}} >
      <WrappedMap  
     googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
     loadingElement={<div style={{ height: `100%` }} />}
     containerElement={<div style={{ height: `100%` }} />}
     mapElement={<div style={{ height: `100%` }} />} />
    </div>
  );
}