import { useContext, useEffect, useState } from "react";
import { BookContext } from "../../context/BookContext";
import axios from "axios";
import Product from "../../components/products/Product";

export default function BookList() {
  const { state, dispatch } = useContext(BookContext);
  const [bookData, setBookData] = useState([]);

  // console.log(state);
  // console.log(bookData);

  useEffect(() => {
    axios
      .post("https://book-treasure-server-app.vercel.app/getBookData", state)
      .then((res) => setBookData(res.data))
      .catch((err) => console.log(err));
  }, [state]);

  // console.log(bookData);

  return (
    <div className="md:flex md:flex-wrap md:justify-between">
      {bookData.map((book) => (
        <Product item={book} key={book._id}></Product>
      ))}
    </div>
  );
}
