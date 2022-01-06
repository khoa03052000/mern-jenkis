import React from "react";
import { Link } from "react-router-dom";

const ProductItem = (props) => {
  const { product } = props;

  return (
    <Link key={product._id} to={`/product/${product._id}`} className="group">
      <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
        <img
          src={product.itemImage}
          alt={product.imageAlt}
          className="w-full h-full object-center object-cover group-hover:opacity-75"
        />
        {/* <button className="p-1 rounded-full bg-green-600 text-white mx-40 -mb-10 hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
          <svg
            className="h-5 w-5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
        </button> */}
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{product.itemName}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">
        ${product.itemPrice}
      </p>
    </Link>
  );
};

export default ProductItem;
