/*
las funciones son las unidades ejecutables del codigo dento de un contrato.
NOTA: Se recomienda que las variables que se pasen por parametros inician con (_)
ejemplo _nombre_parametro 

function <nombre_funcion>(<tipos_parametros>)[public | private]{}
*/
// SPDX-License-Identifier: MIT
pragma solidity >= 0.8.0 < 0.9.0;

contract TestFunction{
    //Funcion 1 Permite añadir la direccion del usuario que llama la funcion a un arreglo 
    address[] private direcciones;
    uint public tamano;
    bytes32 public hash;
    Comida public paella;
    bytes32 public hashFutbolista;
    Futbolista[] public futbolistas;

    function agregarDirecciones() public {
        direcciones.push(msg.sender);
    }

    function obtenerDirecciones(uint _index) public view returns(address){
        return (direcciones[_index]);
    }

    function obtenerTamanio() public {
        tamano = direcciones.length;
    }

    //funcion 2 calcular el hash de un string que se le pase     
    function calcularHash(string memory _cadena) public{
        hash = keccak256(abi.encodePacked(_cadena));
    }

    //funcion 3 Hacer uso de tipo de dato complejo llamado "Comida" con nombre, precio e ingredientes
    struct Comida {
        string nombre;
        uint precio;
        string ingredientes;
    }        

    function prepararPaella(string memory _nombre, uint _precio, string memory _ingredientes) public {
        paella = Comida(_nombre, _precio, _ingredientes);
    }

    struct Futbolista{
        string _nombre;
        uint dorsal;
        address direccion;
    }

    //Funcion 4 trabajar con funciones privadas 
    function calcularHashFutbolista(string memory _nombre, uint _dorsal, address) private {
        hashFutbolista = keccak256(abi.encodePacked(_nombre,_dorsal, msg.sender));
    }

    mapping (string => bytes32) public futbolistasGuardados;
    function guardarFutbolista(string memory _nombre, uint _dorsal) public {
        calcularHashFutbolista(_nombre, _dorsal, msg.sender);
        futbolistas.push(Futbolista(_nombre, _dorsal, msg.sender));
        futbolistasGuardados[_nombre] = hashFutbolista;
    }
}