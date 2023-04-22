
import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import NewsComponent from './components/NewsComponent';
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {

  setProgress = (progress)=>{
    this.setState({
      progress: progress
    });
  }

  state={
    progress: 0,
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
            loaderSpeed={1500}
            height={3}
          />
          <Navbar />
          <Routes>
            <Route path="/" element={<NewsComponent setProgress={this.setProgress} key="general" category="general" />} />
            <Route path="business" element={<NewsComponent setProgress={this.setProgress} key="business" category="business" />} />
            <Route path="entertainment" element={<NewsComponent setProgress={this.setProgress} key="entertainment" category="entertainment" />} />
            <Route path="health" element={<NewsComponent setProgress={this.setProgress} key="health" category="health" />} />
            <Route path="science" element={<NewsComponent setProgress={this.setProgress} key="science" category="science" />} />
            <Route path="sports" element={<NewsComponent setProgress={this.setProgress} key="sports" category="sports" />} />
            <Route path="technology" element={<NewsComponent setProgress={this.setProgress} key="technology" category="technology" />} />
          </Routes>
        </BrowserRouter>

      </div>
    )
  }
}
// business
// entertainment
// general
// health
// science
// sports
// technology
