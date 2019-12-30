import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Tab extends Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  onClick = () => {
    const { label, onClick } = this.props;
    onClick(label);
  }

  render() {
    const {
      onClick,
      props: {
        activeTab,
        label,
      },
    } = this;

    let className = 'tab-list-item';
    let style = {cursor: 'pointer'};
    if (activeTab === label) {
      style = {cursor: 'default'}
      className += ' tab-list-active';
    }

    return (
      <li
        style= {style}
        className={className}
        onClick={onClick}
      >
        {label}
      </li>
    );
  }
}

export default Tab;
