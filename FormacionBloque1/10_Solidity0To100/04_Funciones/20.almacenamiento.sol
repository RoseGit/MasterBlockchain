/*
STORAGE: es una ubicacion permanente y persistente en la cadena de bloques 

MEMORY: Es una ubicacion temporal utilizada para almacenar datos durante la ejecucion de funciones.

CALLDATA: Es una palabra clave que se refiere a una ubicacion especial de memoria utilizada para almacenar los argumentos de una funcion externa.

*/
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract  TestStorage{
    // Declaramos una variable de estado, que sera almacenada en el STORAGE
    uint public storeData;
    
    // definir una funcion para actualizar el valor almacenado en el STORAGE
    function setValue(uint _newValue) external {
        storeData = _newValue;
    }

    // Concultar el valor desde el STORAGE
    function getValue() external view returns(uint){
        return storeData;
    }
}

contract TestMemory {    
    // Definimos una funcion externa que recibe una cadena de texto y devuelve su longitud
    function stringLength(string memory _str) external pure returns(uint){
        //Convertimos la cadena de calldata a memory
        bytes memory stringBytes = bytes(_str);

        //devolvemos la longitud de la cadena
        return stringBytes.length;
    }
}

contract TestCallData{
    //Funcion xterna que reciba dos parametros
    function ProcessData(uint _value1, uint _value2) external pure returns(uint){
        // Accedemos a los datos en caldata y realizamos una operacion 
        uint result = _value1 + _value2;
        return result;
    }
}