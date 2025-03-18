// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";

contract Zomboys is ERC721, Ownable, ReentrancyGuard, ERC2981 {
    uint256 public constant MAX_SUPPLY = 10000;
    uint256 public constant MINT_PRICE = 0.05 ether;
    uint256 private _tokenIds;

    string private _baseTokenURI;

    bytes32 public merkleRoot;
    bool public presaleActive;

    constructor() ERC721("Zomboys", "ZOMB") {
        _tokenIds = 0;
        _setDefaultRoyalty(owner(), 500); // 5% royalty
    }

    function mint() external payable nonReentrant {
        require(_tokenIds < MAX_SUPPLY, "Max supply reached");
        require(msg.value >= MINT_PRICE, "Insufficient payment");

        _tokenIds++;
        _safeMint(msg.sender, _tokenIds);
    }

    function presaleMint(bytes32[] calldata _merkleProof) external payable nonReentrant {
        require(presaleActive, "Presale not active");
        require(_tokenIds < MAX_SUPPLY, "Max supply reached");
        require(msg.value >= MINT_PRICE, "Insufficient payment");

        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        require(MerkleProof.verify(_merkleProof, merkleRoot, leaf), "Invalid proof");

        _tokenIds++;
        _safeMint(msg.sender, _tokenIds);
    }

    function setMerkleRoot(bytes32 _root) external onlyOwner {
        merkleRoot = _root;
    }

    function togglePresale() external onlyOwner {
        presaleActive = !presaleActive;
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, ERC2981) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    function baseURI() external view returns (string memory) {
        return _baseURI();
    }

    function setBaseURI(string memory _uri) external onlyOwner {
        _baseTokenURI = _uri;
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }