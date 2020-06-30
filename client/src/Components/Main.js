import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Navbar from './Navbar';
import Home from './Home';
import BookTicket from './BookTicket';
import Rewards from './Rewards';
import Profile from './Profile';
import Contact from './Contact';


class Main extends Component {
  render () {
    return (
      <div className="Main">
        <Navbar />
        <Switch>
        <Route exact path='/' render={(params) => (<Home {...this.props}{...params}/>)}/>
        <Route exact path='/BookTicket/:id' render={(params) => (<BookTicket {...this.props} {...params} />)} />
        <Route path='/Rewards' render={(params) => (<Rewards {...this.props} {...params} />)} />

        <Route exact path='/Profile' component={Profile} />
        <Route exact path='/Contact' component={Contact} />
      </Switch>
      </div>
    );
  }
}

export default Main;
