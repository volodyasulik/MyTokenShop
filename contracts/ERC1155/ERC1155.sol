// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./IERC1155.sol";
import "./IERC1155MetadataURI.sol";
import "./IERC1155Receiver.sol";

contract ERC1155 is IERC1155, IERC1155MetadataURI {
    mapping(uint256 => mapping(address => uint256)) private _balances;
    mapping(address => mapping(address => bool)) private _operatorApprovals;
    string private _uri;

    constructor(string memory uri_) {
        _setURI(uri_);
    }

    function uri(uint256) external view virtual returns (string memory) {
        return _uri;
    }

    function balanceOf(address account, uint256 id)
        public
        view
        returns (uint256)
    {
        require(account != address(0));
        return _balances[id][account];
    }

    function balanceOfBatch(address[] calldata accounts, uint256[] calldata ids)
        public
        view
        returns (uint256[] memory batchBalances)
    {
        require(accounts.length == ids.length);

        batchBalances = new uint256[](accounts.length);

        for (uint256 i = 0; i < accounts.length; ++i) {
            batchBalances[i] = balanceOf(accounts[i], ids[i]);
        }
    }

    function setApprovalForAll(address operator, bool approved) external {
        _setApprovalForAll(msg.sender, operator, approved);
    }

    function isApprovedForAll(address account, address operator)
        public
        view
        returns (bool)
    {
        return _operatorApprovals[account][operator];
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes calldata data
    ) external {
        require(from == msg.sender || isApprovedForAll(from, msg.sender));

        _safeTransferFrom(from, to, id, amount, data);
    }

    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] calldata ids,
        uint256[] calldata amounts,
        bytes calldata data
    ) external {
        require(from == msg.sender || isApprovedForAll(from, msg.sender));

        _safeBatchTransferFrom(from, to, ids, amounts, data);
    }

    function _safeMint(
        address to,
        uint256 tokenId,
        uint256 amount,
        bytes calldata data
    ) internal virtual {
        _mint(to, tokenId, amount);
        _doSafeTransferAcceptanceCheck(
            address(0),
            msg.sender,
            to,
            tokenId,
            amount,
            data
        );
    }

    function _mint(
        address to,
        uint256 tokenId,
        uint256 amount
    ) internal virtual {
        require(to != address(0), "zero address to");

        _balances[tokenId][to] = amount;

        emit TransferSingle(address(0), msg.sender, to, tokenId, amount);
    }

    function _safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes calldata data
    ) public {
        require(to != address(0));

        address operator = msg.sender;
        uint256[] memory ids = _asSingletonArray(id);
        uint256[] memory amounts = _asSingletonArray(amount);

        _beforeTokenTransfer(operator, from, to, ids, amounts, data);

        uint256 fromBalance = _balances[id][from];
        require(fromBalance >= amount);
        _balances[id][from] = fromBalance - amount;
        _balances[id][to] += amount;

        emit TransferSingle(operator, from, to, id, amount);

        _afterTokenTransfer(operator, from, to, ids, amounts, data);

        _doSafeTransferAcceptanceCheck(operator, from, to, id, amount, data);
    }

    function _safeBatchTransferFrom(
        address from,
        address to,
        uint256[] calldata ids,
        uint256[] calldata amounts,
        bytes calldata data
    ) public {
        require(ids.length == amounts.length);

        address operator = msg.sender;

        _beforeTokenTransfer(operator, from, to, ids, amounts, data);

        for (uint256 i = 0; i < ids.length; ++i) {
            uint256 id = ids[i];
            uint256 amount = amounts[i];
            uint256 fromBalance = _balances[id][from];

            require(fromBalance >= amount);

            _balances[id][from] = fromBalance - amount;
            _balances[id][to] += amount;
        }

        emit TransferBatch(operator, from, to, ids, amounts);

        _afterTokenTransfer(operator, from, to, ids, amounts, data);

        _doSafeBatchTransferAcceptanceCheck(
            operator,
            from,
            to,
            ids,
            amounts,
            data
        );
    }

    function _setURI(string memory newUri) internal virtual {
        _uri = newUri;
    }

    function _setApprovalForAll(
        address owner,
        address operator,
        bool approved
    ) internal {
        require(owner != operator);
        _operatorApprovals[owner][operator] = approved;
        emit ApprovalForAll(owner, operator, approved);
    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual {}

    function _afterTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual {}

    function _doSafeTransferAcceptanceCheck(
        address operator,
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes calldata data
    ) private {
        if (to.code.length > 0) {
            try
                IERC1155Receiver(to).onERC1155Received(
                    operator,
                    from,
                    id,
                    amount,
                    data
                )
            returns (bytes4 resp) {
                if (resp != IERC1155Receiver.onERC1155Received.selector) {
                    revert("Rejected tokens!");
                }
            } catch Error(string memory reason) {
                revert(reason);
            } catch {
                revert("Non-ERC1155 receiver!");
            }
        }
    }

    function _doSafeBatchTransferAcceptanceCheck(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes calldata data
    ) private {
        if (to.code.length > 0) {
            try
                IERC1155Receiver(to).onERC1155BatchReceived(
                    operator,
                    from,
                    ids,
                    amounts,
                    data
                )
            returns (bytes4 resp) {
                if (resp != IERC1155Receiver.onERC1155BatchReceived.selector) {
                    revert("Rejected tokens!");
                }
            } catch Error(string memory reason) {
                revert(reason);
            } catch {
                revert("Non-ERC1155 receiver!");
            }
        }
    }

    function _asSingletonArray(uint256 el)
        private
        pure
        returns (uint256[] memory result)
    {
        result = new uint256[](1);
        result[0] = el;
    }
}

