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
    await myShop.connect(buyer).approve(tokensToSell);
    const initialBalance = await buyer.getBalance();
    const tx = await myShop.connect(buyer).sell(tokensToSell);
    const receipt = await tx.wait();
    const gasUsed = receipt.gasUsed.mul(tx.gasPrice);
    const finalBalance = await buyer.getBalance();

    expect(finalBalance).to.equal(
      initialBalance.add(tokensToSell).sub(gasUsed)
    );
  });

  it("should mint ERC721 token correctly", async () => {
    const tokenId = 1;
    const amount = 1;

    const tokensToBuy = ethers.utils.parseUnits("5", 0);
    await myShop.connect(owner).buy({ value: tokensToBuy });
    const startBalance = await myShop.tokenBalance();

    await myShop.connect(owner).approve(amount);

    await myShop._mintERC721Token(tokenId, amount);

    const finishBalance = await myShop.tokenBalance();

    expect(finishBalance).to.equal(+startBalance + amount);
  });

  it("should mint ERC1155 token correctly", async () => {
    const tokenId = 2;
    const amount = 2;
    const data = ethers.utils.toUtf8Bytes("data");

    const tokensToBuy = ethers.utils.parseUnits("5", 0);
    await myShop.connect(owner).buy({ value: tokensToBuy });
    const startBalance = await myShop.tokenBalance();

    await myShop.connect(owner).approve(amount);

    await myShop._mintERC1155Token(tokenId, amount, data);

    const finishBalance = await myShop.tokenBalance();

    expect(finishBalance).to.equal(+startBalance + amount);
  });

  it("Sender balance correctly", async () => {
    const tokensToBuy = ethers.utils.parseUnits("5", 0);

    await myShop.connect(buyer).buy({ value: tokensToBuy });

    const senderBalance = await myShop.connect(buyer).senderBalance();

    expect(senderBalance).to.equal(5);
  });
});
