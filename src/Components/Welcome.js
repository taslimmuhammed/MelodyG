import React, { useContext, useEffect,useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
// import { SiEthereum } from "react-icons/si";
import binanc_icon from '../images/binance-logo.png'
import { BsInfoCircle } from "react-icons/bs";
import { Navigate, useNavigate } from 'react-router-dom';
import { Col, Row } from "react-bootstrap";
import { EthersContext } from "../Context/EthersContext";
import '../Styles/Welcome.css'
import { shortenAddress } from "../Utils/ShortenAddress";
// import { shortenAddress } from "../utils/shortenAddress";


const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";



const Welcome = () => {
  const { currentAccount, connectWallet, getUserDetails,Stakes } = useContext(EthersContext)
  const [Details, setDetails] = useState(["0","0","0"])
  const navigate = useNavigate()
  const initiator = async()=>{
   const x = await getUserDetails()
   setDetails(x)
   console.log(x)
  }
  useEffect(() => {
  initiator()
  }, [])


  return (
    <div className="wel_main md:mt-24 md:-ml-5">
      <div className="wel_sub">
        <Row>

          <Col sm={12} xs={12} lg={6} md={6} className="wel_left">
            {
              currentAccount ? <div className="flex flex-col flex-1 items-center justify-start w-full  mt-2">
                <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism ">
                  <div className="flex justify-between flex-col w-full h-full">
                    <div className="flex justify-between items-start">
                      <div className="w-10 h-10  flex justify-center items-center">
                        <img src={binanc_icon} ></img>
                      </div>
                      <BsInfoCircle fontSize={17} color="#fff" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-lg mt-1">
                        Binance
                      </p>
                      <p className="text-white">{shortenAddress(currentAccount)}</p>
                    </div>
                  </div>
                </div>
                <div className="flex ">
                <button className="button-85 mt-1" onClick={() => { navigate('/stake') }}>Stake</button>
                <button className="button-64" onClick={() => { navigate('/withdraw') }}><span className="text">Withdraw</span></button>
                </div>
                
              </div> :
                <div>
                  <button className="button-63 btm" onClick={connectWallet}>Connect Wallet</button>
                </div>
            }

          </Col>


          <Col sm={12} xs={12} lg={6} md={6}>
            <div className='view_details blue-glassmorphism '>

              <div className="text-center">
                <div className='content_main'>MelodyG Price</div>
                <div className='content_sub  italic'> $0.5 </div>

                <div className="flex1 mt-3">

                  <div>
                    <div className='content_main'>Balance</div>
                    <div className='content_sub  italic'> {Details && Details[0]} </div>
                  </div>

                  <div>
                    <div className='content_main'>Total Supply</div>
                    <div className='content_sub  italic'> 100 Mlln</div>
                  </div>
                </div>

                <div className="flex1 mt-3">

                  <div>
                    <div className='content_main'>Staking Balance</div>
                    <div className='content_sub  italic'>{Stakes?Stakes[0].toNumber():"0"}</div>
                  </div>

                  <div>
                    <div className='content_main'>Staking Rate</div>
                    <div className='content_sub  italic'> 500%/Year </div>
                  </div>

                </div>

                {/* <div className='content_main'></div>
                <div className='content_sub  italic'></div> */}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Welcome;
