import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

import {
  loadWeb3,
  loadContract,
  loadAccount,
  loadTotalSupply,
  loadBalance
} from "../redux/interactions";
import {
  contractSelector,
  accountSelector,
  totalSupplySelector,
  balanceSelector
} from "../redux/selectors";
import { subscribeToAccountsChanging } from "../redux/subscriptions";

class Rewards extends Component {
  render() {

console.log(this.props);
    const { dispatch, contract, account, totalSupply, balance, trips } = this.props;

    const connectBlockchain = async (e) => {
      e.preventDefault();
      const Web3 = await loadWeb3(dispatch);
      await loadAccount(dispatch, Web3);
      const tripTokenContract = await loadContract(dispatch, Web3);
      await loadTotalSupply(dispatch, tripTokenContract, Web3);
      await loadBalance(dispatch, tripTokenContract, Web3);
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
          <p>
            Changing accounts in Metamask should refresh this account address
          </p>

          <label>Your TRIP reward: {trips}</label>
          <label>{balance}</label>
          <label>{totalSupply}</label>
          <hr />
          <div>
            <button
              type='submit'
              className='w-30 btn text-truncate btn-info'
            >
              Your ticket{" "}
            </button>

          </div>
         <hr />
          <label>Your TRIP balance: </label>
          <label>{balance}</label>
          <hr />
          <div>
            <button style={{margin:"30px"}}
              type='submit'
              className='w-30 btn text-truncate btn-primary'
            >
              Claim your tokens{" "}
            </button>
<Link to="/Profile">
            <button
              type='submit'
              className='w-30 btn text-truncate btn-secondary'
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

function mapStateToProps(state) {
  return {
    contract: contractSelector(state),
    account: accountSelector(state),
    totalSupply: totalSupplySelector(state),
    balance: balanceSelector(state)
  };
}

export default connect(mapStateToProps)(Rewards);
