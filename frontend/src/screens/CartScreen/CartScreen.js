import React, { useEffect } from 'react';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, Select, Button } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { addToCart, removeFromCart } from '../../actions/cartActions';
import { Message } from '../../components/shared/Message/Message';

export const CartScreen = () => {
  const { search } = useLocation();
  const { id } = useParams();
  const history = useHistory();

  const qty = search ? Number(search.split('=')[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };

  return (
    <div className="container">
      <Row>
        <Col flex="1 1 200px">
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Message>
              Your Cart Is Empty <Link to="/">Go Back</Link>{' '}
            </Message>
          ) : (
            cartItems.map((item) => (
              <Row justify="space-between" key={item.product}>
                <Col span={4}>
                  <Link to={`/product/${item.product}`}>
                    <Image src={item.image} alt={item.name} />
                  </Link>
                </Col>
                <Col span={4}>
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                </Col>
                <Col span={4}>${item.price}</Col>
                <Col span={4}>
                  <Select
                    value={item.qty}
                    onChange={(value) =>
                      dispatch(addToCart(item.product, Number(value)))
                    }
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <Select.Option key={x + 1} value={x + 1}>
                        {x + 1}
                      </Select.Option>
                    ))}
                  </Select>
                </Col>
                <Col span={4}>
                  <CloseCircleOutlined
                    height={'2em'}
                    width={'2em'}
                    onClick={() => removeFromCartHandler(item.product)}
                  />
                </Col>
              </Row>
            ))
          )}
        </Col>
        <Col flex="0 1 300px">
          <h1>
            Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
            Items
          </h1>
          $
          {cartItems
            .reduce((acc, item) => acc + item.qty * item.price, 0)
            .toFixed(2)}
        </Col>
        <Col>
          <Button
            htmlType="button"
            type="default"
            disabled={cartItems.length === 0}
            onClick={checkoutHandler}
          >
            Proceed To Checkout
          </Button>
        </Col>
      </Row>
    </div>
  );
};
