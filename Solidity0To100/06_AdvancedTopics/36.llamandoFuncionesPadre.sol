/*
Llamando funciones del padre 
- de forma directa
- utilizando la palabra reservada super
    E
  /  \
  F   G
  \   /
    H
*/

// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract E {
    event Log(string message);

    function foo() public virtual{
        emit Log("E.foo Original");
    }

    function bar() public virtual{
        emit Log("E.bar Original");
    }
}

contract F is E{    

    function foo() public override virtual{
        emit Log("F.foo SobreEscrita en F");
        
        E.foo();//llamando a la funcion directamente
    }

    function bar() public override virtual{
        emit Log("F.bar SobreEscrita en F");

        super.foo();//Llamando a la funcion del padre mediante la palabra reservada super
    }
}

contract G is E{    

    function foo() public override virtual{
        emit Log("G.foo SobreEscrita en G");
        
        E.foo();//llamando a la funcion directamente
    }

    function bar() public override virtual{
        emit Log("G.bar SobreEscrita en G");

        super.foo();//Llamando a la funcion del padre mediante la palabra reservada super
    }
}

contract H is F,G{    

    function foo() public override(F,G){                
        F.foo();//llamando a la funcion directamente
    }

    function bar() public override(F,G){        
        super.foo();//Llamando a la funcion del padre mediante la palabra reservada super
    }
}