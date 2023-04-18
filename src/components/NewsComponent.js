import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class NewsComponent extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
    }
  }

  async componentDidMount() {
    let parsedNewsArticles = await this.getNewsArticles();
    this.setState({ articles: parsedNewsArticles })
  }

  async getNewsArticles() {
    let newsApiUrl = "https://newsapi.org/v2/top-headlines?country=in&apiKey=4ee17a8d3034488383d8fd86c4b89dcf";
    let rawNewsArticles = await fetch(newsApiUrl);
    let parsedNewsArticles = await rawNewsArticles.json();
    return parsedNewsArticles.articles;
  }

  render() {
    return (
      <div>
        <div className="container text-center my-3">
          <div className="row">
            {this.state.articles.map((article) => {
              return <div className="col-md-4 my-3" key={article.url}>
                <div className="w-100">
                  <NewsItem className="text-truncate" title={article.title ? article.title : ""} imageUrl={article.urlToImage} description={article.description ? article.description : ""} url={article.url} />
                </div>
              </div>
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default NewsComponent
