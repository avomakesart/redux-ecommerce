import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useHistory, useParams } from 'react-router-dom';
import { Form, Input, Button, Checkbox } from 'antd';
import { Loader } from '../../../components/shared/Loader/Loader';
import { Message } from '../../../components/shared/Message/Message';
import { getUserDetails, updateUser } from '../../../actions/userActions';
import { USER_UPDATE_RESET } from '../../../constants/userConstants';

export const UserEditScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const { id } = useParams();
  const userId = id;

  const history = useHistory();

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push('/admin/userlist');
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, userId, history, user, successUpdate]);

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  return (
    <div className="container">
      <h1>Edit User</h1>
      {loadingUpdate && <Loader /> }
  {errorUpdate && <Message type="error">{errorUpdate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error" showIcon>
          {error}
        </Message>
      ) : (
        <Form
          name="register"
          onSubmitCapture={handleUpdate}
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

          <Form.Item name="isadmin" label="Is Admin">
            <Checkbox
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            >
              Checkbox
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};
