//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Simple {

        // event that emits when users pay tax;
        event CheckTaxpayer(address indexed taxpayer, uint amount);

        // maps and address to uint of tax paid
        mapping(address => uint) public tax; 
        // amount of tax payable 
        uint taxFee = 10**18;
        // called when a user wants to payTax
        function paytax(address _taxpayer)  public payable returns(bool _status){
            require(msg.value == taxFee, "Oh sorry!, Pay exact amount of tax(1ETH)");
            tax[_taxpayer] += msg.value;
            emit CheckTaxpayer(_taxpayer, msg.value);
            _status = true;
            console.log(_status);
        }

        // called when users want to check tax paid
        function checkTax(address _taxPayer) public  view returns (uint, string memory) {
            if(tax[_taxPayer] == 0) {
                return (tax[_taxPayer], "Tax Not Paid");
            }
            return (tax[_taxPayer], "Tax Paid");
        }
}
