import React from 'react';
import PropTypes from 'prop-types';

class Message extends React.Component {

  render() {
    let isMessageFromMe = this.props.currentUserId === this.props.messageData.userId;

    return (
      <section className={"message-box " + ( isMessageFromMe ? 'sent' : '') }>
        <div className="box-user-name">
          <h1>{ this.props.messageData.username }</h1>
        </div>
        <div className="box-user-message">
          <p>{ this.props.messageData.message }</p>
        </div>
      </section>
    );
  }

}

Message.propTypes = {
  currentUserId: PropTypes.string.isRequired,
  messageData: PropTypes.object.isRequired
}

export default Message;
