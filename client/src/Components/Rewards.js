import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from 'lodash';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
//import { balanceUpdated } from '../redux/actions';

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
import { subscribeToAccountsChanging } from "../redux/subscriptions";
//import { updateBalance } from "../redux/updateBalance";
class Rewards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: 0,
      beneficiary: "",
blockNumber:0,
tokenBalance:0,
transfers:[]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getTokenBalance = this.getTokenBalance.bind(this);
    //this.rewardTokens = this.rewardTokens.bind(this);
  }

  rewardTokens = async () => {
    const { account, beneficiaries, contract, trips } = this.props;
    const { beneficiary } = this.state;

    await contract.methods
      .transfer(`${beneficiary}`, `${trips}`)
      .send({ from: account });
//alert(`You are rewarded with ${trips} TRIPs`);
    //const bals = await contract.methods.balanceOf(`${beneficiary}`).call();
    //this.setState({ balance: bals });
  };
  getTokenBalance = async () => {
//console.log(web3);
    const { web3, account, beneficiaries, contract, trips } = this.props;
    const { beneficiary } = this.state;

    const bals = await contract.methods.balanceOf(`${beneficiary}`).call();
    const blockNo = await web3.eth.getBlockNumber();

    //const tokenBal = await web3.eth.getBalance(`${beneficiary}`,blockNo);
const tokenBal = await contract.methods.balanceOf(`${beneficiary}`).call({}, blockNo - 1);;
    this.setState({ balance: bals, blockNumber: blockNo, tokenBalance: tokenBal});
  };


  handleClick = (e) => {
    e.preventDefault();
//console.log(this.state.beneficiary);
//console.log(this.props.trips);
    this.rewardTokens();
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
    const {
      dispatch,
      contract,
      account,
      beneficiaries,
      totalSupply,
      trips,
    } = this.props;
const cAddress = !_.isEmpty(contract) ? contract.options.address : '';
//const rewardhistory = cAddress ? this.rewardHistory(): {};//
    //console.log(this.props.beneficiaries);
    const connectBlockchain = async (e) => {
      e.preventDefault();
      const Web3 = await loadWeb3(dispatch);
      await loadAccount(dispatch, Web3);
      await loadBeneficiaries(dispatch, Web3);
      const tripTokenContract = await loadContract(dispatch, Web3);
      await loadTotalSupply(dispatch, tripTokenContract, Web3);
      //await loadBalance(dispatch, tripTokenContract, Web3);
      subscribeToAccountsChanging(dispatch, Web3);
    };

    return (
      <>
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
          <label>Account: {account}</label>
          <label>cAddress: {cAddress}</label>

          <p>
            Changing accounts in Metamask should refresh this account address
          </p>
          <div>
            <form onSubmit={this.handleClick}>
          <label>Your TRIP reward: {trips}</label>

          <hr />
              <label>
                Beneficiary address:
                <input
                  name='beneficiary'
                  type='text'
                  value={this.state.beneficiary}
                  onChange={this.handleChange}
                />
              </label>
              <input className='button' type='submit' value='Book Ticket' />
            </form>
          </div>
          <hr />
          <label>beneficiary: {this.state.beneficiary}</label>
          <label>
<button
              type='submit'
              className='w-30 btn text-truncate btn-info'
              onClick={this.getTokenBalance}
            >
              Your balance{" "}
            </button>:{this.state.balance}</label>
          <label>blockNumber: {this.state.blockNumber}</label>
          <label>tokenBalance: {this.state.tokenBalance}</label>

          <hr />
          <div className = 'box-field'>
            <button
              type='submit'
              className='w-30 btn text-truncate btn-info'
style={{marginRight: '40px'}}
              onClick={this.handleClick}
            >
              Your ticket{" "}
            </button>
            <Link to='/RewardHistory'>
              <button
                type='submit'
                className='w-30 btn text-truncate btn-secondary'
                //onClick={this.rewardHistory}
              >
                Reward history{" "}
              </button>
            </Link>
          </div>


        </div>
      </>
    );
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

export default connect(mapStateToProps)(Rewards);
