const axios = require('axios');
const url_base = 'http://localhost:3333';

async function getAllPessoas() {
  try {
    const {data} = await axios.get(`${url_base}/pessoa`)
    return data
  } catch (erro) {
    return erro
  }
};

async function getOneForId (codigoPessoa) {
  try {
    const {data} = await axios.get(`${url_base}/pessoa?codigoPessoa=${codigoPessoa}`)
    return data
  } catch (erro) {
    return erro
  }
};

async function getPersonsForDistrict(codigoBairro){
  
  try{
    const arrFilterPessoa = [];
    const arrFilterEndereço = []
    const data = await getAllPessoas();

    for(let cont = 0; cont < data.length; cont++){
      if(data[cont].codigoPessoa !== undefined){
        const pes = await getOneForId(data[cont].codigoPessoa);
        if(pes.request === undefined){
          arrFilterPessoa.push(pes)
        }
      }
    }

    arrFilterPessoa.map(pessoa => {
       pessoa.enderecos.map( endereco => {
         if(endereco.codigoBairro !== undefined){
           if(endereco.codigoBairro === parseFloat(codigoBairro)){
            arrFilterEndereço.push(pessoa)
          }
          }
          return ''
       })
       return ''
    })
    return arrFilterEndereço
  }catch(erro){
    return erro
  }
}

async function postPessoa(obj){
  try {
    const data = await axios.post(`${url_base}/pessoa`, obj)
    return data
  } catch (erro) {
    return erro
  }
};

/*  DENTRO DO OBJETO É NECESSÁRIO PASSAR O CODIGOPESSOA* */
async function putPessoa (obj) {
  try {
    const {data} = await axios.put(`${url_base}/pessoa`, obj)
    return data
  } catch (erro) {
    return erro
  }
};
export { getAllPessoas, getOneForId, postPessoa, putPessoa,  getPersonsForDistrict};