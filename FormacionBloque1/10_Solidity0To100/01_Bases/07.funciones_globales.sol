/*
son funciones que estan disponibles globalmente en solidity.

tenemos las siguientes funciones globales: 

    msg.sender => devuelve el remitente de la llamada actual.
    block.blockhash(blockNumber); => Devuelve el hash de un bloque dado
    block.coinbase => Devuelve la direcion del minero que esta procesando el bloque
    block.difficulty => Devuelve la dificultad del bloque actual 
    block.gaslimit => Devuelve el limite de gas del bloque actual 
    block.number => Devuelve el numero del bloque actual 
    block.timestamp => Devuelve el timestamp del bloque actual en segundos 
    msg.data => Datos enviados en la transaccion 
    msg.gas => Devuelve el gas que queda
    msg.sig => Devuelve los cuatro primeros bytes de los datos enviados en tx
    now(deprecated) => devuelve el timestamp del block actual(es un alias de block.timestamp)
    tx.gasprice => Devuelve el precio del gas en la transaccion 
    tx.origin = Devuelve el emisor original de la transaccion 
*/

// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract FuncionesGlobales {
    //Funcion msg.sender, devuelve la direccion del usuario que llame a la funcion 
    function obtenerDireccion() public view returns(address){
        return msg.sender;
    }

    //funcion block.timestamp, 
    function ObtenerTiempo() public view returns(uint){
        return block.timestamp;
    }

    //Funcion block.number, devuelve el numero de bloque
    function obtenerNumeroBloque() public view returns(uint) {
        return block.number;
    }
}