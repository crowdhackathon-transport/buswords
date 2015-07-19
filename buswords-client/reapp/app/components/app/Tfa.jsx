import { React, View, BackButton } from 'reapp-kit';
import List from 'reapp-ui/components/List';
import Title from 'reapp-ui/components/Title';
import Conversation from '../Conversation'


function fetchArticles() {
  fetch('https://exdqcyue.apps.lair.io/tfa').then(function (response) {
    return response.json()
  }).then(function(json) {
    localStorage.setItem('tfa.articles', JSON.stringify(json));
    localStorage.setItem('tfa.time', Math.round(new Date().getTime()/1000))
  });
}

function conditionalFetchArticles() {
  var now = new Date().getTime(),
      lastFetch = (localStorage.getItem('tfa.time')) ? +localStorage.getItem('tfa.time') : 0;

  /* Fetch articles only if they have not been fetched for 15 minutes at least */
  if ((now - lastFetch) > 900) {
    fetchArticles()
  }
}

conditionalFetchArticles();

export default class extends React.Component {
  render() {
    const backButton =
      <BackButton onTap={() => window.history.back()} />

    var conversation = Conversation.getCurrent();

    function sendArticle(article) {
      var message = {
        messageClass: 'TfaArticle',
        messageData: {
          title: article.title,
          link: article.link
        }
      }

      conversation.addMessage(message);
      window.history.back();
    }
    var style = {
      cursor: 'pointer'
    };

    var articles = JSON.parse(localStorage.getItem('tfa.articles'));

    return (
      <View {...this.props} title="TfA Articles" titleLeft={backButton}>
        <List>
          {
            articles.map(function (article, index) {
              return <List.Item>
                       <span style={style} onClickCapture={() => sendArticle(article)} >{article.title}</span>
                     </List.Item>
            })
          }
        </List>
      </View>
    );
  }
}
