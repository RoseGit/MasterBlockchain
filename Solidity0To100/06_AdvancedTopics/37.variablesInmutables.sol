// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;
contract Testinmutable {

    //una vez inidializada NO puedo cambiar el valor de la variable nunca 
    address public immutable owner = msg.sender;

    //sin inmmutable 
    //address public owner = msg.sender;

    uint public x;

    /*constructor() {
        owner = msg.sender;
    }*/

    function foo() external{
        require(msg.sender == owner);
        x += 1;
    }
}