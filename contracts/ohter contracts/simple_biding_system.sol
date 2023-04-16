pragma solidity ^0.8.0;

contract simple_biding_system {
    address payable public highestBidder;
    uint public highestBid;
    mapping(address => uint) public bids;

    event NewHighestBid(address bidder, uint amount);

    function placeBid() public payable {
        require(msg.value > highestBid, "Bid must be higher than current highest bid");

        if (highestBidder != address(0)) {
            // Return the previous highest bid to its bidder
            bids[highestBidder] += highestBid;
        }

        highestBidder = payable(msg.sender);
        highestBid = msg.value;
        emit NewHighestBid(msg.sender, msg.value);
    }

    function withdrawBid() public {
        require(bids[msg.sender] > 0, "No bid to withdraw");
        uint amount = bids[msg.sender];
        bids[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }

    function endAuction() public {
        require(msg.sender == highestBidder, "Only highest bidder can end auction");
        selfdestruct(highestBidder);
    }
}
