// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {Eventos} from "../src/Eventos.sol";

// forge test --match-path test/Eventos.t.sol -vvvvv
contract EventosTest is Test{
    Eventos public eventos;
    event Transfer(address indexed from, address indexed to, uint256 amount);

    function setUp() public{
        eventos = new Eventos();
    }

    function testEmitTransferEvent() public{
        //1. Indica a foundry que datos debe comprobar 
        vm.expectEmit(true, true, false, true);

        //2. emite el evento esperado , 0x0000000000000000123
        emit Transfer(address(this), address(123), 200);

        //3. Llamar a la funcion que debería emitir el evento         
        eventos.transfer(address(this), address(123), 200);

        //comprobar solo 1 indice 
        vm.expectEmit(true, false, false, false);
        emit Transfer(address(this), address(125), 400);
        eventos.transfer(address(this), address(125), 400);
    }

    function testEmitManyTransferEvent() public{
        address[] memory to = new address[](2);
        to[0] = address(10);
        to[1] = address(11);

        uint256[] memory amounts = new uint256[](2);
        amounts[0] = 150;
        amounts[1] = 250;

        for(uint256 i = 0; i < to.length; i++){
            //1. Indica a foundry que datos debe comprobar
            vm.expectEmit(true, true, false, true);

            //2. emite el evento esperado , 0x0000000000000000123
            emit Transfer(address(this), to[i], amounts[i]);
        }                

        //3. Llamar a la funcion que debería emitir el evento         
        eventos.tansferMany(address(this), to, amounts);
    }
}