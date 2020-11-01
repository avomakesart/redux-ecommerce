import React, { useEffect } from 'react';
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Table, Tag, Space, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { Loader } from '../../../components/shared/Loader/Loader';
import { Message } from '../../../components/shared/Message/Message';
import { listOrders } from '../../../actions/orderActions';

const { Column } = Table;

export const OrderListScreen = () => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const history = useHistory();

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo]);

  // ID, USER, DATE, TOTAL, PAID, DELIVERED, ACTIONS

  return (
    <div className="container">
      <h1>Orders</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <Table dataSource={orders}>
          <Column title="ID" dataIndex="_id" key="_id" />
          <Column
            title="USER"
            dataIndex="user"
            key="user"
            render={(user) => (
              <>{user && <Tag color="blue">{user.name}</Tag>}</>
            )}
          />
          <Column
            title="DATE"
            dataIndex="createdAt"
            key="createdAt"
            render={(createdAt) => (
              <>{createdAt.substring(0, 10)}</>
            )}
          />
           <Column
            title="TOTAL"
            dataIndex="totalPrice"
            key="totalPrice"
            render={(totalPrice) => (
            <><Tag color="success">${totalPrice}</Tag></>
            )}
          />
          <Column
            title="PAID"
            dataIndex="paidAt"
            key="paidAt"
            render={(paidAt) => (
              <>
                {paidAt ? (
                  <Tag color="blue">{moment(paidAt).format('DD-MM-YYYY')}</Tag>
                ) : (
                  <Tag color="warning">Pending payment</Tag>
                )}
              </>
            )}
            responsive={['md']}
          />
             <Column
            title="DELIVERED"
            dataIndex="deliveredAt"
            key="deliveredAt"
            render={(deliveredAt) => (
              <>
                {deliveredAt ? (
                  <Tag color="blue">{moment(deliveredAt).format('DD-MM-YYYY')}</Tag>
                ) : (
                  <Tag color="magenta">Pending Delivery</Tag>
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
                <Link to={`/order/${_id}`}>
                  <Button>
                    <EditOutlined />
                    Details
                  </Button>
                </Link>
              </Space>
            )}
            responsive={['lg']}
          />
        </Table>
      )}
    </div>
  );
};
