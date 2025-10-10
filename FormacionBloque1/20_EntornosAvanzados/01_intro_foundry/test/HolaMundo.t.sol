// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {HolaMundo} from "../src/HolaMundo.sol";

//para solo ejecutar las pruebas de un archivo en especifico 
//  forge test --match-path test/HolaMundo.t.sol -vvv

// Para mostrar el reporte de gas consumido 
//  forge test --match-path test/HolaMundo.t.sol --gas-report
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