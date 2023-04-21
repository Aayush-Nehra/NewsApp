import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loader from './Loader';
import configData from '../main/resources/config.json'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class NewsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      totalArticles: 0,
      isArticleLoading: false,
      pageNumber: 1
    }
    document.title = `News - ${this.toTitleCase(this.props.category)}`
  }

  toTitleCase = (phrase) => {
    return phrase
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  async componentDidMount() {
    //this.loadArtilcles();
    await this.displayLoadedArticlesBySettingState(this.state.pageNumber);
  }

  async displayLoadedArticlesBySettingState(pageNumber) {
    let newsArticlesObject = await this.getNewsArticlesObject(pageNumber);
    debugger;
    let allNewsArticles = this.state.articles.concat(newsArticlesObject.articles)
    this.setState({
      // articles: newsArticlesObject.articles,
      articles: allNewsArticles,
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
    let newsArticlesObject = await fetch(newsApiUrl);
    let parsedNewsArticlesObject = await newsArticlesObject.json();
    return parsedNewsArticlesObject;
  }

  gotoNextPage = async () => {
    this.loadArtilcles()
    let nextPageNumber = this.getNextPageNumber();
    this.displayLoadedArticlesBySettingState(nextPageNumber);
  }

  loadMoreArticles = async () => {
    //this.loadArtilcles()
    let nextPageNumber = this.getNextPageNumber();
    this.displayLoadedArticlesBySettingState(nextPageNumber);
  }

  // gotoPreviousPage = async () => {
  //   this.loadArtilcles()
  //   let prevPageNumber = this.getPreviousPageNumber();
  //   this.displayLoadedArticlesBySettingState(prevPageNumber);
  // }

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
          <h1>Top News Headlines - {this.toTitleCase(this.props.category)}</h1>
          <InfiniteScroll
              dataLength={this.state.totalArticles}
              next={this.loadMoreArticles}
              hasMore={true}
              loader={<h4>Loading...</h4>}
            >
          <div className="row">
            {/* <div className="text-center">
              {this.state.isArticleLoading && <Loader />}
            </div> */}
            
              {this.state.articles.map((article) => {
                return <div className="col-md-4 my-3" key={article.url}>
                  <NewsItem title={article.title ? article.title : ""} imageUrl={article.urlToImage} description={article.description ? article.description : ""} url={article.url} author={article.author} date={article.publishedAt} articleSource={article.source.name} />
                </div>
              })}
            
          </div>
          </InfiniteScroll>
          {/* <div className="container d-flex justify-content-between">
            <button type="button" disabled={this.state.pageNumber <= 1} onClick={this.gotoPreviousPage} className="btn btn-dark">&#8592; Previous</button>
            <button type="button" disabled={this.state.pageNumber >= (Math.ceil(this.state.totalArticles / 15))} onClick={this.gotoNextPage} className="btn btn-dark">Next &#8594;</button>
          </div> */}
        </div>

      </div>
    )
  }
}

NewsComponent.propTypes = {
  category: PropTypes.string,
}

export default NewsComponent
