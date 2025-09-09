// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {Billetera} from "../src/Billetera.sol";

// forge test --match-path test/Billetera.t.sol --vvv
contract BilleteraTest is Test{
    Billetera public billetera;

    function setUp() public {
        billetera = new Billetera();        
    }
    
    function testSetOwner() public {
        billetera.convertirEnDuenio(address(1));//0x000000000000001 ej.
        assertEq(billetera.owner(), address(1));
    }

    
    function test_Revert_SetOwnerAgain() public {
        // msg.sender == address(this);
        billetera.convertirEnDuenio(address(1));

        //version 1 
        vm.prank(address(1));
        billetera.convertirEnDuenio(address(1));

        vm.prank(address(1));
        billetera.convertirEnDuenio(address(1));


        vm.startPrank (address(1));
            billetera.convertirEnDuenio(address(1));
            billetera.convertirEnDuenio(address(1));
            billetera.convertirEnDuenio(address(1));

        vm.stopPrank();
    }
}