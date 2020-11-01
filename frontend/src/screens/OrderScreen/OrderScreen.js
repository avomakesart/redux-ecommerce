import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { PayPalButton } from 'react-paypal-button-v2';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Col, Row, Image, Button } from 'antd';
import { Loader } from '../../components/shared/Loader/Loader';
import { Message } from '../../components/shared/Message/Message';
import { getOrderDetails, payOrder, deliverOrder } from '../../actions/orderActions';
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../../constants/orderConstants';
import { CheckoutSteps } from '../../components/CheckoutSteps';

export const OrderScreen = () => {
  const { id } = useParams();
  const orderId = id;
  const history = useHistory()

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, order, successDeliver, history, userInfo]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }

  return (
    <div className="container">
      <CheckoutSteps step1 step2 step3 step4 step5 />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <>
          <h1>Order {order._id}</h1>
          <Row>
            <Col flex="1 1 200px">
              <div>
                <h2>Shipping</h2>
                <p>
                  <strong>Name: </strong> {order.user.name}
                </p>
                <p>
                  <strong>Email: </strong>
                  <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                </p>
                <p>
                  <strong>Address:</strong>
                </p>
                <p>
                  {order.shippingAddress.address},{order.shippingAddress.city},
                  {order.shippingAddress.postalCode},
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <Message type="success">
                    Delivered on {order.deliveredAt}
                  </Message>
                ) : (
                  <Message type="error">Not Delivered</Message>
                )}
              </div>

              <div>
                <h2>Payment Method</h2>
                <p>
                  <strong>Metod:</strong>
                  {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <Message type="success">
                    Paid on{' '}
                    {moment(order.paidAt).format('MMMM Do YYYY, h:mm:ss a')}
                  </Message>
                ) : (
                  <Message type="error">Not Paid</Message>
                )}
              </div>

              <div>
                {order.orderItems.length === 0 ? (
                  <Message>Order is empty</Message>
                ) : (
                  order.orderItems.map((item, index) => (
                    <div key={index}>
                      <Row>
                        <Col span={24}>
                          <Image src={item.image} alt={item.name} width={150} />
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </div>
                  ))
                )}
              </div>
            </Col>
            <Col flex="0 1 300px">
              <div>
                <h2>Order Summary</h2>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
                {!order.isPaid && (
                  <Row>
                    <Col>
                      {loadingPay && <Loader />}
                      {!sdkReady ? (
                        <Loader />
                      ) : (
                        <PayPalButton
                          amount={order.totalPrice}
                          onSuccess={successPaymentHandler}
                        />
                      )}
                    </Col>
                  </Row>
                )}
                {loadingDeliver && <Loader />}
                {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                  <Row>
                    <Col>
                    <Button type="ghost" onClick={deliverHandler}>Mark As Delivered</Button>
                    </Col>
                  </Row>
                )}
              </div>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};
