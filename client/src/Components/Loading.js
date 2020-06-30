import React, { Component } from "react";

class Loading extends Component {
  render() {

    return (

              <div className="card nobord">
                <div className="card-body">
                  <div className="loader">
                    <div className="loader-inner">
                      <div className="loading one"></div>
                    </div>
                    <div className="loader-inner">
                      <div className="loading two"></div>
                    </div>
                    <div className="loader-inner">
                      <div className="loading three"></div>
                    </div>
                    <div className="loader-inner">
                      <div className="loading four"></div>
                    </div>
                  </div>
                </div>
              </div>

    );
  }
}
export default Loading;
