/*
La funcion keccak256 en solidity se utiliza para calcular el hash Keccak-256 de una entrada dada

Para calcular el hash con keccak256() hay que usar abi.encodePacked() para pasar los argumentos a tipo byte 
*/

// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;
//pragma experimental ABIEncoderV2; esta opcion ya no se considera experimental por lo tanto queda 
pragma abicoder v2;

contract TestKeccak256 {
    // Funcion basica para testear un hash 
    function test() public pure returns (bytes32){
        return keccak256(abi.encodePacked('Test String'));
    }
    
    //Funcion para testear un hash personalizado 
    function testHash(string memory _string) public pure returns(bytes32){
        return keccak256(abi.encodePacked(_string));
    }

    //funcion para comprobar strings 
    function compararString(string memory _string1, string memory _string2) public pure returns(bool){
        if(keccak256(abi.encodePacked(_string1)) == keccak256(abi.encodePacked(_string2))){
            return true;
        }else{
            return false;
        }
    }
}