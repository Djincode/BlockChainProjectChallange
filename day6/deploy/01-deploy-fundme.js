const {network } = require("hardhat")
const {networkConfig,developmentChains} =require("../helper-harhad-config");
const {verify} = require("../utils/verify");
require("dotenv").config();

/////////////
module.exports = async ({getNamedAccounts, deployments}) =>{
    const {deploy, log} = deployments;
    const {deployer} = await getNamedAccounts();
    const chainId = network.config.chainId;

    let ethUsdPriceFeedAddress;

}