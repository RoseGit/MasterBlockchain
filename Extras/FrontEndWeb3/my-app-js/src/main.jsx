import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SingleHome } from './components/SingleHome'
import { Home } from './components/Home'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/home_test' element={<p>Hola Home Test</p>}/>
        <Route path='/adios' element={<p>Adios Rose</p>}/>
        <Route path='/home_single' element={<SingleHome/>}/>

        //Tiene sub rutas /home/producto, /home/clientes, etc
        <Route path='/home' element={<Home/>}>
          <Route index element= {<p>Inicio</p>} />
          <Route path='productos' element={<p>Productos</p>} />
          <Route path='clientes' element={<p>Clientes</p>} />
          //Si no concuerda con ningun path
          <Route path='*' element={<p>Ruta no valida </p>} />
        </Route>

      </Routes>

    </BrowserRouter>
  </StrictMode>,
)
