import { Reapp, React, NestedViewList, View, Button } from 'reapp-kit';
import ButtonGroup from 'reapp-ui/components/ButtonGroup';
import { Container, Block } from 'reapp-ui/components/Grid';
import GitHubGravatarURL from './Gravatar'


function goToChat (chatId) {
  localStorage.setItem('chatId', chatId)
  window.location = '/chat';
}


var Avatar = React.createClass({
  render: function() {
    var style = {
          width: '128px',
          height: '128px',
          borderRadius: '128px',
          cursor: 'pointer'
        };

    return <span>
             <img style={style} alt={"Avatar of " + this.props.GitHubUserId} src={GitHubGravatarURL(this.props.GitHubUserId, 128)} />
           </span>;
  }
});


var containerProps = {
  pad: true,
  styles: {
    self: {
      textAlign: 'center',
      marginTop: 0,
      marginBottom: 0
    }
  }
};


class People extends React.Component {
  render() {
    var router = this.router(),
        users = [
          ["788386", "6293460", "436509", "3789226"],
          ["1188592", "3427236", "7421439", null]
        ],
        contentButton = <Button chromeless onTap={() => router.transitionTo('/content')}>Content</Button>;

    return (
      <NestedViewList {...this.props.viewListProps}>
        <View title="Cool people near me" titleRight={contentButton} >
          {
            users.map(function (userRow, index) {
              return <Container key={"userRow-" + index} {...containerProps}>
                       {
                         userRow.map(function (user, index) {
                           if (!user) {
                             return <Block></Block>
                           }
                           return <Block onClick={() => goToChat(user)} key={"userBlock" + user} >
                                    <Avatar GitHubUserId={user}></Avatar>
                                  </Block>
                         })
                       }
                     </Container>
            })
          }
        </View>

        {this.props.child()}
      </NestedViewList>
    );
  }
}

export default Reapp(People);

/*
 This is your root route. When you wrap it with Reapp()
 it passes your class two properties:

  - viewListProps: Passes the scrollToStep to your ViewList so it animates
  - child: The child route
*/
