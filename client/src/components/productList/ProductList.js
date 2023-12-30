import React, { useState, useContext } from 'react';
import { Card, Button, Col, Row, Container } from 'react-bootstrap';
import { AuthContext } from "../../context/AuthContext";
import axios from 'axios';
import "./productList.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductList = ({ products }) => {
    const [quantity, setQuantity] = useState({});
    const { user } = useContext(AuthContext);
    const username = user.username;

    const handleAddToCart = async (productId) => {
        try {
            const cartCheckResponse = await axios.get(`/cart/${username}`);
            let cartId;
            let existingProducts = [];

            // console.log(cartCheckResponse.data);

            if (cartCheckResponse.data[0] && cartCheckResponse.data[0].products) {
                console.log(cartCheckResponse.data[0].products);
                cartId = cartCheckResponse.data._id;
                existingProducts = cartCheckResponse.data[0].products || [];
            } else {
                const createCartResponse = await axios.post('/cart/create_cart', {
                    username,
                    products: [],
                    total: 0,
                });

                cartId = createCartResponse.data._id;
            }

            const product = await axios.get(`/product/${productId}`);
            // console.log(product);
            const newQuantity = quantity[productId] || 0;

            let updatedProducts = [];

            if (existingProducts.find((product) => product.pid === productId)) {
                updatedProducts = existingProducts.map((product) => {
                    if (product.pid === productId) {
                        return {
                            ...product,
                            quantity: product.quantity + newQuantity,
                        };
                    }
                    return product;
                }
                )
            } else {

                updatedProducts = [
                    ...existingProducts,
                    {
                        pid: product.data._id,
                        name: product.data.name,
                        quantity: newQuantity,
                        price: product.data.price,
                    },
                ];
            }
            // console.log(updatedProducts);

            const modifyCartResponse = await axios.post('/cart/modify_cart', {
                username: username,
                products: updatedProducts,
                
            });

            // console.log(modifyCartResponse)
            alert('Added to cart');

            setQuantity({ ...quantity, [productId]: 0 });
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    const handleIncrement = (productId) => {
        setQuantity((prevQuantity) => ({
            ...prevQuantity,
            [productId]: (prevQuantity[productId] || 0) + 1,
        }));
    };

    const handleDecrement = (productId) => {
        setQuantity((prevQuantity) => ({
            ...prevQuantity,
            [productId]: Math.max((prevQuantity[productId] || 0) - 1, 0),
        }));
    };

    return (
        <div>
            <Container className="mt-4">
                <h1 className="mb-4">Welcome to the Appleute Online Store</h1>
                <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                    {products.map((product) => (
                        <Col key={product._id}>
                            <Card className="product-card">
                                <Card.Img
                                    variant="top"
                                    src={product.img[0] || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcSM4Tg0il7An9Q9DP8aERKv6q4geoP9NT2Q&usqp=CAU"}
                                    alt={product.name}
                                    className="product-image"
                                />
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text className="product-description">
                                        {product.desc}
                                    </Card.Text>
                                    <Card.Text className="price-text">
                                        Price: ₹{product.price}
                                    </Card.Text>
                                    <Row className="quantity-row">
                                        <Col xs={6} md={6} lg={6}>
                                            <div className="quantity-container">
                                                <Button
                                                    onClick={() => handleDecrement(product._id)}
                                                    type="button"
                                                    className="btn btn-dark btn-sm"
                                                >
                                                    -
                                                </Button>
                                                <span className="quantity-display">{quantity[product._id] || 0}</span>
                                                <Button
                                                    onClick={() => handleIncrement(product._id)}
                                                    type="button"
                                                    className="btn btn-dark btn-sm"
                                                >
                                                    +
                                                </Button>
                                            </div>
                                        </Col>
                                        <Col xs={6} md={6} lg={6}>
                                            <Button
                                                onClick={() => handleAddToCart(product._id)}
                                                className="add-to-cart-button"
                                                disabled={quantity[product._id] === 0 || !quantity[product._id]}
                                            >
                                                Add to Cart
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default ProductList;
