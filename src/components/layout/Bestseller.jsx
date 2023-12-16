import { useEffect, useState } from "react";
import Heading from "./Heading";
import Flex from "./Flex";
import Product from "../products/Product";
import axios from "axios";

const BestSeller = () => {
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    axios
      .get("https://book-treasure-server-app.vercel.app/getBestSellerBookList")
      .then((res) => {
        setBookList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="mt-5 md:mt-32 max-w-container mx-auto p-2.5">
      <Heading title="Best Seller" />
      <Flex className="sm:max-lg:flex-wrap sm:flex sm:max-md:justify-between gap-x-10">
        {bookList.map((item) => (
          <Product key={item._id} item={item} />
        ))}

        {/* <div className="sm:max-w-[300px] md:max-w-[345px] lg:max-w-[340px]">
          <Product src="images/newp2.png" title={"New"} badge={true} />
        </div>
        <div className="sm:max-w-[300px] md:max-w-[345px] lg:max-w-[340px]">
          <Product src="images/newp3.png" title={"New"} badge={true} />
        </div>
        <div className="sm:max-w-[300px] md:max-w-[345px] lg:max-w-[340px]">
          <Product src="images/newp1.png" title={"New"} badge={true} />
        </div> */}
      </Flex>
    </div>
  );
};

export default BestSeller;
