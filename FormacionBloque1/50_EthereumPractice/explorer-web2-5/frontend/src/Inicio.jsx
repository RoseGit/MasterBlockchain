import { Outlet, useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form'

export function Inicio(){
    const {register, handleSubmit} = useForm()
    const navegar = useNavigate()
    const introducirInfo = (datos) => {
        if(datos.datosForm.length == 66) // Si la longitud es 66 navegamos a tx
            navegar(`tx/${datos.datosForm}`)
        if(datos.datosForm.length == 42) // Si la longitud es 42 navegamos a saldo
            navegar(`saldo/${datos.datosForm}`)
        if(/^\d+\.?\d*$/.test(datos.datosForm)) //Si el dato es un número navegamos a bloque
            navegar(`bloque/${datos.datosForm}`)

    }

    return <div className="container">
        <h3 className="text-center my-3">Explorador de la cadena de Ethereum</h3>
        <form className='d-flex justify-content-center gap-1' onSubmit={handleSubmit(introducirInfo)}>
            <input {...register('datosForm')} size={70}></input>
            <button className="mx-3 btn btn-primary">Introducir</button>
        </form>
        <div className="border my-3 p-2">
            <Outlet></Outlet>
        </div>
    </div>
}