import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Layout, Pagination, Button } from 'antd';
import { Helmet } from 'react-helmet';
import { Product } from '../components/Product';
import { listProducts } from '../actions/productActions';
import { Loader } from '../components/shared/Loader/Loader';
import { Message } from '../components/shared/Message/Message';
import { Link, useParams } from 'react-router-dom';
import { Paginate } from '../components/shared/Paginate/Paginate';
import { ProductCarousel } from '../components/ProductCarousel';
import { Meta } from '../components/shared/Meta/Meta';

const { Content } = Layout;

export const HomeScreen = () => {
  const { keyword, pageNumber } = useParams();
  const pageNum = pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNum));
  }, [dispatch, keyword, pageNum]);

  const leftClick = () => {
    return page - 1;
  };

  const rightClick = () => {
    return page + 1;
  };

  return (
    <>
      <Meta />
      <Content>
        <div className="container">
          {!keyword ? <ProductCarousel /> : <Button type="dark"><Link to="/">Go Back</Link></Button> }
          <h1>Latest Products</h1>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message type="danger">{error}</Message>
          ) : (
            <>
              <Row gutter={16}>
                {products.map((product) => (
                  <Col span={8} key={product._id}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
              <Paginate
                pages={pages}
                page={page}
                keyword={keyword ? keyword : ''}
                leftChange={leftClick}
                rightChange={rightClick}
              />
            </>
          )}
        </div>
      </Content>
    </>
  );
};
