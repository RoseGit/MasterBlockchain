// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;
contract Counter {
    
    uint count;
    function inc() external {
        count +=1;
    }

    function dec() external{
        count -=1;
    }
}