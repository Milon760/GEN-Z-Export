import { createBrowserRouter } from 'react-router-dom';
import Root from '../components/Root';
import NotFound from '../page/NotFound';
import Home from '../page/Home';
import Shop from '../page/Shop1';
import Dashboard from '../page/admin/Dashboard';
import AdminLayout from '../page/admin/AdminLayout';
import Products from '../page/admin/Products';
import Users from '../page/admin/Users';
import Order from '../page/admin/Order';
import Setting from '../page/admin/Setting';
import Profile from '../page/admin/Profile';
import Pant from '../page/Pant';
import Panjabi from '../page/Panjabi';
import Shirt from '../page/Shirt';
import TShirt from '../page/TShirt';
import ProductCreate from '../page/admin/ProductCreate1';
import PrivateRoute from '../components/PrivateRoute';
import Register from '../page/Register';
import Login from '../page/Login';
import Verify from '../page/Verify';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'shop/pant',
        element: <Pant />
      },
      {
        path: 'shop/panjabi',
        element: <Panjabi />
      },
      {
        path: 'shop/shirt',
        element: <Shirt />
      },
      {
        path: 'shop/tshirt',
        element: <TShirt />
      },
      {
        path: '/shop',
        element: <Shop />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/auth/verification/:token',
        element: <Verify />
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: '/admin-dashboard',
            element: <AdminLayout />, // এই লেআউটের ভেতরেই সব চাইল্ড পেজ লোড হবে
            children: [
              {
                index: true,
                element: <Dashboard />
              },
              {
                path: 'users',
                element: <Users />
              },
              {
                path: 'products',
                element: <Products />
              },
              {
                path: 'product-create',
                element: <ProductCreate />
              },
              {
                path: 'orders',
                element: <Order />
              },
              {
                path: 'setting',
                element: <Setting />
              },
              {
                path: 'profile',
                element: <Profile />
              },
            ]
          },

        ]
      },



    ]
  },
  {
    path: "*",
    element: <NotFound />
  },
]);





// import { lazy } from 'react'
// import { createBrowserRouter } from 'react-router-dom'
// import Root from '../components/Root';
// import NotFound from '../page/NotFound';
// import Home from '../page/Home';
// import Shop from '../page/Shop';
// import Dashboard from '../page/admin/Dashboard';
// import AdminLayout from '../page/admin/AdminLayout';
// import Products from '../page/admin/Products';
// import Users from '../page/admin/Users';
// import Order from '../page/admin/Order';
// import Setting from '../page/admin/Setting';
// import Profile from '../page/admin/Profile';

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Root />,
//     children: [
//       {
//         index: true,
//         element: <Home />
//       },
//       {
//         path: '/shop',
//         element: <Shop />
//       },
//       {
//         path: '/admin-dashboard',
//         element: <AdminLayout />,
//         children: [
//           {
//             index: true,
//             element: <Dashboard />
//           },
//           {
//             path: 'users',
//             element: <Users />
//           },
//           {
//             path: 'products',
//             element: <Products />
//           },
//           {
//             path: 'order',
//             element: <Order />
//           },
//           {
//             path: 'setting',
//             element: <Setting />
//           },
//           {
//             path: 'profile',
//             element: <Profile />
//           },
//         ]
//       },

//     ]
//   },
//   {
//     path: "*",
//     element: <NotFound />
//   },

// ]);
