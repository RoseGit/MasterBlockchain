/*
view: No midifica los datos pero accede a ellos 
Pure: No accede ni siquiera los datos
Payable: Permite recibir ether

function <nombre_funcion>(<tipos_parametros>)[public | private][view |pure|payable]* [returns(<return_types>)]*{
    ...
    [return(<return_valores>)]*
}
*/

// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract TestModificadores {
    //Modificador view
    string[] public nombres;
    uint256 x = 10;

    function agregarNombres(string memory _nombre) public {
        nombres.push(_nombre);
    }

    function verNombre(uint256 _index) public view returns (string memory) {
        return nombres[_index];
    }

    function sumarAyX(uint256 _a) public view returns (uint256) {
        return _a + x;
    }

    function multiplicar(uint _a, uint _b) public pure returns(uint){
        return _a * _b;
    }

    mapping(address => Cartera) public saldoCartera;
    struct Cartera{
        string nombre;
        address direccion;
        uint saldo;
    }

    function agregarSaldo(string memory _nombre) public payable {
        Cartera memory cartera = Cartera(_nombre, msg.sender, msg.value);
        saldoCartera[msg.sender] = cartera;
    }

    function verSaldo() public view returns(Cartera memory){
        return saldoCartera[msg.sender];
    }
}
