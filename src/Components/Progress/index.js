import React from 'react';
import { connect } from "react-redux";

export default class Progress extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };
    
  }

  render() {
    return (
      <div id="progress" style={{ display: (this.props.isLoading ? "inherit" : "none") }}>
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
    </div>
    );
  }
};

