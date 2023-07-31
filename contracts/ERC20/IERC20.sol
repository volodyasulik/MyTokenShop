// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IERC20 {
    function name() external view returns (string memory);

    function symbol() external view returns (string memory);

    function balanceOf(address account) external view returns (uint);

    function decimals() external pure returns (uint);

    function totalSupply() external view returns (uint);

    function transfer(address to, uint amount) external;

    function transferFrom(address from, address to, uint256 amount) external;

    function allowance(
        address _owner,
        address spender
    ) external view returns (uint);

    function approve(address spender, uint256 amount) external;

    event Transfer(address indexed from, address indexed to, uint amount);

    event Approve(address indexed owner, address indexed to, uint amount);
}
