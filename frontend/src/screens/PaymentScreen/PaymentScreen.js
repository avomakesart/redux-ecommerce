import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Form, Button, Radio } from 'antd';
import { savePaymentMethod } from '../../actions/cartActions';
import { CheckoutSteps } from '../../components/CheckoutSteps';

export const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const history = useHistory();
  const dispatch = useDispatch();

  if (!shippingAddress) history.push('/shipping');


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };

  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };

  return (
    <div className="container">
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form
        name="shipping"
        scrollToFirstError
        layout="vertical"
        onSubmitCapture={submitHandler}
      >
        <Form.Item label="Select Method">
          <Radio.Group>
            <Radio
              type="radio"
              id="paypal"
              name="paymentMethod"
              value="PayPal"
              checked
              style={radioStyle}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              PayPal or Credit Card
            </Radio>
            <Radio
              type="radio"
              id="stripe"
              name="paymentMethod"
              value="Stripe"
              style={radioStyle}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              Stripe
            </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Continue
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
