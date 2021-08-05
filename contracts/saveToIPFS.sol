// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.6.8;

/**
 * @title saveToIPFS
 * @author Manoj M
 * @notice This contract represents a registry of ticket ownership.
 * Due to storage limitations, tickets are stored on IPFS.
 * The IPFS hash along with metadata are stored onchain.
 */

contract saveToIPFS {

    /**
    * @title Represents a single ticket which is owned by someone.
    */
    struct Ticket {
        string ipfsHash;        // Ticket hash
        string description;     // Ticket description
        uint256 uploadedOn;     // Uploaded timestamp
    }
    // Maps owner to their tickets
    mapping (address => Ticket[]) public ownerToTickets;

    /**
    * @dev Indicates that a user has uploaded a new ticket
    * @param _owner The owner of the image
    * @param _ipfsHash The IPFS hash
    * @param _description The ticket description
    * @param _uploadedOn The upload timestamp
    */
    event LogTicketUploaded(
        address indexed _owner,
        string _ipfsHash,
        string _description,
        uint256 _uploadedOn
    );

    /**
    * @dev This function is called for all messages sent to
    * this contract (there is no other function).
    * Sending Ether to this contract will cause an exception,
    * because the fallback function does not have the `payable`
    * modifier.
    */
     fallback() external {}

    /**
        * @notice associate an ticket entry with the owner i.e. sender address
        * @param _ipfsHash The IPFS hash
        * @param _description The image description
        */
    function uploadTicket(
        string memory _ipfsHash,
        string memory _description
    ) public returns (bool _success) {

        require(bytes(_ipfsHash).length == 46);
        require(bytes(_description).length < 1024);

        uint256 uploadedOn = now;
        Ticket memory ticket = Ticket(
            _ipfsHash,
            _description,
            uploadedOn
        );

        ownerToTickets[msg.sender].push(ticket);

        emit LogTicketUploaded(
            msg.sender,
            _ipfsHash,
            _description,
            uploadedOn
        );

        _success = true;
    }

    /**
    * @notice Returns the number of tickets associated with the given address
    * @param _owner The owner address
    * @return The number of images associated with a given address
    */
    function getTicketCount(address _owner)
        public view
        returns (uint256)
    {
        require(_owner != msg.sender);
        return ownerToTickets[_owner].length;
    }


    /**
    * @notice Returns the ticket at index in the ownership array
    * @param _owner The owner address
    * @param _index The index of the ticket to return
    * @return _ipfsHash The IPFS hash
    * @return _description The ticket description
    * @return _uploadedOn The uploaded timestamp
    */
    function getTicket(address _owner, uint8 _index)
        public view returns (
        string memory _ipfsHash,
        string memory _description,
        uint256 _uploadedOn
    ) {

        require(_owner != msg.sender);
        require(_index >= 0 && _index <= 2**8 - 1);
        require(ownerToTickets[_owner].length > 0);

        Ticket storage ticket = ownerToTickets[_owner][_index];

        return (
            ticket.ipfsHash,
            ticket.description,
            ticket.uploadedOn
        );
    }

}
