import React, { Component } from 'react';
import SvgIcon from '../../../utils/SvgIcon';
class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  onClickHandler(e) {
    e.stopPropagation(); // Ensures we don't propagate up to parent
    this.toggleActiveList(e.target);
    this.setState((prevState, _props) => {
      return {
        visible: !prevState.visible
      }
    });
  };

  toggleActiveList(element) {
    if (element.tagName === "SPAN") {
      element = element.previousSibling;
    }

    // We don't modify active state color if subfeature is absent
    // subfeature and child of subfeature
    if (this.props.children && this.props.children.props.children.length > 0) {
      if (this.state.visible) {
        element.classList.remove("active");
      } else {
        element.classList.add("active");
      }
    }
  }

  render() {
    const { visible } = this.state;
    const levelIdentifierClassName = `feature__list-item__${this.props.classNameStyles.levelIdentifierClassName}`;
    const detailedListItemClassName = `${levelIdentifierClassName} ${this.props.classNameStyles.isAvailableClassName}`;
    return (
      <div className={"features__list-item__container"} >
        <li
          onClick= {(e) => this.onClickHandler.call(this, e)}
          className= {`features__list-item ${detailedListItemClassName} ${this.props.classNameStyles.iconClassName}`}
        >
          <SvgIcon iconName={`${this.props.classNameStyles.iconClassName}`}/>
        </li>
        <span onClick= {(e) => this.onClickHandler.call(this, e)}>
          {this.props.title}
          </span>
        {visible && this.props.children}
      </div>
    )
  }
}

export default ListItem