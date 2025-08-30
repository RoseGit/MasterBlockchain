// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

// Para compilar con comando: 
// forge build
contract Counter {
    uint256 public number;

    function setNumber(uint256 newNumber) public {
        number = newNumber;
    }

    function increment() public {
        number++;
    }

     function decrement() public {
        number--;
    }
}
