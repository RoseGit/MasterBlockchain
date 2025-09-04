// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {stdError} from "forge-std/Test.sol";
import {HolaMundo} from "../src/HolaMundo.sol";

contract HolaMundoTest is Test {
    HolaMundo public holaMundo;

    //inicializa nuestra variable para cada prueba
    function setUp() public {
        holaMundo = new HolaMundo();
    }

    function testObtenerMensaje() public view{
        string memory mensaje = holaMundo.obtenerMensaje();
        assertEq(mensaje, "Hola mundo desde foundry");
    }

    function testActualizaMensaje()public {
        string memory nuevoMensaje = "Hola desde el test";
        holaMundo.actualizarMensaje(nuevoMensaje);
        string memory mensajeActualizado = holaMundo.obtenerMensaje();
        assertEq(mensajeActualizado, nuevoMensaje);
    }
}