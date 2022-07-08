import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import style from './styles.module.css';
import { InputSearch } from '../../Components/Input';
import { Wrapper, Status } from "@googlemaps/react-wrapper";

import { getUfOneForId } from '../../Api/estado.service';

import Map from './../../Components/Map';

const render = (status) => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  return null;
};

function Maps() {
  const { type, id } = useParams();
  const [lat, setLat] = useState(-25.2520888); //
  const [long, setLong] = useState(-52.0215415); // 
  const [zon , setZon] = useState(6);
  const [ UF, setUF ] = useState('')

  const zoom = zon;
  useEffect(() => {
    if(type === 'estado'){
      async function getUF(){
        const UF = await getUfOneForId(id);
        setUF(UF.sigla);
        
        const { data } = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${UF.nome}&key=AIzaSyCxC_0vOHgWgQ1qoeOICjqibMZ5HoRyHg8`)
        setLat(data.results[0].geometry.location.lat);
        console.log(parseFloat(data.results[0].geometry.location.lat))

        setLong(data.results[0].geometry.location.lgn);
        console.log(parseFloat(data.results[0].geometry.location.lng))
      };
      getUF()
    }
  }, [])
  
  return (
    <div className={style.ContainerMap}>
      <aside className={style.AsideSearch}>
        <InputSearch />
      </aside>
      <Wrapper apiKey={"AIzaSyCxC_0vOHgWgQ1qoeOICjqibMZ5HoRyHg8"} render={render}>
        <Map lat={lat} long={long} UF={UF} />
      </Wrapper>
    </div>
  );
}

export default Maps