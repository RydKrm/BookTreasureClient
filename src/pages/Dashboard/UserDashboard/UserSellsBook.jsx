import { useEffect, useState } from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import useUserInfo from "../../../CustomHook/useUserInfo";
import { getDownloadURL, ref, uploadBytes, getStorage } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { app } from "../../../firebase/firebase.config";
import axios from "axios";
import Swal from "sweetalert2";
import { BeatLoader } from "react-spinners";

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <div className="flex flex-col">
        <label
          className="text-md text-poppins text-md ms-1"
          htmlFor={props.id || props.name}
        >
          {label}
        </label>
        <input
          className="text-input border rounded-sm border-gray-600 ps-4 mt-3 h-10 w-[300px] lg:me-3"
          {...field}
          {...props}
        />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
    </>
  );
};

// And now we can use these
const UserSellsBook = () => {
  const [loading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState(null);
  const [selectCategory, setSelectCategory] = useState("");
  const [allCategory, setAllCategory] = useState([]);
  const uniqueId = uuidv4();
  const Storage = getStorage(app);
  const { userId } = useUserInfo();

  useEffect(() => {
    axios
      .get("https://book-treasure-server-app.vercel.app/getAllCategory")
      .then((res) => {
        setAllCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  const uploadImages = async () => {
    if (selectedImages) {
      const imageName = `${uniqueId}_${selectedImages.name}`;
      const imageRef = ref(Storage, `bookTeasure/image/${imageName}`);
      try {
        const snapshot = await uploadBytes(imageRef, selectedImages);
        const imageUrl = await getDownloadURL(snapshot.ref);
        return imageUrl;
      } catch (err) {
        console.error("Error uploading image:", err);
      }
    }
  };

  const handleCategory = (e) => {
    setSelectCategory(e.target.value);
  };

  return (
    <div className="md:-mx-24 md:-my-6  -px-12 md:-py-14">
      <div className="shadow-md md:mx-24 md:my-10 bg-base-200 px-12 md:py-14">
        <Formik
          initialValues={{
            bookName: "",
            bookAuthor: "",
            price: "",
            bookQuantity: "",
            language: "",
            publisher: "",
            description: "",
          }}
          validationSchema={Yup.object({
            bookName: Yup.string()
              .max(40, "Must be less than 40 characters or less")
              .min(5, "Must be greater than 5 characters")
              .required("Required"),
            bookAuthor: Yup.string()
              .max(40, "Must be less than 40 characters or less")
              .min(5, "Must be greater than 5 characters")
              .required("Required"),
            price: Yup.number().required("Required"),
            bookQuantity: Yup.number().required("Required"),
            language: Yup.string().required("Required"),
            publisher: Yup.string().required("Required"),
            description: Yup.string().required("Required"),
          })}
          onSubmit={async (values, { resetForm }) => {
            setLoading(true);
            // const imageUrl = await uploadImages();
            console.log("check values ", values);

            const bookInfo = {
              ...values,
              userId: userId,
              image: await uploadImages(),
              bookType: "old",
              createdAt: new Date(),
              category: selectCategory,
            };

            axios
              .post("https://book-treasure-server-app.vercel.app/AddBook", bookInfo)
              .then((res) => {
                if (res.data.status) {
                  Swal.fire({
                    title: "Book added",
                    icon: "success",
                    text: "Your book is Waiting for Admin approval",
                    timer: 1000,
                  });
                }
              });
            resetForm();
            setLoading(false);
          }}
        >
          {(formik) => (
            <Form className="mt-3 flex flex-col justify-center">
              <div className="flex flex-col lg:flex-row justify-start">
                <MyTextInput
                  label="Book Name"
                  name="bookName"
                  type="text"
                  placeholder="Harry Potter"
                />

                <MyTextInput
                  label="Book Author"
                  name="bookAuthor"
                  type="text"
                  placeholder="J. K. Rowling"
                />

                <MyTextInput
                  label="Price"
                  name="price"
                  type="number"
                  placeholder="$120"
                />
              </div>
              <div className="flex flex-col lg:flex-row justify-start lg:mt-5">
                {/* <MyTextInput
            label="Previous Price"
            name="previousPrice"
            type="number"
            placeholder="$140"
          /> */}

                <div className="flex flex-col">
                  <label
                    className="text-md text-poppins text-md ms-1"
                    htmlFor="category"
                  >
                    Select Category
                  </label>
                  <select
                    className="text-input border rounded-sm border-gray-600 ps-4 mt-3 h-10 w-[300px] lg:me-3"
                    onChange={handleCategory}
                  >
                    {allCategory.map((item) => (
                      <option key={item.category} value={item.category}>
                        {item.category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col md:ms-4">
                  <label className="text-md text-poppins text-md ms-1">
                    Select Image
                  </label>
                  <input
                    type="file"
                    onChange={(e) => {
                      setSelectedImages(e.target.files[0]);
                    }}
                    placeholder="Image"
                    name="image"
                    className="text-input border rounded-sm border-gray-600 ps-4 mt-3 h-10 w-[300px] lg:me-3"
                  />
                </div>
              </div>

              <div className="flex flex-col lg:flex-row justify-start lg:mt-5">
                <MyTextInput
                  label="Book Quantity"
                  name="bookQuantity"
                  type="number"
                  placeholder="12"
                />

                <MyTextInput
                  label="Language"
                  name="language"
                  type="text"
                  placeholder="English"
                />

                <MyTextInput
                  label="Publisher"
                  name="publisher"
                  type="text"
                  placeholder="Bloomsbury"
                />
              </div>

              <div className="flex flex-col">
                <label
                  className="text-md text-poppins text-md ms-1 mt-3"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  type="description"
                  {...formik.getFieldProps("description")}
                  className="w-full mt-5 border border-black rounded-md"
                  rows={10}
                />
              </div>
              {loading ? (
                <button
                  className="btn btn-primary w-60 mt-5 justify-center mx-auto rounded-md"
                  type="submit"
                >
                  <BeatLoader color="#36d7b7" />
                </button>
              ) : (
                <button
                  className="btn btn-primary w-60 mt-5 justify-center mx-auto rounded-md"
                  type="submit"
                >
                  Submit
                </button>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UserSellsBook;
