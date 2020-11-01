import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';
import {
  Form,
  Input,
  Checkbox,
  Button,
  Table,
  Tag,
} from 'antd';
import { FieldTimeOutlined } from '@ant-design/icons';
import { Loader } from '../../components/shared/Loader/Loader';
import { Message } from '../../components/shared/Message/Message';
import { getUserDetails, updateUserProfile } from '../../actions/userActions';
import { listMyOrders } from '../../actions/orderActions';

const { Column } = Table;

export const ProfileScreen = () => {
  const [, setMessage] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const history = useHistory();

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderMyList = useSelector((state) => state.orderMyList);
  const { loading: loadingOrders, error: errorOrders, orders } = orderMyList;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user]);

  const handleRegister = (e) => {
    e.preventDefault();
    // Dispatch register
    if (password !== confirmPassword) {
      setMessage('Password do not match');
    } else {
      // Dispatch update profile
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };


  return (
    <div className="container">
      <h1>User Profile</h1>
      {error && (
        <Message type="error" showIcon>
          {error}
        </Message>
      )}
      {success && (
        <Message type="success" showIcon>
          Profile Updated
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
          <Input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input value={name} style={{ display: 'none' }} />
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
          <Input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input value={email} style={{ display: 'none' }} />
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
            onChange={(e) => setPassword(e.target.value)}
          />
          <input value={password} style={{ display: 'none' }} />
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
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <input value={confirmPassword} style={{ display: 'none' }} />
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
            Update
          </Button>
        </Form.Item>
      </Form>
      <div>
        <h3>My Orders</h3>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message type="error">{errorOrders}</Message>
        ) : (
          <Table dataSource={orders}>
            <Column title="ID" dataIndex="_id" key="_id" />
            <Column
              title="DATE"
              dataIndex="createdAt"
              key="date"
              render={(createdAt) => (
               <> {moment(createdAt).format('DD-MM-YYYY')}</>
              )}
            />
            <Column
              title="PRICE" 
              dataIndex="totalPrice"
              key="price"
              render={(totalPrice) => (
                <>
                  <Tag color="cyan">${totalPrice}</Tag>
                </>
              )}
              responsive={['md']}
            />
            <Column
              title="PAID"
              dataIndex="paidAt"
              key="isPaid"
              render={(paidAt) => (
                <>
                  <div>
                    {paidAt ? (
                      paidAt.substring(0, 10)
                    ) : (
                      <FieldTimeOutlined style={{ color: 'red' }} width={50} />
                    )}
                  </div>
                </>
              )}
              responsive={['md']}
            />
            <Column
              title="DELIVERED"
              dataIndex="isDelivered"
              key="isDelivered"
              render={(isDelivered) => (
                <>
                  <div>
                    {isDelivered ? (
                      isDelivered.substring(0, 10)
                    ) : (
                      <FieldTimeOutlined style={{ color: 'red' }} width={50} />
                    )}
                  </div>
                </>
              )}
              responsive={['md']}
            />
             <Column
              title="ACTIONS"
              dataIndex="_id"
              key="actions"
              render={(_id) => (
                <>
                 <Button type="default">
                   <Link to={`/order/${_id}`}>Details</Link>
                 </Button>
                </>
              )}
              responsive={['lg']}
            />
          </Table>
        )}
      </div>
    </div>
  );
};
