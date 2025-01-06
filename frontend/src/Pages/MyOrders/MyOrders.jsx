// import React, { useContext, useEffect, useState } from 'react'
// import './MyOrders.css';
// import { StoreContext } from '../../Context/StoreContext';
// import axios from 'axios';
// import { assets } from '../../assets/assets';

// export default function MyOrders() {

//     const {url, token} = useContext(StoreContext);
//     const [data, setData] = useState([]);

//     const fetchOrder = async () => {
//         const response = await axios.post(url+'api/order/userorders', {}, {headers: {token}});
//         setData(response.data.data);
//     }

//     useEffect(() => {
//         if(token) {
//             fetchOrder();
//         }
//     }, [token]);
//   return (
//     <>
//         <div className="my-order container">
//             <h2>My Orders</h2>
//             <div className="container">
//                 {
//                     data.map((order, index) => {
//                         return (
//                             <div key={index} className="my-orders-order">
//                                 <img src={assets.parcel_icon} />
//                                 <p>{order.items.map((item, index) => {
//                                     if(index === order.items.length-1) {
//                                         return item.name + " X " + item.quantity
//                                     } else {
//                                         return item.name + " X " + item.quantity + ", "
//                                     }
//                                 })}</p>
//                                 <p>${order.amount}.00</p>
//                                 <p>Items: {order.items.length}</p>
//                                 <p><span>&#x25cf;</span> <b>{order.status}</b></p>
//                                 <button> Track Order</button>
//                             </div>
//                         )
//                     })
//                 }
//             </div>
//         </div>
//     </>
//   )
// }




import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function MyOrders() {

    const {url, token} = useContext(StoreContext);
    const [data, setData] = useState([]);

    const navigate = useNavigate();

    const fetchOrder = async () => {
        const response = await axios.post(url + 'api/order/userorders', {}, { headers: { token } });
        setData(response.data.data);
    }

    useEffect(() => {
        if (token) {
            fetchOrder();
        }
        else {
          navigate('/')
        }
    }, [token]);

    return (
        <div className="my-order container mt-5 mb-5">
            <h2 className='mb-5'>My Orders</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Order Details</TableCell>
                            <TableCell></TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Items</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.length > 0 ? (
                            data.map((order, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <img src={assets.parcel_icon} alt="Parcel" />
                                    </TableCell>
                                    <TableCell>
                                        <p>{order.items.map((item, index) => {
                                            return `${item.name} X ${item.quantity}` + (index === order.items.length - 1 ? '' : ', ');
                                        })}</p>
                                    </TableCell>
                                    <TableCell>${order.amount}.00</TableCell>
                                    <TableCell>{order.items.length}</TableCell>
                                    <TableCell><span className='text-danger'>&#x25cf;</span> <b>{order.status}</b></TableCell>
                                    <TableCell>
                                        <button className='btn btn-tomato'>Track Order</button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} style={{ textAlign: 'center' }}>No orders here</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
