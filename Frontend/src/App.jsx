import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Appbar from "./components/Appbar.jsx";
import Home from "./components/Home.jsx";
import Recommend from './components/Recommend.jsx';
import Search from './components/Search.jsx';


function App() {
  

  return (
    
      <div style={{
      width : "98.7vw",
      minHeight:"100vh",
      backgroundColor:"#fccc5d"
    }}>
                    <Router>
                        <Appbar />
                        <Routes>
                        <Route path={"/"} element={<Home />} />
                        <Route path={"/:bookname"} element={<Recommend />} />
                        <Route path={"/books/:book"} element={<Search />} />
                        </Routes>
                    </Router>
     </div>

  )
}

export default App
