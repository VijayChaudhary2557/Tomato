import React, { useContext, useEffect, useState } from 'react'
import './Order.css'
import { SidebarContext } from '../../Context/SidebarContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/admin_assets/assets';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem } from '@mui/material';

export default function Order({url}) {
  
  const { isSidebarOpen, toggleSidebar } = useContext(SidebarContext);

  const [orders, setOrders] = useState([]);


  const fetchAllOrders = async () => {
    const response = await axios.get(url+"/api/order/list");

    if(response.data.success) {
      setOrders(response.data.data);
    }
    else {
      toast.error(response.data.data);
    }
  }

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url+'/api/order/status', {
      orderId,
      status: event.target.value
    });

     if(response.data.success){
        await fetchAllOrders();
        toast.success(response.data.message);
     }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [])
  
  return (
    <>
      <div className={isSidebarOpen ? "side" : ""}></div>
      <div className='list-content page-content h-100  container'>
        <div className="order add">
          <h3>Order Page</h3>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Orders</TableCell>
                  <TableCell>Items</TableCell>
                  <TableCell>Customer Name</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order, index) => (
                  <TableRow key={index}>
                    <TableCell><img src={assets.parcel_icon} alt="" /></TableCell>
                    <TableCell>
                      Items: {order.items.length} <br /> <br />
                      {order.items.map((item, i) => (
                        <span key={i}>
                          {item.name} x {item.quantity}
                          {i < order.items.length - 1 && ', '}
                        </span>
                      ))}
                    </TableCell>
                    <TableCell>
                      {order.address.firstName} {order.address.lastName}
                    </TableCell>
                    <TableCell>
                      {`${order.address.street}, ${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.zipcode}`}
                    </TableCell>
                    <TableCell>{order.address.phone}</TableCell>
                    <TableCell>${order.amount}</TableCell>
                    <TableCell>
                      <Select
                        size="small"
                        className='my-select'
                        onChange={(event) => statusHandler(event, order._id)}
                        value={order.status}
                      >
                        <MenuItem value="Food Processing">Food Processing</MenuItem>
                        <MenuItem value="Out for delivery">Out for delivery</MenuItem>
                        <MenuItem value="Delivered">Delivered</MenuItem>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  )
}
