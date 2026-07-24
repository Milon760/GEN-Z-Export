import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';


export const ProductContext = createContext();

const ProductProvider = ({ children }) => {

    const [allProduct, setAllProduct] = useState([]);
    const [cartProducts, setCartProducts] = useState([]);

    const [searchQuery, setSearchOuery] = useState('');


    console.log(allProduct, 'allproducts');


    // all products data load
    const fetchProducts = async () => {
        const res = await axios.get('http://localhost:5000/api/products');
        const data = res.data;

        console.log(data, 'res');


        setAllProduct(res.data.payload.products)

    };
    useEffect(() => {
        fetchProducts();
    }, [])


    // ১. এখানে JSON.parse() ব্যবহার করতে হবে
    const [cart, setCart] = useState(() => {
        const saveCart = localStorage.getItem('cart');
        return saveCart ? JSON.parse(saveCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        console.log('Adding product to cart:', product);

        setCart((prevCart) => {
            const isExist = prevCart.find((item) => item._id === product._id);

            if (isExist) {
                return prevCart.map((item) =>
                    item._id === product._id
                        ? { ...item, quantity: (item.quantity || 1) + 1 }
                        : item
                );
            };

            return [...prevCart, { ...product, quantity: 1 }];
        });
    };


    // favirites 
    const [favorites, setFavorites] = useState(() => {
        const saveFavorite = localStorage.getItem('favorite');
        return saveFavorite ? JSON.parse(saveFavorite) : [];
    });

    useEffect(() => {
        localStorage.setItem('favorite', JSON.stringify(favorites));
    }, [favorites]);

    // ১. প্রোডাক্ট পেজের জন্য: শুধু ফেভারিট এড করবে
    const addToFavorites = (product) => {
        console.log('Adding product to favorites:', product);

        setFavorites((prevFavs) => {
            const isExist = prevFavs.find((item) => item._id === product._id);

            if (isExist) {
                alert('এই প্রোডাক্টটি অলরেডি ফেভারিটে আছে!');
                return prevFavs; // কোনো পরিবর্তন ছাড়া আগের স্টেটই ফেরত যাবে
            }

            alert('ফেভারিটে যুক্ত করা হয়েছে!');
            return [...prevFavs, product];
        });
    };

    // ২. ফেভারিট পেজের জন্য: শুধু ফেভারিট থেকে ডিলিট করবে
    const removeFromFavorites = (productId) => {
        console.log('Removing product ID:', productId);

        setFavorites((prevFavs) => {
            alert('ফেভারিট থেকে ডিলিট করা হয়েছে!');
            return prevFavs.filter((item) => item._id !== productId);
        });
    };



    const productsInfo = {
        allProduct,
        searchQuery,
        setSearchOuery,
        cartProducts,
        setCartProducts,
        cart,
        setCart,
        addToCart,
        favorites,
        setFavorites,
        addToFavorites,
        removeFromFavorites
    };


    return (
        <ProductContext.Provider value={productsInfo}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductProvider;
