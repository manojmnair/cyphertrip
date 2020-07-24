import getWeb3 from "../getWeb3";
import { web3Loaded, contractLoaded, accountLoaded, beneficiariesLoaded, totalSupplyLoaded,  getJourneys, gotJourneys } from "./actions";
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
export const loadBeneficiaries = async (dispatch, web3) => {

  const beneficiaries = await web3.eth.getAccounts();
console.log("ben",beneficiaries);
  dispatch(beneficiariesLoaded(beneficiaries));
  return beneficiaries;
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
//export const loadBalance = async (dispatch, contract, web3) => {
  //const accounts = await web3.eth.getAccounts();
  //const account = accounts[0];
//const trans = await contract.methods.transfer("0x5dd50ec7b5be3a4303fe53c1644f6b6fffcf9e5f",500).send({from:account, gas: 1000000});

  //const balance = await contract.methods.balanceOf("0x5dd50ec7b5be3a4303fe53c1644f6b6fffcf9e5f").call();
  //dispatch(balanceLoaded(balance));
  //return balance;
//}
//////////////
//export const updateBalance = async (dispatch, contract, web3) => {
  //const accounts = await web3.eth.getAccounts();
  //const account = accounts[0];


 // const balance = await contract.methods.balanceOf("0x5dd50ec7b5be3a4303fe53c1644f6b6fffcf9e5f").call();
  //dispatch(balanceUpdated(balance));
 // return balance;
//}

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
