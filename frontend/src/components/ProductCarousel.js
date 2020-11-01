import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel, Image } from 'antd';
import { Loader } from './shared/Loader/Loader';
import { Message } from './shared/Message/Message';
import { listTopProducts } from '../actions/productActions';

export const ProductCarousel = () => {
  const dispatch = useDispatch();
  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message type="error">{error}</Message>
  ) : (
    <Carousel autoplay pauseOnHover>
      {products.map((product) => (
        <div key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} />
          </Link>
        </div>
      ))}
    </Carousel>
  );
};
