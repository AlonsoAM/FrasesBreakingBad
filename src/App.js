import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import Frase from './components/Frase'

const Button = styled.button`
  background: -webkit-linear-gradient(
    top left,
    #007d35 0%,
    #007d35 40%,
    #0f574e 100%
  );
  background-size: 300px;
  font-family: Arial, Helvetica, sans-serif;
  color: #fff;
  margin-top: 1rem;
  padding: 1rem 3rem;
  font-size: 2rem;
  border: 2px solid #000;
  transition: background-size 0.8s ease;

  &:hover {
    cursor: pointer;
    background-size: 400px;
  }
`

const Contenedor = styled.div`
  display: flex;
  align-items: center;
  padding-top: 5rem;
  flex-direction: column;
`

function App() {
  // state de Frases
  const [frase, setFrase] = useState({})

  // funcion para mostrar la frase
  const ConsultarAPI = async () => {
    try {
      const res = await fetch(
        'https://breaking-bad-quotes.herokuapp.com/v1/quotes',
      )
      const frase = await res.json()
      // eslint-disable-next-line no-throw-literal
      if (!res.ok) throw { status: res.status, statusText: res.statusText }
      // Enviar la frase al state
      setFrase(frase[0])
    } catch (err) {
      let message = err.statusText || 'Ocurrió un error'
      console.log(`Error: ${err.status}: ${message}`)
    }
  }

  // UseEffect para que al cargar aparezca una frase de The Braking Bad
  useEffect(() => {
    ConsultarAPI()
  }, [])

  return (
    <>
      <Contenedor>
        <Frase frase={frase} />
        <Button onClick={ConsultarAPI}>Obtener Frase</Button>
      </Contenedor>
    </>
  )
}

export default App
