import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../Button';
import { Input } from '../../Input';
import StatusMessage from '../../StatusMessage';
import { BoxSelector, Option } from '../../BoxSelector';

//serviços
import { postPessoa, getOneForId, putPessoa } from '../../../Api/pessoa.service';
import { getAllEstados, getUfOneForId } from '../../../Api/estado.service';
import { getMunicipioPorEstado, getMunicipioForId } from '../../../Api/municipio.service';
import { getBairroPorMunicipio, getBairroForId } from '../../../Api/bairro.service';

//Contextos:
import { ModalAddressContext } from '../../../Context/ContextModalAddress';
import { ContextCurrent } from '../../../Context/ContextData';

import {
  MdOutlineRadioButtonUnchecked as CircleIcon,
  MdOutlineRadioButtonChecked as CircleActive,
  FiEdit as EditIcon,
  BsTrash as TrashIcon
 } from '../../../Icons/icons';
 import style from './styles.module.css';

function FormPerson() {
  //constantes para mudanças no cadastro de pessoas:
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);


  //Contexto de Pessoa a ser cadastrada
  const [currentPeople, setCurrentPeople] = useContext(ContextCurrent).CurrentPeople();

  //Contexto de Endereços
  const [enderecos, setEnderecos] = useContext(ContextCurrent).CurrentAddresses();

  //Contexto de Modal de Endereços
  const [ modalAddressIsOpen, setModalAddressIsOpen] = useContext(ModalAddressContext).Modal();
  
  //FormPessoa
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [idade, setIdade] = useState('');
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [status, setStatus] = useState(1);
  
  //BoxSelector
  const [ selector, setSelector ] = useState('Ativo');
  
  //MessageErro
  const [ isVisible, setIsVisible ] = useState(false);
  const [ messageErro, setMessageErro ] = useState('');
  const [ isErro, setIsErro ] = useState(false);

  //caso seja edição recupera dados:
  useEffect(() => {
    if(id !== undefined){
      setIsEdit(true);
      async function getPessoa(){
        const data = await getOneForId(id);
        setCurrentPeople(data);
        setEnderecos([...enderecos])
      }
      getPessoa()
    }
    if(isEdit){
      setEnderecos([...enderecos]);
    }
  }, [])

  //efeito para recuperar os dados:
  useEffect(()=>{
    if(currentPeople !== undefined){
      setNome(currentPeople.nome)
      setSobrenome(currentPeople.sobrenome)
      setIdade(currentPeople.idade)
      setLogin(currentPeople.login)
      setSenha(currentPeople.senha)
      setStatus(currentPeople.status)
    }

    if(currentPeople.status === 1){
      setSelector('Ativo')
    }else{
      setSelector('Desativo')
    }
  }, [currentPeople])

  //define o status por numero
  useEffect(()=>{
    if(selector === 'Ativo'){
      setStatus(1)
    }else{
      setStatus(2)
    }
  }, [selector, setSelector])

  //volta o modal a não visivel
  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false);
    }, 1500);
  })

  function resetInpus(){
    setNome('');
    setSobrenome('');
    setIdade('');
    setLogin('');
    setSenha('');
    setStatus(1);
    setSelector('Ativo');
    setEnderecos([]);
  }

  //salva no contexto a pessoa que esta sendo adicionada
  function handleUpdatePeople (){
    setCurrentPeople({
     nome: nome,
     sobrenome: sobrenome,
      idade: idade,
      login: login,
      senha: senha,
      status: status,
      enderecos : enderecos
    })
  }

  async function SaveFull () {
    if(enderecos.length <= 0){
      setMessageErro('Não é possivel salvar, Adicione endereços...');
      setIsErro(true);
      setIsVisible(true);
    }else{

      if(isEdit){
        const pessoa = {
          codigoPessoa : currentPeople.codigoPessoa,
          nome: nome,
          sobrenome: sobrenome,
          idade: idade,
          login: login,
          senha: senha,
          status: status,
          enderecos :[ ...enderecos]
        };

        const data = await putPessoa(pessoa);
        setCurrentPeople({});
        setIsVisible(true);
        setMessageErro("Cadastro Atualizado!");
        setIsErro(false);
        
        setTimeout(() => {
          navigate('/');
        }, 1500);
      }else{

        const data = await postPessoa({nome, sobrenome, idade, login, senha, enderecos, status})
        
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

        setTimeout(() => {
          navigate('/');
        }, 1500);
      }

      resetInpus();
    }
  }

  function CancelEdit(){
    setNome('')
    setSobrenome('')
    setIdade('')
    setLogin('')
    setSenha('')
    setStatus(1)
    setSelector('Status')
    setCurrentPeople({})
    setEnderecos([])
    
    setIsEdit(false)
    navigate('/');
  } 

  return (
    <div style={{margin: '0 auto', width: '100%'}}>
        <Input
          value={nome}
          label={'Nome*'}
          width='98%'
          onChange={(e)=> setNome(e.target.value)}
        />
      <div style={{display: 'flex'}}>
        <div style={{width: '70%'}}>
          <Input
            value={sobrenome}
            label={'Sobrenome*'}
            width='99%'
            onChange={(e)=> setSobrenome(e.target.value)}
          />
        </div>
        <div style={{width: '28%'}}>
          <Input
            value={idade}
            label={'Idade*'}
            width='100%'
            onChange={(e)=> setIdade(e.target.value)}
          />
        </div>
      </div>
      <div style={{display: 'flex'}}>
        <div>
          <Input
            value={login}
            label={'Login*'}
            width='90%'
            onChange={(e)=> setLogin(e.target.value)}
          />
        </div>
        <div>
          <Input
            value={senha}
            label={'Senha*'}
            width='90%'
            onChange={(e)=> setSenha(e.target.value)}
          />
        </div>
      </div>
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
      <div className={style.ButtonsPerson}>
        
          <Button
              height={'3rem'}
              width={'7rem'}
              margin={'0 0.5rem 0 0.5rem'}
              onClick={()=>{
                setModalAddressIsOpen(!modalAddressIsOpen);
                handleUpdatePeople()
              }}
            >
            Endereços
          </Button>
        <div style={{display: 'flex'}}>
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
                onClick={SaveFull}
              >
                Salvar
              </Button>
        </div>
      </div>
      <StatusMessage Erro={isErro} messageErro={messageErro} isVisible={isVisible}/>
    </div>
  );
}


