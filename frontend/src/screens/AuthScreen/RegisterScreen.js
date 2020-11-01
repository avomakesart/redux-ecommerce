import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import {
  Form,
  Input,
  Checkbox,
  Button,
} from 'antd';
import { Loader } from '../../components/shared/Loader/Loader';
import { Message } from '../../components/shared/Message/Message';
import { useForm } from '../../hooks/userForm';
import { register } from '../../actions/userActions';

export const RegisterScreen = () => {
  const [, setMessage] = useState(null);
  const [formValues, handleInputChange] = useForm({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { name, email, password, confirmPassword } = formValues;

  const history = useHistory();

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);

  const { loading, error, userInfo } = userRegister;

  const { search } = useLocation();
  const redirect = search ? search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const handleRegister = (e) => {
    // Dispatch register
    if (password !== confirmPassword) {
      setMessage('Password do not match');
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <div className="container">
      <h1>Sign Up</h1>
      {error && (
        <Message type="error" showIcon>
          {error}
        </Message>
      )}
      {loading && <Loader />}
      <Form
        name="register"
        onSubmitCapture={handleRegister}
        scrollToFirstError
        layout="vertical"
      >
        <Form.Item
          name="name"
          label="Full name"
          rules={[
            {
              required: true,
              message: 'Please input your Full name!',
            },
          ]}
        >
          <Input name="name" value={name} onChange={handleInputChange} />
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input name="email" value={email} onChange={handleInputChange} />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
              min: 6,
            },
          ]}
          hasFeedback
        >
          <Input.Password
            name="password"
            value={password}
            onChange={handleInputChange}
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  'The two passwords that you entered do not match!'
                );
              },
            }),
          ]}
        >
          <Input.Password
            name="confirmPassword"
            value={confirmPassword}
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
            Register
          </Button>
        </Form.Item>
        <Form.Item>
          Have an account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};
