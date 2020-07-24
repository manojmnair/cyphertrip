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

export function beneficiariesLoaded(beneficiaries){
  return {
    type: 'BENEFICIARIES_LOADED',
    beneficiaries
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
//export function balanceUpdated(balance){
 // return {
   // type: 'BALANCE_UPDATED',
    //balance
 // }
//}
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
