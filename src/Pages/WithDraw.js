import React,{useState, useContext,useEffect} from 'react'
import { Col, Row, Table } from 'react-bootstrap'
import Loader from '../Components/Loader'
import { EthersContext } from '../Context/EthersContext'
import '../Styles/MyWorks.css'
function WithDraw() {
  const {hasStake,Stakes,withDraw} = useContext(EthersContext)
  const [isLoading, setisLoading] = useState(false)
  let x = 1;

  const handleWithdraw = async(amount, index)=>{
    var answer = window.confirm("Sure you want to withdraw ?");
    if(answer){
    setisLoading(true)
    try{
      const x= await withDraw(amount, index)
     console.log(x)
      await hasStake()
    }catch(e){
      console.log(e)}
   
    setisLoading(false)}
  }
    return(
    isLoading     ?( <Loader />):
     (<div  className=' Stakes_main justify-center flex'>
        <Table striped bordered hover variant="dark" className='tb_1'>
   <thead>
     <tr>
       <th>#</th>
       <th>Staked Amount</th>
       <th>Date</th>
       <th>Reward</th>
       <th>WithDraw</th>
     </tr>
   </thead>
   <tbody>
     {
       Stakes?
        Stakes.stakes.map((e, index)=>{
        if(e.amount._hex!="0x00") {
          const date = new Date(e.since.toNumber()*1000)
          let dt = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
          x++;
          return (
         <tr key={index}>
         <td>{x}</td>
         <td>{e.amount.toNumber()}</td>
         <td>{dt}</td>
         <td>{e.claimable.toNumber()}</td>
         <td className='flex justify-center'>
         <button className="button-34" onClick={()=>{handleWithdraw(e.amount.toNumber(), index)}}>Claim</button>
         </td>
       </tr>)}}
        ):
          <tr>
          <td>1</td>
          <td></td>
        </tr>
     }
     
   </tbody>
 </Table>
     </div>))
}


export default WithDraw