// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract CodeCryptoDocumento{
    Documento[] public documentos;
    uint private idDocumento = 0;

    struct Documento{
        string hashDocumento;
        string path;
        uint idDocumento;
    }

    constructor(){
        setDocumento("0","0");
    }

    function setDocumento(string memory _hashDocumento, string memory _path) public{
        documentos.push(Documento({
            hashDocumento:_hashDocumento,
            path: _path,
            idDocumento: idDocumento
        }));

        idDocumento++;
    }

    function getHashDocumento(uint _idDocumento) public  view returns(string memory){
        return documentos[_idDocumento].hashDocumento;
    }

    function getPathDocumento(uint _idDocumento) public view returns (string memory){
        return documentos[_idDocumento].path;
    }
}