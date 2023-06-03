const express=require('express')
const Web3=require('web3')
const cors=require('cors')
const path=require('path')
app=express()
const bodyparser=require('body-parser')
app.use(bodyparser.urlencoded({ extended: false }))
let ticket_id_list=[]
let tid=1021
app=express()
app.listen(8000)
app.use('/public', express.static('public'))
app.set('views',path.join(__dirname+'/Gp'))
app.set('view engine','ejs')
const contractAddress='0x2619982683245d7456564404Ba31e058568bFdC0'
const ABI=[{'inputs': [], 'stateMutability': 'nonpayable', 'type': 'constructor'},
{'inputs': [],
 'name': 'add_user',
 'outputs': [],
 'stateMutability': 'nonpayable',
 'type': 'function'},
{'inputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
 'name': 'booked_log',
 'outputs': [{'internalType': 'address', 'name': 'user', 'type': 'address'},
  {'internalType': 'uint256', 'name': 'eventid', 'type': 'uint256'},
  {'internalType': 'uint256', 'name': 'nooftickets', 'type': 'uint256'},
  {'internalType': 'uint256', 'name': 'total_rate', 'type': 'uint256'},
  {'internalType': 'bool', 'name': 'status', 'type': 'bool'},
  {'internalType': 'uint256', 'name': 'time', 'type': 'uint256'},
  {'internalType': 'uint256', 'name': 'time_of_event', 'type': 'uint256'}],
 'stateMutability': 'view',
 'type': 'function'},
{'inputs': [{'internalType': 'uint256', 'name': 'eid', 'type': 'uint256'},
  {'internalType': 'uint256', 'name': 'n', 'type': 'uint256'}],
 'name': 'buytc',
 'outputs': [],
 'stateMutability': 'payable',
 'type': 'function'},
{'inputs': [{'internalType': 'uint256', 'name': 'tcid', 'type': 'uint256'}],
 'name': 'cancel_ticket',
 'outputs': [],
 'stateMutability': 'payable',
 'type': 'function'},
{'inputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
 'name': 'canceled_log',
 'outputs': [{'internalType': 'uint256', 'name': 'tid', 'type': 'uint256'},
  {'internalType': 'address', 'name': 'user', 'type': 'address'},
  {'internalType': 'uint256', 'name': 'total_refund', 'type': 'uint256'},
  {'internalType': 'uint256', 'name': 'time', 'type': 'uint256'}],
 'stateMutability': 'view',
 'type': 'function'},
{'inputs': [],
 'name': 'eventid',
 'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
 'stateMutability': 'view',
 'type': 'function'},
{'inputs': [{'internalType': 'address', 'name': 'or', 'type': 'address'}],
 'name': 'get_events_by_organ',
 'outputs': [{'internalType': 'uint256[]', 'name': '', 'type': 'uint256[]'}],
 'stateMutability': 'view',
 'type': 'function'},
{'inputs': [{'internalType': 'string', 'name': 'n', 'type': 'string'},
  {'internalType': 'uint256', 'name': 'nooftic', 'type': 'uint256'},
  {'internalType': 'string', 'name': 'urlpath', 'type': 'string'},
  {'internalType': 'uint256', 'name': 'r', 'type': 'uint256'},
  {'internalType': 'uint256', 'name': 't', 'type': 'uint256'},
  {'internalType': 'string', 'name': 'p', 'type': 'string'}],
 'name': 'reg_event',
 'outputs': [],
 'stateMutability': 'payable',
 'type': 'function'},
{'inputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
 'name': 'reg_events',
 'outputs': [{'internalType': 'string', 'name': 'name', 'type': 'string'},
  {'internalType': 'address', 'name': 'org', 'type': 'address'},
  {'internalType': 'uint256', 'name': 'no_of_tickets', 'type': 'uint256'},
  {'internalType': 'string', 'name': 'url', 'type': 'string'},
  {'internalType': 'uint256', 'name': 'rate', 'type': 'uint256'},
  {'internalType': 'uint256', 'name': 'time_of_event', 'type': 'uint256'},
  {'internalType': 'string', 'name': 'place', 'type': 'string'}],
 'stateMutability': 'view',
 'type': 'function'},
{'inputs': [],
 'name': 'reg_orangiser',
 'outputs': [],
 'stateMutability': 'nonpayable',
 'type': 'function'},
{'inputs': [{'internalType': 'uint256', 'name': 'eid', 'type': 'uint256'},
  {'internalType': 'uint256', 'name': 'n', 'type': 'uint256'}],
 'name': 'show_amount_to_pay',
 'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
 'stateMutability': 'view',
 'type': 'function'}]
