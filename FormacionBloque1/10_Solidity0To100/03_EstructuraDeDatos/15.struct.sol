/*
Las estructuras nos permiten definir tipos de datos mas complejos 

struct <nombre_estructura>{
    <data_type_1><nombre_variable_1>
    <data_type_1><nombre_variable_1>
    <data_type_1><nombre_variable_1>
}

Para crear una variable del tipo "struct" debemos hacerlo del siguiente modo

//declarar una variable de tipo struct 
<nombre_estructura><nombre_variable>;

//declarar e inicializar una variable "struct"
<nombre_estructura> <nombre_variable> = <nombre_estructura>
(<propiedades_estructura>);
*/

// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract TestStruct {
    /******************************************************** Ejercicio 1 ***********************************************************/
    // Estructuras basicas
    struct Persona {
        string nombre;
        int256 edad;
        bool activo;
    }

    // Declaracion de la estructura
    Persona joven;

    // Asignacion de valores a la estructura (inicializacion)
    function asignacionValores() public {
        joven.nombre = "Rose";
        joven.edad = 41;
        joven.activo = true;
    }

    function obtenerValoresPersona()
        public
        view
        returns (
            string memory,
            int256,
            bool
        )
    {
        return (joven.nombre, joven.edad, joven.activo);
    }

    /******************************************************** Ejercicio 2 ***********************************************************/
    // estructura nueva
    struct Carro {
        string nombre;
        int256 anio;
        bool usado;
    }

    // Asignacion de valores a la estructura (inicializacion)
    Carro public carroEjemplo = Carro("Toyota", 2025, false);

    // Creando arreglo para lamacenar carros
    Carro[] public listaDeCarros;

    //funcion para agregar carros
    function agregaCarros(string memory _nombre, int _anio, bool _nuevo) public {
        Carro memory nuevoCarro = Carro(_nombre, _anio, _nuevo);
        listaDeCarros.push(nuevoCarro);
    }

    // Funcion para obtener carros
    function obtenerCarroInformacion(uint _index) public view returns(string memory, int, bool){
        Carro storage carro = listaDeCarros[_index];
        return (carro.nombre, carro.anio, carro.usado);
    }
}
