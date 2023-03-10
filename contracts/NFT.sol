// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
   Counters.Counter private _tokenIds;

    address contractAddress;
    constructor (address marketplaceAddress)ERC721("NFT Marketplace","NM")
    {
        contractAddress = marketplaceAddress; 
    }

    function mintToken(string memory tokenURI) public  returns(uint){
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        // passing in id and url
        _mint(msg.sender, newItemId);
        // set the token URi
        _setTokenURI(newItemId, tokenURI);
        // give matketplace approval to transacct   
        setApprovalForAll(contractAddress, true);
        return newItemId;
    }
}