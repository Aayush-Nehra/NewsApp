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
      isArticleLoading: true,
      pageNumber: 1
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} News`
  }

  async componentDidMount() {
    await this.displayLoadedArticlesInPage(this.state.pageNumber);
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async displayLoadedArticlesInPage(pageNumber) {
    let newsArticlesObject = await this.getNewsArticlesObject(pageNumber);
    this.setState({
      totalArticles: newsArticlesObject.totalResults,
      articles: this.state.articles.concat(newsArticlesObject.articles),
      isArticleLoading: false,
    });
  }

  async getNewsArticlesObject(pageNumber) {
    let newsApiUrl = this.getNewsApiRequestUrl(pageNumber);
    let newsArticlesObject = await fetch(newsApiUrl);
    let parsedNewsArticlesObject = await newsArticlesObject.json();
    return parsedNewsArticlesObject;
  }

  getNewsApiRequestUrl(pageNumber) {
    return `${configData.NEWSAPI_URL}?country=in&category=${this.props.category}&apiKey=${configData.NEWSAPI_KEY}&pageSize=${configData.NEWS_APPLICATION_PAGE_SIZE}&page=${pageNumber}`;
  }

  fetchMoreData = async () => {
    let nextPageNumber = this.getNextPageNumber()
    this.displayLoadedArticlesInPage(nextPageNumber);
  }

  getNextPageNumber() {
    let currentPageNumber = this.state.pageNumber;
    let nextPageNumber = currentPageNumber + 1;
    this.setState({
      pageNumber: nextPageNumber
    })
    return nextPageNumber;
  }

  render() {
    return (
      <>
        <h1 className='text-center' style={{ margin: '35px 0px' }}>Top News Headlines - {this.capitalizeFirstLetter(this.props.category)}</h1>
        {this.state.isArticleLoading && <Loader />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalArticles}
          loader={<Loader/>}
        >
          <div className="container my-3">
            <div className="row">
              {this.state.articles.map((article) => {
                return <div className="col-md-4 my-3" key={article.url}>
                  <NewsItem title={article.title ? article.title : ""} imageUrl={article.urlToImage} description={article.description ? article.description : ""} url={article.url} author={article.author} date={article.publishedAt} articleSource={article.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    )
  }
}

NewsComponent.propTypes = {
  category: PropTypes.string,
}

export default NewsComponent
