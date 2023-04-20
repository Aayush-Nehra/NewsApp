import React, { Component } from 'react'
import ajaxloader from '../assets/ajaxloader.gif'

export default class Loader extends Component {
  render() {
    return (
      <div>
        <img src={ajaxloader} alt="" />
      </div>
    )
  }
}
