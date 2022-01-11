// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "hardhat/console.sol";

contract Reaper is ERC721Enumerable, IERC721Receiver {
    string private __baseURI;
    uint256 private _nextTokenId;

    struct BurnedToken {
        address tokenAddress;
        uint256 tokenId;
    }

    mapping(uint256 => BurnedToken) public proofOfBurn;

    event BurnExternalToken(
        address indexed account,
        address indexed tokenAddress,
        uint256 tokenId
    );

    constructor(
        string memory name,
        string memory symbol,
        string memory baseURI
    ) ERC721(name, symbol) {
        __baseURI = baseURI;
    }

    function _baseURI() internal view override returns (string memory) {
        return __baseURI;
    }

    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure override returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }

    function burnExternalToken(address tokenAddress_, uint256 tokenId_) public {
        console.log("Reaping NFT:", tokenId_, "From:", tokenAddress_);
        // transfer the specified token to a "burn" address (this address)
        IERC721(tokenAddress_).safeTransferFrom(
            msg.sender,
            address(this),
            tokenId_
        );

        // mint a new REAP token to msg.sender
        _mint(msg.sender, _nextTokenId);

        // save the metadata of the extenral token into proofOfBurn
        proofOfBurn[_nextTokenId] = BurnedToken(tokenAddress_, tokenId_);

        // increment _nextTokenId, so that the next minted REAP has a new ID
        _nextTokenId++;

        emit BurnExternalToken(msg.sender, tokenAddress_, tokenId_);
    }
}
