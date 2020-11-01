import React from 'react';
import { Spin } from 'antd';
export const Loader = () => {
  return (
    <div>
      <Spin
        style={{
          width: '100px',
          height: '100px',
          margin: 'auto',
          display: 'block',
        }}
        tip="Loading..."
      />
    </div>
  );
};
