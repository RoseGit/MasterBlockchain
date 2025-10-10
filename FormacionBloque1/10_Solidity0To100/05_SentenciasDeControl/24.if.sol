/*
La sentencia if ejecuta un bloque de codigo si la expresion booleana es cierta 

if(<condicion>){
    //codigo a ejecutar si la condicion es verdadera
}

if(<condicion>){
    //codigo a ejecutar si la condicion es verdadera
}else{
    //ejecutar si a condicion es falsa
}
*/

// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 < 0.9.0;

contract TestIf{

    // numero ganador
    function numeroGanador(uint _numero)public pure returns(string memory) {
        if(_numero == 7){
            return "Has ganado";
        }else{
            return "Has perdido";
        }
    }

    // valor absoluto
    function valorAbsoluto(int _numero) public pure returns(uint) {
        return uint(_numero < 0 ? - _numero : _numero);
    }

    // Funcion que devuelve true si el numero introducido es par y tiene 3 cifras
    function esParDeTres(uint _numero) public pure returns(bool){
        return (_numero % 2 == 0 && _numero >= 100 && _numero <= 999);
    }

    // funcion que permita votar por tres candidatos y devolver el nombre por el cual estamos votando 
    function votar(string memory _candidato) public pure returns(string memory) {
        if(esIgual(_candidato, "Ronaldinho")){
            return "Has votado a Ronaldinho";
        } else if (esIgual(_candidato, "Ronaldo")){
            return "Has votado a Ronaldo";
        } else if (esIgual(_candidato, "Cristiano")){
            return "Has votado a Cristiano";
        } else{
            return "No has votado a ningun candidato";
        }
    }

    //funcion auxiliar 
    function esIgual(string memory _a, string memory _b)internal pure returns(bool){
        return keccak256(abi.encodePacked(_a)) == keccak256(abi.encodePacked(_b));
    }
}