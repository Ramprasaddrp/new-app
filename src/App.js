import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home';
import Login from './components/Login';
import VideoItemDetails from './components/VideoItemDetails';
import {useState} from 'react'
import NxtThemeContext from './Context' 
import './App.css'
import Gaming from './components/Gaming';
import TrendingVideos from './components/Trending';
import SavedVideos from './components/SavedVideos';


export default function App() {
  const [isDarkTheme, setTheme] = useState("light")
  const [savedVideos, setSavedVideos] = useState([])


  const addToSavedVideos = videoDetails => {
    const filterList = savedVideos.filter(
      eachItem => eachItem.id === videoDetails.id,
    )
    if (filterList.length !== 0) {
      const NewList = savedVideos.filter(
        eachItem => eachItem.id !== videoDetails.id,
      )
      setSavedVideos(NewList)
    } else {
      setSavedVideos([...savedVideos, videoDetails])
    }
  }
 

  const toggleTheme = () => {
    const theme = isDarkTheme === 'dark' ? 'light' : 'dark'
    setTheme(theme)
  }

    return ( 
      <NxtThemeContext.Provider
      value={{
        isDarkTheme,
        toggleTheme,
        savedVideos,
        addToSavedVideos,
      }}
    >
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route exact path="/videos/:id" element={<ProtectedRoute><VideoItemDetails /></ProtectedRoute>} />
          <Route exact path='/gaming' element={<ProtectedRoute><Gaming/></ProtectedRoute>}/>
          <Route exact path='/trending' element={<ProtectedRoute><TrendingVideos/></ProtectedRoute>}/>
          <Route exact path='/saved-videos' element={<ProtectedRoute><SavedVideos/></ProtectedRoute>}/>
        </Routes>
    </NxtThemeContext.Provider>
    ) 
  }


