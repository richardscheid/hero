
import React, { Component } from 'react';

export default class Input extends Component {
  render() {
    return (
      <>
        <label htmlFor={this.props.id}> {this.props.label} </label>
        <input 
          {...this.props}
          required
          autoComplete='off' />
      </>
    );
  }
}