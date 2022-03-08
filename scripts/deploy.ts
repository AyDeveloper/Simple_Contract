// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  // get a list owners;
  const owners = await ethers.getSigners();
  const owner1 = owners[0].address;
  const owner2 = owners[1].address;

   // We get the contract to deploy
  const Simple = await ethers.getContractFactory("Simple");
  const simple = await Simple.deploy();
  await simple.deployed();
  console.log("Greeter:", simple.address);

  // The amount to send to a payable function
  const options = {value: ethers.utils.parseEther('1.0')};

  // When options1 is used it reverts because amount is expected to be grater than 1eth;
  // const options1 = {value: ethers.utils.parseEther('0.5')};

  // pay tax for owner1
  const tax = await simple.paytax(owner1, options);
  const tx = await tax.wait();
  // get the list of events after paying tax;
  // console.log(tx);
  // @ts-ignore
  // const event1 = await tx.events[0].args[0];
  // @ts-ignore
  // const event2 = await tx.events[0].args[1];
  // console.log(event1, event2);
  // @ts-ignore
  const events = tx.events[0].args;
  console.log(events);
  // check tax for a user that already paid tax
  const owner1res = await simple.checkTax(owner1);
  console.log(owner1res);

  // check tax for a user that has not paid tax
  const owner2res = await simple.checkTax(owner2);
  console.log(owner2res);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
