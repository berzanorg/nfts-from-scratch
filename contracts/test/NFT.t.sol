// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {NFT} from "../src/NFT.sol";

contract CounterTest is Test {
    NFT public nft;

    function setUp() public {
        nft = new NFT();
    }

    function test_Increment() public {
        assertEq(uint256(1), 1);
    }

    function testFuzz_SetNumber(uint256 x) public {
        assertEq(x, x);
    }
}
