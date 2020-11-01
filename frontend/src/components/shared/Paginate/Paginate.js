import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import './paginate.css';

export const Paginate = ({
  pages,
  page,
  isAdmin = false,
  keyword = '',
  leftChange,
  rightChange,
}) => {
  return (
    pages > 1 && (
      <>
        <div className="pagination">
          <Link
            to={
              keyword
                ? `/search/${keyword}/page/${page - 1}`
                : `/page/${page - 1}`
            }
          >
            <LeftOutlined onClick={leftChange} />
          </Link>
          {[...Array(pages).keys()].map((x) => (
            <Link
              key={x + 1}
              to={
                keyword ? `/search/${keyword}/page/${x + 1}` : `/page/${x + 1}`
              }
              className={x + 1 === page ? 'active_page' : ''}
            >
              {x + 1}
            </Link>
          ))}
          <Link
            to={
              keyword
                ? `/search/${keyword}/page/${page + 1}`
                : `/page/${page + 1}`
            }
          >
            <RightOutlined onClick={rightChange} />
          </Link>
        </div>
      </>
    )
  );
};
