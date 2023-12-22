import axios from 'axios';
import React, { useEffect, useState } from 'react'
import useUserInfo from '../../../CustomHook/useUserInfo';

export default function PrevousOrder() {

  const [bookList,setBookList] = useState([]);
  const {userId} = useUserInfo()

  useEffect(()=>{
    axios.post('http://localhost:5000/getPrevousOrder',{userId})
    .then(res=>setBookList(res.data))
    .catch(err=>console.log(err))
  },[userId])

  //  console.log("bookList  ",bookList);

  return (
    <div className='font-poppins '>
    <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Book Name</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
    { bookList.length>0 &&
      bookList.map(item=>    
      <tr key={item._id}>
        <td>
          <div className="flex items-center space-x-3">
            {/* <div className="avatar">
              <div className="w-12 h-12 mask mask-squircle">
                <img src={item.image} alt={item.title} />
              </div>
            </div> */}
            <div>
              <div className="font-bold hover:text-purple-700">{item.bookName}</div>
            </div>
          </div>
        </td>
        <td>{item.quantity}</td>
        <td>{item.price}</td>
        <td>{item.date}</td>
         
      </tr>
      )
    }
     
    </tbody>  
  </table>
</div>
</div>
  )
}