let w3;
async function connect()
{
    p=new Web3.providers.HttpProvider('HTTP://127.0.0.1:8545');
    w3=new Web3(p);
}
let con_instance;
async function create_instance()
{
    con_instance=new w3.eth.Contract(ABI,contractAddress)
}
connect();
create_instance();
async function adduser(a)
{
    const data=await con_instance.methods.add_user().send({from:a});
}
async function register_event(name,nooftickets,url,rate,time,place,adde)
{
    ticket_id_list.push(tid)
    tid+=1;
    const data=await con_instance.methods.reg_event(name,nooftickets,url,rate,time,place).send({from:adde,value:100,gasLimit:1000000});
}
async function reg_organ(ad)
{
    const data=await con_instance.methods.reg_orangiser().send({from:ad});
}
async function buyticket(eid,no,add,price)
{
    const data=await con_instance.methods.buytc(eid,no).send({from:add,value:price,gasLimit:1000000});
}
async function showamt(e,t)
{
    const d=await con_instance.methods.show_amount_to_pay(e,t).call();
    console.log(d)
 }
async function get_ticket_deatails(tid)
{
    const d=await con_instance.methods.booked_log(tid).call();
    console.log(d)
}
async function geteventsbyaddress(add)
{
    const d=await con_instance.methods.get_events_by_organ(add).call()
    console.log(d)
}
async function cancel(tid,ads,amount)
{
    const d=await con_instance.methods.cancel_ticket(tid).send({from:ads,value:amount-200,gasLimit:1000000})
}
reg_organ('0x2f85b86723588b7421905BE2072EB14f5C3dAed2')
register_event('Rockstar Anirudh',10,'u',150,164578,'ramba pradise','0x2f85b86723588b7421905BE2072EB14f5C3dAed2')
app.get('',async function(req,res)
{
    let listofevent=[]
    console.log(ticket_id_list)
    for(let i=0;i<ticket_id_list.length;i++)
    {
        console.log(ticket_id_list[i])
        const data=await con_instance.methods.reg_events(ticket_id_list[i]).call()
        let edata=[]
        console.log(typeof(data['name']))
        console.log(data['url'])
        console.log(data['time_of_event'])
        console.log(data['place'])
        edata.push(data['name'])
        edata.push(data['url'])
        edata.push(data['time_of_event'])
        edata.push(data['place'])
        console.log(edata)
        listofevent.push(edata)
    }
    console.log(listofevent)
    res.render('projects',{'d':listofevent})
    listofevent=[]
})
app.get('/register_event',function(req,res)
{
    console.log('page rendered')
    res.render('reg_event')
})
app.post('/register_event',function(req,res)
{
    let name=req.body.eventname;
    let n=Number(req.body.nooftics)
    let url=req.body.url;
    let rate=Number(req.body.rate)
    let place=req.body.place
    let ad=req.body.address
    let t=req.body.time
    date=t.slice(0,2)
    month=t.slice(2,5)
    time=t.slice(5,8)
})
app.get('/booktic',function(req,res){
    res.render('booktic')
})
app.get('/ticfin',function(req,res)
{
    res.render('ticketser')
})
app.post('/confirm',function(req,res)
{
    res.render('confirmation')
})
