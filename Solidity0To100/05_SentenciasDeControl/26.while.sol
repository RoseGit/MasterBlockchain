/*
el bucle while ejecuta un bloque de codigo mientras se cumpla una condicion 

while(<condicion>){
    //codigo a ejecutar mientras se cumpla la <condicion>
}
*/
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;
contract TestWhile {
    //suma de los numeros impares menores a 100
    function sumaImpares() public pure returns (uint) {
        uint suma = 0;
        uint contador = 1;

        while (contador <= 100) 
        {
            if (contador%2 != 0){
                suma += contador;
            }

            contador++;
        }

        return suma;
    }

    //suma los primeros N numeros naturales 
    function sumarNaturales(uint _n)public pure returns(uint) {
        uint suma = 0;
        uint i = 1;

        while(i <= _n){
            suma += i;
            i++;
        }

        return suma;
    }

    // contar digitos de un numero
    function contarDigitos(uint _numero) public pure returns(uint){
        uint contador = 0;
        while (_numero != 0) 
        {
            _numero /= 10;
            contador++;
        }

        return contador;
    }

    //Invertir el numero dado
    function invertirNumero(uint _numero)public pure returns(uint) {
        uint invertido = 0;
        while (_numero != 0) 
        {
            invertido = invertido * 10 +_numero % 10;
            _numero /= 10;
        }
        return invertido;
    }
}