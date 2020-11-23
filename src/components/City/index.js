import React, { useState, useEffect} from "react";
import axios from'axios';
import {StyledDiv} from './City.style'

export function City() {
  const [cityData, setCityData] = useState(null)



  useEffect(() => {
    axios.get('http://opentable.herokuapp.com/api/cities')
      .then((res) => {
        setCityData(res?.data?.cities);
      })
  }, []);

  const CityList = cityData?.map((city, index) => (
       <p key={index}>{city}</p>
  ));

return(
    <StyledDiv>
        {CityList}
    </StyledDiv>
)
}
