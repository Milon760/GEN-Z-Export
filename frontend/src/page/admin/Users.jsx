import React, { useEffect, useState } from 'react'

const Users = () => {


  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({});

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:5000/auth/users');
      const users = await res.json();
      console.log(users);
      
      if (users.success) {
        setUsers(users.payload.users);
        setPagination(users.payload.pagination)
      } else {
        console.log('user fetch failed');
      }
    } catch (error) {
      console.error(error);

    }
  }

  console.log(users);

  useEffect(() => {
    fetchUsers();
  }, []);


  return (
    <div>
      <p> Total User : {pagination.totalUser}</p>
      {
        users.map(user => <div key={user._id} className='bg-gray-200 text-indigo-700 m-10 p-5'>
          <h2>Name: {user.name}</h2>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>Address: {user.address}</p>
        </div>)
      }
    </div>
  )
}

export default Users;
