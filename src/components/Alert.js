import React from 'react';
import PropTypes from 'prop-types';

class Alert extends React.Component {

  render() {
    return (
      <p className="chat-alert">{ this.props.message }</p>
    );
  }

}

Alert.propTypes = {
  message: PropTypes.string.isRequired
}

export default Alert;
