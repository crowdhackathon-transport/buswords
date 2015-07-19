import { Reapp, React, NestedViewList, View, Button, BackButton } from 'reapp-kit';
import ButtonGroup from 'reapp-ui/components/ButtonGroup';
import GitHubGravatarURL from '../Gravatar'
import { Container, Block } from 'reapp-ui/components/Grid';
import { Sticker } from './Stickers'
import Conversation from '../Conversation'

var myGitHubUserId = 2;

localStorage.setItem('user', myGitHubUserId);

function goToPeople(router) {
  router.transitionTo('/');
}

var ChatRoom = React.createClass({
  render: function () {
    var { width, pad, row, children, ...props } = this.props,
        style = {
          backgroundColor: 'white',
          padding: '32px',
          margin: '32px 0'
        };
    return <div style={style}>{children}</div>
  }
});

var ChatMessage = React.createClass({
  render: function () {
    var { width, pad, row, children, ...props } = this.props,
        style = {
          maxWidth: '40%',
          float: this.props.messagePosition,
          minHeight: '32px',
          minWidth: '32px',
          padding: '4px',
          lineHeight: '32px',
          marginBottom: '8px',
          marginTop: '8px',
          color: (this.props.messagePosition == 'left') ? '#111' : '#fafafa',
          backgroundColor: (this.props.messagePosition == 'left') ? '#f1f0f0' : '#0084ff',
          borderRadius: '4px'
        };

    return <container key={this.props.key}>
            <Block style={style}>{children}</Block>
           </container>
  }
});

class Chat extends React.Component {
  render() {
    var router = this.context.router;
    const backButton =
      <BackButton onTap={() => goToPeople(router)} />

    var GitHubUserId = localStorage.getItem('chatId'),
        AvatarURL = GitHubGravatarURL(GitHubUserId, 32),
        conversationId = myGitHubUserId + '-' + GitHubUserId,
        conversation = new Conversation({
          id: conversationId
        });

    localStorage.setItem('conversation', conversation.id);

    function goToArticle (link) {
      window.location = '/article#' + link;
    }

    var renderedMessages = conversation.messages.map(function (message) {
      var messageContent,
          messagePosition = (message.sender == myGitHubUserId) ? 'right' : 'left';

      if (message.messageClass == 'Sticker') {
        messageContent = <Sticker stickerPath={message.messageData.stickerPath}></Sticker>
      } else if (message.messageClass == 'Trend') {
        messageContent = message.messageData.value;
      } else if (message.messageClass == 'TfaArticle') {
        messageContent = message.messageData.title;
      } else if (message.messageClass == 'Article') {
        messageContent = <div style={{cursor: 'pointer'}} onClick={() => goToArticle(message.messageData.link)}>
                             <h4>{message.messageData.title}</h4>
                             <p>{message.messageData.short}</p>
                         </div>
      }

      var chatMessage = <ChatMessage key={message.key} messagePosition={messagePosition}>{messageContent}</ChatMessage>

      return chatMessage;
    })

    function getTitle () {
      var style = {
        borderRadius: '32px',
        width: '32px'
      };

      return <img src={AvatarURL} style={style}/>
    }

    var placeholderStyle={
          textAlign: 'center'
        },
        chatRoomContent = (renderedMessages.length) ? renderedMessages : <p style={placeholderStyle}>Share a <strong>Sticker</strong> or a <strong>Trend</strong>!</p>
    return (
      <NestedViewList {...this.props.viewListProps}>
        <View title={getTitle()} titleLeft={backButton} >
          <ChatRoom>
            {chatRoomContent}
          </ChatRoom>
          <ButtonGroup>
            <Button onTap={() => this.router().transitionTo('stickersView')} >Stickers</Button>
            <Button onTap={() => this.router().transitionTo('trends')} >Trends</Button>
            <Button onTap={() => this.router().transitionTo('articles')} >Articles</Button>
            <Button onTap={() => this.router().transitionTo('tfa')} >TfA News</Button>
          </ButtonGroup>
        </View>

        {this.props.child()}
      </NestedViewList>
    );
  }
}

export default Reapp(Chat);

/*
 This is your root route. When you wrap it with Reapp()
 it passes your class two properties:

  - viewListProps: Passes the scrollToStep to your ViewList so it animates
  - child: The child route
*/
