import Flex from "../components/layout/Flex";
import { Link, useNavigate } from "react-router-dom";
import { TbEye, TbEyeOff } from "react-icons/tb";
import { useState } from "react";
import { useFormik } from "formik";
import { Signup } from "../validation";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";

const Registration = () => {
  const navigate = useNavigate();
  const { createUser, updateProfileArea } = useContext(AuthContext)
  const [showPass, setShowPass] = useState("password");

  const handleShowPass = () => {
    showPass === "password" ? setShowPass("text") : setShowPass("password");
  };

  const initialValues = {
    fullName: "",
    email: "",
    phone: "",
    role:"user"
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Signup,
    onSubmit: () => {
      console.log(formik.values);
       
        createUser(formik.values.email, formik.values.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                return updateProfileArea(formik.values.fullName) // Return the promise
            })
            .then(() => {
                const saveUser = { 
                  name: formik.values.fullName, 
                  email: formik.values.email,
                  phone: formik.values.phone,
                  address: formik.values.address,
                  userRole:formik.values.role,
                  totalMoney:0,
                };
                return fetch('https://book-treasure-server-app.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                });
            })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    console.log('user profile info updated');
                    formik.resetForm();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'User created successfully.',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/');
                }
            })
            .catch(error => console.log(error));
    
    },
  });

   //console.log(formik);

  return (
    <div className="max-w-container mx-auto p-2.5 mt-12">
      <Flex className="flex gap-7">
        <div className="w-[48%]">
          <div>
            <h2 className="font-dm font-bold text-[34px] text-[#11175d] ">
              Get started with easily register
            </h2>
            <p className="font-dm font-regular text-[20px] ">
              Free register and you can enjoy it
            </p>
            <form onSubmit={formik.handleSubmit} className="mt-7">
              <h4 className="placeholder:font-regular mb-2.5 font-dm text-base font-bold placeholder:font-dm placeholder:text-sm placeholder:text-[#767676]">
                FullName
              </h4>
              <input
                placeholder="Your Name"
                name="fullName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.fullName}
                className="w-full resize-none border-b border-solid border-[#F0F0F0] pb-2.5 outline-0 mb-6"
              />
              {formik.errors.fullName && formik.touched.fullName ? (
                <p className="text-[#cd0404] mb-5">{formik.errors.fullName}</p>
              ) : (
                ""
              )}
              <h4 className="placeholder:font-regular mb-2.5 font-dm text-base font-bold placeholder:font-dm placeholder:text-sm placeholder:text-[#767676]">
                Email
              </h4>
              <input
                placeholder="Email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                className="w-full resize-none border-b border-solid border-[#F0F0F0] pb-2.5 outline-0 mb-6"
              />

              {formik.errors.email && formik.touched.email ? (
                <p className="text-[#cd0404] mb-5">{formik.errors.email}</p>
              ) : (
                ""
              )}

              <h4 className="placeholder:font-regular mb-2.5 font-dm text-base font-bold placeholder:font-dm placeholder:text-sm placeholder:text-[#767676]">
                Telephone
              </h4>
              <input
                type="number"
                name="phone"
                placeholder="Telephone"
                onChange={formik.handleChange}
                value={formik.values.phone}
                className="w-full resize-none border-b border-solid border-[#F0F0F0] pb-2.5 outline-0 mb-6"
              />
              {formik.errors.phone && formik.touched.phone ? (
                <p className="text-[#cd0404] mb-5">{formik.errors.phone}</p>
              ) : (
                ""
              )}
              <h4 className="placeholder:font-regular mb-2.5 font-dm text-base font-bold placeholder:font-dm placeholder:text-sm placeholder:text-[#767676]">
                Adress
              </h4>
              <input
                placeholder="Adress"
                name="address"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.address}
                className="w-full resize-none border-b border-solid border-[#F0F0F0] pb-2.5 outline-0 mb-6"
              />
              {formik.errors.address && formik.touched.address ? (
                <p className="text-[#cd0404] mb-5">{formik.errors.address}</p>
              ) : (
                ""
              )}
              <select
                onChange={formik.handleChange}
                value={formik.values.role}
                name="role"
                className="w-full bg-transparent focus:outline-none resize-none border-b border-solid border-[#F0F0F0] pb-2.5 outline-0 mb-6"
              >
                <option value="">Select Role</option>
                <option value="user">USER</option>
                <option value="donor">DONOR</option>
                <option value="supplier">SUPPLIER</option>
              </select>
              <div className="relative">

                <h4 className="placeholder:font-regular mb-2.5 font-dm text-base font-bold placeholder:font-dm placeholder:text-sm placeholder:text-[#767676]">
                  Password
                </h4>
                <input
                  placeholder="Password"
                  name="password"
                  type={showPass}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  className="w-full resize-none border-b border-solid border-[#F0F0F0] pb-2.5 outline-0 mb-6"
                />
                {formik.errors.password && formik.touched.password ? (
                  <p className="text-[#cd0404] mb-5">
                    {formik.errors.password}
                  </p>
                ) : (
                  ""
                )}
                <div
                  onClick={handleShowPass}
                  className="absolute cursor-pointer top-[50%] right-0 translate-y-[-50%]"
                >
                  {showPass === "password" ? (
                    <TbEye className="w-[45px] h-6" />
                  ) : (
                    <TbEyeOff className="w-[45px] h-6" />
                  )}
                </div>
              </div>
              <h4 className="placeholder:font-regular mb-2.5 font-dm text-base font-bold placeholder:font-dm placeholder:text-sm placeholder:text-[#767676]">
                Comfrim Password
              </h4>
              <input
                placeholder="confrim Pasword"
                type="password"
                name="confirmPassword"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                className="w-full resize-none border-b border-solid border-[#F0F0F0] pb-2.5 outline-0 mb-6"
              />
              {formik.errors.confirmPassword &&
              formik.touched.confirmPassword ? (
                <p className="text-[#cd0404] mb-5">
                  {formik.errors.confirmPassword}
                </p>
              ) : (
                ""
              )}
              <button
                type="submit"
                className="bg-primary py-4 px-24 font-dm text-sm font-bold text-white border  hover:text-primary hover:bg-white hover:border hover:border-primary"
              >
                SIGN UP
              </button>
            </form>
            <div className="mt-4">
              <p className="font-dm font-blod text-[16px] ">
                Already have an account ?{" "}
                <Link className="text-[#ea6c00]" to="/login">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="w-[48%]">
          <img src="images/reg-pic.png" alt="regtration" />
        </div>
      </Flex>
    </div>
  );
};

export default Registration;
