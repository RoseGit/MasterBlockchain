/*
Los contratos con solidity pueden utilizar una forma especial de comentarios para proporcionar documentación rica para 
funciones , variables de retorno y más. Esta forma especial se denomina 
Formato de especificación del lenguaje natural de Ethereum (NatSpec).

Estandares de comentario: 
    /// @title <Titulo del contrato> 
    /// @author <Author del contrato>
    /// @notice <Explicar lo que hace el contrato o la función>
    /// @dev <detalles adicionales sobre el contrato o la función >
    /// @param <nombre_parametro> <Describe para que sirve el parámetro.>
    /// @return <valor_retorno> <Describe para qué sirve el valor de retorno>

    https://docs.soliditylang.org/en/latest/natspec-format.html
*/

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title Contrato Persona
/// @author Rose Garcia Cruz
/// @notice Contrato de ejemplo que retorna el nombre de una persona 
/// @dev Toda las funciones estan implementadas de forma didactica 

contract Persona{
    string private testNombre;

    /// @notice Guarda el nombre de una persona 
    /// @dev La variable testNombre se guarda en la Blockchain 
    function setNombre(string memory _nombre) public{
        testNombre = _nombre;
    }

    /// @return Retorna el nombre de la persona que ha sido guardada en la funcion setNombre
    function getNombre() public view returns (string memory){
        return testNombre;
    }

    /// @dev Devuelve solo un texto fijo
    /// @return Devuelve un string on la cantidad de poblacion muncial 
    function publacionMundial() external pure returns(string memory){
        string memory poblacion = 'Poblacion Mundial Actual: 8.083.080.515';
        return poblacion;
    }
}