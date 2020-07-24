import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from 'lodash';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import NoTransfer from "./NoTransfer";
import TransferHistory from "./TransferHistory";

import {
  loadWeb3,
  loadContract,
  loadAccount,
  loadBeneficiaries,
  loadTotalSupply,
  //loadBalance
} from "../redux/interactions";
import {
web3Selector,
  contractSelector,
  accountSelector,
  beneficiariesSelector,
  totalSupplySelector,
  //balanceSelector
} from "../redux/selectors";


class RewardHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: 0,
      beneficiary: "",
blockNumber:0,
tokenBalance:0,
transfers:[],
hashes:[],
timeStamps:[]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
}

rewardHistory = async () => {
    const { web3, account, beneficiaries, contract } = this.props;
    const { beneficiary } = this.state;


const blockNumber = await web3.eth.getBlockNumber();


//const blockTimeStamp = await web3.eth.getBlock(7).timeStamp;
//var date = new Date(Number(blockTimeStamp));
//console.log(date);


//web3.eth.getBlock(7, (error, block) => {
  //  const timestamp = block.timestamp;
//console.log(new Date(timestamp*1000));
    // here you go
//});
///////
//const tx = this.state.hashes;
for (var tx of this.state.hashes){
web3.eth.getBlock(tx, (error, block) => {
    var timeStamp = block.timestamp;
console.log("timeStamps"+timeStamp);
this.state.timeStamps.push(new Date(Number(timeStamp)*1000));
console.log("timeStamps"+this.state.timeStamps);
})
}



const opts = { fromBlock: blockNumber - 3, toBlock: blockNumber };
const tranfs = await contract.getPastEvents('Transfer', opts);
this.setState({ transfers: tranfs.reverse()});

for (const { blockHash:blockHash } of this.state.transfers) {
var element = { "blockHash": blockHash};
this.state.hashes.push(element);
this.state.hashes = Object.values(this.state.hashes);
console.log("hashs"+this.state.hashes);

};

for (var tx of this.state.hashes){
console.log("txs"+tx);
}
//console.log(this.state.hashes);

}
  handleClick = (e) => {
    e.preventDefault();
//console.log(this.state.beneficiary);
//console.log(this.props.trips);
    this.rewardHistory();
  };

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }
  render() {
    //const { transfers} = this.sate;
    const {
      dispatch,
      contract,
      account,
      beneficiaries,
      totalSupply,
      trips,
    } = this.props;

    const connectBlockchain = async (e) => {
      e.preventDefault();
      const Web3 = await loadWeb3(dispatch);
      await loadAccount(dispatch, Web3);
      await loadBeneficiaries(dispatch, Web3);
      const tripTokenContract = await loadContract(dispatch, Web3);
      await loadTotalSupply(dispatch, tripTokenContract, Web3);
      //await loadBalance(dispatch, tripTokenContract, Web3);

    };



//console.log(transfers);
    return (

<div  style={{  justifyContent:'center', alignItems:'center', margin:'20px'}}>
        <div className='card nobord'>        
<form onSubmit={connectBlockchain}>
            <button
              type='submit'
              className={`w-50 btn text-truncate ${
                contract !== null ? "disabled btn-success" : "btn-danger"
              }`}
            >
              {contract !== null
                ? "Blockchain Connected"
                : "Connect Blockchain"}
            </button>
          </form>
          <hr />
            <form onSubmit={this.handleClick}>
              <label>
                Beneficiary address:
                <input
                  name='beneficiary'
                  type='text'
                  value={this.state.beneficiary}
                  onChange={this.handleChange}
                />
              </label>
          <hr />
              <input className='button' type='submit' value='Your History' />
            </form>
          </div>

          <hr />

          {!_.isEmpty(this.state.transfers) ?
<>
<TransferHistory transfers = {this.state.transfers} timeStamps = {this.state.timeStamps}/>

}
</>
:

<NoTransfer />}

</div>
)
}


}

const mapStateToProps = createStructuredSelector({
web3:web3Selector,
  contract: contractSelector,
  account: accountSelector,
  totalSupply: totalSupplySelector,
  beneficiaries: beneficiariesSelector,
  //balance: balanceSelector
});

export default connect(mapStateToProps)(RewardHistory);

