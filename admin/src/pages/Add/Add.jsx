import React, { useContext, useEffect, useState } from 'react'
import './Add.css'
import { assets } from '../../assets/admin_assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import { SidebarContext } from '../../Context/SidebarContext'; 



export default function Add({url}) {

  const { isSidebarOpen, toggleSidebar } = useContext(SidebarContext);


  const [image, setImage] = useState(false);

  const [data, setData] = useState({
    name : "",
    description : "",
    price : "",
    category : "Salad",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData(data => ({...data, [name] : value}));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    const response = await axios.post(`${url}/api/food/add`, formData);

    if(response.data.success){
      setData({
        name : "",
        description : "",
        price : "",
        category : "Salad",
      });
      setImage(false);
      console.log(data);
      event.target.reset()
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  }


  return (
    <>
      <div className={isSidebarOpen ? "side" : ""}></div>
      <div className='add-content page-content h-100 container'>
        <form className='from w-100 mt-5 mb-5 p-3 rounded' onSubmit={onSubmitHandler}>
          <h2 className='mb-3'>
            Add Product
          </h2>
          <div className="mb-3 mt-3">
            <label htmlFor="image" className='from-label mb-1'>Upload Image</label>
            <input type="file" name="image" onChange={(e) => setImage(e.target.files[0])} id="image" className='form-control' />
          </div>
          <div className={image ? "" : "d-none"}>
            <img className='upload-image mt-1 mb-1' src={image ? URL.createObjectURL(image) : ""} alt="" />
          </div>
          <div className="mb-3 mt-3">
            <label htmlFor="name" className='from-label mb-1'>Product Name</label>
            <input type="text" onChange={onChangeHandler} value={data.name}  name="name" id="name" className='form-control' placeholder='Product Name' />
          </div>
          <div className="mb-3 mt-3">
            <label htmlFor="description" className='from-label mb-1'>Product Description</label>
            <textarea name="description" onChange={onChangeHandler} value={data.description} id="description" className='form-control' placeholder='Product Description'></textarea>
          </div>
          <div className="mb-3 mt-3">
            <label htmlFor="price" className='from-label mb-1'>Product Price</label>
            <input type="number" onChange={onChangeHandler} value={data.price} name="price" id="price" className='form-control' placeholder='Product Price' />
          </div>
          <div className="mb-3 mt-3">
            <label htmlFor="category" className='from-label mb-1'>Product Category</label>
            <select name="category" onChange={onChangeHandler} selected={data.name} id="category" className='form-select form-control' placeholder='Product Category'>
              <option className='' value="Salad">Salad</option>
              <option className='' value="Rolls">Rolls</option>
              <option className='' value="Deserts">Deserts</option>
              <option className='' value="Sandwich">Sandwich</option>
              <option className='' value="Cake">Cake</option>
              <option className='' value="Pure Veg">Pure Veg</option>
              <option className='' value="Pasta">Pasta</option>
              <option className='' value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="mt-3">
            <button className='btn tomato-btn'>Add</button>
          </div>
        </form>
      </div>
    </>
  )
}
