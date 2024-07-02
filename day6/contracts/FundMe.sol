// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0; 

//get funds from users;
//withdraw funds;
//set a minimum fund/withdraw limit in usd


import './PriceConverter.sol';

contract FundMe {

       using PriceConverter for uint256;

uint256 public minimumUsd = 50*1e18;
address[] public funders;
mapping(address=>uint256) public addressToAmountFunded;
address public owner;
AggregatorV3Interface public dataFeed;

  constructor(address dataFeedAddress) {
        dataFeed = AggregatorV3Interface(dataFeedAddress) ;
        owner = msg.sender;
    }



function fund() public payable {
uint256 minimumEth = minimumUsd / PriceConverter.getPrice(dataFeed);
require(msg.value > minimumEth,"Did not sent enough!"); // minimum limiti teyin edir,msg.value gonderilen coinin deyeridi
funders.push(msg.sender);
addressToAmountFunded[msg.sender] += msg.value;
}





function withdraw() public  onlyOwner {
  for(uint256 funderIndex=0; funderIndex < funders.length; funderIndex++){
    address funder = funders[funderIndex];
    addressToAmountFunded[funder] = 0;
  }

  funders = new address[](0);

  //withdraw elemeyin 3 yolu var:
  //transfer:
//   payable(msg.sender).transfer(address(this).balance);

  //send :
//   bool sendSuccess = payable(msg.sender).send(address(this).balance);
//   require(sendSuccess, "Failed"); 

  //call: (en serfelisi budu ve bunnan istifade edeceyik)

  (bool sendSucess,)=payable(msg.sender).call{value: address(this).balance}("") ;
  require(sendSucess, "Call failed");

  
}
 modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }
}