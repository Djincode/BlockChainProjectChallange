// import { ethers } from "ethers";
// import fs from "fs";

// async function main() {
//     const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");
//     const wallet = new ethers.Wallet(
//         "0x09bf2c926af1e26f4383ddf29214d3ed6441efbdefd66c105e1c9b1fa1d9f06c",
//         provider
//     );

//     const abi = fs.readFileSync("../day2_SimpleStorage_sol_SimpleStorage.abi", "utf8");
//     const binary = fs.readFileSync("../day2_SimpleStorage_sol_SimpleStorage.bin", "utf8");
//     const contractFactory = new ethers.ContractFactory(abi, binary, wallet);

//     console.log("Deploying, please wait...");
//     const contract = await contractFactory.deploy();
//     console.log("Contract deployed at address:", contract.address);
// }

// main()
//     .then(() => process.exit(0))
//     .catch((error) => {
//         console.error(error);
//         process.exit(1);
//     });

// import { ethers } from "ethers";
// import fs from "fs/promises"; // fs/promises kullanarak async/await ile dosya okuma işlemleri yapmak daha uygundur

// async function main() {
//     const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");
//     const wallet = new ethers.Wallet(
//         "0x09bf2c926af1e26f4383ddf29214d3ed6441efbdefd66c105e1c9b1fa1d9f06c",
//         provider
//     );

//     const abi = await fs.readFile("../day2_SimpleStorage_sol_SimpleStorage.abi", "utf8");
//     const binary = await fs.readFile("../day2_SimpleStorage_sol_SimpleStorage.bin", "utf8");
//     const contractFactory = new ethers.ContractFactory(abi, binary, wallet);

//     console.log("Deploying, please wait...");
    
//     // Gaz limitini manuel olarak ayarlayarak deploy işlemi
//     const contract = await contractFactory.deploy({
//         gasLimit: 6721975,
//         gasPrice:20000000000,
//     });
//      await contract.deploymentTransaction().wait(2);

//     // await contract.deployTransaction.wait(); // Kontratı dağıttıktan sonra işlemin tamamlanmasını bekleyin
//     console.log("Contract deployed at address:", contract.address);
// }

// main()
//     .then(() => process.exit(0))
//     .catch((error) => {
//         console.error(error);
//         process.exit(1);
//     });

const { ethers, JsonRpcProvider } = require('ethers');
const fs = require('fs').promises;
async function main() {
  const provider = new JsonRpcProvider("http://127.0.0.1:7545");

  const wallet = new ethers.Wallet(
    "0x09bf2c926af1e26f4383ddf29214d3ed6441efbdefd66c105e1c9b1fa1d9f06c", //replace with ganache private key
    provider
  );

  const abi = await fs.readFile("../day2_SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = await  fs.readFile("../day2_SimpleStorage_sol_SimpleStorage.bin", "utf8");
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log('Deploying, Please wait...');
  const contract = await contractFactory.deploy({
    gasPrice:20000000000,
    gasLimit:6721975,
  });
  const deploymentReceipt = await contract.deploymentTransaction.wait(2);// This line has the issue.
  console.log(deploymentReceipt);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

