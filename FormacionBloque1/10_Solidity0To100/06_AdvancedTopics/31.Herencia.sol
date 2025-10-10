/*
Herencia 

-functions
- herencia 
- override
*/

// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0<0.9.0;
contract A {
    function foo()virtual public pure returns(string memory) {
        return "A";
    }

    function bar()virtual public pure returns(string memory) {
        return "A";
    }

    function baz() public pure returns(string memory) {
        return "A";
    }
}

contract B is A{
    function foo() override public pure returns(string memory) {
        return "B";
    }

    function bar()virtual override public pure returns(string memory) {
        return "B";
    }
}

contract C is B{
 function bar()override public pure returns(string memory) {
        return "C";
    }   
}