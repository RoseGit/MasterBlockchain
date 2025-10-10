/*
Eliminar elementos de un array

- function
- construct
- modifier
- keccak256
*/

// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract ControlAcceso {
    event AsignarRole(bytes32 indexed role, address indexed account);
    event RevocarRole(bytes32 indexed role, address indexed account);

    //role => account => bool
    mapping (bytes32 => mapping (address => bool)) public roles;

    // Hash ADMIN: 0xdf8b4c520ffe197c5343c6f5aec59570151ef9a492f2c624fd45ddde6135ec42
    bytes32 private constant ADMIN = keccak256(abi.encodePacked("ADMIN"));
    // Hash USER: 0x2db9fd3d099848027c2383d0a083396f6c41510d7acfd92adc99b6cffcf31e96
    bytes32 private constant USER = keccak256(abi.encodePacked("USER"));

    // Solo administradores
    modifier onlyAdmin(bytes32 _role){
        require(roles[_role][msg.sender], "No autorizado");
        _;
    }

    constructor() {
        _asignarRole(ADMIN, msg.sender);
    }

    function _asignarRole(bytes32 _role, address _account)internal  {
        roles[_role][_account] = true;
        emit AsignarRole(_role, _account);
    }

    function _revocarRole(bytes32 _role, address _account)internal  {
        roles[_role][_account] = false;
        emit AsignarRole(_role, _account);
    }

    function asignarRole(bytes32 _role, address _account) external onlyAdmin(ADMIN){
        _asignarRole(_role, _account);
    }

    function revocarRole(bytes32 _role, address _account) external onlyAdmin(ADMIN){
        _revocarRole(_role, _account);
    }
}