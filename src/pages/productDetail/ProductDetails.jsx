import { CiFacebook } from "react-icons/ci";
import { FiTwitter } from "react-icons/fi";
import { CiLinkedin } from "react-icons/ci";
import List from "../../components/layout/List";
import RelatedProducts from "./RelatedProducts";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import LeftSideBar from "../Book/LeftSideBar";
import useUserInfo from "../../CustomHook/useUserInfo";
import Swal from "sweetalert2";

const ProductDetails = () => {

  const {productId} = useParams();
  const [book,setBook] = useState({});
  const [quantity,setQuantity] = useState(1);

  useEffect(()=>{
    axios.post('https://book-treasure-server-app.vercel.app/getProductDetails',{productId})
    .then(res=>{setBook(res.data)})
    .catch(err=> console.log(err))
  },[productId]);

    const { userId,role } = useUserInfo();

  const addToCart = ()=>{
     if(role!=='user'){
      Swal.fire({
              icon:'warning',
              title:'Not authorized',
              text:'Only users can add to cart',
              timer:700
          })
     }

      const data = {
        userId:userId,
        productId: productId,
        quantity:quantity
      }
      axios.post('https://book-treasure-server-app.vercel.app/addToCart',data)
      .then(res=>{
        if(res.data.status){
          Swal.fire({
              icon:'success',
              title:'Add to Cart',
              text:'Book Added to Cart, Now you can order from cart',
              timer:700
          })
        } else {
        Swal.fire({
              icon:'error',
              title:'Product not added to cart',
              text:'Somthing Wrong happend here',
              timer:700
          })
        }
      })
      .catch(err=>console.log(err));
  }

  const quantityChange = (item) => {
     if(item>quantity){
      if(quantity===book.bookQuantity){
        Swal.fire({
              icon:'error',
              title:`only ${book.bookQuantity} is availble `,
              text:'You can not add more',
              timer:700
          })
      } else setQuantity((quantity)=>(quantity+1)) 
     } else if(item<quantity){
      if(quantity===1){
        Swal.fire({
              icon:'error',
              title:`Zero item not allowed`,
              text:'Zero item can not buy',
              timer:700
          })
      } else setQuantity((quantity)=>(quantity-1)) 
     }
  }

  return (
    <div className="max-w-container mx-auto p-2.5 ">
      <div className="flex gap-8">
        <div className="w-[30%] ">
          <img src={book.image} alt="" />
        </div>
        <div className="w-[33%]">
          <h1 className="text-[#333] text-[22px] font-bold">
            {book.bookName}
          </h1>
          <span className="font-dm text-[#333] text-[24px] font-bold mt-6 ">
            {book.price}
          </span>
          <div className="border-t border-solid border-[#2d2d2d] mt-[8px]">
            <p className="font-dm mb-[10px] mt-5 text-[#333]">
             {book.description}
            </p>
          </div>
          <div className="flex items-center gap-5">
            {/* <span className="font-dm text-[14px] font-medium inline-block">
              Qty
            </span>
            <input
              className="border border-solid border-[#ebebeb] text-center p-3 w-[100px]"
              type="number"
              onChange={(e)=>{quantityChange(e.target.value)}}
              placeholder="1"
              value={quantity}
            /> */}
            <button onClick={addToCart} className="bg-[#ce7852] text-[#fff] px-[25px] py-2 hover:border hover:border-solid hover:border-black hover:bg-white hover:text-black  transition ease-in-out delay-100">
              ADD TO CART
            </button>
          </div>
          <div>
            <p className="font-dm font-bold text-[14px] mt-8">
              Categories: <span className="ml-3">{book.category}</span>
            </p>
          </div>
          <div className="mt-5">
            <List className="flex items-center gap-4">
              <li className="font-dm text-[14px] text-[#333] font-bold">
                Share :
              </li>
              <li>
                <CiFacebook />
              </li>
              <li>
                <FiTwitter />
              </li>
              <li>
                <CiLinkedin />
              </li>
            </List>
          </div>
        </div>
        <div className="w-[30%] ">
          <LeftSideBar/>
        </div>
      </div>
      <div className="w-[63%] mt-10">
        <h6 className="font-dm text-[14px] font-semibold">DETAILS</h6>
        <div className="mt-5  border-t border-solid border-[#000]">
          <p className="mt-5"> {book.description} </p>
        </div>
      </div>
      <RelatedProducts category={book.category} />
    </div>
  );
};

export default ProductDetails;
