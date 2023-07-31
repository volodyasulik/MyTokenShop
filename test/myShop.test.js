const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyShop", () => {
  let MyShop;
  let myShop;
  let owner;
  let buyer;

  beforeEach(async () => {
    [owner, buyer] = await ethers.getSigners();
    MyShop = await ethers.getContractFactory("MyShop");
    myShop = await MyShop.deploy();
    await myShop.deployed();
  });

  it("should deploy with the correct owner", async () => {
    expect(await myShop.owner()).to.equal(owner.address);
  });

  it("should allow buying tokens", async () => {
    const tokensToBuy = ethers.utils.parseUnits("5", 0);

    const initialBalance = await buyer.getBalance();
    const tx = await myShop.connect(buyer).buy({ value: tokensToBuy });
    const receipt = await tx.wait();
    const gasUsed = receipt.gasUsed.mul(tx.gasPrice);
    const finalBalance = await buyer.getBalance();

    expect(finalBalance).to.equal(initialBalance.sub(gasUsed).sub(tokensToBuy));
    expect(await myShop.tokenBalance()).to.equal(20 - tokensToBuy);
  });

  it("should allow selling tokens", async () => {
    const tokensToBuy = ethers.utils.parseUnits("5", 0);
    await myShop.connect(buyer).buy({ value: tokensToBuy });

    const tokensToSell = 2;
    await myShop.connect(owner).approve(tokensToSell);
    const initialBalance = await owner.getBalance();
    const tx = await myShop.connect(owner).sell(tokensToSell);
    const receipt = await tx.wait();
    const gasUsed = receipt.gasUsed.mul(tx.gasPrice);
    const finalBalance = await owner.getBalance();

    expect(finalBalance).to.equal(
      initialBalance.add(tokensToSell).sub(gasUsed)
    );
  });

  // it("should mint ERC721 token correctly", async () => {
  //   const tokenId = 1;
  //   const amount = 1;

  //   await myShop._mintERC721Token(tokenId, amount);

  //   expect(await myShop.NFTtoken.ownerOf(tokenId)).to.equal(owner.address);
  // });

  // it("should mint ERC1155 token correctly", async () => {
  //   const tokenId = 2;
  //   const amount = 2;
  //   const data = ethers.utils.toUtf8Bytes("data");

  //   await myShop._mintERC1155Token(tokenId, amount, data);

  //   expect(
  //     await myShop.ERC1155Token.balanceOf(owner.address, tokenId)
  //   ).to.equal(amount);
  // });
});
