import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import html2pdf from "html2pdf.js";

export default function AdminReport() {
  const [bookList, setBookList] = useState([]);

  const downloadPDF = () => {
    const content = document.getElementById("content-to-pdf");
    const pdfOptions = {
      margin: 10,
      filename: "download.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf(content, pdfOptions);
  };

  useEffect(() => {
    axios
      .get("https://book-treasure-server-app.vercel.app/getReport")
      .then((res) => {
        setBookList(res.data);
        // console.log('report ', res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="font-poppins">
      <div className="overflow-x-auto" id="content-to-pdf">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Book Name</th>
              <th>Book Type </th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {bookList.length > 0 &&
              bookList.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar"></div>
                      <div>
                        <div className="font-bold hover:text-purple-700">
                          {item.bookName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{item.bookType}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>{item.date}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={downloadPDF}
          className="px-24 py-4 text-sm font-bold text-white border bg-primary font-dm hover:text-primary hover:bg-white hover:border hover:border-primary"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}