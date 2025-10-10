/*
Los modificadores son frgmentos de codigo reutilizable que se utilizan 
para modificar o extender el comportameinto de funciones y declaraciones 
de funciones en los contratos inteligentes.

modifier <nombre_modifier>(){
    require(<condiion>, "mensaje opcional ");
    _; //marcador donde se insertara la funcion 
}
*/
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract MyModifier {
    modifier isPar(uint256 _number) {
        require(_number % 2 == 0, "El numero pasado no es par");
        _;
    }

    modifier noEsCero(address _address) {
        require(_address != address(0), "La direccion es cero");
        _;
    }

    modifier noEstaVacio(string memory _str) {
        require(bytes(_str).length > 0, "La cadena esta vacia");
        _;
    }

    address public propietario;

    constructor() {
        propietario = msg.sender;
    }

    //Valida si la persona quien llama la funcion es el propietario
    modifier soloPropietario() {
        require(
            msg.sender == propietario,
            "Solo el propietario puede llamar esta funcion"
        );
        _;
    }

    function mensaje() public view soloPropietario returns (string memory) {
        return "Se esta ejecutando una funcion ";
    }

    function mensajeSinModifier() public view returns (string memory) {
        require(
            msg.sender == propietario,
            "Solo el propietario puede llamar esta funcion"
        );
        
        return "Se esta ejecutando una funcion ";
    }
}
