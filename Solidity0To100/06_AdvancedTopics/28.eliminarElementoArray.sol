/*
Eliminar elementos de un array 

- arreglos 
- delete 
- pop 
- length
*/
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract DesplazandoIzquierda {
    uint256[] public array;

    //cuando eliminamos(delete) el valor de un array, en realidad no se elimina el valor de un elemento, solo se reestablece a su valor determinado
    function deleteArray() public {
        array = [1, 2, 3];
        delete array[1]; // el resultado es [1,0,3]
    }

    //como eliminamos el valor del elemento ?, esta funcion realiza ese cometido
    function remove(uint256 _index) public {
        require(_index < array.length, "Error de indice");
        for (uint256 i = _index; i < array.length - 1; i++) {
            array[i] = array[i + 1];
        }

        array.pop();
    }

    //funcion de prueba
    function prueba() external {
        array = [1, 2, 3, 4, 5];
        remove(2); //el resultado debería ser [1,2,4,5]

        assert(array[0]== 1);
        assert(array[1]== 2);
        assert(array[2]== 4);
        assert(array[3]== 5);
        assert(array.length== 4);

        array=[1];
        remove(0);//resultado []
        assert(array.length == 0);
        
    }
}


contract RemplazarUltimo {
    uint[] public array;

    //[1,2,3,4] --remove (1) => [1,4,3] nos deja el arreglo desordenado, importante considerar
    //[1,4,3] -- remove(2) => [1,4]

    function remove(uint _index) public  {
        array[_index] == array[array.length-1];
        array.pop();
    }

    function prueba() external{
        array = [1,2,3,4];
        remove(1);//resultado [1,4,3]        

        assert(array.length == 3);
        assert(array[0] == 1);
        assert(array[1] == 4);
        assert(array[2] == 3);
    }
}