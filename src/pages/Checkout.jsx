import { useEffect, useState } from "react";
import Flex from "../components/layout/Flex";
import { BeatLoader } from "react-spinners";
import { useFormik } from "formik";
import { Billing } from "../validation";
import axios from "axios";
import useUserInfo from "../CustomHook/useUserInfo";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";

const Checkout = () => {
  const {userId} = useUserInfo();
  const [productList, setProductList] = useState([]);
  const navigate = useNavigate();

  const totalPrice = productList.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

    useEffect(() => {
    axios
      .post("https://book-treasure-server-app.vercel.app/getCheckoutList", { userId })
      .then((res) => {
        setProductList(res.data);
      })
      .catch((err) => console.log(err));
  }, [userId]);

  const initialValues = {
    name: "",
    address: "",
    phone: "",
    city: "",
    house: "",
    email: "",
  };

  //     const completeOrder = () => {
  //   setLoading(true);
  //   axios
  //     .post("https://book-treasure-server-app.vercel.app/addCompleteOrder", { productList, userId })
  //     .then((res) => {
  //       if (res.data.status) {
  //         Swal.fire({
  //           icon: "success",
  //           title: "Order Submitted Successfuly",
  //           text: "Your order will be move in 3 days",
  //         });
  //         console.log('user id => ')
         
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // };

//   TODO needed card data from 

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Billing,
    onSubmit: (values) => {
     const invoice = uuidv4();
     const date = new Date()
     console.log('address ', values)
    axios.post('https://book-treasure-server-app.vercel.app/addAddress',{...values,userId,invoiceId:invoice,date})
    .then(res => {
        if(res.status){ 
           navigate('/invoice')
        }
    })
    .catch(err=> console.log(err)) 
    // TODO After filling this form goto invoice pages 
    // TODO Order created here 
    // TODO order data will be created according to each user 
    }, 
  });



  return (
    <div className="max-w-container mx-auto p-2.5">
      <h2 className="font-dm font-bold text-[24px] md:text-[30px] mb-8">
        Billing Details
      </h2>

      <form onSubmit={formik.handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Your Name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            className="w-[40%] resize-none border-b border-solid border-[#F0F0F0] pb-2.5 outline-0"
          />
          {formik.errors.name && formik.touched.name ? (
            <p className="text-[#cd0404] mb-5">{formik.errors.name}</p>
          ) : (
            ""
          )}
        </div>
        <div className="my-[20px]">
          <input
            type="text"
            placeholder="Address"
            name="address"
            onChange={formik.handleChange}
            value={formik.values.address}
            className="w-[40%] resize-none border-b border-solid border-[#F0F0F0] pb-2.5 outline-0"
          />
          {formik.errors.address && formik.touched.address ? (
            <p className="text-[#cd0404] mb-5">{formik.errors.address}</p>
          ) : (
            ""
          )}
        </div>
        <div>
          <input
            type="number"
            placeholder="Mobile Number"
            name="phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
            className="w-[40%] resize-none border-b border-solid border-[#F0F0F0] pb-2.5 outline-0"
          />
          {formik.errors.phone && formik.touched.phone ? (
            <p className="text-[#cd0404] mb-5">{formik.errors.phone}</p>
          ) : (
            ""
          )}
        </div>
        <div className="my-[20px]">
          <input
            type="text"
            placeholder="Town / city"
            name="city"
            onChange={formik.handleChange}
            value={formik.values.city}
            className="w-[40%] resize-none border-b border-solid border-[#F0F0F0] pb-2.5 outline-0"
          />
          {formik.errors.city && formik.touched.city ? (
            <p className="text-[#cd0404] mb-5">{formik.errors.city}</p>
          ) : (
            ""
          )}
        </div>
        <div>
          <input
            type="text"
            placeholder="House Number and street name"
            name="house"
            onChange={formik.handleChange}
            value={formik.values.house}
            className="w-[40%] resize-none border-b border-solid border-[#F0F0F0] pb-2.5 outline-0"
          />
          {formik.errors.house && formik.touched.house ? (
            <p className="text-[#cd0404] mb-5">{formik.errors.house}</p>
          ) : (
            ""
          )}
        </div>
        <div className="mt-[20px]">
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            className="w-[40%] resize-none border-b border-solid border-[#F0F0F0] pb-2.5 outline-0"
          />
          {formik.errors.email && formik.touched.email ? (
            <p className="text-[#cd0404] mb-5">{formik.errors.email}</p>
          ) : (
            ""
          )}
        </div>

        <h4 className="mt-[100px] font-dm font-bold text-[24px] md:text-[26px] mb-8">
          Your Order
        </h4>
        <div className="bg-[#F5F7F7] py-[34px] px-5 ">
          <Flex className="flex justify-between">
            <div className="w-[23%]">Product</div>
            <div className="w-[23%]">Price</div>
            <div className="w-[23%]">Quantity</div>
            <div className="w-[23%]">Total</div>
          </Flex>
        </div>
        {/* TODO Product Data will be shared here  */}
        {
        productList.map(product=> 
           <Flex key={product._id} className="flex justify-between items-center my-[34px] mx-[5]">
          <div className="w-[23%] relative">
            <Flex className="flex items-center justify-between">
              <h3 className="font-dm font-bold text-sm text-primary w-[100%]">
                {product.bookName}
              </h3>
            </Flex>
          </div>
          <div className="w-[23%]"> {product.price} </div>
          <div className="w-[23%] ">
            <span className="mx-[10px]"> {product.quantity} </span>
          </div>
          <div className="w-[23%] font-dm text-[#262626] font-bold text-2xl ">
          {product.quantity * product.price}
          </div>
        </Flex>  
            )
        }
       
        <div className="mt-[5px]">
          <h3 className="flex justify-end text-xl font-bold font-dm">
            Cart Totals
          </h3>
        </div>
        <div className="mt-5 ">
          <Flex className="flex justify-end gap-x-8 ">
            <h4>Total Price </h4>
            <p>{totalPrice}</p>
          </Flex>
        </div>
        <div className="flex justify-end mt-4">
            <button  type="submit" className="px-24 py-4 text-sm font-bold text-white bg-primary font-dm">
              Order
            </button>
          {/* {loading ? (
            <button className="px-24 py-4 text-sm font-bold text-white bg-primary font-dm">
              <BeatLoader color="#36d7b7" />
            </button>
          ) : (
            <button className="px-24 py-4 text-sm font-bold text-white bg-primary font-dm">
              Order
            </button>
          )} */}
        </div>
      </form>
    </div>
  );
};

export default Checkout;