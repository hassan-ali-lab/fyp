// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract NFT is ERC721URIStorage {// ERC721URIStorage is a contract that allows us to set the token URI
    using Counters for Counters.Counter; // using the counter library
    Counters.Counter private _tokenIds; // counter for the token ids

    // address of the marketplace contract
    address contractAddress;

    // constructor - this is called when the contract is deployed
    constructor (address marketplaceAddress)ERC721("NFT Marketplace", "NM")
    {
        // set the marketplace address
        contractAddress = marketplaceAddress;
    }

    // minting function - this is the function that will be called when we want to mint a new token
    function mintToken(string memory tokenURI) public returns (uint){
        // increment the token id - this is a function from the Counters contract
        _tokenIds.increment();
        // get the current token id - this is a function from the Counters contract
        uint256 newItemId = _tokenIds.current();
        // passing in id and url - this is a function from the ERC721URIStorage contract
        _mint(msg.sender, newItemId);
        // set the token URi - this is a function from the ERC721URIStorage contract
        _setTokenURI(newItemId, tokenURI);
        // set the approval for the marketplace contract
        setApprovalForAll(contractAddress, true);
        // return the token id
        return newItemId;
    }
}