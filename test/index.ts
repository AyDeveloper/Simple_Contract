import { expect } from "chai";
import { ethers } from "hardhat";

describe("Simple", function () {
  it("Should check balance of tax payer", async function () {
    // deploy contract
    const Simple = await ethers.getContractFactory("Simple");
    const simple = await Simple.deploy();
    await simple.deployed();

    // set owners
    const owners = await ethers.getSigners();
    const answer = await simple.tax(owners[0].address);
    const answer1 = await simple.tax(owners[1].address);
    const usertax = await simple.checkTax(owners[0].address);
    const usertax1 = await simple.checkTax(owners[0].address);
    // set the amount to be sent in a payable function
    const option = {value: ethers.utils.parseEther('1.0')};

    // makes new payment for owner[0]
    const tx = await simple.paytax(owners[0].address, option);
    // checks for a user that already paid tax
    expect(usertax[0].toString()).to.equal(`${answer}`);
    // checks a default user
    expect(usertax1[0].toString()).to.equal(`${answer1}`);
  });
  it("Should ensure payment of tax fee is greater", async function () {
    // deploy contract
    const Simple = await ethers.getContractFactory("Simple");
    const simple = await Simple.deploy();
    await simple.deployed();
    const option = {value: ethers.utils.parseEther('1.0')};
    const owners = await ethers.getSigners();
    const tx = simple.paytax(owners[0].address, option);
    const fee = 10**18;
    expect((await tx).value.toString()).to.equal(`${fee}`);
  });
});
