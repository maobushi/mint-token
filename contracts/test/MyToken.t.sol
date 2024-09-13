// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/MyToken.sol";

contract MyTokenTest is Test {
    MyToken public token;
    address public owner;
    address public user;

    function setUp() public {
        owner = address(this);
        user = address(0x1);
        token = new MyToken("Test Token", "TST", 1000000);
    }

    function testInitialSupply() public view {
        assertEq(token.totalSupply(), 1000000 * 10**18);
        assertEq(token.balanceOf(owner), 1000000 * 10**18);
    }

    function testMint() public {
        token.mint(user, 1000 * 10**18);
        assertEq(token.balanceOf(user), 1000 * 10**18);
    }

    function testBurn() public {
        token.transfer(user, 1000 * 10**18);
        vm.prank(user);
        token.burn(500 * 10**18);
        assertEq(token.balanceOf(user), 500 * 10**18);
    }

    function testFailMintByNonOwner() public {
        vm.prank(user);
        token.mint(user, 1000 * 10**18);
    }
}