//Formulario para cadastros de endereços:
function FormAddresses () {
  const { id } = useParams();

  const [enderecos, setEnderecos] = useContext(ContextCurrent).CurrentAddresses();
  
  //Contexto de Modal de endereços
  const [modalAddressIsOpen, setModalAddressIsOpen] = useContext(ModalAddressContext).Modal();

  const [addresses, setAddresses] = useState([]);//array de endereços...
  const [nomeRua, setNomeRua] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [cep, setCep] = useState('');

  const [bairro, setBairro] = useState([]);
  const [codigoBairro, setCodigoBairro] = useState('');
  
  const [municipios, setMunicipios] = useState([]);
  const [codigoMunicipio, setCodigoMunicipio] = useState(undefined);
  
  const [estados, setEstados ] = useState([]);
  const [codigoUF, setCodigoUF] = useState(undefined);
  
  //Selectores
  const [selectorUF, setSelectorUF] = useState('Estado');
  const [selectorCity, setSelectorCity] = useState('Cidade');
  const [selectorBairro, setSelectorBairro] = useState('Bairro');
  
  //filter de edição
  const [filter, setFilter] = useState({});
  const [editFilter, setEditFilter] = useState(false);

  //Modal de Erro
  const [ isErro, setIsErro ] = useState(false);
  const [ isVisible, setIsVisible] = useState(false);
  const [ messageErro, setMessageErro ] = useState('')

  //retorna o erro a não visivel
  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false);
    }, 1500);
  }, [isVisible])

  //retorna os endereços salvos no contexto caso haja
  useEffect(()=>{
    async function getEnderecos(){
      const enderecos = await getOneForId(id);
      setAddresses([...addresses, ...enderecos.enderecos])
    }
    getEnderecos()
    setAddresses([...enderecos])
  }, [])

  //recupera os estados
  useEffect(() => {
    async function getEstados () {
      const data = await getAllEstados();
      setEstados([...data])
    }
    getEstados()
  }, [])

  //recupera as cidades por estado
  useEffect(() => {
    if(codigoUF !== undefined){
      async function getMunicipio () {
        const { data } = await getMunicipioPorEstado(codigoUF);
        setMunicipios([...data])
      }
      getMunicipio()
    }
  }, [estados, setEstados, codigoUF])

  //recupera os bairros por cidade
  useEffect(() => {
    if(codigoMunicipio !== undefined){
      async function getBairros () {
        const data = await getBairroPorMunicipio(codigoMunicipio);
        setBairro([...data])
      }
      getBairros()
    }
  }, [municipios, setMunicipios, codigoMunicipio])

  function setInputValue(obj){
    const {nomeRua, numero, complemento, cep, codigoMunicipio, codigoBairro} = obj
    
    setNomeRua(nomeRua);
    setNumero(numero);
    setComplemento(complemento);
    setCep(cep);
    setCodigoMunicipio(codigoMunicipio);
    setCodigoBairro(codigoBairro);
    returnFiltersforAddresses();
  }

  function returnFiltersforAddresses(){

    estados.filter(estado => {
      if(estado.codigoUF === codigoUF){
        setSelectorUF(estado.nome);
      }
      return estado
    })

    municipios.filter(municipio => {
      if(municipio.codigoMunicipio === codigoMunicipio){
        setSelectorCity(municipio.nome);
      }
      return municipio
    })
  
    bairro.filter(bairro => {
      
      if(bairro.codigoBairro === codigoBairro){
        setSelectorBairro(bairro.nome)
      }
      return bairro
    })

  }
  
  async function returnSelectores (codigoBairro){

    const bairro = await getBairroForId(codigoBairro);
    setSelectorBairro(bairro.nome);

    const { data } = await getMunicipioForId(bairro.codigoMunicipio); //municipio
    setSelectorCity(data.nome);

    const estado = await getUfOneForId(data.codigoUF);
    setSelectorUF(estado.nome)
  }
  
  function handleEditAddress (Address){

    if(editFilter === false){
      setEditFilter(true);
      let arrFilter = addresses.filter((address) => {
        if(address.codigoEndereco === Address.codigoEndereco){
          setFilter({...Address});
          setInputValue(Address);

          returnSelectores(Address.codigoBairro)
        }

        return address.nomeRua !== Address.nomeRua 
      })
      setAddresses([...arrFilter])
    }
  }

  function handleDeleteAddress (nomeRua){
    let arrFilter = addresses.filter((address) => {
        return address.nomeRua !== nomeRua
      })

      setAddresses(arrFilter)
  }
  
  function handleReturnPage(){
    if(editFilter === true){
      setIsErro(true);
      setIsVisible(true);
      setMessageErro('É necessário, Salvar as Alterações...')
    }else{
      setModalAddressIsOpen(!modalAddressIsOpen);
      setEnderecos([...addresses]);
    }
  }

  function handleSaveAddress (){

    if(!editFilter){
      setAddresses([...addresses, {
        nomeRua,
        numero,
        complemento ,
        cep,
        codigoMunicipio,
        codigoBairro
      }])
    }else{
      let codigoEndereco = filter.codigoEndereco;
      let codigoPessoa = filter.codigoPessoa;
      let bairro = filter.bairro
      setAddresses([...addresses, { 
        bairro : filter.bairro, 
        cep : cep, 
        codigoBairro : codigoBairro, 
        codigoEndereco : codigoEndereco, 
        codigoPessoa: codigoPessoa, 
        complemento: complemento, 
        nomeRua : nomeRua, 
        numero : numero }]);

      setEditFilter(false);

      //console.log({ bairro, cep, codigoBairro, codigoEndereco, codigoPessoa, complemento, nomeRua, numero  })
    }
    //limpa inputs
    setNomeRua('');
    setNumero('');
    setComplemento('');
    setCep('');
    setSelectorUF('Estados');
    setSelectorCity('Cidades');
    setSelectorBairro('Bairros');
  }
  
  return(
    <div style={{width: '100%'}}>
      <div style={{width: '100%', display: 'flex', marginBottom : '10px'}}>
        <Input
          label='Rua*'
          value={nomeRua}
          onChange={(e) => setNomeRua(e.target.value)}
          width='75%'
        />
        <Input
          label='Numero*'
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          width='23%'
        />
      </div>
      <div style={{width: '100%', display: 'flex'}}>
        <Input 
          label='Complemento*'
          value={complemento}
          onChange={(e) => setComplemento(e.target.value)}
          width = '60%'
        />
        <Input
          label='CEP*'
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          width = '40%'
        />
      </div>
      <div  style={{width: '100%', display: 'flex'}}>
          {/*Estado */}
        <BoxSelector
          widthOptions='9rem'
          selector={selectorUF}
        >
          {
            estados.map((estado, key) => {
              return(
                <Option
                  key={key}
                  onClick={()=> {
                    setSelectorUF(estado.sigla)
                    setCodigoUF(estado.codigoUF)
                  }}
                >
                  {estado.nome}
                </Option>
              )
            })
          }
        </BoxSelector>

          {/*Cidade */}
        <BoxSelector
          widthOptions='9rem'
          selector={selectorCity}
        >
          {
            municipios.map((municipio, key) => {
              return(
                <Option
                  key={key}
                  onClick={()=> {
                    setSelectorCity(municipio.nome)
                    setCodigoUF(municipio.codigoUF)
                    setCodigoMunicipio(municipio.codigoMunicipio)
                  }}
                >
                  {municipio.nome}
                </Option>
              )
            })
          }
        </BoxSelector>

          {/*Bairro */}
        <BoxSelector
          widthOptions='9rem'
          selector={selectorBairro}
        >
          {
            bairro.map((bairro, key) => {
              return(
                <Option
                  key={key}
                  onClick={()=> {
                    setSelectorBairro(bairro.nome)
                    setCodigoMunicipio(bairro.codigoMunicipio)
                    setCodigoBairro(bairro.codigoBairro)
                  }}
                >
                  {bairro.nome}
                </Option>
              )
            })
          }
        </BoxSelector>
      </div>
      <div className={style.Buttons}>
        <Button
          height='3rem'
          width='9rem'
          onClick={handleSaveAddress}
        >Salvar Endereço</Button>
        <Button
          margin='0 0 0 10px'
          height='3rem'
          width='6rem'
          onClick={handleReturnPage}
        >Voltar</Button>
      </div>
      <div className={style.ModalErro}>
        <StatusMessage Erro={isErro} messageErro={messageErro} isVisible={isVisible} />
      </div>
      <section className={style.ListDistrict} style={{display: addresses.length !== 0 ? 'flex' : 'none'}}>
        <h3>Endereços já cadastrados:</h3>
        {
          addresses.map((address, key) => {
            return(
              <div key={key}>
                <div>
                  {address.nomeRua}
                </div>
                <div>
                  <button disabled={editFilter}>
                    <EditIcon
                      style={{cursor: editFilter ? 'not-allowed' : 'pointer'}}
                      onClick={() => handleEditAddress(address)}
                    />
                  </button>
                  <TrashIcon className='Trash'
                    onClick={() => handleDeleteAddress(address.nomeRua)}
                  />
                </div>
              </div>
            )
          })
        }
      </section>
      
    </div>
  );
}


function FormPersonAndAddresses () {
  const [modalAddressIsOpen, setModalAddressIsOpen] = useState(false);

  const ModalAddresses = {
      Modal: () => {return ([modalAddressIsOpen, setModalAddressIsOpen])}
  }

  return(
      <>
        <ModalAddressContext.Provider value={ModalAddresses}>
          {modalAddressIsOpen ? <FormAddresses/> : <FormPerson/>}
        </ModalAddressContext.Provider>
      </>
  );
}

export default FormPersonAndAddresses;