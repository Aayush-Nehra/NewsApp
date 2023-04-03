import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class NewsComponent extends Component {
  render() {
    return (
      <div>
        This is my news component.
        <NewsItem/>
      </div>
    )
  }
}

export default NewsComponent
