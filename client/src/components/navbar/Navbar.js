import React, { useContext } from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import "./navbar.css";

const MyNavbar = () => {
    const { dispatch, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        navigate('/login');
    };

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href='/'>Appleute Store</Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <a href="cart">Cart</a>
                        <span onClick={handleLogout} style={{ cursor: 'pointer' }}>Log Out {user.username}</span>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNavbar;
