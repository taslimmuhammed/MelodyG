import './App.css';
import { Web3Storage, getFilesFromPath } from 'web3.storage'
import React, { useState, useContext } from "react"
import { EthersContext } from './Context/EthersContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home';
import WithDraw from './Pages/WithDraw';
import Staking from './Pages/Staking';
import Navbar from './Components/Navbar';
import MintPage from './Pages/MintPage';
import SwapPage from './Pages/SwapPage';
import './Styles/MyWorks.css'
import './Styles/View.css'
import './Styles/Navbar.css'
import './Styles/Welcome.css'

function App() {

  return (
    <div className="min-h-screen gradient-bg-welcome">
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path='/' exact element={<Home/>}></Route>
          <Route path='/stake' element={<Staking/>}></Route>
          <Route path='/withdraw' element={<WithDraw />}></Route>
          <Route path='/mint' element={<MintPage />}></Route>
          <Route path='/swap' element={<SwapPage />}></Route>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
