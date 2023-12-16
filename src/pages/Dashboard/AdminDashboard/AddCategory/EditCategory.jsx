import { useEffect, useState } from 'react';
import AddCategory from './AddCategory';
import DeleteCategory from './DeleteCategory';
import axios from 'axios';

function EditCategory() {
  const [AllCategory, setAllCategory] = useState([]);

  useEffect(() => {
    axios.get("https://book-treasure-server-app.vercel.app/getAllCategory")
      .then((res) => {
        setAllCategory(res.data);
        console.log("Category Data ", res.data)
      })
      .then((err) => {
        console.log(err);
      })
  }, [])



  return (
    <div className='mt-3'>
      {/* <h2 className='text-center text-2xl font-poppins'>Edit Category</h2> */}
      <div className="grid grid-cols-1 md:grid-cols-2 mt-3">
        <AddCategory categoryList={AllCategory} /> 
         <DeleteCategory categoryList={AllCategory} />

      </div>
    </div>
  );
}

export default EditCategory;