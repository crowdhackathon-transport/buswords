import { React, View, BackButton } from 'reapp-kit';
import List from 'reapp-ui/components/List';
import Title from 'reapp-ui/components/Title';
import Conversation from '../Conversation'

export default class extends React.Component {
  render() {
    const backButton =
      <BackButton onTap={() => window.history.back()} />

    var articles = JSON.parse(
      localStorage.getItem('articles.articles')
    );

    articles = (articles) ? articles : [];

    var articleLink = (location.hash) ? location.hash.substring(1) : null,
        article = articles.filter(function (article) {
          return (article.link == articleLink)
        });

    article = (article.length) ? article[0] : {text: 'No article', title: 'No article'}

    return (
      <View {...this.props} title={article.title} titleLeft={backButton}>
        <div dangerouslySetInnerHTML={{__html: article.html}}></div>
      </View>
    );
  }
}
