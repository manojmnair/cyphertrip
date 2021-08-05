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
export function tokenRewardContractLoaded(tokenRewardContract){
  return {
    type: 'TOKEN_REWARD_CONTRACT_LOADED',
    tokenRewardContract
  }
}
export function ipfsContractLoaded(ipfsContract){
  return {
    type: 'IPFS_CONTRACT_LOADED',
    ipfsContract
  }
}

export function balanceLoaded(balance){
  return {
    type: 'BALANCE_LOADED',
    balance
  }
}
/////
export function getTickets(data){
  return {
    type: 'GET_TICKETS'
  }
}
export function gotTickets(tickets){
  return {
    type: 'GOT_TICKETS',
    tickets
  }
}
export function getTicket(data){
  return {
    type: 'GET_TICKET'
  }
}
export function gotTicket(ticket){
  return {
    type: 'GOT_TICKET',
    ticket
  }
}
export function ticketUpload(image){
  return {
    type: 'UPLOAD_TICKET',
    image
  }
}
export function ticketUploaded(ticket){
  return {
    type: 'UPLOADED_TICKET',
    ticket
  }
}
export function errorLoaded(error){
  return {
    type: 'SET_ERROR',
    error
  }
}
/////
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
