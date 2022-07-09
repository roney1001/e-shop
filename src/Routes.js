import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Home from './core/Home';
import Dashboard from './user/UserDashboard';
import PrivateRoute from './auth_api/PrivateRoute';
import AdminRoute from './auth_api/AdminRoute';
import AdminDashboard from './user/AdminDashboard';
import AddCategory from './Admin/AddCategory';
import AddProduct from './Admin/AddProduct';
import Shop from './core/Shop';
import Product from './core/Product';
// import Menu from './core/Menu';
import Cart from './core/Cart';
import Orders from "./Admin/Orders"
import Profile from './user/Profile';
import ManageProducts from './Admin/MangeProducts';
import UpdateProduct from './Admin/UpdateProduct';




const RoutesAll = () =>{
    return (<BrowserRouter>
   
        <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/shop" exact component={Shop} />
        <Route path="/cart" exact component={Cart} />
        <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/create/category" exact component={AddCategory} />
        <AdminRoute path="/create/product" exact component={AddProduct} />
        <AdminRoute path="/admin/orders" exact component={Orders} />
        <AdminRoute path="/admin/products" exact component={ManageProducts} />
        <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct} />
        <Route path="/product/:productId" exact component={Product} />
        <PrivateRoute path="/profile/:userId" exact component={Profile} />
       
        </Switch>
    </BrowserRouter>
    )
};

export default RoutesAll;
