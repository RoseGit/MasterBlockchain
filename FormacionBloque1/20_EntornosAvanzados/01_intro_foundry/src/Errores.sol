// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Errores{
    //error personalizado 
    error NoAuthorizado();

    function throwError() external pure{
        require(false, "No autrizado");
    }

    function throwCustomError() public pure {
        revert NoAuthorizado();
    }
}