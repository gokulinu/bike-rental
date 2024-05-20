import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import New from './components/new'
import Rental from './components/rental'
import Index from './components'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1>Awesome Bike Rental</h1>
    <New />
    <Rental  /> 
    <Index  />
    </>
  )
}

export default App
