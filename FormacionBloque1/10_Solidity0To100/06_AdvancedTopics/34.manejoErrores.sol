/*
3 formas de manejar un error require, revert, assert
Cuando ocurre un errror Rembolso de gas y las actualizaciones de estado se revierten 
A partir de version 0.8 => errores personalizados ahorran gas 
*/

// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 < 0.9.0;

contract TestError {

    uint public num = 123;

    function testRequiere(uint _i) public pure {
        require(_i <= 10, "i  es mayor a 10");
        //codigo adicional         
    }

    function testRevert(uint _i) public pure {
        if(_i > 10 ){            
            revert("i es mayor a 10 ");
        }
    }

    function testAssert() public view{
        assert(num == 12);

    }

    error MyError(address caller, uint i);

    function testErrorPersonalizado(uint _i) public view{
        if(_i > 10){
            revert MyError(msg.sender, _i);
        }
    }
}