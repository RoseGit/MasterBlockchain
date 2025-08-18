/*

*/

// SPDX-License-Identifier: MIT
pragma solidity >0.8.0 <0.9.0;

contract LlamarContratoPrueba {
    //funcion para establecer el valor de x, en el ContratoPrueba
    //Forma 1 de llamar funciones desde otro contrato
    function setX(ContratoPrueba _test, uint _x) external{
        _test.setX(_x);
    }

    //funcion para obtener el valor de X en el contrato ContratoPrueba
    //forma 2 de llamar funcoines desde otro contrato
    function getX(address _test) external view returns (uint _x){
        _x = ContratoPrueba(_test).getX();
    }

    // funcion para establecer el valor de x y enviar el ether al contratoPrueba
    function setXAndSendEther(address _test, uint _x) external payable {
        ContratoPrueba(_test).setXAndReceiveEther{value:msg.value}(_x);
    }

    // Funcion para obtener el valor de x el valor de eth almacenado en ContratoPrueba
    function getXAndValue(address _test) external view returns(uint x, uint value){
        (x, value) = ContratoPrueba(_test).getXAndValue();
    }

}

contract ContratoPrueba {
    uint public x;
    uint public value = 123;

    function setX(uint _x) external {
        x = _x;
    }

    function getX() external view returns(uint){
        return x;
    }

    function setXAndReceiveEther(uint _x) external payable {
        x = _x;
        value = msg.value;
    }

    function getXAndValue() external view returns(uint, uint){
        return (x, value);
    }
}