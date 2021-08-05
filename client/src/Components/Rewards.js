import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Ticket from "./Ticket";

import {
  loadWeb3,
  loadTokenRewardContract,
  loadipfsContract,
  loadAccount,
} from "../redux/interactions";
import {
  web3Selector,
  tokenRewardContractSelector,
  ipfsContractSelector,
  accountSelector,
} from "../redux/selectors";
import { subscribeToAccountsChanging } from "../redux/subscriptions";
class Rewards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beneficiary: "",
      blockNumber: 0,
      tokenBalance: 0,
      transfers: [],
      isVisible: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getTokenBalance = this.getTokenBalance.bind(this);
    this.setbeneficiary = this.setbeneficiary.bind(this);
  }
  setbeneficiary = async (e) => {
    e.preventDefault();
    const { account, tokenRewardContract } = this.props;
    await tokenRewardContract.methods
      .setBeneficiary(this.state.beneficiary)
      .send({ from: account });
  };

  rewardTokens = async () => {
    const { account, tokenRewardContract, trips } = this.props;
    const { beneficiary } = this.state;
    await tokenRewardContract.methods
      .transfer(beneficiary, `${trips}`)
      .send({ from: account })
      .on("receipt", async () => {
        this.setState({ isVisible: true });
      });
  };

  getTokenBalance = async () => {
    const { web3, tokenRewardContract } = this.props;
    const { beneficiary } = this.state;
    const blockNo = await web3.eth.getBlockNumber();
    const tokenBal = await tokenRewardContract.methods
      .balanceOf(beneficiary)
      .call({}, blockNo);
    this.setState({
      blockNumber: blockNo,
      tokenBalance: tokenBal,
    });
  };

  printTicket = (e) => {
    e.preventDefault();
    console.log("Print ticket");
  };
  saveTicket = (e) => {
    e.preventDefault();
    console.log("Save ticket");
  };
  retrieveTicket = (e) => {
    e.preventDefault();
    console.log("Retrive ticket");
  };

  handleClick = (e) => {
    e.preventDefault();
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
      tokenRewardContract,
      ipfsContract,
      account,
      trips,
      departure,
      arrival,
      fare,
    } = this.props;
    //console.log(journey);
    //const cAddress = !_.isEmpty(contract) ? contract.options.address : "";
    const ipfscContractAddress = !_.isEmpty(ipfsContract)
      ? ipfsContract.options.address
      : "";
    const tokenRewardContractAddress = !_.isEmpty(tokenRewardContract)
      ? tokenRewardContract.options.address
      : "";
    const connectBlockchain = async (e) => {
      e.preventDefault();
      const Web3 = await loadWeb3(dispatch);
      await loadAccount(dispatch, Web3);
      await loadTokenRewardContract(dispatch, Web3);
      await loadipfsContract(dispatch, Web3);
      subscribeToAccountsChanging(dispatch, Web3);
    };

    return (
      <>
        <div className='card nobord'>
          <form onSubmit={connectBlockchain}>
            <button
              type='submit'
              className={`w-50 btn text-truncate ${
                tokenRewardContract !== null
                  ? "disabled btn-success"
                  : "btn-danger"
              }`}
            >
              {tokenRewardContract !== null
                ? "Blockchain Connected"
                : "Connect Blockchain"}
            </button>
          </form>
          <hr />
          {/* <label>Account: {account}</label>
          <label>
            Token Reward Contract Contract Address: {tokenRewardContractAddress}
          </label>
          <label>IPFS Contract Address: {ipfscContractAddress}</label> */}

          <div>
            <form onSubmit={this.setbeneficiary}>
              <label>
                Set beneficiary
                <input
                  name='beneficiary'
                  type='text'
                  value={this.state.beneficiary}
                  onChange={this.handleChange}
                />
              </label>
              <input className='button' type='submit' value='Set beneficiary' />
            </form>
            <hr />
            <label>Your TRIP reward: {trips}</label>
            <hr />
            <form onSubmit={this.handleClick}>
              <input className='button' type='submit' value='Book Ticket' />
            </form>
          </div>
          <hr />
          {this.state.isVisible && (
            <>
              <label>
                <button
                  type='submit'
                  className='w-30 btn text-truncate btn-info'
                  onClick={this.getTokenBalance}
                >
                  Your balance{" "}
                </button>
              </label>
              <label>Block Number: {this.state.blockNumber}</label>
              <label>Token Balance: {this.state.tokenBalance}</label>

              <hr />
              <Ticket
                trips={trips}
                beneficiary={this.state.beneficiary}
                departure={departure}
                arrival={arrival}
                fare={fare}
              />
              <hr />

              <div className='box-field'>
                <Link to='/SaveTicket'>
                  <button
                    type='submit'
                    className='w-30 btn text-truncate btn-success'
                    style={{ marginRight: "40px" }}
                    //onClick={this.saveTicket}
                  >
                    Save ticket{" "}
                  </button>
                </Link>
                <button
                  type='submit'
                  className='w-30 btn text-truncate btn-primary'
                  style={{ marginRight: "40px" }}
                  onClick={this.retrieveTicket}
                >
                  Retrieve ticket{" "}
                </button>
              </div>
              <hr />
              <div className='box-field'>
                <button
                  type='submit'
                  className='w-30 btn text-truncate btn-info'
                  style={{ marginRight: "40px" }}
                  onClick={this.printTicket}
                  //className= "disabled btn-info"
                >
                  Print ticket{" "}
                </button>
                <Link to='/RewardHistory'>
                  <button
                    type='submit'
                    className='w-30 btn text-truncate btn-secondary'
                  >
                    Reward history{" "}
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  web3: web3Selector,
  tokenRewardContract: tokenRewardContractSelector,
  ipfsContract: ipfsContractSelector,
  account: accountSelector,
});

export default connect(mapStateToProps)(Rewards);
