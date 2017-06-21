import React from 'react';
import PropTypes from 'prop-types';

import Message from './Message';

class MessageList extends React.Component {

  render() {
    return (
      <section className="container-messages">
        {
          this.props.messages.map( message =>
            <Message key={this.props.messages.indexOf(message)} currentUserId={this.props.currentUserId} messageData={message} />
          )
        }
      </section>
    );
  }

}

MessageList.propTypes = {
  currentUserId: PropTypes.string.isRequired,
  messages: PropTypes.array.isRequired
}

export default MessageList;
