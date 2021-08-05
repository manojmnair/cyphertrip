import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import DateTimePicker from "react-datetime-picker";
import { getJourneys } from "../redux/actions";
import { gotJourneys } from "../redux/actions";
import Autosuggest from "react-autosuggest";

const getSuggestionFrom = (suggestion) => suggestion.name;
const renderSuggestionFrom = (suggestion) => <span>{suggestion.name}</span>;

const getSuggestionTo = (suggestion) => suggestion.name;
const renderSuggestionTo = (suggestion) => <span>{suggestion.name}</span>;

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "73e109b2-ab95-4469-9aee-e413bdf7b31e",
      from: "",
      to: "",
      fromlatlong: "",
      tolatlong: "",
      type: ["address"],
      datetime: new Date(),
      fromSuggestions: [],
      toSuggestions: [],
      loading: false,
      error: null,
    };
  }

  onChangeFrom = (event, { newValue, method }) => {
    this.setState({
      from: method === "click" || method === "enter" ? "" : newValue,
    });
  };
  onSuggestionsFromFetchRequested = async () => {
    try {
      const response = await axios.get("/places", {
        params: {
          key: this.state.key,
          q: this.state.from,
          type: this.state.type,
        },
      });
      this.setState({
        fromSuggestions: response.data.places,
        error: null,
      });
    } catch (error) {
      this.setState({ error });
    }
  };
  onSuggestionFromSelected = (event, { suggestion }) => {
    this.setState({
      from: suggestion.name,
      fromlatlong: suggestion.id,
    });
  };
  onSuggestionsFromClearRequested = () => {
    this.setState({ fromSuggestions: [] });
  };
  onChangeTo = (event, { newValue, method }) => {
    this.setState({
      to: method === "click" || method === "enter" ? "" : newValue,
    });
  };
  onSuggestionsToFetchRequested = async () => {
    try {
      const response = await axios.get("/places", {
        params: {
          key: this.state.key,
          q: this.state.to,
          type: this.state.type,
        },
      });
      this.setState({
        toSuggestions: response.data.places,
        error: null,
      });
    } catch (error) {
      this.setState({ error });
    }
  };
  onSuggestionToSelected = (event, { suggestion }) => {
    this.setState({
      to: suggestion.name,
      tolatlong: suggestion.id,
    });
  };
  onSuggestionsToClearRequested = () => {
    this.setState({ toSuggestions: [] });
  };
  search = () => {
    let { key, fromlatlong, tolatlong, datetime } = this.state;
    this.props.getJourneys();
    return fetch(
      `https://api.navitia.io/v1/journeys?key=${key}&from=${fromlatlong}&to=${tolatlong}&datetime=${datetime.toISOString()}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        this.props.gotJourneys(data);
      })
      .catch((error) => {
        this.setState({ error });
      });
  };
  onChangeDate = (datetime) => {
    this.setState({ datetime });
  };
  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.search();
  };
  handleReset = () => {
    this.setState({
      from: "",
      to: "",
      datetime: new Date(),
    });
  };

  render() {
    const {
      from,
      to,
      fromlatlong,
      tolatlong,
      fromSuggestions,
      toSuggestions,
    } = this.state;
    const fromInputProps = {
      placeholder: "Origin",
      value: from,
      fromlatlong,
      onChange: this.onChangeFrom,
    };
    const toInputProps = {
      placeholder: "Destination",
      value: to,
      tolatlong,
      onChange: this.onChangeTo,
    };
    return (
      <div className='col-sm-6'>
        <div className='card nobord'>
          <div className='card-body'>
            <h5 className='card-title text-uppercase'>Plan your travel</h5>
            <hr />

            <form
              onSubmit={this.handleSubmit}
              onChange={this.handleChange}
              onReset={this.handleReset}
            >
              <label>
                <Autosuggest
                  suggestions={fromSuggestions}
                  onSuggestionsFetchRequested={
                    this.onSuggestionsFromFetchRequested
                  }
                  onSuggestionsClearRequested={
                    this.onSuggestionsFromClearRequested
                  }
                  onSuggestionSelected={this.onSuggestionFromSelected}
                  getSuggestionValue={getSuggestionFrom}
                  renderSuggestion={renderSuggestionFrom}
                  inputProps={fromInputProps}
                />
              </label>
              <hr />
              <label>
                <Autosuggest
                  suggestions={toSuggestions}
                  onSuggestionsFetchRequested={
                    this.onSuggestionsToFetchRequested
                  }
                  onSuggestionsClearRequested={
                    this.onSuggestionsToClearRequested
                  }
                  onSuggestionSelected={this.onSuggestionToSelected}
                  getSuggestionValue={getSuggestionTo}
                  renderSuggestion={renderSuggestionTo}
                  inputProps={toInputProps}
                />
              </label>
              <hr />
              <label>
                Date of travel:
                <div>
                  <DateTimePicker
                    name='datetime'
                    value={this.state.datetime}
                    locale='in'
                    onChange={this.onChangeDate}
                  />
                </div>
              </label>
              <hr />
              <input className='button' type='submit' value='Search' />
              <input className='button' type='reset' value='Reset' />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { getJourneys, gotJourneys })(Search);
