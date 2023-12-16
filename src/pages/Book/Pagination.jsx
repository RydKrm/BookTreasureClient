import { useContext, useEffect, useState } from 'react';
import { BookContext } from '../../context/BookContext';
import  axios from 'axios';

const DonationPagenation = () => {

    const {state,dispatch} = useContext(BookContext);
    const [totalBook, setTotalBook] = useState(null);
  
    useEffect(()=>{
      axios.get('https://book-treasure-server-app.vercel.app/getTotalBook')
      .then(res=>setTotalBook(res.data.totalBook))
      .catch(err=>console.log(err))
    },[])
    const dataInOnePage = state.perPage;
    const totalPage = Math.ceil(totalBook/dataInOnePage);
    const pageArray = Array(totalPage).fill(0);
    

    const setPage = (page)=>{
        dispatch({type:"SET_PAGE",payload:page})
    }
    
    return (
        <div className='flex justify-center mb-32'>
            <div className="join mt-7">
            {
                pageArray.map((total,index)=> <button key={index} onClick={()=>{setPage(index+1)}}
                className={`join-item btn ${state.page===index+1 && 'btn-active'}`}>{index+1}
                </button>)
            }
            </div>
        </div>
    );
};

export default DonationPagenation;