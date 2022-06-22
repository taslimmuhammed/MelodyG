import { ethers } from "ethers";
import { createContext, useState, useEffect } from "react";
import { abi } from "../Utils/abi";

export const EthersContext = createContext(null);
const {ethereum} = window


export default function Ethers({children}){
  const contractAddress = "0x257856a15f3298474692D3A9c61088C408cDcF85"
    const [currentAccount, setCurrentAccount] = useState(null);
    const [Stakes, setStakes] = useState();
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, abi,signer)


    const checkIfWalletIsConnect = async () => {
      try {
        if (!ethereum) return alert("Please install MetaMask.");
  
        const accounts = await ethereum.request({ method: "eth_accounts" });
  
        if (accounts.length) {
          setCurrentAccount(accounts[0]); 
        } else {
          alert("No accounts found");
        }
      } catch (error) {
        console.log(error);
      }
    };

    const connectWallet = async () => {
      try {
        if (!ethereum) return alert("Please install MetaMask.");
        const accounts = await ethereum.request({ method: "eth_requestAccounts"});
        setCurrentAccount(accounts[0]);
        window.location.reload();
      } catch (error) {
        console.log(error);
        throw new Error("No ethereum object");   
      }
    };

    const getUserDetails =async ()=>{
      try{
         const accounts = await ethereum.request({method: "eth_accounts"})
         const account  = accounts[0]
         let balance =await contract.balanceOf(account)
         console.log(balance,"balance")
         let totalSupply =await contract.totalSupply()
         console.log(totalSupply,"totalSupply")
         let tax = await contract.tax()
         console.log(tax,"tax")
         balance = balance.toNumber()
         totalSupply = totalSupply.toNumber()
         tax = tax.toNumber()
         let arr = [balance, totalSupply, tax]
         return arr;
        }
         catch(e){
         console.log(e)
         }
    }

    const hasStake =async ()=>{
      try{
         const accounts = await ethereum.request({method: "eth_accounts"})
         const account  = accounts[0]
         const balance =await contract.hasStake(account)
         setStakes(balance)
         console.log(balance)
        }
         catch(e){
         console.log(e)
         }
    }
  
    const createStake =async (amount)=>{
      try{
        let x = parseInt(amount)
        x = ethers.utils.hexlify(x)
        console.log(x, "hex")
         const balance =await contract.stake(x)
         await balance.wait()
         setStakes(balance)
         console.log(balance)
         alert(`Succesfully staked ${amount}, it'll be deducted from your balance`)
        }
         catch(e){
         console.log(e)
         alert(e.data.message)
         }
    }

      const withDraw = async(amount, index)=>{
         let x = ethers.utils.hexlify(amount)
         const transfer = await contract.withdrawStake(x, index)
         console.log(transfer)
         await transfer.wait()
         alert("withdrwal succeful")
         return transfer
      }


      // const getMyWorks = async()=>{
      //   try{

      //     const { ethereum } = window
      //     const provider = new ethers.providers.Web3Provider(ethereum)
      //     const signer = provider.getSigner()
      //     const contract = new ethers.Contract(contractAddress, abi,signer)
      //     const accounts = await ethereum.request({method: "eth_accounts"})
      //     const account  = accounts[0]
      //     const myIds = await contract.getTokens(account)
      //     const getNames= myIds.map(e=>{
      //     return parseInt(e._hex, 16)})
      //    return getNames
      //   }catch(e){
      //    console.log(e)
      //   }
       
      // }

      // const changeNetwork = async () => {
      //   if (window.ethereum) {
      //     try {
      //       await window.ethereum.request({
      //       method: 'wallet_switchEthereumChain',
      //         params: [{ chainId: "0x89" }],
      //       });
      //     } catch (error) {
      //       console.error(error);
      //     }
      //   }}

      const getN = async()=>{
        const chainId = 56// Polygon Mainnet

        if (window.ethereum.networkVersion !== chainId) {
              try {
                await window.ethereum.request({
                  method: 'wallet_switchEthereumChain',
                  params: [{ chainId: "0x38" }]
                });
              } catch (err) {
                  // This error code indicates that the chain has not been added to MetaMask
                if (err.code === 4902) {
                  await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                      {
                        chainName: 'Binance Smart Chain',
                        chainId: "0x38" ,
                        nativeCurrency: { name: 'Binance Coin', decimals: 18, symbol: 'BNB' },
                        rpcUrls: ['https://bsc-dataseed.binance.org/']
                      }
                    ]
                  });
                }
              }
            }
        
      }

    useEffect(() => {
      checkIfWalletIsConnect();
      hasStake()
     getN()
    }, []);


    return(
        <EthersContext.Provider value={{connectWallet, currentAccount, checkIfWalletIsConnect,getUserDetails,hasStake, Stakes,withDraw,createStake}}>
          {children}
        </EthersContext.Provider>
    )
}
