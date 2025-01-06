import React, { useContext, useEffect, useState } from 'react'
import './List.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { SidebarContext } from '../../Context/SidebarContext'; 
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


export default function List({url}) {

  const { isSidebarOpen, toggleSidebar } = useContext(SidebarContext);
  
  const [List, setList] = useState([]);  

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if(response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  }


  const removeFood = async(foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, {id: foodId});
    await fetchList();
    if(response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  }



  useEffect(() => {
    fetchList();
  }, []);



  return (
    <>
      <div className={isSidebarOpen ? "side" : ""}></div>
      <div className='list-content page-content h-100  container'>
        <div className="list container ms-auto mb-5
         mt-5">
          <h1>All Food List</h1>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
            {List.map((item, index) => {
              return (
                <>
                  <TableRow key={index}>
                    <TableCell className='table-img'><img  src={`${url}/uploads/${item.image}`} alt="Img" /></TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>${item.price}</TableCell>
                    <TableCell className='cursor'><button className='btn delete-btn' onClick={() => removeFood(item._id)}><i class="fa-solid fa-trash"></i></button></TableCell>
                  </TableRow>
                </>
              )
            })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  )
}
