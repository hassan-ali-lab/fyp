//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol'; // import ERC721
import '@openzeppelin/contracts/security/ReentrancyGuard.sol'; // import ReentrancyGuard
import '@openzeppelin/contracts/utils/Counters.sol'; // import Counters

contract Marketplace is ReentrancyGuard {
    using Counters for Counters.Counter; //  use the counter library - use the counter for the token id

    /* number of items minting, number of transactions, tokens that have not been sold
     keep track of tokens total number - tokenId
     arrays need to know the length - help to keep track for arrays */

    Counters.Counter private _tokenIds; // private - only accessible in this contract
    Counters.Counter private _tokensSold; // private - only accessible in this contract

    // determine who is the owner of the contract
    // charge a listing fee so the owner makes a commission

    address payable owner; // payable - can receive ether
    // we are deploying to matic the API is the same so you can use ether the same as matic
    // they both have 18 decimal
    // 0.045 is in the cents
    uint256 listingPrice = 0.045 ether; // 0.045 ether

    constructor() {
        //set the owner to the person who deployed the contract
        owner = payable(msg.sender);
        // msg.sender is the address of the person who deployed the contract
    }

    // structs can act like objects
    // create a struct for the market item
    struct MarketToken {
        uint itemId;  // unique id for each item
        address nftContract; // address of the contract
        uint256 tokenId; // token id
        address payable seller; // address of the seller
        address payable owner; // address of the owner
        uint256 price; // price of the token
        bool sold; // if the token has been sold
    }

    // tokenId return which MarketToken -  fetch which one it is 

    mapping(uint256 => MarketToken) private idToMarketToken; // private - only accessible in this contract

    // listen to events from front end applications
    event MarketTokenMinted(
        uint indexed itemId, // indexed - can be searched for
        address indexed nftContract, // indexed - can be searched for
        uint256 indexed tokenId, // indexed - can be searched for
        address seller, // address of the seller
        address owner, // address of the owner
        uint256 price, // price of the token
        bool sold // if the token has been sold
    );

    // get the listing price
    // view - does not change the state of the contract
    function getListingPrice() public view returns (uint256) {
        return listingPrice;
        // return the listing price
    }

    // two functions to interact with contract
    // 1. create a market item to put it up for sale
    // 2. create a market sale for buying and selling between parties

    function makeMarketItem(
        address nftContract, // address of the contract
        uint tokenId, // token id
        uint price // price of the token
    )
    public payable nonReentrant {
        // nonReentrant is a modifier to prevent reentry attack

        // require - check if the price is greater than 0
        require(price > 0, 'Price must be at least one wei');

        // require - check if the price is equal to the listing price
        require(msg.value == listingPrice, 'Price must be equal to listing price');

        // increment the token id
        _tokenIds.increment();

        // get the current token id
        uint itemId = _tokenIds.current();

        //putting it up for sale - bool - no owner
        idToMarketToken[itemId] = MarketToken(
            itemId, // unique id for each item
            nftContract, // address of the contract
            tokenId, // token id
            payable(msg.sender), // address of the seller
            payable(address(0)), // address of the owner
            price, // price of the token
            false // if the token has been sold
        );

        // NFT transaction - transfer the token from the seller to the contract
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

        // emit the event
        emit MarketTokenMinted(
            itemId, // unique id for each item
            nftContract, // address of the contract
            tokenId, // token id
            msg.sender, // address of the seller
            address(0), // address of the owner
            price, // price of the token
            false  // if the token has been sold
        );
    }
    // function to conduct transactions and market sales 


    function createMarketSale(
        address nftContract, // address of the contract
        uint itemId) // token id
    public payable nonReentrant {
        uint price = idToMarketToken[itemId].price;
        uint tokenId = idToMarketToken[itemId].tokenId;
        require(msg.value == price, 'Please submit the asking price in order to continue');

        // transfer the amount to the seller
        idToMarketToken[itemId].seller.transfer(msg.value);
        // transfer the token from contract address to the buyer
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
        idToMarketToken[itemId].owner = payable(msg.sender);
        idToMarketToken[itemId].sold = true;
        _tokensSold.increment();

        payable(owner).transfer(listingPrice);
    }

    // function to fetchMarketItems - minting, buying ans selling
    // return the number of unsold items

    function fetchMarketTokens() public view returns (MarketToken[] memory) {
        uint itemCount = _tokenIds.current();
        uint unsoldItemCount = _tokenIds.current() - _tokensSold.current();
        uint currentIndex = 0;

        // looping over the number of items created (if number has not been sold populate the array)
        MarketToken[] memory items = new MarketToken[](unsoldItemCount);
        for (uint i = 0; i < itemCount; i++) {
            if (idToMarketToken[i + 1].owner == address(0)) {
                uint currentId = i + 1;
                MarketToken storage currentItem = idToMarketToken[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    // return nfts that the user has purchased

    function fetchMyNFTs() public view returns (MarketToken[] memory) {
        uint totalItemCount = _tokenIds.current();
        // a second counter for each individual user
        uint itemCount = 0;
        uint currentIndex = 0;

        for (uint i = 0; i < totalItemCount; i++) {
            if (idToMarketToken[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }

        // second loop to loop through the amount you have purchased with itemcount
        // check to see if the owner address is equal to msg.sender

        MarketToken[] memory items = new MarketToken[](itemCount);
        for (uint i = 0; i < totalItemCount; i++) {
            if (idToMarketToken[i + 1].owner == msg.sender) {
                uint currentId = idToMarketToken[i + 1].itemId;
                // current array
                MarketToken storage currentItem = idToMarketToken[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    // function for returning an array of minted nfts
    function fetchItemsCreated() public view returns (MarketToken[] memory) {
        // instead of .owner it will be the .seller

        // total number of items
        uint totalItemCount = _tokenIds.current();

        // a second counter for each individual user
        uint itemCount = 0;

        // a third counter for the current index
        uint currentIndex = 0;

        for (uint i = 0; i < totalItemCount; i++) {
            if (idToMarketToken[i + 1].seller == msg.sender) {
                itemCount += 1;
            }
        }

        // second loop to loop through the amount you have purchased with itemcount
        // check to see if the owner address is equal to msg.sender

        // create an array of market tokens
        MarketToken[] memory items = new MarketToken[](itemCount);

        // loop through the total item count
        for (uint i = 0; i < totalItemCount; i++) {
            if (idToMarketToken[i + 1].seller == msg.sender) {// seller - address of the seller

                // current array
                uint currentId = idToMarketToken[i + 1].itemId;

                // current item
                MarketToken storage currentItem = idToMarketToken[currentId];

                // current index
                items[currentIndex] = currentItem;

                // increment the index
                currentIndex += 1;
            }
        }
        // return the items - array of minted nfts
        return items;
    }
}
