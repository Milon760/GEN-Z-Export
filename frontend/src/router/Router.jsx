import { createBrowserRouter } from 'react-router-dom';
import Root from '../components/Root';
import NotFound from '../page/NotFound';
import Home from '../page/Home';
import Shop from '../page/Shop2';
import AdminDashboard from '../page/admin/AdminDashboard';
import AdminLayout from '../page/admin/AdminLayout';
import Products from '../page/admin/Products';
import Users from '../page/admin/Users';
import Order from '../page/admin/Order';
import Setting from '../page/admin/Setting';
import Pant from '../page/Pant';
import Panjabi from '../page/Panjabi';
import Shirt from '../page/Shirt';
import TShirt from '../page/TShirt';
import ProductCreate from '../page/admin/ProductCreate1';
import UserPrivateRoute from '../components/UserPrivateRoute';
import Register from '../page/Register';
import Login from '../page/Login';
import Verify from '../page/Verify';
import AdminProfile from '../page/admin/AdminProfile';
import RegisterSuccess from '../page/RegisterSuccess';
import Dashboard from '../page/Dashboard';
import SingleProduct from '../page/SingleProduct';
import Wishlist from '../page/Wishlist';
import Cart from '../page/Cart';
import Checkout from '../page/Checkout';
import AdminPrivateRoute from '../components/AdminPrivateRoute';
import PublicRoute from '../components/PublickRoute';

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
        path: '/shop/:id',
        element: <SingleProduct />
      },
      {
        path: '/register-success',
        element: <RegisterSuccess />
      },
      {
        path: '/auth/verification/:token',
        element: <Verify />
      },
      {
        path: '/wishlist',
        element: <Wishlist />
      },
      {
        element: <UserPrivateRoute />,
        children: [
          {
            path: '/cart',
            element: <Cart />
          },
          {
            path: '/checkout',
            element: <Checkout />
          },
          {
            path: '/dashboard',
            element: <Dashboard />
          },
        ]
      },
      {
        element: <PublicRoute />,
        children: [
          {
            path: 'register',
            element: <Register />
          },
          {
            path: 'login',
            element: <Login />
          }
        ]
      },
    ]
  },
  {
    element: <AdminPrivateRoute />,
    children: [
      {
        path: '/admin-dashboard',
        element: <AdminLayout />, // এই লেআউটের ভেতরেই সব চাইল্ড পেজ লোড হবে
        children: [
          {
            index: true,
            element: <AdminDashboard />
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
            element: <AdminProfile />
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
