/*
Inicio - 50781 unidades de gas (Transaction cost )

    - Usar calldata (49051 gas)
    - Cargar variables de estado en la memoria  48841
    - Cortocircuito 48535
    - Incremento de bucle 47461
    - cache en la longitud del array 47425
    - cargar elementos del array en la memoria 47257
*/

// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0<0.9.0;

contract GasRefactor {
    uint public total;

    // Consumo de gas 50781 [1,4,7,8,9,100]    
    /*function sumar(uint[] memory _nums) external {
        for (uint i= 0; i < _nums.length; i+=1) 
        {
            bool esPar = _nums[i] % 2 == 0;
            bool esMenor99 = _nums[i] < 99;
            if(esPar && esMenor99){
                total += _nums[i];
            }
        }
    }*/

    //primer Tecnica uso de calldata  49051
    /*function sumar(uint[] calldata _nums) external {
        for (uint i= 0; i < _nums.length; i+=1) 
        {
            bool esPar = _nums[i] % 2 == 0;
            bool esMenor99 = _nums[i] < 99;
            if(esPar && esMenor99){
                total += _nums[i];
            }
        }
    }*/

//segunda tecnica cargar variables de estado en memoria (48841)
    /*function sumar(uint[] calldata _nums) external {
        uint _total = total;
        for (uint i= 0; i < _nums.length; i+=1) 
        {
            bool esPar = _nums[i] % 2 == 0;
            bool esMenor99 = _nums[i] < 99;
            if(esPar && esMenor99){
                _total += _nums[i];
            }
        }
        total = _total;
    }*/

    //tercer tecnica Corto circuito 48535
    /*function sumar(uint[] calldata _nums) external {
        uint _total = total;
        for (uint i= 0; i < _nums.length; i+=1) 
        {            
            if(_nums[i] % 2 == 0 && _nums[i] < 99){
                _total += _nums[i];
            }
        }
        total = _total;
    }*/

    //cuarta tecnica Incrementos de bucle 47461
    /*function sumar(uint[] calldata _nums) external {
        uint _total = total;
        for (uint i= 0; i < _nums.length; ++i) 
        {            
            if(_nums[i] % 2 == 0 && _nums[i] < 99){
                _total += _nums[i];
            }
        }
        total = _total;
    }*/

//quinta tecnica, cachear longitud de arreglo 47425
    /*function sumar(uint[] calldata _nums) external {
        uint _total = total;
        uint len = _nums.length;
        for (uint i= 0; i < len; ++i) 
        {            
            if(_nums[i] % 2 == 0 && _nums[i] < 99){
                _total += _nums[i];
            }
        }
        total = _total;
    }*/

//Sexta tecnica cargar elemntos de array en memoria  47257
function sumar(uint[] calldata _nums) external {
        uint _total = total;
        uint len = _nums.length;
        for (uint i= 0; i < len; ++i) 
        {            
            uint num = _nums[i];
            if(num % 2 == 0 && num < 99){
                _total += num;
            }
        }
        total = _total;
    }
}

