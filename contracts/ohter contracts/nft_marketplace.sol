pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
/*
This contract maintains a highestBidder and highestBid variable,
which keep track of the highest bidder and their bid amount. It also
 has a bids mapping to keep track of the bids made by each bidder.

The placeBid function allows bidders to place a bid by sending ether
 to the contract. If the bid is higher than the current highest bid,
 the previous highest bidder's bid is returned to them, and the new
 highest bidder and bid amount are updated. The function also emits
 a NewHighestBid event to notify listeners of the new highest bid.

The withdrawBid function allows bidders to withdraw their bid if they
are not the current highest bidder. Their bid amount is returned to them.

The endAuction function can only be called by the current highest bidder,
and it ends the auction by destroying the contract and transferring the
ether to the highest bidder. Note that selfdestruct is used to destroy
the contract and send the remaining ether to the highest bidder's address.

This is just a basic example, and there are many ways you could modify and
improve this contract depending on the specifics of your bidding system.
*/
contract nft_marketplace is Ownable, IERC721Receiver {
    struct Auction {
        address payable seller;
        uint256 tokenId;
        uint256 price;
        uint256 expiresAt;
        bool exists;
    }

    IERC721 public nftContract;
    mapping(uint256 => Auction) public auctions;

    event AuctionCreated(uint256 indexed tokenId, uint256 price, uint256 expiresAt);
    event AuctionCancelled(uint256 indexed tokenId);
    event AuctionSold(uint256 indexed tokenId, address buyer, uint256 price);

    constructor(address _nftContract) {
        nftContract = IERC721(_nftContract);
    }

    function createAuction(uint256 tokenId, uint256 price, uint256 duration) external {
        require(nftContract.ownerOf(tokenId) == msg.sender, "Only NFT owner can create auction");
        require(price > 0, "Price must be greater than 0");
        require(!auctions[tokenId].exists, "Auction already exists for this token");

        auctions[tokenId] = Auction(payable(msg.sender), tokenId, price, block.timestamp + duration, true);
        nftContract.safeTransferFrom(msg.sender, address(this), tokenId);

        emit AuctionCreated(tokenId, price, block.timestamp + duration); // duration in seconds
    }

    function cancelAuction(uint256 tokenId) external {
        Auction storage auction = auctions[tokenId];
        require(auction.exists, "Auction does not exist for this token");
        require(auction.seller == msg.sender, "Only auction seller can cancel auction");
        require(block.timestamp < auction.expiresAt, "Auction has already expired");

        delete auctions[tokenId];
        nftContract.safeTransferFrom(address(this), msg.sender, tokenId);

        emit AuctionCancelled(tokenId);
    }

    function bid(uint256 tokenId) external payable {
        Auction storage auction = auctions[tokenId];
        require(auction.exists, "Auction does not exist for this token");
        require(msg.sender != auction.seller, "Seller cannot bid on their own auction");
        require(msg.value >= auction.price, "Bid must be greater than or equal to the current price");
        require(block.timestamp < auction.expiresAt, "Auction has already expired");

        if (auction.price > 0) {
            auction.seller.transfer(auction.price);
        }

        auction.seller = payable(msg.sender);
        auction.price = msg.value;
        emit AuctionSold(tokenId, msg.sender, msg.value);
    }

    function withdraw(uint256 tokenId) external {
        Auction storage auction = auctions[tokenId];
        require(!auction.exists, "Auction still exists for this token");
        require(msg.sender == auction.seller || msg.sender == nftContract.ownerOf(tokenId), "Only seller or NFT owner can withdraw");

        nftContract.safeTransferFrom(address(this), msg.sender, tokenId);
    }

    function onERC721Received(address operator, address from, uint256 tokenId, bytes calldata data) external override returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }
}
