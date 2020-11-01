import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Input, Form } from 'antd';
const { Search } = Input;

export const SearchBox = () => {
  const [keyword, setKeyword] = useState('');

  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };

  return (
    <Form onSubmitCapture={submitHandler}>
      <Search
        placeholder="Search Products..."
        allowClear
        name="q"
        enterButton="Search"
        size="large"
        onChange={(e) => setKeyword(e.target.value)}
      />
    </Form>
  );
};
