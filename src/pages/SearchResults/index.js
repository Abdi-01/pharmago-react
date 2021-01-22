import React from 'react';
import { useSelector } from 'react-redux';

const SearchResult = ({ location }) => {
  const { search } = useSelector(({ ProductsReducer }) => {
    return {
      search: ProductsReducer.search,
    };
  });

  return (
    <div className='container'>
      {search.map((item) => (
        <div key={item.idproduct} className='mt-5'>
          <h5>{item.name}</h5>
        </div>
      ))}
    </div>
  );
};

export default SearchResult;
