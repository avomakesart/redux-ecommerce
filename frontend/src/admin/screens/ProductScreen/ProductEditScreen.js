import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { Loader } from '../../../components/shared/Loader/Loader';
import { Message } from '../../../components/shared/Message/Message';
import {
  listProductDetails,
  updateProduct,
} from '../../../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../../../constants/productConstants';

// const { Dragger } = Upload;

export const ProductEditScreen = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const { id } = useParams();
  const productId = id;

  const history = useHistory();

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push('/admin/productlist');
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, productId, product, history, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };

  return (
    <div className="container">
      {/* TODO: Add breadcrump */}
      <h1>Edit Product</h1>
      {loadingUpdate && <Loader />}
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
            label="Product Name:"
            rules={[
              {
                required: true,
                message: 'Please input the product name!',
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
            name="price"
            label="Price:"
            rules={[
              {
                required: true,
                message: 'Please input a product price',
              },
            ]}
          >
            <Input
              name="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input value={price} style={{ display: 'none' }} />
          </Form.Item>

          <Form.Item
            name="image"
            label="Image:"
            rules={[
              {
                required: true,
                message: 'Please input a product image',
              },
            ]}
          >
            <Input
              name="image"
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <input value={image} style={{ display: 'none' }} />
          </Form.Item>

          <Form.Item name="image" label="Image:">
            <Input type="file" onChange={uploadFileHandler} />
          </Form.Item>

          {uploading && <Loader />}

          <Form.Item
            name="brand"
            label="Brand:"
            rules={[
              {
                required: true,
                message: 'Please input a product price',
              },
            ]}
          >
            <Input
              name="brand"
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
            <input value={brand} style={{ display: 'none' }} />
          </Form.Item>

          <Form.Item
            name="count"
            label="Count In Stock:"
            rules={[
              {
                required: true,
                message: 'Please input a count',
              },
            ]}
          >
            <Input
              name="count"
              type="number"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            />
            <input value={countInStock} style={{ display: 'none' }} />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category:"
            rules={[
              {
                required: true,
                message: 'Please input a category',
              },
            ]}
          >
            <Input
              name="category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <input value={category} style={{ display: 'none' }} />
          </Form.Item>

          <Form.Item
            name="description"
            label="description:"
            rules={[
              {
                required: true,
                message: 'Please input a description',
              },
            ]}
          >
            <Input
              name="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input value={description} style={{ display: 'none' }} />
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
