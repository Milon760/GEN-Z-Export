import React, { useEffect, useState } from 'react'


const fullDateTime = (createdAt) => {
  if (!createdAt) return "N/A";
  const date = new Date(createdAt);

  const formetedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const formetedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })

  return `${formetedDate} at ${formetedTime}`;
};


const Order = () => {

  const [orders, setOrders] = useState([]);

  console.log('ki', orders);

  const fetchOrders = async () => {
    try {

      const res = await fetch('http://localhost:5000/api/products/order');
      const orderHistory = await res.json();

      if (orderHistory.success) {
        setOrders(orderHistory.payload.orderHistory)
      } else {
        console.log('order history fetch failed');

      }

    } catch (error) {
      console.error(error);

    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);


  return (
    <div>

      {
        orders.map(order => <div key={order._id}>
          <p>Date: {fullDateTime(order.createdAt)}</p>
          <p>User ID: {order.userId}</p>
          <p>Order Status: {order.orderStatus}</p>
          <p>Payment Method: {order.paymentMethod}</p>
          <p>Shipping Address: {order.shippingAddress}</p>
          <p>Total Product: {order.products.length}</p>
          <p>Total Price: {order.totalPrice}</p>
        </div>)
      }

    </div>
  )
}

export default Order
