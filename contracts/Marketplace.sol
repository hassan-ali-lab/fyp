//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol"; // import ERC721
import "@openzeppelin/contracts/security/ReentrancyGuard.sol"; // import ReentrancyGuard
import "@openzeppelin/contracts/utils/Counters.sol"; // import Counters
import "truffle/console.sol";

/****************************************************************************************
 * @title Marketplace
 * @dev Implements the functionality of a marketplace for NFTs
 ****************************************************************************************
    * @dev The marketplace contract is the contract that allows users to list their NFTs for sale
    * @dev The marketplace contract is the contract that allows users to buy NFTs

Marketplace
*
    getListingPrice() - get the listing price
    createMarketItem() - create a market item to put it up for sale
    createMarketSale() - create a market sale for buying and selling between parties
    fetchMarketItems() - fetch all the market items
    fetchMyNFTs() - fetch all the NFTs that a user has listed for sale
    fetchItemsCreated() - fetch all the NFTs that a user has created
    changeListingPrice() - change the listing price
    changeOwner() - change the owner of the contract
    withdraw() - withdraw the funds from the contract
    getBalance() - get the balance of the contract
    getOwner() - get the owner of the contract
    getMarketItem() - get the market item
    getMarketItems() - get the market items
    getMarketItemsCreated() - get the market items created
    getMarketItemsForSale() - get the market items for sale

*/

