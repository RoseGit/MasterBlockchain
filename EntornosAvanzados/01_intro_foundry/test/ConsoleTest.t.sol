// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";

import { console } from "forge-std/console.sol";


contract ConsoleTest is Test{

    function testLog() public pure{

        console.log("Log desde prueba ");

        //prueba de error 
        //la librería de consolo.log tiene diferentes variantes 
        int x = -1;
        console.logInt(x);
    }
}