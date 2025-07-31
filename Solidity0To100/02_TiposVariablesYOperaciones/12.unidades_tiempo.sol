/*
En solidity tenemos una serie de sufijos, que nos ayudan a tratar con el tiempo

<x> es un numero entero positivo.
La base de las unidades de tiempo son los segundos 

<x> seconds
<x> minutes
<x> hours
<x> days
<x> weeks
<x> years
*/

// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract TestTiempo {
    //Unidades de tiempo (en segundos)
    uint256 public tiempoActual = block.timestamp;

    uint256 public minutos = 1 minutes;
    uint256 public horas = 1 hours;
    uint256 public dias = 1 days;
    uint256 public semanas = 1 weeks;

    //funciones para manipular el tiempo

    //segundos
    function mas50Segundos() public view returns (uint256) {
        return block.timestamp + 50 seconds;
    }

    //minutos
    function mas60Minutos() public view returns (uint256) {
        return block.timestamp + 60 minutes;
    }

    //horas
    function mas1Hora() public view returns (uint256) {
        return block.timestamp + 1 hours;
    }

    //semanas
    function mas1Semana() public view returns (uint256) {
        return block.timestamp + 1 weeks;
    }

    //dias
    function mas2Dias() public view returns (uint256) {
        return block.timestamp + 2 days;
    }

    //funcion para agregar tiempo
    function mastiempo(uint256 _segundos)
        public
        view
        returns (
            string memory,
            uint256,
            string memory,
            uint256
        )
    {
        return (
            "tiempo actual: ",
            block.timestamp,
            " tiempo mas adicional: ",
            block.timestamp + _segundos
        );
    }
}
