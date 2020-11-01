import React, { createElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {
  listProductDetails,
  createProductReview,
} from '../../actions/productActions';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import {
  Button,
  Image,
  Breadcrumb,
  notification,
  Select,
  Col,
  Row,
  Form,
  Comment,
  Tooltip,
  Avatar,
  Input,
  List,
  Divider,
  Rate,
} from 'antd';
import {
  CheckCircleTwoTone,
  DislikeFilled,
  DislikeOutlined,
  LikeFilled,
  LikeOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import { Rating } from '../../components/Rating';
import './product-screen.css';
import { Loader } from '../../components/shared/Loader/Loader';
import { Message } from '../../components/shared/Message/Message';
import { PRODUCT_CREATE_REVIEW_RESET } from '../../constants/productConstants';
import { Meta } from '../../components/shared/Meta/Meta';

export const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);

  const { id } = useParams();
  const history = useHistory();

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    error: errorProductReview,
  } = productReviewCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }

    dispatch(listProductDetails(id));
  }, [dispatch, id, successProductReview]);

  const { pathname } = useLocation();

  const addToCartHandler = () => {
    history.push(`/cart/${id}?qty=${qty}`);
    notification.open({
      message: 'Product Added to cart',
      description: `You added ${product.name} to your cart.`,
      icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(id, { rating, comment }));
    if (rating.length > 0 || comment.length > 0) {
      const successComment = async () => {
        await notification.open({
          message: 'Review Submitted',
          icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        });
        setTimeout(() => {
          window.document.location.reload();
        }, 2000);
      };
      successComment();
    }
  };

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction('liked');
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction('disliked');
  };

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(
          action === 'disliked' ? DislikeFilled : DislikeOutlined
        )}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to">Reply to</span>,
  ];

  return (
    <div className="container">
      <Breadcrumb style={{ marginTop: '2rem' }}>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link
            to="/"
            className={`${pathname === product ? 'active_color' : ''}`}
          >
            {product.name}
          </Link>
        </Breadcrumb.Item>
      </Breadcrumb>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="danger">{error}</Message>
      ) : (
        <>
        <Meta title={product.name} description={product.description} />
          <div className="product_container">
            <Image src={product.image} alt={product.name} />
            <div className="product_description_container">
              <small>{product.category}</small>
              <p>{product.name}</p>
              <h2>Price: ${product.price}</h2>

              {product.countInStock > 0 && (
                <Select value={qty} onChange={setQty}>
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <Select.Option key={x + 1} value={x + 1}>
                      {x + 1}
                    </Select.Option>
                  ))}
                </Select>
              )}

              <br />
              {product.countInStock > 0 ? (
                <Button type="primary" onClick={addToCartHandler}>
                  ADD TO CART
                </Button>
              ) : (
                <Button type="ghost" disabled>
                  OUT OF STOCK
                </Button>
              )}
              <p>{product.description}</p>

              <span>
                <Rating value={product.rating} />{' '}
                <p>From {product.numReviews} Clients</p>
              </span>
            </div>
          </div>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>

              <List
                className="comment-list"
                header={`${product.reviews.length} reviews`}
                itemLayout="horizontal"
                dataSource={product.reviews}
                renderItem={(reviews) => (
                  <li>
                    <Comment
                      key={reviews._id}
                      author={reviews.name}
                      actions={actions}
                      avatar={
                        <Avatar
                          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                          alt="Han Solo"
                        />
                      }
                      content={
                        <>
                          <Rating value={reviews.rating} />
                          <Divider />
                          {reviews.comment}
                        </>
                      }
                      datetime={
                        <Tooltip
                          title={moment(reviews.createdAt).format(
                            'YYYY-MM-DD HH:mm:ss'
                          )}
                        >
                          <span>{moment(reviews.createdAt).fromNow()}</span>
                        </Tooltip>
                      }
                    />
                  </li>
                )}
              />
              {console.log(product.reviews)}
              <div>
                <h2>Write a Customer Review</h2>
                {errorProductReview && (
                  <Message type="error">{errorProductReview}</Message>
                )}
                {userInfo ? (
                  <Form onSubmitCapture={submitHandler} layout="vertical">
                    <Form.Item label="Rating:">
                      <Rate allowHalf value={rating} onChange={setRating} />
                    </Form.Item>
                    <Form.Item label="Comment:">
                      <Input.TextArea
                        showCount
                        maxLength={1000}
                        rows={4}
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button htmlType="submit" type="primary">
                        Add Review
                      </Button>
                    </Form.Item>
                  </Form>
                ) : (
                  <Message>
                    Please <Link to="/login">sign in</Link> to write a review
                  </Message>
                )}
              </div>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};
