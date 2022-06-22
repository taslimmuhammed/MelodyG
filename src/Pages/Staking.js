import React, {useState, useEffect, useContext} from 'react'
import Loader from '../Components/Loader'
import { useNavigate } from 'react-router-dom'
import {EthersContext} from '../Context/EthersContext'
function Staking() {
    const inputStyle = "my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism w-80 mt-4 bt-4"
    const [Amount, setAmount] = useState()
    const [isLoading, setisLoading] = useState()
    const {createStake,hasStake} = useContext(EthersContext)
    const navigate = useNavigate()
    const handleSubmit = async()=>{
        var answer = window.confirm("Countinue to stake?");
        console.log(answer)
        setisLoading(true)
        if(Amount==null){ 
            return(alert("Please fill in the amount"))}
        else if(answer){ 
             await createStake(Amount)
             await  hasStake()
             navigate('/')
        }
        setisLoading(false)
    }
  return (
    <div className='gradient-bg-welcome flex w-full min-h-screen justify-center items-center'>
         <div className="p-4 -mt-28  flex flex-col justify-start items-center text-left blue-glassmorphism  border-gray-400">
           <div className='text-white'> How much you want to stake:</div> 
          <input placeholder="00000" className={inputStyle} type="text" onChange={(e) => { setAmount(e.target.value) }} />

          {isLoading
                        ? <Loader/>
                        : (
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                            >
                                Proceed to Stake
                            </button>
                        )}
        </div>
    </div>
  )
}

export default Staking