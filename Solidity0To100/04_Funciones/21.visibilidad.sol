/*
Modificadors de visibilidad

public -> configuracion default 
private -> Solo desde el contrato
internal -> Solo desde el contrato pero ademas Accesibles desde contratos heredados
external -> solo desde fuera del contrato

function <nombre_funcion> () [public | private | internal | external]{
    ... 
}
*/

// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract TestVisibilidad {        
    uint public numeroPublico;
    uint private numeroPrivado;
    uint internal numeroInternal;
    
    //funcion que se llama solo  desde fuera del contrato 
    function setNumeroExternal(uint _nuevoNuero) external {
        numeroPublico  =  _nuevoNuero;
    }

    //funcion que se llama solo desde este contrato 
    function setNumeroPrivado(uint _nuevoNumero) private {
        numeroPrivado = _nuevoNumero;
    }

    function setNumeroInterno(uint _nuevoNumero) internal{
        numeroInternal = _nuevoNumero;
    }

    function actualizarNumeros(uint _nuevoNumero)public{
        setNumeroInterno(_nuevoNumero);
        setNumeroPrivado(_nuevoNumero);
    }

    function getTestExternal()external view returns(uint){
        return numeroPublico;
    }
}

contract ContratoDerivado is TestVisibilidad {
    //funcion publica que llame a la funcion internal del contato base
    function actualizarNumeroDesdeDerivado(uint _nuevoNumero) public {
        setNumeroInterno(_nuevoNumero);
    }
}