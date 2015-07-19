import { React, View, BackButton } from 'reapp-kit';
import List from 'reapp-ui/components/List';
import Title from 'reapp-ui/components/Title';

var trends = JSON.parse(
      localStorage.getItem('trends.trends')
    ),
    articles = JSON.parse(
      localStorage.getItem('articles.articles')
    ),
    tfa = JSON.parse(
      localStorage.getItem('tfa.articles')
    );

trends = (trends) ? trends : [];
articles = (articles) ? articles : [];
tfa = (tfa) ? tfa : [];

console.log(tfa);

export default class extends React.Component {
  render() {
    console.log('length', tfa.length)
    const backButton =
      <BackButton onTap={() => window.history.back()} />

    return (
      <View {...this.props} title="Available content" titleLeft={backButton}>
        <Title>Trends</Title>
        <List wrap>
        {
          trends.map(function (trend) {
            return <span>{trend}</span>
          })
        }
        </List>
        <Title>Articles</Title>
        <List>
        {
          articles.map(function (article, index) {
            var listItemProps = {};
            if (!(index % 3)) {
              listItemProps.after = '🌟Sponsored';
            }

            return <List.Item {...listItemProps} >
                     <span style={{cursor: 'pointer'}} onClick={() => (window.location = '/article#' + article.link)}>{article.title}</span>
                   </List.Item>
          })
        }
        </List>
        <Title>TfA Articles</Title>
        <List wrap>
          {
            tfa.map(function (article) {
              console.log(article);
              return <span>{article.title}</span>
            })
          }
        </List>
      </View>
    );
  }
}
