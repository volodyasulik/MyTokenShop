// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../ERC20/IERC20.sol";
import "../ERC20/ERC20.sol";
import "../ERC721/IERC721.sol";
import "../ERC721/MyERC721Token.sol";
import "../ERC1155/My1155Token.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "hardhat/console.sol";

contract MyShop {
    IERC20 public token;
    MyERC721Token public NFTtoken;
    MyERC1155Token public ERC1155Token;
    address payable public owner;
    event Bought(uint256 _amount, address indexed _buyer);
    event Sold(uint256 _amount, address indexed _seller);

    constructor() {
        token = new MyERC20Token(address(this));
        NFTtoken = new MyERC721Token();
        ERC1155Token = new MyERC1155Token();
        owner = payable(msg.sender);
    }

    function sell(uint256 _amountToSell) external {
        require(
            _amountToSell > 0 && token.balanceOf(msg.sender) >= _amountToSell,
            "incorrect amount!"
        );

        uint256 allowance = token.allowance(address(this), msg.sender);
        require(allowance >= _amountToSell, "check allowance!");

        token.transferFrom(msg.sender, address(this), _amountToSell);

        payable(msg.sender).transfer(_amountToSell);

        emit Sold(_amountToSell, msg.sender);
    }

    function buy() external payable {
        uint256 tokensToBuy = msg.value; // 1 wei = 1 token
        require(tokensToBuy > 0, "not enough funds!");

        require(tokenBalance() >= tokensToBuy, "not enough tokens!");

        token.transfer(msg.sender, tokensToBuy);
        emit Bought(tokensToBuy, msg.sender);
    }

    function _mintERC721Token(uint256 tokenId, uint256 amount) external {
        require(
            token.balanceOf(msg.sender) >= amount,
            "Insufficient ERC20 Token"
        );

        token.transferFrom(msg.sender, address(this), amount);

        NFTtoken.safeMint(msg.sender, Strings.toString(tokenId));
    }

    function _mintERC1155Token(
        uint256 tokenId,
        uint256 amount,
        bytes calldata data
    ) external {
        require(
            token.balanceOf(msg.sender) >= amount,
            "Insuggicient ERC20 Token"
        );

        token.transferFrom(msg.sender, address(this), amount);

        ERC1155Token.safeMint(msg.sender, tokenId, amount, data);
    }

    function approve(uint256 amount) external {
        token.approve(msg.sender, amount);
    }

    function tokenBalance() public view returns (uint256) {
        return token.balanceOf(address(this));
    }

    function getERC721Balance() external view returns (uint256) {
        return NFTtoken.balanceOf(msg.sender);
    }

    function getERC1155Balance(uint id) external view returns (uint256) {
        return ERC1155Token.balanceOf(msg.sender, id);
    }

    function senderBalance() public view returns (uint256) {
        return token.balanceOf(msg.sender);
    }
}
