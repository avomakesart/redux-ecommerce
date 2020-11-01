import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Table, Tag, Space, Button, Row, Col } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleFilled,
} from '@ant-design/icons';
import { Loader } from '../../../components/shared/Loader/Loader';
import { Message } from '../../../components/shared/Message/Message';
import { createProduct, deleteProduct, listProducts } from '../../../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../../../constants/productConstants';

const { Column } = Table;

export const ProductListScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct
  } = productCreate;

  const history = useHistory();

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })
    if (!userInfo.isAdmin) {
      history.push('/login');
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts());
    }
  }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct())
  };

  return (
    <div className="container">
      <Row>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col>
          <Button onClick={createProductHandler}>
            <PlusCircleFilled /> Create Products
          </Button>
        </Col>
      </Row>
      {loadingCreate && <Loader />}
      {errorCreate && <Message type="error">{errorCreate}</Message>}
      {loadingDelete && <Loader />}
      {errorDelete && <Message type="error">{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <Table dataSource={products}>
          <Column title="ID" dataIndex="_id" key="_id" />
          <Column title="Name" dataIndex="name" key="name" />
          <Column
            title="Price"
            dataIndex="price"
            key="price"
            render={(price) => (
              <>
                <Tag>${price}</Tag>
              </>
            )}
            responsive={['md']}
          />
          <Column
            title="Category"
            dataIndex="category"
            key="category"
            render={(category) => (
              <>
                <Tag>{category}</Tag>
              </>
            )}
            responsive={['md']}
          />
          <Column
            title="Brand"
            dataIndex="brand"
            key="brand"
            render={(brand) => (
              <>
                <Tag>{brand}</Tag>
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
                <Link to={`/admin/product/${_id}/edit`}>
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
