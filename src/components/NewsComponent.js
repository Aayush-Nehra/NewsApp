import React, { useState,useEffect } from 'react'
import NewsItem from './NewsItem'
import Loader from './Loader';
import configData from '../main/resources/config.json'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

  function NewsComponent(props){
  const [articles,setArticles] = useState([]);
  const [totalArticles,setTotalArticles] = useState(0);
  const [isArticleLoading,setIsArticleLoading] = useState(true);
  const [pageNumber,setPageNumber] = useState(true);

  useEffect(() => {
    props.setProgress(20);
    displayLoadedArticlesInPage(pageNumber);
    props.setProgress(100);
    document.title = `${capitalizeFirstLetter(props.category)} News`
  }, []);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const displayLoadedArticlesInPage = async (pageNumber)=> {
    let newsArticlesObjectForDisplay = await getNewsArticlesObject(pageNumber);
    setTotalArticles(newsArticlesObjectForDisplay.totalResults);
    setArticles(articles.concat(newsArticlesObjectForDisplay.articles));
    setIsArticleLoading(false);
  }

  const getNewsArticlesObject = async (pageNumber) => {
    let newsApiUrl = getNewsApiRequestUrl(pageNumber);
    let newsArticlesObject = await fetch(newsApiUrl);
    let parsedNewsArticlesObject = await newsArticlesObject.json();
    return parsedNewsArticlesObject;
  }
  
  const getNewsApiRequestUrl = (pageNumber) => {
    return `${configData.NEWSAPI_URL}?country=in&category=${props.category}&apiKey=${process.env.REACT_APP_NEWSAPI_KEY}&pageSize=${configData.NEWS_APPLICATION_PAGE_SIZE}&page=${pageNumber}`;
  }

  const fetchMoreData = async () => {
    let nextPageNumber = getNextPageNumber()
    displayLoadedArticlesInPage(nextPageNumber);
  }

  const getNextPageNumber = () => {
    let currentPageNumber = pageNumber;
    let nextPageNumber = currentPageNumber + 1;
    setPageNumber(nextPageNumber);
    return nextPageNumber;
  }

    return (
      <>
        <h1 className='text-center' style={{ margin: '35px 0px' }}>Top News Headlines - {capitalizeFirstLetter(props.category)}</h1>
        {isArticleLoading && <Loader />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalArticles}
          loader={<Loader/>}
        >
          <div className="container my-3">
            <div className="row">
              {articles.map((article) => {
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

NewsComponent.propTypes = {
  category: PropTypes.string,
  setProgress: PropTypes.func,
}

export default NewsComponent
