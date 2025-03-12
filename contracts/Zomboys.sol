// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Zomboys is ERC721, Ownable, ReentrancyGuard {
    uint256 public constant MAX_SUPPLY = 10000;
    uint256 public constant MINT_PRICE = 0.05 ether;
    uint256 private _tokenIds;

    string private _baseTokenURI;

    constructor() ERC721("Zomboys", "ZOMB") {
        _tokenIds = 0;
    }

    function mint() external payable nonReentrant {
        require(_tokenIds < MAX_SUPPLY, "Max supply reached");
        require(msg.value >= MINT_PRICE, "Insufficient payment");

        _tokenIds++;
        _safeMint(msg.sender, _tokenIds);
    }