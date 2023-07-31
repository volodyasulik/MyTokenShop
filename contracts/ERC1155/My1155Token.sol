// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import  "./ERC1155.sol";

contract MyERC1155Token is ERC1155 {
    constructor() ERC1155("/") {}

    function safeMint(
        address to,
        uint256 tokenId,
        uint256 amount,
        bytes calldata data
    ) external {
        _safeMint(to, tokenId, amount, data);
    }

}

