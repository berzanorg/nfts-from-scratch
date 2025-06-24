// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC2981} from "@openzeppelin/contracts/token/common/ERC2981.sol";
import {ERC721Enumerable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import {IERC2981} from "@openzeppelin/contracts/interfaces/IERC2981.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is ERC721Enumerable, ERC2981, Ownable {
    constructor() ERC721("Keonehorse", "KEONEHORSE") Ownable(msg.sender) {
        _setDefaultRoyalty(msg.sender, 500);
    }

    function mint() external payable {
        uint256 tokenId = totalSupply();
        require(tokenId < 33, "All supply is minted.");
        require(msg.value == 1 ether, "1 MON is not paid.");
        _safeMint(msg.sender, tokenId);
        (bool ok,) = payable(owner()).call{value: 1 ether}("");
        require(ok, "1 MON is not sent.");
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://bafybeigkxeq7gmzlv5d7pjmcvzcrwxfmeirpsdgdat2fuwqpnvtv5p4ane/";
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721Enumerable, ERC2981) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
