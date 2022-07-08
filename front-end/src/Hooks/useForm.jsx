import {useState, useEffect} from 'react';

function useForm(type, value) {

  const [input, setInput] = useState(value)
  const [message, setMessage] = useState('')

  useEffect(()=>{
    if(type === 'number'){
      if(input.value < 1){
        setMessage('Digite algum valor...')
      }
    }
  }, [input, setInput])

  useEffect(()=>{

    if(type === 'string'){
      if(input.length < 0){
        setMessage('É necessário digital algum valor...')
      }
    }

  }, [input, setInput])
  
  return [input, setInput]
}

export default useForm;