import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Button, Col, Row, List, Image } from 'antd';
import { CheckoutSteps } from '../../components/CheckoutSteps';
import { Message } from '../../components/shared/Message/Message';
import { createOrder } from '../../actions/orderActions';

export const PlaceOrderScreen = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  //Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { success, order, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/orders/${order._id}`);
    }
  }, [history, success, order._id]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  const shippingInfo = [
    cart.shippingAddress.address,
    cart.shippingAddress.city,
    cart.shippingAddress.postalCode,
    cart.shippingAddress.country,
  ];

  const cartInfo = cart.cartItems.map((item) => (
    <List.Item.Meta
      key={item.id}
      avatar={<Image src={item.image} alt={item.name} width={150} />}
      title={<Link to={`/product/${item.product}`}>{item.name}</Link>}
      description={`${item.qty}, x $${item.price} = ${item.qty * item.price}`}
    />
  ));

  return (
    <div className="container">
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col flex="1 1 200px">
          <List
            size="default"
            dataSource={shippingInfo}
            header={
              <div>
                <h2>Shipping</h2>
                <p>
                  <strong>Address:</strong>
                </p>
              </div>
            }
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
          <List
            size="default"
            dataSource={cart.paymentMethod}
            header={
              <div>
                <h2>Payment Method</h2>
                <p>
                  <strong>Metod:</strong>
                  <List.Item>{cart.paymentMethod}</List.Item>
                </p>
              </div>
            }
          />

          <List
            size="default"
            dataSource={cartInfo}
            header={
              <div>
                <h2>Order Items</h2>
              </div>
            }
            renderItem={(item) =>
              cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <List.Item>{item}</List.Item>
              )
            }
          />
        </Col>
        <Col flex="0 1 300px">
          <div>
            <h2>Order Summary</h2>
            <Row>
              <Col>Items</Col>
              <Col>${cart.itemsPrice}</Col>
            </Row>
            <Row>
              <Col>Shipping</Col>
              <Col>${cart.shippingPrice}</Col>
            </Row>
            <Row>
              <Col>Tax</Col>
              <Col>${cart.taxPrice}</Col>
            </Row>
            <Row>
              <Col>Total</Col>
              <Col>${cart.totalPrice}</Col>
            </Row>
            <Row>
              <Col>{error && <Message type="error">{error}</Message>}</Col>
            </Row>
            <Row>
              <Col>
                <Button
                  htmlType="button"
                  className="btn-block"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};
