// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import 'truffle/console.sol';

contract Bidding is ReentrancyGuard {
    using Counters for Counters.Counter;


    Counters.Counter private _bidItemIds;

    struct BidToken {
        uint itemId;
        uint256 tokenId;
        string name;
        string description;
        address payable auctionStarter;
        address payable highestBidder;
        uint256 highestBid;
        bool closed;
        bool completed;
    }

    address payable owner;

    mapping(uint256 => BidToken) private idToBidToken;


    constructor(){
        owner = payable(msg.sender);
    }

    function makeBidItem(
        uint tokenId,
        string memory name,
        string memory description
    )
    public payable nonReentrant {
        // nonReentrant is a modifier to prevent reentry attack

        //        require(price > 0, 'Price must be at least one wei');
        //        require(msg.value == listingPrice, 'Price must be equal to listing price');

        _bidItemIds.increment();
        uint itemId = _bidItemIds.current();

        idToBidToken[itemId] = BidToken(
            itemId,
            tokenId,
            name,
            description,
            payable(msg.sender),
            payable(address(0)),
            0,
            false,
            false
        );

        console.log("Bid Token created");
        console.log("Item ID: %s", itemId);
        console.log("Token ID: %s", tokenId);
        console.log("Name: %s", name);
        console.log("Description: %s", description);
        console.log("Auction Starter: %s", msg.sender);
        console.log("Highest Bidder: %s", address(0));
        console.log("Highest Bid: %s", 0);
        console.log("Closed: %s", false);

    }


    function placeBid(uint itemId) public payable {
        require(msg.value > idToBidToken[itemId].highestBid, "Bid must be higher than current highest bid.");
        require(msg.sender != idToBidToken[itemId].highestBidder, "You are already the highest bidder.");
        require(msg.sender != idToBidToken[itemId].auctionStarter, "You are the auction starter.");
        require(idToBidToken[itemId].closed == false, "Auction is closed.");

        uint value = msg.value;
        if (idToBidToken[itemId].highestBidder != payable(address(0))) {
            // Refund the previous highest bidder if they are not the owner
            // transfer from contract to address
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
    }

    function endBidding(uint tokenID) public {
        require(msg.sender == idToBidToken[tokenID].auctionStarter, "Only the Auction Starter can end the auction.");
        require(idToBidToken[tokenID].highestBidder != payable(address(0)), "Auction has not yet started.");

        // Transfer the funds to the owner
        idToBidToken[tokenID].auctionStarter.transfer(idToBidToken[tokenID].highestBid);

        // list Items

    }

    function listBidItems() public view returns (BidToken[] memory) {
        uint itemCount = _bidItemIds.current();
        uint unsoldItemCount = _bidItemIds.current();
        uint currentIndex = 0;

        BidToken[] memory temp = new BidToken[](unsoldItemCount);
        for (uint i = 0; i < itemCount; i++) {// loop through all items
            if (idToBidToken[i + 1].closed == false && idToBidToken[i + 1].auctionStarter != msg.sender) {// only show items that are not closed
                uint currentId = i + 1;
                BidToken storage item = idToBidToken[currentId];
                temp[currentIndex] = item;
                currentIndex += 1;
            }
        }

        // remove empty items
        BidToken[] memory items = new BidToken[](currentIndex);
        for (uint i = 0; i < currentIndex; i++) {
            items[i] = temp[i];
        }
        return temp;
    }
}