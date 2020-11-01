import React from 'react';
import { Alert } from 'antd';

export const Message = ({ type, children, showIcon }) => {
  return <Alert type={type} showIcon={showIcon} message={children} />;
};

Message.defaultProps = {
  type: 'info',
};
