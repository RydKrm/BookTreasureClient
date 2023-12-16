
import axios from 'axios';
import { useEffect, useState } from 'react'
import Swal from "sweetalert2";

export default function DeliveryProduct() {

  const [bookList,setBookList] = useState([]);

  //console.log('book list ', bookList)

  useEffect(()=>{
    axios.get('https://book-treasure-server-app.vercel.app/getAdminDeliveryList')
    .then(res=>setBookList(res.data))
    .catch(err=>console.log(err))
  },[])

  const updateDelivery = (id,status)=>{
    if(status===false){
      let newData = bookList.filter(item => item._id === id);
      newData[0].delivered = true;
      let newData2 = bookList.filter(item => item._id !== id);
      newData2 = [...newData2,...newData];
      setBookList(newData2);
      
      axios.post('https://book-treasure-server-app.vercel.app/updateDeliveryList',{orderId:id})
      .then(res => {
        if(res.status){
          Swal.fire({
            icon: "success",
            title: "Data Updated",
          });
        }
      })
    }
  }

//   console.log("bookList  ",bookList);

  return (
    <div className='font-poppins '>
    <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Book Name</th>
        <th>Type</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
    { bookList.length>0 &&
      bookList.map(item=>    
      <tr key={item._id}>
        <td>{item.bookName}</td>
        <td>{item.bookType}</td>
        <td>{item.quantity}</td>
        <td>{item.price}</td>
       <td> <button  onClick={()=>{updateDelivery(item._id,item.delivered)}}  className={`rounded-lg px-1 py-1 text-white ${item.delivered ? 'bg-green-500' : 'bg-red-500' }`}> {item.delivered ? 'Delivered' : 'Pending' } </button>  </td>
         
      </tr>
      )
    }
     
    </tbody>  
  </table>
</div>
</div>
  )
}
