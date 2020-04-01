import React, { Component } from 'react';

export default class Input extends Component {
  render() {
    return (
      <>
        <label htmlFor={this.props.id}> {this.props.label} </label>
        <textarea {...this.props} required autoComplete='off' />
      </>
    );
  }
}
