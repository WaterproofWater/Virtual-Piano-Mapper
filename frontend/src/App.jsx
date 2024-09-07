import React from "react";
import {Routes, Route} from "react-router-dom"
import Home from "./pages/Home.jsx"
import CreateSong from "./pages/CreateSong.jsx"
import ShowSong from "./pages/ShowSong.jsx"
import EditSong from "./pages/EditSong.jsx"
import DeleteSong from "./pages/DeleteSong.jsx"

const App = () => {
  return (
    <Routes> 
      <Route path = "/" element={<Home />} /> 
      <Route path = "/songs/create" element={<CreateSong />} /> 
      <Route path = "/songs/details/:id" element={<ShowSong />} /> 
      <Route path = "/songs/edit/:id" element={<EditSong />} /> 
      <Route path = "/songs/delete/:id" element={<DeleteSong />} /> 
    </Routes>
  )
}

export default App