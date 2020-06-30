import getWeb3 from "../getWeb3";
import { web3Loaded, contractLoaded, accountLoaded, totalSupplyLoaded, balanceLoaded, getJourneys, gotJourneys } from "./actions";
import TripTokenContract from "../contracts/TripToken.json";


export const loadWeb3 = async (dispatch) => {
  const web3 = await getWeb3();
  dispatch(web3Loaded(web3));
  return web3;
}

export const loadAccount = async (dispatch, web3) => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  dispatch(accountLoaded(account));
  return account;
}

export const loadContract = async (dispatch, web3) => {
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = TripTokenContract.networks[networkId];
  const instance = new web3.eth.Contract(
    TripTokenContract.abi,
    deployedNetwork && deployedNetwork.address,
  );
  dispatch(contractLoaded(instance));
  return instance;
}

export const loadTotalSupply = async (dispatch, contract, web3) => {
  //const accounts = await web3.eth.getAccounts();
  //const account = accounts[0];
  //const setValue = await contract.methods.set(77).send({from:account});
  const totalSupply = await contract.methods.totalSupply().call();
  dispatch(totalSupplyLoaded(totalSupply));
  return totalSupply;
}
export const loadBalance = async (dispatch, contract, web3) => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  //const setValue = await contract.methods.set(77).send({from:account});
  const balance = await contract.methods.balanceOf(account).call();
  dispatch(balanceLoaded(balance));
  return balance;
}
//////////////
export const get_journeys = async (dispatch) => {

  dispatch(getJourneys());

}
export const got_journeys = async (dispatch,data) => {
  dispatch(getJourneys);
  const journeys = await gotJourneys();
  dispatch(gotJourneys(data));
  return journeys;
}
