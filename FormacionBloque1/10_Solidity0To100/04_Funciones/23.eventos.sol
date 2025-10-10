/*
Los eventos comunican un suceso en la cadena de bloques

Declarar evento 
event <nombre_evento> (types);

Emitir evento
emit <nombre_evento> (values);
*/

// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 < 0.9.0;

contract TestEventos {
    event DepositoTest(string indexed _nombre);

    event DepositoTest2(string indexed _nombre, uint _cantidad);

    event DepositoTest3(string, uint, address indexed, bytes32);

    // Funcion evento 1 
    function depositar(string memory _nombre) public {
        //logica de negocio

        //emitir nuestro evento
        emit DepositoTest(_nombre);
    }

    function depositar2(string memory _nombre, uint _cantidad) public{
        emit DepositoTest2(_nombre, _cantidad);
    }

    function depositar3(string memory _nombre, uint _edad) public{
        bytes32 hashId = keccak256(abi.encodePacked(_nombre, _edad, msg.sender));
        emit DepositoTest3(_nombre, _edad, msg.sender, hashId);
    }
}