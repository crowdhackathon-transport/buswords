import { Reapp, React, NestedViewList, View, Button } from 'reapp-kit';
import ButtonGroup from 'reapp-ui/components/ButtonGroup';

class Home extends React.Component {
  render() {
    return (
      <NestedViewList {...this.props.viewListProps}>
        <View title="Buswords ">
          <ButtonGroup>
            <Button onTap={() => this.router().transitionTo('stickers')} >Stickers</Button>
            <Button onTap={() => this.router().transitionTo('trends')} >Trends</Button>
          </ButtonGroup>
        </View>

        {this.props.child()}
      </NestedViewList>
    );
  }
}

export default Reapp(Home);

/*
 This is your root route. When you wrap it with Reapp()
 it passes your class two properties:

  - viewListProps: Passes the scrollToStep to your ViewList so it animates
  - child: The child route
*/
