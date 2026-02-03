import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import {Inicio} from "./Inicio"
import {Saldo} from "./Saldo"
import {Tx} from "./Tx"
import {Bloque} from "./Bloque"
import { QueryClient, QueryClientProvider } from 'react-query'

const clienteConsulta = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={clienteConsulta}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio/>}>
            <Route path='saldo/:dir' element={<Saldo/>}></Route>
            <Route path='tx/:hashTx' element={<Tx/>}></Route>
            <Route path='bloque/:numBloque' element={<Bloque/>}></Route>
          </Route>
        </Routes>    
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)
