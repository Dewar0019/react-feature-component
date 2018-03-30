import React, { Component } from 'react';

class ListElement extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  onClickHandler(e) {
    e.stopPropagation(); // Ensures we don't propagate up to parent
    this.setState((prevState, _props) => {
      return {
        visible: !prevState.visible
      }
    });
  };

  render() {
    const { visible } = this.state;
    return (
      <li
        onClick= {(e) => this.onClickHandler.call(this, e)}
        className= {`features__list-item ${this.props.titleClassName} ${this.props.isAvailableClassName}`}
      >
        {this.props.title}
        {visible && this.props.children}
      </li>
    )
  }

}

export default ListElement