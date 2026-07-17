import axios from 'axios';
import React, { useEffect, useState } from 'react'

const TShirt = () => {

  const [products, setProducts] = useState([]);


  const fetchProducts = async () => {
    const res = await axios('/products.json');
    console.log('product data    :  ', res);

    setProducts(res.data)

  };
  useEffect(() => {
    fetchProducts();
  }, [])


  return (
    <div className='pt-40 grid grid-cols-3'>

      {
        products.map(product => <div key={product.id}>
          <span>{product.category}</span>
          <img src={product.image} alt="products" />
          <span>{product.price}</span>
          <span>{product.name}</span>
        </div>)
      }

    </div>
  )
}

export default TShirt
