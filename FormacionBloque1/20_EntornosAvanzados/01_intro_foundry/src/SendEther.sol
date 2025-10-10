// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract SendEther{
    address payable public owner;

    event Deposit(address account, uint256 amount);

    constructor() payable{
        owner = payable(msg.sender);
    }

    receive() external payable{
        emit Deposit(msg.sender, msg.value);
    }

    function retirar(uint256 _cantidad) external{
        require(msg.sender == owner, "No eres el owner");
        payable(msg.sender).transfer(_cantidad);
    }

    function convertirEnDuenio(address _owner) external {
        require(msg.sender == owner, "No eres el owner");
        owner = payable(_owner);
    }
    

}