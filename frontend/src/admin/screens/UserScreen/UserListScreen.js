import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Table, Tag, Space, Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Loader } from '../../../components/shared/Loader/Loader';
import { Message } from '../../../components/shared/Message/Message';
import { listUsers, deleteUser } from '../../../actions/userActions';

const { Column } = Table;

export const UserListScreen = () => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  const history = useHistory();

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo, successDelete]);

  console.log(users);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <div className="container">
      <h1>Users</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <Table dataSource={users}>
          <Column title="ID" dataIndex="_id" key="_id" />
          <Column title="Name" dataIndex="name" key="name" />
          <Column
            title="Email"
            dataIndex="email"
            key="email"
            render={(email) => (
              <>
                <a href={`mailto:${email}`}>{email}</a>
              </>
            )}
            responsive={['md']}
          />
          <Column
            title="Admin"
            dataIndex="isAdmin"
            key="isAdmin"
            render={(isAdmin) => (
              <>
                {isAdmin ? (
                  <Tag color="green">Admin</Tag>
                ) : (
                  <Tag color="cyan">User</Tag>
                )}
              </>
            )}
            responsive={['md']}
          />
          <Column
            title="Action"
            key="action"
            dataIndex="_id"
            render={(_id) => (
              <Space size="middle">
                <Link to={`/admin/user/${_id}/edit`}>
                  <Button>
                    <EditOutlined />
                  </Button>
                </Link>
                <Button type="default" onClick={() => deleteHandler(_id)}>
                  <DeleteOutlined />
                </Button>
              </Space>
            )}
            responsive={['lg']}
          />
        </Table>
      )}
    </div>
  );
};
