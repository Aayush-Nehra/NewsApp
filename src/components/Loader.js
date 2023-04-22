import React, { Component } from 'react'
import ajaxloader from '../assets/ajaxloader.gif'

export default class Loader extends Component {
  render() {
    return (
      <div className='container text-center my-3'>
        <img src={ajaxloader} style={{height: '50px', width: '50x'}} alt="" />
      </div>
    )
  }
}
