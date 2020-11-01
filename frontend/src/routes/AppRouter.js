import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { OrderListScreen } from '../admin/screens/OrderScreen/OrderListScreen';
import { ProductEditScreen } from '../admin/screens/ProductScreen/ProductEditScreen';
import { ProductListScreen } from '../admin/screens/ProductScreen/ProductListScreen';
import { UserEditScreen } from '../admin/screens/UserScreen/UserEditScreen';
import { UserListScreen } from '../admin/screens/UserScreen/UserListScreen';
import { FooterContainer } from '../components/shared/Footer/Footer';
import { Header } from '../components/shared/Header/Header';
import { LoginScreen } from '../screens/AuthScreen/LoginScreen';
import { RegisterScreen } from '../screens/AuthScreen/RegisterScreen';
import { CartScreen } from '../screens/CartScreen/CartScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { OrderScreen } from '../screens/OrderScreen/OrderScreen';
import { PaymentScreen } from '../screens/PaymentScreen/PaymentScreen';
import { PlaceOrderScreen } from '../screens/PlaceOrderScreen/PlaceOrderScreen';
import { ProductScreen } from '../screens/ProductScreen/ProductScreen';
import { ProfileScreen } from '../screens/ProfileScreen/ProfileScreen';
import { ShippingScreen } from '../screens/ShippingScreen/ShippingScreen';

export const AppRouter = () => {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/register" component={RegisterScreen} />
          <Route exact path="/profile" component={ProfileScreen} />
          <Route exact path="/product/:id" component={ProductScreen} />
          <Route exact path="/cart/:id?" component={CartScreen} />
          <Route exact path="/shipping" component={ShippingScreen} />
          <Route exact path="/payment" component={PaymentScreen} />
          <Route exact path="/placeorder" component={PlaceOrderScreen} />
          <Route exact path="/order/:id" component={OrderScreen} />
          <Route exact path="/search/:keyword" component={HomeScreen} />
          <Route exact path="/page/:pageNumber" component={HomeScreen} />
          <Route
            exact
            path="/search/:keyword/page/:pageNumber"
            component={HomeScreen}
          />

          <Route exact path="/admin/userlist" component={UserListScreen} />
          <Route exact path="/admin/user/:id/edit" component={UserEditScreen} />
          <Route
            exact
            path="/admin/productlist"
            component={ProductListScreen}
          />
          <Route
            exact
            path="/admin/product/:id/edit"
            component={ProductEditScreen}
          />
          <Route exact path="/admin/orderlist" component={OrderListScreen} />
        </Switch>
        <FooterContainer />
      </Router>
    </>
  );
};
