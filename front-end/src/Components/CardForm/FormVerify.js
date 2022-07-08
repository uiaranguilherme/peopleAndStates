export function StateAndCityVerify( name, UF ) {
  const parseUF = parseFloat(UF);
  const parseName = parseFloat(name);

  if (isNaN(parseName) && isNaN(parseUF)) {
    
    if (parseUF.length > 2) {
      return {
        modalVisible: true,
        FieldLimit: (uf) => { uf.slice(0, 2) },
        erroMessage: 'Limite de 2 digitos em Sigla'
      }
    }

    if (parseUF.length === 0) {
      return {
        modalVisible: true,
        FieldLimit: (uf) => { uf.slice(0, 2) },
        erroMessage: 'Digite a Sigla do estado'
      }
    }

    if (name.length <= 4) {
      return {
        modalVisible: true,
        FieldLimit: null,
        erroMessage: 'Poucas letras no campo Nome'
      }
    }

    if (name && UF === typeof String) {
      return {
        modalVisible: true,
        FieldLimit: null,
        erroMessage: 'Não é possível digitar valor numérico'
      }
    }

    return {
      modalVisible: true,
      FieldLimit: null,
      erroMessage: null
    }
  }
  //Retorna erro caso seja digitado um número:
  return {
    modalVisible: true,
    FieldLimit: null,
    erroMessage: 'No campo nome não é permitido números'
  }
}


export function VerifyPeople(fields) {

  

  return {
    message: 200
  }
}