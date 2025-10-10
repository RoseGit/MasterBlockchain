/*
El fallback se ejecuta cuando. 
    - la funcion no existe
    - Se envia ETH directamente

    fallback() or receive()

    Ether is sent to contract 
                |
       is msg.data empty ? 
            /       \
          yes       No
          /          \
receive() exist?   fallback()     
        /    \
      yes    No
      /        \
received()     fallback() 
*/

// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract FallbackReceive {
    fallback() external payable { }
    receive() external payable { }
    
}