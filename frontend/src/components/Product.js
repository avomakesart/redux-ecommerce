import React from 'react';
import { Card } from 'antd';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';
import { Rating } from './Rating';
import { Link } from 'react-router-dom';
const { Meta } = Card;

export const Product = ({ product }) => {
  return (
    <Card
      cover={
        <Link to={`/product/${product._id}`}>
          <img alt="example" src={product.image} style={{ maxWidth: '100%' }} />
        </Link>
      }
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Meta
        title={<Link to={`/product/${product._id}`}>{product.name}</Link>}
        description={product.description}
      />
      <br />
      <div>
        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
      </div>
      <br />
      <Title level={3}>${product.price}</Title>
    </Card>
  );
};
