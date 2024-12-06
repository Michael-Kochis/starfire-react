import React, {useEffect, useRef, useState} from "react";
import {Button, Container, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
import axiosClient from "../api/axios-config";

import './login.css'

const Login = () => {
    const nameRef = useRef();
    const [username, setUsername] = useState('');
    const [validUser, setValidUser] = useState(false);
    const [password, setPassword] = useState('');
    const [validPW, setValidPW] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    useEffect(()=> {
        nameRef.current.focus();
    }, [])

    useEffect( () => {
        if (username.length >= 8)
            setValidUser(true)
        else
            setValidUser(false)
    }, [username])

    useEffect( () => {
        if (password.length >= 8)
            setValidPW(true)
        else
            setValidPW(false)
    }, [password])

    const handleLogon = async (e) => {
        e.preventDefault();

        try {
            const userRegister = {
                username: e.target.username.value,
                password: e.target.password.value
            }

            const response = await axiosClient
                .get('/api/v1/auth/me', userRegister)
                .then(setSubmitSuccess('You have logged in'));
        } catch (error) {
            setSubmitSuccess('Something went wrong');
        }

    }

    return(
        <Container>
            <header>
                <h4>Register</h4>
            </header>
            <main className="register-container">
                <div className="register-layout">
                    <Form onSubmit={handleLogon}>
                        <Form.Group className="me-2">
                            <Form.Label>Username:
                                <span className={validUser?"valid":"hide"}>
                                    <FontAwesomeIcon icon={faCheck} className={"valid-icon"} />
                                </span>>
                                <span className={validUser?"hide":"valid"}>
                                    <FontAwesomeIcon icon={faTimes} className={"invalid-icon"} />
                                </span>>
                            </Form.Label>
                            <Form.Control type={"text"} placeholder={"Enter Username"}
                                          id={"username"}
                                          ref={nameRef}
                                          autoComplete={"off"}
                                          onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="me-2">
                            <Form.Label>Password:
                                <span className={validPW?"valid":"hide"}>
                                    <FontAwesomeIcon icon={faCheck} className={"valid-icon"} />
                                </span>>
                                <span className={validPW?"hide":"valid"}>
                                    <FontAwesomeIcon icon={faTimes} className={"invalid-icon"} />
                                </span>>
                            </Form.Label>
                            <Form.Control type={"password"} placeholder={"Enter Password"}
                                          id={"password"}
                                          autoComplete={"off"}
                                          onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button disabled={!validUser || !validPW}
                                variant={"info"}
                                type={"submit"} >
                            Submit
                        </Button>
                    </Form>
                    {(submitSuccess)?
                        <section className={"register-message"}>
                            {submitSuccess}
                        </section>
                        : null
                    }
                </div>
            </main>
        </Container>
    )
}

export default Login;