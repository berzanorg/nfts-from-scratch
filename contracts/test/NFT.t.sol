// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {NFT} from "../src/NFT.sol";

contract CounterTest is Test {
    address public owner;
    NFT public nft;

    function setUp() public {
        owner = makeAddr("owner");
        vm.prank(owner);
        nft = new NFT();
    }

    function test_Information() public view {
        assertEq(nft.name(), "Keonehorse");
        assertEq(nft.symbol(), "KEONEHORSE");
        assertEq(nft.totalSupply(), 0);
    }

    function test_Mint() public {
        address user = makeAddr("user");
        vm.deal(user, 1 ether);
        vm.startPrank(user);

        nft.mint{value: 1 ether}();

        assertEq(nft.totalSupply(), 1);
        assertEq(nft.ownerOf(0), user);
        assertEq(nft.balanceOf(user), 1);
        assertEq(user.balance, 0 ether);
        assertEq(owner.balance, 1 ether);
    }

    function test_CannotMint() public {
        address user = makeAddr("user");
        vm.deal(user, 1 ether);
        vm.startPrank(user);

        vm.expectRevert("1 MON is not paid.");
        nft.mint{value: 0.5 ether}();
    }
}
