//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC721.sol";
import "./IERC721Storage.sol";

contract MyERC721Token is ERC721, ERC721URIStorage {
    address public owner;
    uint256 currentTokenId;

    constructor() ERC721("MyToken", "MTK") {
        owner = msg.sender;
    }

    function safeMint(address to, string calldata tokenId) public {
        require(owner == msg.sender, "not an owner!");

        _safeMint(to, currentTokenId);
        _setTokenURI(currentTokenId, tokenId);

        currentTokenId++;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://";
    }

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721) {
        super._beforeTokenTransfer(from, to, tokenId);
    }
}
