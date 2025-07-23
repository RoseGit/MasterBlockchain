// scripts/deploy.js
async function main() {
  const Mycontract = await ethers.getContractFactory("MiPrimerContrato");
  const contrato = await Mycontract.deploy();

  await contrato.deployed();
  console.log("Contrato desplegado en:", contrato.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
