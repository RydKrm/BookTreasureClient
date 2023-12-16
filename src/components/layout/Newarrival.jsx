import { useEffect, useState } from "react";
import Heading from "./Heading";
import Flex from "./Flex";
import Product from "../products/Product";
import axios from "axios";

const Newarrival = () => {
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    axios
      .get("https://book-treasure-server-app.vercel.app/getNewarrivalBookList")
      .then((res) => {
        setBookList(res.data);
        console.log("new arrival book list", res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="mt-5 md:mt-32 max-w-container mx-auto p-2.5">
      <Heading title="New Arrivals" />
      <Flex className="sm:max-lg:flex-wrap sm:flex sm:max-md:justify-between gap-x-10">
        {bookList.map((item) => (
          <Product key={item._id} item={item} />
        ))}
      </Flex>
    </div>
  );
};

export default Newarrival;
