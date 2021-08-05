import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import NoTransfer from "./NoTransfer";
import TransferHistory from "./TransferHistory";

import {
  loadWeb3,
  loadTokenRewardContract,
  loadAccount
} from "../redux/interactions";
import {
  web3Selector,
  tokenRewardContractSelector,
  accountSelector
} from "../redux/selectors";
class RewardHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: 0,
      beneficiary: "",
      blockNumber: 0,
      tokenBalance: 0,
      transfers: [],
      hashes: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  rewardHistory = async () => {
    const { web3, tokenRewardContract } = this.props;
    const { beneficiary } = this.state;
var filter = {  'to': beneficiary};
    const blockNumber = await web3.eth.getBlockNumber();
    //const opts = { fromBlock: 5, toBlock: blockNumber };
    const tranfs = await tokenRewardContract.getPastEvents("Transfer",{filter,fromBlock: 5, toBlock: blockNumber});
    this.setState({ transfers: tranfs.reverse() });


    let hashs = [];
    for (const { blockHash } of this.state.transfers) {
      var element = { blockHash };
      hashs.push(element);
    }
    var hashss = hashs.map(Object.values);
    const hashess = [].concat.apply([], hashss);
this.setState({ hashes: hashess });
  };

  handleClick = (e) => {
    e.preventDefault();
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
    const {
      dispatch,
      tokenRewardContract,
    } = this.props;
    const connectBlockchain = async (e) => {
      e.preventDefault();
      const Web3 = await loadWeb3(dispatch);
      await loadAccount(dispatch, Web3);
      await loadTokenRewardContract(dispatch, Web3);
    };
    return (
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          margin: "20px",
        }}
      >
        <div className='card nobord'>
          <form onSubmit={connectBlockchain}>
            <button
              type='submit'
              className={`w-50 btn text-truncate ${
                tokenRewardContract !== null ? "disabled btn-success" : "btn-danger"
              }`}
            >
              {tokenRewardContract !== null
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
        {!_.isEmpty(this.state.transfers) ? (
          <>
            <TransferHistory
              transfers={this.state.transfers}
              hashes={this.state.hashes}
web3 = {this.props.web3}
            />
            }
          </>
        ) : (
          <NoTransfer />
        )}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  web3: web3Selector,
tokenRewardContract:tokenRewardContractSelector,
  account: accountSelector
});

export default connect(mapStateToProps)(RewardHistory);
