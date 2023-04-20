import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description,imageUrl,url,author,date} = this.props
    return (
      <div>
        <div className="card">
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title text-truncate">{title}</h5>
            <p className="card-text">{description}</p>
            <p class="card-text"><small class="text-muted">Written By: {author?author:"Author Unknown"}</small></p>
            <p class="card-text"><small class="text-muted">Published On: {new Date(date).toDateString()}</small></p>
            <a href={url} target='_blank' className="btn btn-primary">Know More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
