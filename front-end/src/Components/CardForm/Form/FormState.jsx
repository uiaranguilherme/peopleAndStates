import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BoxSelector, Option } from '../../BoxSelector';
import StatusMessage from '../../StatusMessage';
import { Input } from '../../Input';
import Button from '../../Button';

import { postEstado, putEstado, getUfOneForId } from '../../../Api/estado.service';

import {
  MdOutlineRadioButtonUnchecked as CircleIcon,
  MdOutlineRadioButtonChecked as CircleActive,
} from '../../../Icons/icons';
import style from './styles.module.css';

function FormState() {
  const { id } = useParams();
  const navigate = useNavigate();

  //
  const [ isEdit, setIsEdit ] = useState(false);
  const [ currentData, setCurrentData ] = useState({});

  //FormState
  const [nome, setNome] = useState('');
  const [sigla, setSigla] = useState('');
  const [status, setStatus] = useState(0);

  //BoxSelectorStatus
  const [ selector, setSelector ] = useState('Status');

  //MessageErro
  const [ isVisible, setIsVisible ] = useState(false);
  const [ messageErro, setMessageErro ] = useState(true);
  const [ isErro, setIsErro ] = useState(true);

  //recupera informações caso seja uma edição
  useEffect(() => {
    if(id !== undefined){
      setIsEdit(true);

      async function getEstado(){
        const data = await getUfOneForId(id);
        setNome(data.nome);
        setSigla(data.sigla);
        setCurrentData(data)
         if(data.status === 2){
           setSelector('Ativo')
         }else{
           setSelector('Desativo')
         }
      }
      getEstado()
    }
  }, [id])

  useEffect(()=>{
    if(selector === 'Ativo') {
      setStatus(1)
      }else{
        setStatus(2)
      }
  }, [selector, status])

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false)
    }, 1600);
  }, [isVisible])

  async function handlerSave (){
    
    if( nome.length === 0 ){
      setIsVisible(true);
      setMessageErro('Campo Vazio...');
      setIsErro(true);

    }else if( sigla.length <= 0){
      setIsVisible(true);
      setMessageErro('Campos Sigla Vazio...');
      setIsErro(true);
    
    }else{
      if(isEdit){
        await putEstado({codigoUF: currentData.codigoUF, nome : nome, sigla: sigla, status : status});
        setIsVisible(true);
        setMessageErro("Estado Alterado!");
        setIsErro(false);
        
        setTimeout(() => {
          navigate('/')
        }, 1500);

      }else{
        const data = await postEstado({nome, sigla, status})
        
        if(data.request.status === 404){
          setIsVisible(true);
          setMessageErro(data.response.data.mensagem.split('.')[0]);
          setIsErro(true);
        }
        
        if(data.request.status === 200){
          setIsVisible(true);
          setMessageErro("Estado Cadastrado!");
          setIsErro(false);
        }
      }
      
      setNome('')
      setSigla('')
      setStatus(0)
      setSelector('Status')
      setIsEdit(false)
    }

  }

  function CancelEdit(){
    navigate('/');
    setNome('')
    setSigla('')
    setStatus(0)
    setSelector('Status')
  }
  
  return (
    <div style={{margin: '0 auto', width: '100%'}}>
      <Input
        value={nome}
        label={'Nome*'}
        width='90%'
        onChange={(e)=> setNome(e.target.value)}
      />

      <Input
        value={sigla}
        label={'Sigla*'}
        width='90%'
        onChange={(e)=> setSigla(e.target.value)}
      />
      <div style={{position : 'relative', width: '100%', height: '4rem'}}>
          <BoxSelector
            selector={selector}
            widthOptions={'16rem'}
          >
            <Option
              onClick={(e)=>setSelector(e.target.innerText)}
            >
              <CircleActive style={{color: '#88CA5E' }}/> 
              Ativo
            </Option>

            <Option
              onClick={(e)=>setSelector(e.target.innerText)}
            >
              <CircleIcon style={{color: '#b7b7a4' }}/> 
              Desativo
            </Option>
          </BoxSelector>
      </div>
      <div className={style.Buttons}>
              <Button
                height={'3rem'}
                width={'6rem'}
                margin={'0 0.5rem 0 0.5rem'}
                onClick={CancelEdit}
              >
                Cancelar
              </Button>
              <Button
                height={'3rem'}
                width={'5rem'}
                onClick={handlerSave}
              >
                Salvar
              </Button>
      </div>
      <StatusMessage Erro={isErro} messageErro={messageErro} isVisible={isVisible}/>
    </div>
  );
}

export default FormState;