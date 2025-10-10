/*
Tipo de dato estructurado que almacena un conjunto homogeneo de datos

//array de longitud fija 
<tipo de dato> [<longitud>] [public]* <nombre_array>;

//array dinamico 
<tipo de dato> [] [public]* <nombre_array>;

trabajar con arrays 
Para acceder a un elemento del array necesitamos su posicion 
<nombre_array>[<posicion>];

//Para fijar el valor de una posiion del array 
<nombre_array>[<posicion>] = <valor>

funcion push() y .lenght
La funcion push no se debe usar para arrays con posicion fija
solo para arrays dinamicos 
<nombre_array>.push(<valor>)

*/

// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract TesArrat {
    /*********ejemplo 1**************/
    //Array de entero de longitud fija, definir e inicializar
    uint256[3] public numerosFijos = [1, 2, 3];

    //Array de enteros de longitud dinamica
    uint256[] public numerosDinamicos = [1, 2, 3, 4, 5];

    /*********ejemplo 2**************/
    //array dinamico
    string[] private nombres;

    function addNombres(string memory _nombre) public {
        nombres.push(_nombre);
    }

    //devuelve el nombre segun el indice del arreglo
    function getNombres(uint256 _index) public view returns (string memory) {
        return nombres[_index];
    }

    /*********ejemplo 2**************/
    // Estructura estudiantes 
    struct Estudiante{
        string nombre;
        uint edad;
        string curso;
    }

    Estudiante[] private universitarios;

    // Agrega un universitario a un array
    function addEstudiante(string memory _nombre, uint _edad, string memory _curso) public {
        universitarios.push(Estudiante(_nombre, _edad, _curso));
    }

    // Obtiene esos estudiantes por indice
    function name(uint _index) public view returns(string memory){
        return universitarios[_index].nombre;
    }

    // Nos devuelva el numero total de estudiantes 
    function obtenrNumroEstudiantes() public view returns(uint){
        return universitarios.length;
    }
}