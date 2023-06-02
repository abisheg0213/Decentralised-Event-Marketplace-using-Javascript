// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;
contract eventmanagment
{
    address [] users;
    address payable owner;
    address [] organizers;
    mapping (address=>string)orgs;
    struct registered_event
    {
        string name;
        address org;
        uint no_of_tickets;
        string url;
        uint rate;
        uint time_of_event;
        string place;
    }
    struct booked_tickets
    {
        address user;
        uint eventid;
        uint nooftickets;
        uint total_rate;
        bool status;
        uint time;
        uint time_of_event;
    }
    struct canceled_tickets
    {
        uint tid;
        address user;
        uint total_refund;
        uint time;
    }
    uint cancel_id=1;
    mapping (uint=>booked_tickets) public booked_log;
    mapping (uint=>canceled_tickets) public canceled_log;
    uint ticketid=1;
    uint tax=5;
    uint register_price=0.01 ether;
    mapping (address => uint []) org_reg_events;
    mapping(uint => registered_event) public reg_events;
    uint public eventid=1021;
    constructor()
    {
        owner=payable (msg.sender);
    }
    function reg_event(string memory n,uint nooftic,string memory urlpath,uint r,uint t,string memory p) public payable 
    {
        require(msg.value==100 wei);
        // payable(address(this)).transfer(msg.value);
        reg_events[eventid].name=n;
        reg_events[eventid].org=(msg.sender);
        reg_events[eventid].no_of_tickets=nooftic;
        reg_events[eventid].url=urlpath;
        reg_events[eventid].rate=r;
        reg_events[eventid].time_of_event=t;
        reg_events[eventid].place=p;
        org_reg_events[msg.sender].push(eventid);
        eventid+=1;
    }
    function reg_orangiser() public 
    {
        organizers.push(msg.sender);
    }
    function buytc(uint eid,uint n) public payable 
    {
         payable (reg_events[eid].org).transfer(msg.value);
      uint tot=(reg_events[eid].rate*n)+150;
    uint tc=eid+ticketid;
    ticketid+=1;
     booked_log[tc].user=msg.sender;
         booked_log[tc].eventid=eid;
           reg_events[eid].no_of_tickets-=n;
        booked_log[tc].nooftickets=n;
        booked_log[tc].total_rate=1150;
        booked_log[tc].status=false;
        booked_log[tc].time=block.timestamp;
        booked_log[tc].time_of_event=reg_events[eid].time_of_event;
    }
    function show_amount_to_pay(uint eid,uint n) public view returns(uint)
    {
        uint tot=(reg_events[eid].rate*n)+150;
        return tot;
    }
    function vaild_user(address r) private  view returns(bool)
        {
            uint y=0;
            bool avail;
            for(uint i=0;i<users.length;i++)
            {
                if(users[i]==r)
                {
                    avail=true;
                    y=1;
                }
            }
            if (y==0)
            {
                avail=false;
            }
            return avail;
        }
        modifier valuser(address k)
        {
            bool j=vaild_user(k);
            require(j==true);
            _;
        }
    function cancel_ticket(uint tcid) public payable  valuser(msg.sender)
    {
        uint t=booked_log[tcid].total_rate;
       uint refund_amount=t-200;
       payable (msg.sender).transfer(refund_amount);
       canceled_log[cancel_id].tid=tcid;
        canceled_log[cancel_id].user=msg.sender;
        canceled_log[cancel_id].total_refund=refund_amount;
        canceled_log[cancel_id].time=block.timestamp;
    } 
    function add_user() public 
    {
        users.push(msg.sender);
    } 
    function get_events_by_organ(address or) public view returns(uint[] memory)
    {
        return org_reg_events[or];
    }
}
