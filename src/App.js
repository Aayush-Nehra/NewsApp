
import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import NewsComponent from './components/NewsComponent';

export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<NewsComponent key="default" category="general" />} />
            <Route path="business" element={<NewsComponent key="business" category="business" />} />
            <Route path="entertainment" element={<NewsComponent key="entertainment" category="entertainment" />} />
            <Route path="general" element={<NewsComponent key="general" category="general" />} />
            <Route path="health" element={<NewsComponent key="health" category="health" />} />
            <Route path="science" element={<NewsComponent key="science" category="science" />} />
            <Route path="sports" element={<NewsComponent key="sports" category="sports" />} />
            <Route path="technology" element={<NewsComponent key="technology" category="technology" />} />
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
