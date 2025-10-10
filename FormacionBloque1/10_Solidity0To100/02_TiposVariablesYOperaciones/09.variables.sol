/*
Las variables son un espacio en memoria que nos permite almacenar infomacion de nuesto contrato.
<tipo:dato> <nombre_variable>

inicializacion 
<tipo:dato> <nombre_variable> = <valor>

tipos de variable 
uint -> Entero sin signo de 256 bits
int -> Entero con signo de 256 bits
bool -> Valor booleano true o false
address -> Direccion Ethereum (20 bytes)
string -> Cadena de texto 
bytes -> Bytes dinamicos 
*/
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 < 0.9.0;
contract TestVariables {
    //Variables de tipo string 
    string stringVariableDeclarada;
    string stringVariableInicializada = "Valor de mi variable";
    string stringVariableVacia = "";

    //Variables de tipo boolean
    bool booleanVariableDeclarada;
    bool booleanVariableInicializada = true;
    bool booleanVariableFalse = false;

    //Variables de tipo Byte
    bytes1 bytes1Variable = "a";
    bytes32 bytes2Variable = keccak256("Hola mundo ");

    //Variables address
    address addressVariable;
    address addressVariableInicializada = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;


}