import { React, View, BackButton } from 'reapp-kit';
import List from 'reapp-ui/components/List';
import Title from 'reapp-ui/components/Title';
import Conversation from '../Conversation'


function fetchTrends() {
  fetch('https://exdqcyue.apps.lair.io/trends').then(function (response) {
    return response.json()
  }).then(function(json) {
    localStorage.setItem('trends.trends', JSON.stringify(json));
    localStorage.setItem('trends.time', Math.round(new Date().getTime()/1000))
  });
}

function conditionalFetchTrends() {
  var now = new Date().getTime(),
      lastFetch = (localStorage.getItem('trends.time')) ? +localStorage.getItem('trends.time') : 0;

  /* Fetch trends only if they have not been fetched for 15 minutes at least */
  if ((now - lastFetch) > 900) {
    fetchTrends()
  }
}

conditionalFetchTrends();

export default class extends React.Component {
  render() {
    const backButton =
      <BackButton onTap={() => window.history.back()} />

    var conversation = Conversation.getCurrent();

    function sendTrend(trend) {
      var message = {
        messageClass: 'Trend',
        messageData: {
          value: trend
        }
      }

      conversation.addMessage(message);
      window.history.back();
    }
    var style = {
      cursor: 'pointer'
    };

    var trends = JSON.parse(localStorage.getItem('trends.trends'));

    return (
      <View {...this.props} title="Trends" titleLeft={backButton}>
        <List wrap>
        {
          trends.map(function (trend) {
            return <span style={style} onClickCapture={() => sendTrend(trend)} >{trend}</span>
          })
        }
        </List>
      </View>
    );
  }
}
