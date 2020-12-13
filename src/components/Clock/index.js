import React, { Component } from 'react';
import moment from 'moment';

import './style.css';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: moment().format("HH:mm"),
    };
  }
  componentDidMount() {
    this.intervalID = setInterval(
      () => this.tick(),
      1000
    );
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  tick() {
    this.setState({
      time: moment().format("HH:mm")
    });
  }
  render() {
    const { time } = this.state;
    return (
      <p className="App-clock">
        {time}
      </p>
    );
  }
}

export default Clock;