contract Marketplace is ReentrancyGuard {
    using Counters for Counters.Counter; //  use the counter library - use the counter for the token id

    /* number of items minting, number of transactions, tokens that have not been sold
     keep track of tokens total number - tokenId
     arrays need to know the length - help to keep track for arrays */

    Counters.Counter private _tokenIds; // private - only accessible in this contract
    // determine who is the owner of the contract
    // charge a listing fee so the owner makes a commission

    address payable owner; // payable - can receive ether
    // we are deploying to matic the API is the same so you can use ether the same as matic
    // they both have 18 decimal
    // 0.045 is in the cents
    uint256 listingPrice = 0.045 ether; // 0.045 ether

    constructor() {
        //set the owner to the person who deployed the contract
        console.log("hello constructor");
        owner = payable(msg.sender);
        // msg.sender is the address of the person who deployed the contract
    }

    // structs can act like objects
    // create a struct for the market item
    struct MarketToken {
        uint itemId; // unique id for each item
        address nftContract; // address of the contract
        uint tokenId; // token id
        string name;
        string description;
        address creator; // address of the creator
        address payable _owner; // address of the owner
        uint price; // price of the token
        bool forSale; // is the token for sale
    }

    // tokenId return which MarketToken -  fetch which one it is

    mapping(uint256 => MarketToken) private idToMarketToken; // private - only accessible in this contract
    mapping(address => MarketToken[]) private addressToTokens; // private - only accessible in this contract
    mapping(address => uint) private addressToCount; // private - only accessible in this contract

    // listen to events from front end applications
    event MarketTokenMinted(
        uint indexed itemId, // indexed - can be searched for
        address indexed nftContract, // indexed - can be searched for
        uint256 indexed tokenId, // indexed - can be searched for
        address creator, // address of the creator
        address owner, // address of the owner
        uint256 price // price of the token
    );

    // get the listing price
    // view - does not change the state of the contract
    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    // two functions to interact with contract
    // 1. create a market item to put it up for sale
    // 2. create a market sale for buying and selling between parties

    function countMarketItems() public view returns (uint256) {
        return _tokenIds.current();
    }

    function countMarketItemsForSale() public view returns (uint256) {
        uint256 count = 0;
        for (uint256 i = 0; i < _tokenIds._value; i++) {
            if (idToMarketToken[i + 1].forSale) {
                count++;
            }
        }
        return count;
    }

    function countMarketItemsCreated() public view returns (uint256) {
        return addressToCount[msg.sender];
    }

    function createMarketItem(
        address nftContract, // address of the contract
        uint tokenId, // token id
        uint price, // price of the toke
        string memory name, // name of the token
        string memory description, // description of the token
        bool forSale // is the token for sale
    ) public payable nonReentrant {
        // nonReentrant is a modifier to prevent reentry attack

        // require - check if the price is greater than 0
        require(price > 0, "Price must be at least one wei");

        // require - check if the price is equal to the listing price
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );
        console.log("Create Market Item - msg.sender: %s", msg.sender);
        console.log("Create Market Item - price: %s", price);
        console.log("Create Market Item - listingPrice: %s", listingPrice);
        // increment the token id
        _tokenIds.increment();
      

        console.log("Create Market Item - _tokenIds: %s", _tokenIds._value);
        // get the current token id
        uint itemId = _tokenIds._value;
        
        console.log("Create Market Item - itemId: %s", itemId);
        uint count = addressToCount[msg.sender]; // get the current count
        // addressToCount[msg.sender].current(); // get the current count
        // addressToCount[msg.sender].increment(); // increment the count
    
        console.log("count: %s", count);
        console.log("_tokenIds count: %s", _tokenIds._value);

        
        // increment the count
        console.log("Create Market Item - count: %s", count);
        console.log("Create Market Item - addressToCount[msg.sender]: %s", addressToCount[msg.sender]);
        // addressToCount[msg.sender] = addressToCount[msg.sender] + 1;
        // default value is 0

        //putting it up for sale - bool - no owner
        idToMarketToken[itemId] = MarketToken(
            itemId, // unique id for each item
            nftContract, // address of the contract
            tokenId, // token id
            name,
            description,
            msg.sender, // address of the creator
            payable(msg.sender), // address of the owner
            price, // price of the token
            forSale // is the token for sale
        );

        addressToTokens[msg.sender].push(idToMarketToken[itemId]);
        // payable - can receive ether
        // msg.sender is the address of the person who deployed the contract
        // payable(msg.sender) - convert the address to a payable address
        console.log("Object");
        console.log( idToMarketToken[itemId].itemId);
        console.log( idToMarketToken[itemId].nftContract);
        console.log( idToMarketToken[itemId].tokenId);
        console.log( idToMarketToken[itemId].name); //a
        console.log( idToMarketToken[itemId].description);//b
        console.log( idToMarketToken[itemId].creator);
        console.log( idToMarketToken[itemId]._owner);
        console.log(idToMarketToken[itemId].price);
        console.log(idToMarketToken[itemId].forSale);
        // NFT transaction - transfer the token from the seller to the contract
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
        
        addressToCount[msg.sender]++;
        // emit the event
        emit MarketTokenMinted(
            itemId, // unique id for each item
            nftContract, // address of the contract
            tokenId, // token id
            msg.sender, // address of the creator
            msg.sender, // address of the owner
            price // price of the token
        );
    }

    // function to conduct transactions and market sales
    function createMarketSale(
        address nftContract, // address of the contract
        uint itemId // token id
    ) public payable nonReentrant {
        uint price = idToMarketToken[itemId].price;
        uint tokenId = idToMarketToken[itemId].tokenId;

        require(
            msg.value == price,
            "Please submit the asking price in order to continue"
        );

        // transfer the amount to the seller
        idToMarketToken[itemId]._owner.transfer(msg.value);
        // transfer the token from contract address to the buyer
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
        idToMarketToken[itemId]._owner = payable(msg.sender);
        payable(owner).transfer(listingPrice);
    }

       function getMyNFTs() public view returns (MarketToken[] memory) {
           
           MarketToken[] memory result = new MarketToken[](addressToCount[msg.sender]);
          
    
           for (uint256 i = 0; i <= addressToCount[msg.sender]; i++) {
            
                   result[i] = addressToTokens[msg.sender][i];
           }
    
           return result;
}

    // getOneItem
    function getOneItem(
        uint256 itemId
    ) public view returns (MarketToken memory) {
        return idToMarketToken[itemId];
    }


    function getAllItems() public view returns (MarketToken[] memory) {
        // instead of .owner it will be the .seller

        // total number of items
        uint totalItemCount = _tokenIds.current();

        // create an array of market tokens
        MarketToken[] memory items = new MarketToken[](totalItemCount);

        // loop through the total item count
        for (uint i = 0; i < totalItemCount; i++) {
            // current item
            MarketToken storage currentItem =  idToMarketToken[i];

            console.log("id");
            // current index
            items[i] = currentItem;
        }
        // return the items - array of minted nfts
        return items;
    }
}
