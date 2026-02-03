const ex = require('express')
const Web3 = require('Web3')
const cors = require('cors')
require('dotenv').config()

const servidor = ex()

servidor.use(cors())

const URL_INFURA = process.env.URL_INFURA

const web3 = new Web3(URL_INFURA)

servidor.get("/", async (req,res) => {
    const numBloque = await web3.eth.getBlockNumber()
    res.send({numBloque})
})

servidor.get("/bloque/:numBloque", async (req,res) => {
    try{
        const bloque = await web3.eth.getBlock(req.params.numBloque)
        res.send(bloque)
    }catch(error) {
        res.status(500).send({mensaje: error.message})
    }
})

servidor.get("/tx/:numTx", async (req,res) => {
    const tx = await web3.eth.getTransaction(req.params.numTx)
    res.send(tx)
})


servidor.get("/saldo/:dir", async (req,res) => {
    const saldo = await web3.eth.getBalance(req.params.dir)
    res.send({saldo, ethers: saldo/1e18, ethers2: web3.utils.fromWei(saldo, 'ether')})
})

servidor.listen(3333)