pragma solidity ^0.4.18;

contract VirtLotto {

    mapping(address => uint) userTicketCount;
    mapping(uint => Number) boughtTickets;
    
    uint totalSoldTicket = 0;
    uint totalMoney = 0;
    address owner;
    uint minBet = 100;
    uint maxRound = 5;

    modifier onlyOwner {require(msg.sender == owner);_;}

    function virtLotto(uint _minBet, uint _maxRound) public {
        owner = msg.sender;
        minBet = _minBet;
        maxRound = _maxRound;
    }
    
    function pickNumber(uint number) public payable {
        require(msg.value >= minBet);
        require(number > 0 && number <= 10);
        require(userTicketCount[msg.sender] < 4);

        userTicketCount[msg.sender]++;

        Number storage ticketNumber = boughtTickets[number];
        ticketNumber.number = number;
        ticketNumber.ticketList[ticketNumber.total] = Ticket({
            owner: msg.sender,
            number: number
        });
        ticketNumber.total++;
        
        totalMoney += msg.value;
        totalSoldTicket++;

        if (totalSoldTicket >= maxRound) {
            endLottery();
        }
    }
    
    function endLottery() public {
        uint result = random();
        Number storage winningNumber = boughtTickets[result];
        if (winningNumber.total > 0) {
            uint prize = totalMoney/winningNumber.total;
            for (uint i = 0; i < winningNumber.total; i++) {
                if (winningNumber.ticketList[i].owner != address(0)) {
                    winningNumber.ticketList[i].owner.transfer(prize);
                }
            }

            totalSoldTicket = 0;
            totalMoney = 0;
        }
    }

    function random() private view returns (uint) {
        return uint8(uint256(keccak256(block.timestamp, block.difficulty)) % 10) + 1;
    }

    struct Ticket {
        address owner;
        uint number;
    }

    struct Number {
        uint number;
        uint total;
        mapping (uint => Ticket) ticketList;
    }
}
