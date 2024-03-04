// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./priceconverter.sol";

/// @title A crowd funding contract
/// @author Mr John Adeleke
/// @notice This contract is a demo fundung contract
/// @dev this implememnts price feeds as our libary
contract FundMe {
    address public immutable i_owner;
    using PriceConverter for uint256;
    uint256 public minimumUsd = 50 * 1e18;
    address[] private s_funders;
    mapping(address => uint256) private s_addressToToken;
    // Making the pricefeed private
    AggregatorV3Interface private s_priceFeed;

    constructor(address s_priceFeedAddress) {
        s_priceFeed = AggregatorV3Interface(s_priceFeedAddress);
        i_owner = msg.sender;
    }

    function fund() public payable {
        // msg.value = msg.sender.balance;
        require(
            (msg.value.getConversionRate(s_priceFeed)) >= minimumUsd,
            "Not enough amount"
        );
        s_funders.push(msg.sender);
        s_addressToToken[msg.sender] += msg.value;
    }

    modifier _only_owner() {
        require(msg.sender == i_owner, "You are not the i_owner");
        _;
    }

    function withdraw() public _only_owner {
        require(
            msg.sender == i_owner,
            "You are not the i_owner of the contract"
        );
        for (
            uint funderIndex = 0;
            funderIndex < s_funders.length;
            funderIndex++
        ) {
            address funder = s_funders[funderIndex];
            s_addressToToken[funder] = 0;
        }
        //reset the array
        s_funders = new address[](0);

        // TO WITHDRAW FUNDS
        //using transfer
        // payable(msg.sender).transfer(address(this).balance);
        //using send

        // bool sendSuccess = payable(msg.sender).send(address(this).balance);
        // require(sendSuccess);

        // using call method
        (bool callSuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(callSuccess, "failed");
    }

    receive() external payable {
        fund();
    }

    fallback() external payable {
        fund();
    }

    function cheaperWithrawal() public payable _only_owner {
        address[] memory funders = s_funders;
        for (
            uint funderIndex = 0;
            funderIndex < funders.length;
            funderIndex++
        ) {
            address funder = s_funders[funderIndex];
            s_addressToToken[funder] = 0;
        }
        s_funders = new address[](0);

        (bool success, ) = payable(i_owner).call{value: address(this).balance}(
            ""
        );
        require(success, "error");
    }

    function getOwner() public view returns (address) {
        return i_owner;
    }

    function getFunder(uint256 index) public view returns (address) {
        return s_funders[index];
    }

    function getAccountoAmountFunded(
        address funder
    ) public view returns (uint256) {
        return s_addressToToken[funder];
    }

    function getPriceFeed() public view returns (AggregatorV3Interface) {
        return s_priceFeed;
    }
}
