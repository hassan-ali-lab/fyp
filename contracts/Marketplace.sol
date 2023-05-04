//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol"; // import ERC721
import "@openzeppelin/contracts/security/ReentrancyGuard.sol"; // import ReentrancyGuard
import "@openzeppelin/contracts/utils/Counters.sol"; // import Counters
import "truffle/console.sol";


contract Marketplace is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address payable owner;
    uint256 listingPrice = 0.045 ether; // 0.045 ether
    constructor() {
        console.log("hello constructor");
        owner = payable(msg.sender);
    }


    struct MarketToken {
        uint itemType;
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

    struct BidInfo {
        address payable highestBidder;
        uint256 highestBid;
    }

    struct BidToken {
        uint itemType;
        uint itemId; // unique id for each item
        address payable highestBidder;
        uint256 highestBid;
        uint counter;
        bool closed;
        bool completed;
    }

    struct AuctionToken {
        uint itemType;
        uint itemId; // unique id for each item
        address payable highestBidder;
        uint256 highestBid;
        uint256 auctionEndTime;
        uint counter;
        bool closed;
        bool completed;
    }


    mapping(uint256 => MarketToken) private idToMarketToken; // private - only accessible in this contract
    mapping(uint256 => BidToken) private idToBidToken; // private - only accessible in this contract
    mapping(uint256 => AuctionToken) private idToAuctionToken; // private - only accessible in this contract
    mapping(uint256 => mapping(uint => BidInfo)) bids;

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


    function countMarketItems() public view returns (uint256) {
        return _tokenIds.current();
    }

    function placeBid(uint itemType, uint itemId) public payable {
        require(msg.sender != idToMarketToken[itemId]._owner, "You are the auction starter.");
        require(itemType == 2 || itemType == 3, "Item is not for bidding.");

        uint value = msg.value;

        if (itemType == 2) {
            require(msg.value > idToBidToken[itemId].highestBid, "Bid must be higher than current highest bid.");
            require(msg.sender != idToBidToken[itemId].highestBidder, "You are already the highest bidder.");
            require(idToBidToken[itemId].closed == false, "Bidding is closed.");
            require(idToBidToken[itemId].completed == false, "Bidding is completed.");


            if (idToBidToken[itemId].highestBidder != payable(address(0))) {
                // Refund the previous highest bidder if they are not the owner
                // transfer from contract to address
                BidInfo memory previousBidder;
                // memory - temporary storage
                previousBidder.highestBidder = idToBidToken[itemId].highestBidder;
                previousBidder.highestBid = idToBidToken[itemId].highestBid;
                bids[itemId][idToBidToken[itemId].counter] = previousBidder;

                idToBidToken[itemId].counter = idToBidToken[itemId].counter + 1;

                uint highestBid = idToBidToken[itemId].highestBid;
                value = value - highestBid;

                idToBidToken[itemId].highestBidder.transfer(highestBid);
                // Refund the previous highest bidder from the highest bid amount (if there is one) to the highest bidder address (if there is one)
            }

            idToBidToken[itemId].highestBidder = payable(msg.sender);
            // Set the new highest bidder to the current bidder address (msg.sender)
            // transfer from address to contract
            idToBidToken[itemId].highestBid = msg.value;
            // Set the new highest bid
            // transfer from address to contract
            owner.transfer(value);
            // owner is not visible in the contract so we need to make it payable


            console.log("Bid placed");
            console.log("Highest Bidder: %s", msg.sender);
            console.log("Highest Bid: %s", msg.value);
        } else if (itemType == 3) {
            require(msg.value > idToAuctionToken[itemId].highestBid, "Bid must be higher than current highest bid.");
            require(msg.sender != idToAuctionToken[itemId].highestBidder, "You are already the highest bidder.");
            require(block.timestamp < idToAuctionToken[itemId].auctionEndTime, "Auction is over.");

            if (idToAuctionToken[itemId].highestBidder != payable(address(0))) {
                // Refund the previous highest bidder if they are not the owner
                // transfer from contract to address
                // create new memory instance of BidInfo
                BidInfo memory previousBidder;
                // memory - temporary storage
                previousBidder.highestBidder = idToAuctionToken[itemId].highestBidder;
                previousBidder.highestBid = idToAuctionToken[itemId].highestBid;
                bids[itemId][idToAuctionToken[itemId].counter] = previousBidder;

                idToAuctionToken[itemId].counter = idToAuctionToken[itemId].counter + 1;

                uint highestBid = idToAuctionToken[itemId].highestBid;
                value = value - highestBid;

                idToAuctionToken[itemId].highestBidder.transfer(highestBid);
                // Refund the previous highest bidder from the highest bid amount (if there is one) to the highest bidder address (if there is one)
            }

            idToAuctionToken[itemId].highestBidder = payable(msg.sender);
            // Set the new highest bidder to the current bidder address (msg.sender)
            // transfer from address to contract
            idToAuctionToken[itemId].highestBid = msg.value;
            // Set the new highest bid
            // transfer from address to contract
            owner.transfer(value);
            // owner is not visible in the contract so we need to make it payable

        }
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


    function createMarketItem(
        uint itemType,
        address nftContract, // address of the contract
        uint tokenId, // token id
        uint price, // price of the toke
        string memory name, // name of the token
        string memory description, // description of the token
        uint time,
        bool forSale // is the token for sale
    ) public payable nonReentrant {
        // nonReentrant is a modifier to prevent reentry attack

        // require - check if the price is greater than 0
        require(price >= 0, "Price must not be negetive");

        // require - check if the price is equal to the listing price
        require(msg.value == listingPrice, "Price must be equal to listing price");

        require(itemType == 1 || itemType == 2 || itemType == 3, "Item type must be 1, 2 or 3. 1 for sale, 2 for bidding, 3 for auction");
        // increment the token id
        _tokenIds.increment();

        console.log("Create Market Item - _tokenIds: %s", _tokenIds._value);
        // get the current token id
        uint itemId = _tokenIds._value;

        console.log("Create Market Item - itemId: %s", itemId);

        console.log("_tokenIds count: %s", _tokenIds._value);

        if (itemType == 1) {
            //putting it up for sale - bool - no owner
            idToMarketToken[itemId] = MarketToken(
                1,
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
        }
        else if (itemType == 2) {
            //bidding
            idToMarketToken[itemId] = MarketToken(
                2,
                itemId, // unique id for each item
                nftContract, // address of the contract
                tokenId, // token id
                name,
                description,
                msg.sender, // address of the creator
                payable(msg.sender), // address of the owner
                0, // price of the token
                forSale // is the token for sale
            );
            idToBidToken[itemId] = BidToken(
                2,
                itemId, // unique id for each item
                payable(address(0)), // address of the bidder
                0, // bid amount
                0, // bid counter
                false, // closed
                false // completed
            );

        }
        else if (itemType == 3) {
            //auction
            idToMarketToken[itemId] = MarketToken(
                3,
                itemId, // unique id for each item
                nftContract, // address of the contract
                tokenId, // token id
                name,
                description,
                msg.sender, // address of the creator
                payable(msg.sender), // address of the owner
                0, // price of the token
                forSale // is the token for sale
            );
            idToAuctionToken[itemId] = AuctionToken(
                3,
                itemId, // unique id for each item
                payable(address(0)), // address of the bidder
                0, // bid amount
                time, // auctionEndTime
                0, // bid counter
                false, // closed
                false // completed
            );
        }
        // NFT transaction - transfer the token from the seller to the contract
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

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

        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;

        for (uint i = 0; i < totalItemCount; i++) {
            if (idToMarketToken[i + 1]._owner == msg.sender) {
                itemCount += 1;
            }
        }

        uint currentIndex = 0;
        MarketToken[] memory items = new MarketToken[](itemCount);
        for (uint i = 0; i < totalItemCount; i++) {
            if (idToMarketToken[i + 1]._owner == msg.sender) {
                uint currentId = idToMarketToken[i + 1].itemId;
                MarketToken storage currentItem = idToMarketToken[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    // getOneItem
    function getBidsByItemId(
        uint256 itemId
    ) public view returns (BidToken[] memory) {
        uint totalBidsCount = idToBidToken[itemId].counter;
        BidToken[] memory tempBids = new BidToken[](totalBidsCount);

        for (uint i = 0; i < totalBidsCount; i++) {
            tempBids[i] = idToBidToken[itemId];
        }
        return tempBids;
    }

    // getOneItem
    function getMarketItem(
        uint256 itemId
    ) public view returns (MarketToken memory) {
        return idToMarketToken[itemId];
    }

    function getBidItem(
        uint256 itemId
    ) public view returns (BidToken memory) {
        return idToBidToken[itemId];
    }

    function getAuctionItem(
        uint256 itemId
    ) public view returns (AuctionToken memory) {
        return idToAuctionToken[itemId];
    }

    function getAllItems() public view returns (MarketToken[] memory) {
        // total number of items
        uint totalItemCount = _tokenIds.current();

        // create an array of market tokens
        MarketToken[] memory items = new MarketToken[](totalItemCount);

        // loop through the total item count
        for (uint i = 0; i < totalItemCount; i++) {
            MarketToken storage currentItem = idToMarketToken[i + 1];
            items[i] = currentItem;
        }

        return items;
    }

    function isOwner(uint itemId) public view returns (bool){
        return idToMarketToken[itemId]._owner == msg.sender;
    }

    function closeBidding(uint itemId) public payable nonReentrant {
        MarketToken memory mt = idToMarketToken[itemId];
        require(mt._owner == msg.sender, "You are not the owner of this item");
        BidToken storage bt = idToBidToken[itemId];
        bt.closed = true;
    }

    function isClosed(uint itemType, uint itemId) public view returns (bool){
        require(itemType == 2 || itemType == 3, "Invalid item type");
        if (itemType == 2) return idToBidToken[itemId].closed;
        else if (itemType == 3) return idToAuctionToken[itemId].closed;
        return false;
    }


    function completeBidding(uint itemType, uint itemId) public payable nonReentrant {
        require(itemType == 2 || itemType == 3, "Invalid item type");

        if (itemType == 2) {
            address marketTokenOwner = idToMarketToken[itemId]._owner;
            uint highestBid = idToBidToken[itemId].highestBid;

            payable(marketTokenOwner).transfer(highestBid);

            idToBidToken[itemId].completed = true;
            idToMarketToken[itemId]._owner = idToBidToken[itemId].highestBidder;

            address nftContract = idToMarketToken[itemId].nftContract;
            uint tokenId = idToMarketToken[itemId].tokenId;
            address highestBidder = idToBidToken[itemId].highestBidder;

            IERC721(nftContract).safeTransferFrom(address(this), highestBidder, tokenId);
        } else if (itemType == 3) {
            address marketTokenOwner = idToMarketToken[itemId]._owner;
            uint highestBid = idToAuctionToken[itemId].highestBid;
            AuctionToken storage at = idToAuctionToken[itemId];

            require(at.auctionEndTime <= block.timestamp, "Auction is not over yet");
            require(at.completed == false, "Auction is already completed");

            payable(marketTokenOwner).transfer(highestBid);

            idToAuctionToken[itemId].closed = true;
            idToAuctionToken[itemId].completed = true;
            idToMarketToken[itemId]._owner = at.highestBidder;

            address nftContract = idToMarketToken[itemId].nftContract;
            uint tokenId = idToMarketToken[itemId].tokenId;
            address highestBidder = at.highestBidder;

            IERC721(nftContract).safeTransferFrom(address(this), highestBidder, tokenId);
        }
    }


}
