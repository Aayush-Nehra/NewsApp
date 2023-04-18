import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class NewsComponent extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      pageNumber: 1
    }
  }

  async componentDidMount() {
    let newsArticles = await this.getNewsArticles();
    this.setState({ articles: newsArticles })
  }

  async getNewsArticles(pageNumber) {
    let newsApiUrl = `https://newsapi.org/v2/top-headlines?country=in&apiKey=4ee17a8d3034488383d8fd86c4b89dcf&pageSize=15&page=${pageNumber}`;
    let rawNewsArticles = await fetch(newsApiUrl);
    let parsedNewsArticles = await rawNewsArticles.json();
    return parsedNewsArticles.articles;
  }

  gotoNextPage = async ()=>{
    console.log("nextPage")
    let nextPageNumber = this.state.pageNumber + 1;
    let newsArticles = await this.getNewsArticles(nextPageNumber)
    this.setState({
      pageNumber: nextPageNumber,
      articles: newsArticles
    })
  }

  gotoPreviousPage = async ()=>{
    let prevPageNumber = this.state.pageNumber - 1;
    let newsArticles = await this.getNewsArticles(prevPageNumber)
    this.setState({
      pageNumber: prevPageNumber,
      articles: newsArticles
    })
  }

  render() {
    return (
      <div>
        <div className="container text-center my-3">
          <h1 tabIndex="0">Top News Headlines</h1>
          <div className="row">
            {this.state.articles.map((article) => {
              return <div className="col-md-4 my-3" key={article.url}>
                <div className="w-100">
                  <NewsItem className="text-truncate" title={article.title ? article.title : ""} imageUrl={article.urlToImage} description={article.description ? article.description : ""} url={article.url} />
                </div>
              </div>
            })}
          </div>
          <div className="container d-flex justify-content-between">
          <button type="button" disabled={this.state.pageNumber<=1}onClick={this.gotoPreviousPage} className="btn btn-dark">&#8592; Previous</button>
          <button type="button" onClick={this.gotoNextPage} className="btn btn-dark">Next &#8594;</button>
        </div>
        </div>
        
      </div>
    )
  }
}

export default NewsComponent
