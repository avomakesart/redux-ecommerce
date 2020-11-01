import React from 'react';
import { Rate } from 'antd';

export const Rating = ({ value, text }) => {
  return (
    <div className="rating">
      <Rate disabled allowHalf defaultValue={value} />
      <span>{text && text}</span>
    </div>
  );
};
