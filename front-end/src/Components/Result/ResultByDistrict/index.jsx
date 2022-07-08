import { useContext, useEffect, useState } from 'react';
import { LineStateAndCity } from '../../Line';
import { useParams } from 'react-router-dom';
import { ContextSearch } from '../../../Context/ContextModalSearch';

import { getBairroPorMunicipio } from '../../../Api/bairro.service';

function ResultByDistrict({valueSearch}) {
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
    async function getBairros() {
      const data = await getBairroPorMunicipio(id);
      setSearch([...data])
      setSearchFilte([...data])
    }
    getBairros()
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

  return(
      <>
        <p style={Style}>Bairros:</p>
        <div style={{overflow : 'auto', height: '90%'}}>
          {
            searchFilte.map((district) => {
              return(
                <LineStateAndCity
                  type={'district'}
                  key={district.codigoBairro}
                  obj={district}
                  Nome={district.nome}
                  linkModal={`district/${district.codigoBairro}`}
                  link={`person/${district.codigoBairro}`}
                  onClick={() => setSearch([])}
                />
              );
            })
          }
        </div>
      </>
  );
}

export default ResultByDistrict;