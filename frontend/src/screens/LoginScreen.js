import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/Message/Message";
import FormContainer from '../components/FormContainer/FormContainer';
import { login } from '../actions/userActions';
import Loader from '../components/Loader/Loader';


const LoginScreen = ({ location, history }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    // get state for user login 
    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    // url query string in location.search
    const redirect = location.search ? location.search.split("=")[1] : "/";
    console.log(location);
    console.log("userInfo",userInfo);
    // redirect if already logged in
    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);


    const submitHandler = (e) => {
        e.preventDefault();
        // dipstach Login;  
        dispatch(login(email, password));
    }


    return (
        <FormContainer>
            <h1>Sign In</h1>
            {/* check for laoding and error */}
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="email" className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="password" className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary">
                    Sign In
                </Button>
            </Form>

            <Row className="py-3">
                <Col>
                    New Customer? <Link to={redirect 
                                            ? `/register?redirect=${redirect}` 
                                            : "/register"}>
                                    Register</Link> 
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen
