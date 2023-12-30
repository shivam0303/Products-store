import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
import axios from 'axios';
import MyNavbar from '../../components/navbar/Navbar.js';
import ProductList from '../../components/productList/ProductList.js';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const response = await axios.get('/product');
          setProducts(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {user ?
        <div>
          <MyNavbar />
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ProductList products={products} />
          )}
        </div>
        :
        <a href='login'>Please Login!</a>
      }
    </>
  );
};


export default Home;
