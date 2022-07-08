import { useEffect, useContext, useState } from 'react';
import { LineStateAndCity } from '../../Line';

import { getAllEstados } from '../../../Api/estado.service';
import { ContextSearch } from '../../../Context/ContextModalSearch';

function ResultByStates({valueSearch}) {

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
    async function getEstados(){
      const data = await getAllEstados();
      setSearch(data);
      setSearchFilte(data)
    }
    getEstados()
  }, [/*Vazio para que aconteça uma única vez*/])

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
      <p style={Style}>Estados:</p>
        <div style={{overflow : 'auto', height: '90%'}}>
          {
            searchFilte.map((estado) => {
              return(
                <LineStateAndCity
                  type={'state'}
                  obj={estado}
                  key={estado.nome}
                  UF={estado.sigla} 
                  Nome={estado.nome} 
                  link={`city/${estado.codigoUF}`}
                  linkModal={`uf/${estado.codigoUF}`}
                  onClick={() => setSearch([])}
                />
              )
            })
          }
        </div>
    </>
  );
}

export default ResultByStates;