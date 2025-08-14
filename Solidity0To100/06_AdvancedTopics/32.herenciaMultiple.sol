/*
Herencia multiple 
- function
- herencia 
- override 
- herencia multiple 

el orden de la herencia es muy importante (Del mas basico a la derecha)
Y herede de X y X no hereda de otro contracto por lo tanto el contrato mas basico es X
   X(1)
  /   |
 Y(2) |
 \    |
  Z(3)|
*/

// SPDX-License-Identifier: MIT
pragma solidity >= 0.8.0<0.9.0;
contract X{
    function foo()public pure virtual returns(string memory) {
        return "X";
    }

    function bar()public pure virtual returns(string memory) {
        return "X";
    }

    function baz()public pure returns(string memory) {
        return "X";
    }
}

contract Y is X{

    function foo() override public pure virtual returns(string memory) {
        return "Y";
    }

    function bar()override public pure virtual returns(string memory) {
        return "Y";
    }

    function y() public pure virtual returns(string memory) {
        return "Y";
    }
}

// X es el mas simple por eso va primero
contract Z is X, Y{
    function foo() public pure override(X, Y) returns(string memory) {
        return "Z";
    }

    function bar() public pure override(X,Y) returns(string memory) {
        return "Z";
    }
}