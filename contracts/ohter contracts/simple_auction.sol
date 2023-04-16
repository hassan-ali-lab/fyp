pragma solidity ^0.8.0;
/*
This contract maintains several variables to keep track of the auction parameters and state.
The owner variable is the address of the person who created the auction, and startBlock and endBlock
 represent the block numbers when the auction starts and ends. itemName and startingPrice are the
 name of the item being auctioned and the starting price, respectively.

The highestBidder and highestBid variables keep track of the current highest bidder and their bid amount.
 The ended variable is a flag indicating whether the auction has ended.

The bids mapping keeps track of the bids made by each bidder.

The bid function allows bidders to place a bid by sending ether to the contract. If the bid is higher than
the current highest bid, the previous highest bidder's bid is returned to them, and the new highest bidder
 and bid amount are updated. The function also emits a NewHighestBid event to notify listeners of the new
 highest bid.

The endAuction function can only be called by the auction owner and ends the auction by transferring the
highest bid amount to the owner and emitting an AuctionEnded event. The ended flag is also set to true to
prevent further bids.

The withdraw function allows bidders to withdraw their bid if they are not the current highest bidder
and the auction has ended. Their bid amount is returned to them.


*/
contract simple_auction {
    // Auction parameters
    address payable public owner;
    uint public startBlock;
    uint public endBlock;
    string public itemName;
    uint public startingPrice;

    // Auction state
    address payable public highestBidder;
    uint public highestBid;
    bool public ended;

    // Bid mapping
    mapping(address => uint) public bids;

    // Events
    event NewHighestBid(address bidder, uint amount);
    event AuctionEnded(address winner, uint amount);

    // Constructor
    constructor(
        uint _duration,
        string memory _itemName,
        uint _startingPrice
    ) {
        owner = payable(msg.sender);
        startBlock = block.number;
        endBlock = startBlock + _duration;
        itemName = _itemName;
        startingPrice = _startingPrice;
    }

    // Bid function
    function bid() public payable {
        require(block.number < endBlock, "Auction has ended");
        require(msg.value > highestBid, "Bid must be higher than current highest bid");

        if (highestBidder != address(0)) {
            // Return the previous highest bid to its bidder
            bids[highestBidder] += highestBid;
        }

        highestBidder = payable(msg.sender);
        highestBid = msg.value;
        bids[msg.sender] = msg.value;

        emit NewHighestBid(msg.sender, msg.value);
    }

    // End auction function
    function endAuction() public {
        require(msg.sender == owner, "Only auction owner can end auction");
        require(block.number >= endBlock, "Auction has not yet ended");

        if (!ended) {
            ended = true;
            emit AuctionEnded(highestBidder, highestBid);
            owner.transfer(highestBid);
        }
    }

    // Withdraw bid function
    function withdraw() public {
        require(block.number >= endBlock, "Auction has not yet ended");
        require(msg.sender != highestBidder, "You are the highest bidder");

        uint amount = bids[msg.sender];
        if (amount > 0) {
            bids[msg.sender] = 0;
            payable(msg.sender).transfer(amount);
        }
    }
}
