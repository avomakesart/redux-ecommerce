import React from 'react';
import { Helmet } from 'react-helmet';

export const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Welcome to Minimalist Ecommerce',
  description: 'We sell the best products but in a minimal way',
  keywords: 'minimal, minimalist ecommerce, ecommerce, reactjs, javascript',
};
