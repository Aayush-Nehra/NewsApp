
import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import NewsComponent from './components/NewsComponent';
import LoadingBar from 'react-top-loading-bar'

export default function App() {
  const [progress,setProgress] = useState(0);
    return (
      <div>
        <BrowserRouter>
          <LoadingBar
            color='#f11946'
            progress={progress}
            loaderSpeed={1500}
            height={3}
          />
          <Navbar />
          <Routes>
            <Route path="/" element={<NewsComponent setProgress={setProgress} key="general" category="general" />} />
            <Route path="business" element={<NewsComponent setProgress={setProgress} key="business" category="business" />} />
            <Route path="entertainment" element={<NewsComponent setProgress={setProgress} key="entertainment" category="entertainment" />} />
            <Route path="health" element={<NewsComponent setProgress={setProgress} key="health" category="health" />} />
            <Route path="science" element={<NewsComponent setProgress={setProgress} key="science" category="science" />} />
            <Route path="sports" element={<NewsComponent setProgress={setProgress} key="sports" category="sports" />} />
            <Route path="technology" element={<NewsComponent setProgress={setProgress} key="technology" category="technology" />} />
          </Routes>
        </BrowserRouter>

      </div>
    )
}
// business
// entertainment
// general
// health
// science
// sports
// technology
