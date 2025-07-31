/*
Los enums son una de las maneras que tiene solidity para ue el usuario pueda crear su propio tipo de datos 

enum <nombre_enumeracion> {valores_enumeracion}

//declarar una variable de tipo enum 
<nombre_enumeracion> <nombre_variable>

Modificar el valor de los enums 
1. espeificando la ocion de la enumeracion 
<nombre_variable> = <nombre_enumeracion>.<valor_enumeracion>;

2. Con el indice 
<nombre_variable> = <nombre_enumeracion>(<posicion>)
*/

// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract TestEnum {
    //Definicion de Enum Estado
    enum Estado {
        Apagado,
        Encendido
    }

    //Declaracion de la variable con el tipo Enum que hemos declarado 
    Estado estado;

    //Funcion para cambiar el estado a apagado 
    function apagar() public {
        estado = Estado.Apagado;
    }

    //Funcion para cambiar el estado a encendido 
    function encender() public {
        estado = Estado.Encendido;
    }

    //Funcion para consultar el estado de la variable 
    function consultar() public view returns(Estado){
        return estado;
    }
}
