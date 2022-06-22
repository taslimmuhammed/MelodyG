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

function App() {
  const { Blocks, setBlocks } = useContext(EthersContext)
  const [Files, setFiles] = useState()
  let filesArray = []
  let files = []
  async function main() {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDhDRmRhYjQ2NUE4QzAwRWE0ZWE5YTMzY2Y1N0NkQzdhRmUzMTllMzUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTAwNDc1MzU5NjksIm5hbWUiOiJ0ZXN0In0.H0u5Ktl7sXELTGAYxAkQRzw5uh_JHsxzJtN5mbepLhE"
    const storage = new Web3Storage({ token })
    let cid = await storage.put(Files)
    console.log(cid)
    setBlocks("Hi")
  }
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
