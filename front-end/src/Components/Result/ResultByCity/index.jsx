import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LineStateAndCity } from '../../Line';
import { getMunicipioPorEstado } from '../../../Api/municipio.service';

import { ContextSearch } from '../../../Context/ContextModalSearch';

function ResultByCity({valueSearch}) {
  const { id } = useParams();

  const { Search } = useContext(ContextSearch);
  const [ search, setSearch ] = Search();
  const [ searchFilte, setSearchFilte] = useState([])

  useEffect(() => {
    if(valueSearch.length > 0){
      const valueSearchArr = search.filter( value => 
         value.nome.toLowerCase().includes(valueSearch) ||
         value.nome.toUpperCase().includes(valueSearch) ||
         value.nome.includes(valueSearch)  )
      setSearchFilte([...valueSearchArr])
    }

    if(valueSearch.length === 0){
      setSearchFilte(search)
    }
  }, [valueSearch])

  useEffect(() => {
    async function getCidades(){
      const { data } = await getMunicipioPorEstado(id);
      setSearch([...data]);
      setSearchFilte([...data]);
    };
    getCidades()
  }, [id])

  const Style = {
    display: 'flex',
    alingItens: 'center',
    padding: '0.5rem 0 0.9rem 1rem', 
    fontSize: '1.5rem',
    backgroundColor: 'var(--background-200)',
    borderRadius: '30px',
    marginBottom: '10px'
    
  }

  return (
    <>
      <p style={Style}>Cidades:</p>
      <div style={{overflow : 'auto', height: '90%'}}>
        {
          searchFilte.map((city)=>{
            return(
              <LineStateAndCity
                type={'city'}
                obj={city}
                Nome={city.nome}
                link={`district/${city.codigoMunicipio}`}
                linkModal={`city/${city.codigoMunicipio}`}
                onClick={() => setSearch([])}
              />
            )
          })
        }
      </div>
    </>
  );
}

export default ResultByCity;