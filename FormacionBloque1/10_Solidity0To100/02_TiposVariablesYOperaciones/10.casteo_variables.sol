/*
el casting o cast nos permte convertir una variable de un tipo a otro.

Podemos transformar un uint ( o un int) con Y numero de bits a un uint (o un int) con X numero de bits

uint<x> (<dato_uint<y>)
int<x> (<dato_int<y>)
y viceversa.

En solidity, las conversiones explicitas(casting) estan limitadas y solo se permiten entre tipos de datos 
relacionados. No puedes convertir directamente cualquier variable a cualquier tipo arbitrario. Las conversiones
estan definidas entre tipos compatibles en el lenguaje.

*/

// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract CastingVariable {
    // Variables a castear
    uint8 numeroUint8 = 5;
    uint16 numeroUint16 = 123;
    uint numeroUint = 80000000;
    int8 numeroInt8 = -4;
    int16 numeroInt16 = -234;
    int numeroInt = -80000000;
    string stringVariable = "354";

    //casting Variables 
    uint32 public castingNumero1 = uint32(numeroUint8);
    int16 public castingNumero2 = int16(numeroUint16);
    uint8 public castingNumero3 = uint8(numeroInt8);
    int public castingNumero4 = int(numeroInt16);
    uint public castingNumero5 = uint(numeroUint);

    //El compilador manda error porque este tipo de casting no se permite 
    //uint public castingNumero6 = uint(stringVariable);
    
    function castingVariables8a32(uint8 _numero) public pure returns(uint32){
        return uint32(_numero);
    }
}
