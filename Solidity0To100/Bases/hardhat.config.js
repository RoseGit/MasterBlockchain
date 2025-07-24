require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    # La red 'localhost' predeterminada de Hardhat a menudo ya apunta a 127.0.0.1:8545
    # Pero para Docker Compose, puedes definir una red específica para los servicios
    hardhat_node: { // Este nombre debe coincidir con el nombre del servicio en docker-compose.yml
      url: "http://hardhat_node:8545", // Usa el nombre del servicio como hostname
      // Puedes añadir chainId, accounts, etc. si necesitas
    },
    localhost: { // Asegúrate de que tu red localhost también pueda funcionar,
                 // pero hardhat_node es el nombre del servicio dentro de la red de docker-compose
       url: "http://127.0.0.1:8545", // Si accedes desde fuera de docker-compose
    },
  },
};
