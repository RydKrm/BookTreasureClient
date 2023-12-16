import { useState } from "react";
import Image from "../../components/layout/Image";
import { Badge } from "@mui/material";
import axios from "axios";

const RelatedProducts = ({category}) => {

  const [bookList,setBookList] = useState([]);

  axios.post('https://book-treasure-server-app.vercel.app/getRelatedBook',{category})
  .then(res=>setBookList(res.data))
  .catch(err=>console.log(err));

  return (
    <div>
      <h2 className="font-dm  text-[30px] font-bold text-[#000] text-center mt-10">
        RELATED PRODUCTS
      </h2>
      {bookList.length===0 && <h2 className="font-dm  text-[30px] font-bold text-[#000] text-center mt-10">
        NO RELATED PRODUCTS
      </h2>}
      {
      bookList.length>0 && <div className="flex mt-8">
        {bookList.map(book=>
          <div key={book._id} className="md:w-[49%] lg:w-[32%] mb-6">
          <div className="group relative overflow-y-hidden">
            <Image
              className="w-[300px] h-[300px]"
              imgsrc={book.image}
            />
            <Badge title={book.bookType} />
          </div>
        </div>
          )}
      </div>
      }
    </div>
  );
};

export default RelatedProducts;
