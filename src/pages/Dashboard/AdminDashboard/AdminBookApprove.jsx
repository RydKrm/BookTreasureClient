import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function AdminBookApprove() {
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    axios
      .get("https://book-treasure-server-app.vercel.app/getAdminApprovedBook")
      .then((res) => {
        setBookList(res.data);
        // console.log("book list ",res.data);
      })
      .catch((err) => console.log(err));
  });

  const updateRequest = (id, status) => {
    axios
      .post("https://book-treasure-server-app.vercel.app/bookStatusUpdate", { id, status })
      .then((res) => {
        if (res.data.status) {
          if (status === "accept")
            Swal.fire({
              icon: "success",
              title: "Successful",
              text: "Book Added to Book List",
              timer: 1000,
            });
        } else if (status === "reject") {
          Swal.fire({
            icon: "error",
            title: "Delete",
            text: "Book Deleted from List",
            timer: 1000,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Post Rejected",
            text: "Post deleted from database",
            timer: 1000,
          });
        }
        RemoveItem(id);
      });
  };

  const RemoveItem = (id) => {
    const newArray = bookList.filter((item) => item._id !== id);
    setBookList(newArray);
  };

  return (
    <div className="font-poppins ">
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
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {bookList.length > 0 &&
              bookList.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={item.image} alt={item.title} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold hover:text-purple-700">
                          {item.bookName}
                        </div>
                        <div className="text-sm opacity-50">
                          {item.category}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{item.bookAuthor}</td>
                  <td>{item.publisher}</td>
                  <td>{item.bookQuantity}</td>
                  <td>{item.price}</td>

                  <td>
                    <button
                      className="btn btn-success btn-xs mr-2 text-white"
                      onClick={() => {
                        updateRequest(item._id, "accept");
                      }}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-error btn-xs text-white"
                      onClick={() => {
                        updateRequest(item._id, "reject");
                      }}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
