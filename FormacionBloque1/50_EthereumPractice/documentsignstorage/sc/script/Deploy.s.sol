// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Script} from "forge-std/Script.sol";
import {DocumentRegistry} from "../src/DocumentRegistry.sol";

contract DeployScript is Script {
    function run() external {
        
        vm.startBroadcast();
        new DocumentRegistry();
        vm.stopBroadcast();
    }
}
