import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';


export const ProductContext = createContext();

const ProductProvider = ({ children }) => {

    const [allProduct, setAllProduct] = useState([]);

    console.log(allProduct, 'all products json');


    const [searchQuery, setSearchOuery] = useState('');
    console.log(searchQuery);


    // all products data load
    const fetchProducts = async () => {
        const res = await axios('http://localhost:5000/api/products');
        console.log('product data context   :  ', res.data);

        setAllProduct(res.data.payload.products)

    };
    useEffect(() => {
        fetchProducts();
    }, [])




    return (
        <ProductContext.Provider value={{ allProduct, searchQuery, setSearchOuery }}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductProvider;
