// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "hardhat/console.sol";

contract MockERC721 is ERC721 {
    constructor() ERC721("MockERC721", "MOCK") {}

    function mint(uint256 tokenId) public {
        console.log("Minting NFT:", tokenId, "From:", msg.sender);
        _mint(msg.sender, tokenId);
    }
}
