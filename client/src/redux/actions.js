export function web3Loaded(connection){
  return {
    type: 'WEB3_LOADED',
    connection
  }
}

export function accountLoaded(account){
  return {
    type: 'ACCOUNT_LOADED',
    account
  }
}

export function contractLoaded(contract){
  return {
    type: 'CONTRACT_LOADED',
    contract
  }
}

export function totalSupplyLoaded(totalSupply){
  return {
    type: 'TOTALSUPPLY_LOADED',
    totalSupply
  }
}
export function balanceLoaded(balance){
  return {
    type: 'BALANCE_LOADED',
    balance
  }
}
export function getJourneys(data) {
  return {
    type: 'GET_JOURNEYS'
  }
}
export function gotJourneys(data) {
  return {
    type: 'GOT_JOURNEYS',
    journeys:data
  }
};
