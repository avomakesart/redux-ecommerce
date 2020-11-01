import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Steps } from 'antd';
import {
  UserOutlined,
  SolutionOutlined,
  LoadingOutlined,
  CreditCardOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';

const { Step } = Steps;

export const CheckoutSteps = ({ step1, step2, step3, step4, step5 }) => {
  return (
    // <Menu mode="horizontal" selectedKeys={pathname}>
    //   <Menu.Item key="loging">
    //     {step1 ? (
    //       <Link to="/login">Sign In</Link>
    //     ) : (
    //       <Button disabled type="link">
    //         Sign In
    //       </Button>
    //     )}
    //   </Menu.Item>
    //   <Menu.Item key="shipping">
    //     {step2 ? (
    //       <Link to="/shipping">Shipping</Link>
    //     ) : (
    //       <Button disabled type="link">
    //         Shipping
    //       </Button>
    //     )}
    //   </Menu.Item>
    //   <Menu.Item key="payment">
    //     {step3 ? (
    //       <Link to="/payment">Payment</Link>
    //     ) : (
    //       <Button disabled type="link">
    //         Payment
    //       </Button>
    //     )}
    //   </Menu.Item>
    //   <Menu.Item key="placeorder">
    //     {step4 ? (
    //       <Link to="/placeorder">Place Order</Link>
    //     ) : (
    //       <Button disabled type="link">
    //         Place Order
    //       </Button>
    //     )}
    //   </Menu.Item>
    // </Menu>
    <Steps>
      <Step
        status={step1 ? 'finish' : 'process'}
        title={
          step1 ? (
            <Link to="/login">Sign In</Link>
          ) : (
            <Button disabled type="link">
              Sign In
            </Button>
          )
        }
        icon={<UserOutlined />}
      />
      <Step
        status={step2 ? 'finish' : 'process'}
        title={
          step2 ? (
            <Link to="/shipping">Shipping</Link>
          ) : (
            <Button disabled type="link">
              Shipping
            </Button>
          )
        }
        icon={<SolutionOutlined />}
      />
      <Step
        status={step3 ? 'finish' : 'process'}
        title={
          step3 ? (
            <Link to="/payment">Payment</Link>
          ) : (
            <Button disabled type="link">
              Payment
            </Button>
          )
        }
        icon={<CreditCardOutlined color="#fff" />}
      />
      <Step
        status={step4 ? 'finish' : 'process'}
        title={
          step4 ? (
            <Link to="/placeorder">Place Order</Link>
          ) : (
            <Button disabled type="link">
              Place Order
            </Button>
          )
        }
        icon={step4 ? <CheckCircleOutlined /> : <LoadingOutlined />}
      />

<Step
        status={step5 ? 'finish' : 'process'}
        title={
          step5 ? (
            <Link to="/placeorder">Confirm Payment</Link>
          ) : (
            <Button disabled type="link">
              Confirm Payment
            </Button>
          )
        }
        icon={step5 ? <LoadingOutlined /> : <CheckCircleOutlined />}
      />
    </Steps>
  );
};
