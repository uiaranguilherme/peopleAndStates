import React, { useEffect, useState } from 'react';

function Map({
  zoom,
  UF = undefined,
  lati,
  lng
}) {
  const ref = React.useRef(null);
  const [map, setMap] = useState();
  const [lat, setLat] = useState(-25.2520888); //
  const [long, setLong] = useState(-52.0215415); // 

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current,{ center : {lat:lat, lng:long }, zoom: 7}));
    }

    setTimeout(() => {
      setLat(lng);
      setLong(lati);
      console.log('mudou')
    }, 5000);
  }, [ref, map]);

  

  useEffect(() => {
    if(UF !== undefined){
      setTimeout(() => {
        map.data.loadGeoJson(
          `https://servicodados.ibge.gov.br/api/v3/malhas/estados/${UF}?formato=application/vnd.geo+json&qualidade=intermediaria`
        )
        map.data.setStyle({
          fillColor: 'transparent',
          strokeWeight: '3',
          strokeOpacity: '1'
        });
      }, 1500);
    }
  }, [UF])
  


  return <div style={{ width: '100vw', height: '100vh' }} ref={ref} id="map" />;
}

export default Map;