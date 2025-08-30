/*
Asociacion clave-valor para guardar y ver datos * solo la clave no puede ser mapping el valor si.

mapping(_keyType => _ValueType)[public]* <nombre_mapping>;

Guardar y ver datos con mapping 

//guardar datos 
<nombre_mapping> [_key] = value;

//ver datos 
<nombre_mapping>[_key];
*/
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;
contract TestMapping {    
    /********************************** Ejercicio 1 ****************************************/
    // Mapping que permite elegir un nombre mediante un numero 
    mapping (uint => string ) private nombres;

    //Usar mapping 
    function asignarNombre(uint _numero, string memory _nombre) public {
        nombres[_numero] = _nombre;
    }

    function obtenerNombre(uint _numero) public view returns(string memory){
        return nombres[_numero];
    }

    /********************************** Ejercicio 2 ****************************************/
    mapping(address => Persona) private sujetos;

    //mapping que nos relaciona una struct persona con un address
    struct Persona{
        uint id;
        string nombre;
        int edad;
    }

    //funcion para asignar una persona
    function asignarPersona(uint _id, string memory _nombre, int _edad) public {
        Persona memory sujeto = Persona(_id, _nombre, _edad);
        //Asignar la persona al mapping 
        sujetos[msg.sender] = sujeto;
    }

    function obtenerSujeto() public view returns(uint, string memory, int){
        return(sujetos[msg.sender].id, sujetos[msg.sender].nombre, sujetos[msg.sender].edad);
    }
}