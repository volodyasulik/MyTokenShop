// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./IERC20.sol";

contract ERC20 is IERC20 {
    uint256 public totalTokens;
    address public owner;
    mapping(address => uint256) public balances;
    mapping(address => mapping(address => uint256)) internal allowances;
    string public _name;
    string public _symbol;

    function name() external view override returns (string memory) {
        return _name;
    }

    function symbol() external view override returns (string memory) {
        return _symbol;
    }

    function decimals() external pure override returns (uint256) {
        return 18; // 1 token = 1 wei
    }

    function totalSupply() external view override returns (uint256) {
        return totalTokens;
    }

    modifier enoughTokens(address _from, uint256 _amount) {
        require(balanceOf(_from) >= _amount, "not enough tokens!");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "not an owner!");
        _;
    }

    constructor(
        string memory name_,
        string memory symbol_,
        uint256 initialSupply,
        address shop
    ) {
        _name = name_;
        _symbol = symbol_;
        owner = msg.sender;
        mint(initialSupply, shop);
    }

    function balanceOf(address account) public view override returns (uint256) {
        return balances[account];
    }

    function transfer(
        address to,
        uint256 amount
    ) external override enoughTokens(msg.sender, amount) {
        _beforeTokenTransfer(msg.sender, to, amount);
        balances[msg.sender] -= amount;
        balances[to] += amount;
        emit Transfer(msg.sender, to, amount);
    }

    function mint(uint256 amount, address shop) public onlyOwner {
        _beforeTokenTransfer(address(0), shop, amount);
        balances[shop] += amount;
        totalTokens += amount;
        emit Transfer(address(0), shop, amount);
    }

    function burn(address _from, uint256 amount) public onlyOwner {
        _beforeTokenTransfer(_from, address(0), amount);
        balances[_from] -= amount;
        totalTokens -= amount;
    }

    function allowance(
        address _owner,
        address spender
    ) public view override returns (uint256) {
        return allowances[_owner][spender];
    }

    function approve(address spender, uint256 amount) public override {
        _approve(msg.sender, spender, amount);
    }

    function _approve(
        address sender,
        address spender,
        uint256 amount
    ) internal virtual {
        allowances[sender][spender] = amount;
        emit Approve(sender, spender, amount);
    }

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) public override enoughTokens(sender, amount) {
        _beforeTokenTransfer(sender, recipient, amount);
        allowances[recipient][sender] -= amount;
        balances[sender] -= amount;
        balances[recipient] += amount;
        emit Transfer(sender, recipient, amount);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual {}
}

contract MyERC20Token is ERC20 {
    constructor(address shop) ERC20("MCSToken", "MCT", 20, shop) {}
}
