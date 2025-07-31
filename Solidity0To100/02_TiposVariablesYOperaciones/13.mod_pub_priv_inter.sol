/*
1:52
Si añadimos el modificador public al declarar una variable, se creara una funcion getter (funcion que permite consultar su valor )

<tipo_dato> [public]* <nombre_variable>

Private: Las variables private solo son visibles desde dentro del contrato en que se definen.
Internal: las variables internal solo son accesibles internamente desde el contrato y desde los contratos que hereden de el.

<tipo_dato> [private|internal]* <nombre_variable>
*/

// SPDX-License-Identifier: MIT 
pragma solidity >=0.8.0 <0.9.0;

contract Modificadore {
    // modificador public
    uint256 public numero = 8;
    string public texto = "Hola mundo public";
    bool public booleano = true;
    address public direction = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;

    //modificador private (solo accesible desde el contrato )
    uint256 private numeoPrivado = 20;
    string private textoPrivado = "Hola mundo privado ";
    bool private booleanoPrivado = true;

    function testTextoPrivate() public view returns (string memory) {
        return textoPrivado;
    }

    function testNumeroPrivate() public view returns (uint256) {
        return numeoPrivado;
    }

    function testBooleanPrivate() public view returns (bool) {
        return booleanoPrivado;
    }

    // modificador Internal (solo accesible desde el contrato o contratos que hereden de el )
    uint256 internal numeoInternal = 50;
    string internal textoInternal = "Hola mundo internal ";
    bool internal booleanoInternal = true;

    function testNumeroInternal() public view returns (uint256) {
        return numeoInternal;
    }

    function testStringInternal() public view returns (string memory) {
        return textoInternal;
    }

    function testBooleanInternal() public view returns (bool) {
        return booleanoInternal;
    }
}


contract ModificadoresHijos is Modificadore{
    function testStringInternalHijo() public view returns (string memory) {
        return textoInternal;
    }
}