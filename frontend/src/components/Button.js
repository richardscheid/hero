import React, { Component } from 'react';

export default class Input extends Component {
  render() {
    return (
      <>
        <button {...this.props}> {this.props.label} </button>
      </>
    );
  }
}
