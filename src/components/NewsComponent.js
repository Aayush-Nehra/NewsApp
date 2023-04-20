import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loader from './Loader';
import configData from '../main/resources/config.json'
import PropTypes from 'prop-types'

export class NewsComponent extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      totalArticles: 0,
      isArticleLoading: false,
      pageNumber: 1
    }
  }

  async componentDidMount() {
    this.loadArtilcles();
    await this.displayLoadedArticles(this.state.pageNumber);
  }

  async displayLoadedArticles(pageNumber) {
    let newsArticlesObject = await this.getNewsArticlesObject(pageNumber);
    this.setState({
      articles: newsArticlesObject.articles,
      totalArticles: newsArticlesObject.totalResults,
      isArticleLoading: false,
      pageNumber: pageNumber
    });
  }

  loadArtilcles() {
    this.setState({
      isArticleLoading: true,
    });
  }

  async getNewsArticlesObject(pageNumber) {
    // let newsApiUrl = `https://newsapi.org/v2/top-headlines?country=in&apiKey=4ee17a8d3034488383d8fd86c4b89dcf&${this.props.pageSize}&page=${pageNumber}`;
    let newsApiUrl = this.getNewsApiRequestUrl(pageNumber);
    let rawNewsArticles = await fetch(newsApiUrl);
    let parsedNewsArticles = await rawNewsArticles.json();
    return parsedNewsArticles;
  }

  gotoNextPage = async () => {
    this.loadArtilcles()
    let nextPageNumber = this.getNextPageNumber();
    this.displayLoadedArticles(nextPageNumber);
  }

  gotoPreviousPage = async () => {
    let prevPageNumber = this.getPreviousPageNumber();
    this.displayLoadedArticles(prevPageNumber);
  }

  getNewsApiRequestUrl(pageNumber) {
    return `${configData.NEWSAPI_URL}?country=in&category=${this.props.category}&apiKey=${configData.NEWSAPI_KEY}&pageSize=${configData.NEWS_APPLICATION_PAGE_SIZE}&page=${pageNumber}`;
  }

  getPreviousPageNumber() {
    let currentPageNumber = this.state.pageNumber;
    let prevPageNumber = currentPageNumber - 1;
    return prevPageNumber;
  }

  getNextPageNumber() {
    let currentPageNumber = this.state.pageNumber;
    let nextPageNumber = currentPageNumber + 1;
    return nextPageNumber;
  }

  render() {
    return (
      <div>
        <div className="container text-center my-3">
          <h1 tabIndex="0">Top News Headlines</h1>
          <div className="row">
            <div className="text-center">
              {this.state.isArticleLoading && <Loader />}
            </div>
            {!this.state.isArticleLoading && this.state.articles.map((article) => {
              return <div className="col-md-4 my-3" key={article.url}>
                <NewsItem title={article.title ? article.title : ""} imageUrl={article.urlToImage} description={article.description ? article.description : ""} url={article.url} author={article.author} date={article.publishedAt} />
              </div>
            })}
          </div>
          <div className="container d-flex justify-content-between">
            <button type="button" disabled={this.state.pageNumber <= 1} onClick={this.gotoPreviousPage} className="btn btn-dark">&#8592; Previous</button>
            <button type="button" disabled={this.state.pageNumber >= (Math.ceil(this.state.totalArticles / 15))} onClick={this.gotoNextPage} className="btn btn-dark">Next &#8594;</button>
          </div>
        </div>

      </div>
    )
  }
}

NewsComponent.propTypes = {
  category: PropTypes.string,
}

export default NewsComponent
