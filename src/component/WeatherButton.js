//rface
import { Button } from 'react-bootstrap';
import React from 'react'

const WeatherButton = ({cities, setCity, handleCurrentLocation}) => {
 // console.log("cities?",cities);
  return (
    <div>
     {/* use react bootstrap for WeatherButton */}  
     <Button className='buttonCity' variant="warning" onClick={handleCurrentLocation}> Current Location</Button>
     {cities.map( (item,index) => (
        <Button className='buttonCity' key={index} 
        onClick={()=>setCity(item)}> {item}
        </Button>
     ))}
    </div>
  ); // close return

}; // close WeatherButton
export default WeatherButton
