import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { LinePerson } from '../../Line';

import { ContextSearch } from '../../../Context/ContextModalSearch';
import { getPersonsForDistrict } from '../../../Api/pessoa.service';

function ResultByPerson({valueSearch}) {

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

  useState(()=>{
    async function getPerson(){
      const data = await getPersonsForDistrict(id);
      setSearch([...data]);
      setSearchFilte([...data])
    }
    getPerson()
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
      <p style={Style}>Pessoas:</p>
      <div style={{overflow : 'auto', height: '90%'}}>
        {
          searchFilte.map(pessoa => {
            return(
              <>
                <LinePerson
                  key={pessoa.login}
                  nome={`${pessoa.nome} ${pessoa.sobrenome}`}
                  login={pessoa.login}
                  senha={pessoa.senha}
                  idade={pessoa.idade}
                  obj={pessoa}
                  type={'person'}
                  idSearch={id}
                  linkModal={`person/${pessoa.codigoPessoa}`}
                  onClick={() => setSearch([])}
                />
              </>
            )
          })
        }
      </div>
    </>
  );
}

export default ResultByPerson;