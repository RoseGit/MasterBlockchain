// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {Errores} from "../src/Errores.sol";

//forge test --match-path test/Errores.t.sol -vvv
contract ErroresTest is Test{
    Errores public error;

    function setUp() public {
        error = new Errores();
    }

    function testThrowError() public view{
        error.throwError();
    }

    function testRevert() public {
        vm.expectRevert();
        error.throwError();
    }

    function testRequiereMessage() public {
        //vm.expectRevert(bytes("No authorizado rose"));//fail
        vm.expectRevert(bytes("No autrizado"));//pass
        error.throwError();
    }

    function testCustomError() public {
        vm.expectRevert(Errores.NoAuthorizado.selector);
        error.throwCustomError();
    }

    function testErrorLabel() public pure{
        //si falla una todo el set de prueba falla
        //para marcar nuestras assertions usamos labels 
        assertEq(uint256(1), uint256(1), "Test 1");
        assertEq(uint256(1), uint256(1), "Test 2");
        assertEq(uint256(2), uint256(1), "Test 3");
        assertEq(uint256(1), uint256(1), "Test 4");
        assertEq(uint256(1), uint256(1), "Test 5");
    }

}