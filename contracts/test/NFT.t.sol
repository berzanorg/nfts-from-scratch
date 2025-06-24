// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Test, console} from "forge-std/Test.sol";
import {NFT} from "../src/NFT.sol";

contract CounterTest is Test {
    NFT public nft;

    function setUp() public {
        nft = new NFT();
        nft.setNumber(0);
    }

    function test_Increment() public {
        nft.increment();
        assertEq(nft.number(), 1);
    }

    function testFuzz_SetNumber(uint256 x) public {
        nft.setNumber(x);
        assertEq(nft.number(), x);
    }
}
