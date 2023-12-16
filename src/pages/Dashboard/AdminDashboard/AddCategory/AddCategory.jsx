import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';

const AddCategory = ({ categoryList }) => {

    const [categoryName, setCategoryName] = useState('');
 
    const handleCategory = async (e) => {
        e.preventDefault();
        for ( let category of categoryList) {
            if (category.category === categoryName) {
                Swal.fire({
                    title: ` "${categoryName}" is already Exist !!`,
                    icon: 'error',
                })
                return;
            }
        }
        if (categoryName.length < 3) {
            Swal.fire({
                title: 'Name must have 3 latter !!',
                icon: 'question',
            })
        } else {
                const categoryObject = {
                    category: categoryName,
                }
                axios.post('https://book-treasure-server-app.vercel.app/addCategory', categoryObject)
                    .then((res) => {
                        if (res.data.status) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Category Add successfully'

                            })
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    })
        }
    }

    return (
    <div className='ms-14 mt-10 my-10'>
        <form method="post" className='flex flex-col'>
            <input type="text" name="Category" id="category" onBlur={(e) => { setCategoryName(e.target.value) }} placeholder='Add Category' className="input input-bordered w-[280px] max-w-xs mx-5 my-3 border" />
            <button type="submit" onClick={handleCategory} className='btn btn-info text-white mt-5 w-36 ms-5 font-medium font-poppins'>Add Category</button>
        </form>
    </div>
    );

    };

export default AddCategory;