/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
import React from 'react';

function Products(props) {
  return (
    <div>
      <ul>
        {props.products.map((item, idx) => (
          <li onClick={() => props.getReview(item.item_id)} key={idx}>
            {item.item_name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;
