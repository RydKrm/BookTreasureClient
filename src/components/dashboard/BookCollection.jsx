import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function BookCollection(type) {

  const [bookList,setBookList] = useState([]);

  useEffect(()=>{
    axios.post('https://book-treasure-server-app.vercel.app/getBookCollection',type)
    .then(res=>setBookList(res.data))
    .catch(err=>console.log(err))
  },[type])

//   console.log("bookList  ",bookList);

  return (
    <div className='font-poppins '>
    <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Book Name</th>
        <th>Author Name</th>
        <th>Publisher</th>
        <th>Quantity</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
    { bookList.length>0 &&
      bookList.map(item=>    
      <tr key={item._id}>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={item.image} alt={item.title} />
              </div>
            </div>
            <div>
              <div className="font-bold hover:text-purple-700">{item.bookName}</div>
              <div className="text-sm opacity-50">{item.category}</div>
            </div>
          </div>
        </td>
        <td>{item.bookAuthor}</td>
        <td>{item.publisher}</td>
        <td>{item.bookQuantity}</td>
        <td>{item.price}</td>
         
      </tr>
      )
    }
     
    </tbody>  
  </table>
</div>
</div>
  )
}
