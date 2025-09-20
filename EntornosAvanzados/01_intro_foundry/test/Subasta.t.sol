// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {Subasta} from "../src/Subasta.sol";

// forge test --match-path test/Subasta.t.sol -vvv
contract Subastatest is Test{
    Subasta public subasta;
    uint256 private inicio;
    
    function setUp() public{
        subasta = new Subasta();
        inicio = block.timestamp;
    }

    function testOfertaAntesDeTiempo () public {
        vm.expectRevert(bytes("no puede ofertar"));
        subasta.oferta();
    }

    function testOferta() public {
        vm.warp(inicio + 1 days);
        subasta.oferta();
    }

    function testOfertaFallaDespuesDeFin() public {
        vm.expectRevert(bytes("no puede ofertar"));
        vm.warp(inicio + 3 days);
        subasta.oferta();
    }

    function testTimestamp() public {
        uint t = block.timestamp;

        //skip - increment current timestamp
        skip(100);
        assertEq(block.timestamp, t + 100);

        // rewind - decrement current timestamp
        rewind(10);
        assertEq(block.timestamp, t + 90);        
    } 

    //permite alterar el numero de block
    function testBlockNumber() public {
        uint b = block.number;
        vm.roll(555);
        assertEq(b, 555);//fail
        //assertEq(block.number, 555);// ok 
    }
}