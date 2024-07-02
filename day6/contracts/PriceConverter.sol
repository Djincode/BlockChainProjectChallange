// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

library PriceConverter {
 
 
function getPrice(AggregatorV3Interface dataFeed) internal  view  returns (uint256) {
    
   (,int answer,,,) = dataFeed.latestRoundData();
   return uint256 (answer * 1e10);
}

function getVersion () internal  view  returns(uint256) {
    AggregatorV3Interface dataFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
     return dataFeed.version();
}

function getConversationRate(uint256 ethAmount, AggregatorV3Interface dataFeed ) internal  view returns(uint256){
uint256 ethPrice = getPrice(dataFeed);
uint256 AmountInUsd = (ethPrice * ethAmount)/1e18;
return AmountInUsd;
}

}