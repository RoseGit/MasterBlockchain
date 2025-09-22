// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {SendEther} from "../src/SendEther.sol";
import "forge-std/console.sol";

// forge test --match-path test/SendEther.t.sol -vvv 
contract SendEtherTest is Test{
    SendEther public sendEther;

    function setUp() public {
        sendEther = new SendEther();
    }

    function _send(uint256 amount) private {
        (bool ok, ) = address(sendEther).call{value: amount}("");
        require(ok, "send ether fail ");
    }

    function testEtherBalance() public view {
        console.log("Ether balance ", address(this).balance/1e18);
    }

    function testSendEther() public{

        uint bal = address(sendEther).balance;

        //nos permite a un address agrergarle un valor eth de saldo
        deal(address(1), 100);
        assertEq(address(1).balance, 100);

        // borra el saldo anterior y setea un nuevo saldo 
        deal(address(1), 10);
        assertEq(address(1).balance, 10);

        // hoax
        deal(address(1), 145);
        vm.prank(address(1));// me establece como msg.sender
        _send(145);

        //esto mismo se hace con hoax
        hoax(address(1), 567);
        _send(567);

        assertEq(address(sendEther).balance, bal+145+567);
    }
}