// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import "forge-std/console.sol";
import {IERC20} from "./interfaces/IERC20.sol";

//  forge test --fork-url https://eth-mainnet.g.alchemy.com/v2/xxaGxUSUYSvm6zgTkKw6gKkydvutjWWn --match-path test/ForkDAI.t.sol -vvv
contract ForkDAITest is Test{
    IERC20 public dai;
    function setUp() public{
        dai = IERC20(0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2);
    }

    function testDeposit() public{
        address andrea = address(123);

        uint256 balanceInicial = dai.balanceOf(andrea);
        console.log("Balance Inicial ",balanceInicial/1e18);

        uint256 totalInicial = dai.totalSupply();
        console.log("Total Inicial ",totalInicial / 1e18);

        deal(address(dai), andrea, 1e6 * 1e18, true);

        uint256 balanceFinal = dai.balanceOf(andrea);
        console.log("Balance Final ",balanceFinal/1e18);

        uint256 totalFinal = dai.totalSupply();
        console.log("Total Final ",totalFinal / 1e18);
    }
}