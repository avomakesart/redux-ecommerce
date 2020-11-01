import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Form, Input, Checkbox, Button } from 'antd';
import { useForm } from '../../hooks/userForm';
import { saveShippingAddress } from '../../actions/cartActions';
import { CheckoutSteps } from '../../components/CheckoutSteps';

export const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [shippingValues, handleInputChange] = useForm({
    address: shippingAddress.address,
    city: shippingAddress.city,
    postalCode: shippingAddress.postalCode,
    country: shippingAddress.country,
  });

  const { address, city, postalCode, country } = shippingValues;

  const history = useHistory();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push('/payment');
  };

  return (
    <div className="container">
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form
        name="shipping"
        scrollToFirstError
        layout="vertical"
        onSubmitCapture={submitHandler}
      >
        <Form.Item
          name="address"
          label="Address:"
          rules={[
            {
              required: true,
              message: 'Please input your Shipping address!',
            },
          ]}
        >
          <Input
            name="address"
            defaultValue={address}
            onChange={handleInputChange}
          />
        </Form.Item>

        <Form.Item
          name="city"
          label="City:"
          rules={[
            {
              required: true,
              message: 'Please input your City!',
            },
          ]}
        >
          <Input name="city" defaultValue={city} onChange={handleInputChange} />
        </Form.Item>

        <Form.Item
          name="postalCode"
          label="Postal Code:"
          rules={[
            {
              required: true,
              message: 'Please input your Postal Code!',
              min: 5,
            },
          ]}
        >
          <Input
            name="postalCode"
            defaultValue={postalCode}
            onChange={handleInputChange}
            maxLength="5"
          />
        </Form.Item>

        <Form.Item
          name="country"
          label="Country:"
          rules={[
            {
              required: true,
              message: 'Please input your Country!',
            },
          ]}
        >
          <Input
            name="country"
            defaultValue={country}
            onChange={handleInputChange}
          />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject('Should accept agreement'),
            },
          ]}
        >
          <Checkbox>
            I have read the <a href="https://instagram.com">agreement</a>
          </Checkbox>
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
