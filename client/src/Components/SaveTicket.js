import React, { Component } from "react";
import { Link } from "react-router-dom";
import ipfsClient from "ipfs-http-client";
import { connect } from "react-redux";
import _ from "lodash";
import { createStructuredSelector } from "reselect";

import {
  loadWeb3,
  loadipfsContract,
  loadAccount
} from "../redux/interactions";

import {
  web3Selector,
  ipfsContractSelector,
  accountSelector
} from "../redux/selectors";

import { subscribeToAccountsChanging } from "../redux/subscriptions";

class SaveTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
    description: '',
      ticketHash: null,
    file: null,
    };

    // bind methods
    this.captureFile = this.captureFile.bind(this)
    this.saveToIpfs = this.saveToIpfs.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)

  }
  captureFile = (event) => {
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({
        ticketHash: Buffer(reader.result),
        file: URL.createObjectURL(file),
      })
    }
  }

  saveToIpfs = async (event) => {
    event.preventDefault()
    const { web3, ipfsContract } = this.props;
    const { description, ticketHash, file } = this.state
    console.log(description)
    try {
      await ipfsContract.methods.uploadTicket(
        ticketHash,
        description
      )
    } catch (error) {
      console.log(error)
    }

    // return to image list
    //this.props.history.push('/')
  }



  handleSubmit (event) {
    event.preventDefault()
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }
  
  render () {
    const {
      dispatch,
      ipfsContract,
      account,
    } = this.props;
    const ipfscContractAddress = !_.isEmpty(ipfsContract)
      ? ipfsContract.options.address
      : "";

    const connectBlockchain = async (e) => {
      e.preventDefault();
      const Web3 = await loadWeb3(dispatch);
      await loadAccount(dispatch, Web3);
      await loadipfsContract(dispatch, Web3);
      subscribeToAccountsChanging(dispatch, Web3);
    };
      return (
        <div className='row'>
          <div className='col-sm-8'>
      <div className='card nobord'>

          <form onSubmit={connectBlockchain}>
            <button
              type='submit'
              className={`w-50 btn text-truncate ${
                ipfsContract !== null
                  ? "disabled btn-success"
                  : "btn-danger"
              }`}
            >
              {ipfsContract !== null
                ? "Blockchain Connected"
                : "Connect Blockchain"}
            </button>
          </form>
          <hr />

        <div className='card-body'>
          <h5 className='card-title text-uppercase'>Upload your ticket</h5>

<form onSubmit={this.saveToIpfs}>

              <label>
                Description
                <input
                  name='description'
                  type='text'
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </label>


                <div className="form-group">
                  <label htmlFor="file">Ticket *</label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="file"
                    onChange={this.captureFile}
                    required
                  />
                  <div className="invalid-feedback">Ticket required.</div>
                </div>
                <small className="d-block pb-3">* = required fields</small>

                <div className="mb-3">
                  <Link to="/" className="btn btn-secondary mr-2">
                    Cancel
                  </Link>
                  <button type="submit" className="btn btn-primary">
                    Upload
                  </button>
                </div>
              </form>
        </div>
      </div>
        </div>
      </div>
    );

}
}

const mapStateToProps = createStructuredSelector({
  web3: web3Selector,
  ipfsContract: ipfsContractSelector,
  account: accountSelector
});
export default connect(mapStateToProps)(SaveTicket);




