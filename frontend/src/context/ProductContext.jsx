import React, { createContext, useEffect, useState } from 'react'

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {

    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchOuery] = useState('');
    console.log(searchQuery);

    const fetchProducts = async () => {
        try {
            const res = await fetch('https://gen-z-export-backend.onrender.com/api/products');
            const allProduct = await res.json();

            if (allProduct.success) {
                setProducts(allProduct.payload.products)
            }

        } catch (error) {
            console.error(error);

        }
    };


    useEffect(() => {
        fetchProducts();
    }, [])



    return (
        <ProductContext.Provider value={{ products, searchQuery, setSearchOuery }}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductProvider;
