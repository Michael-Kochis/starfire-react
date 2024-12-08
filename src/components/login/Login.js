import React, {useEffect, useRef, useState} from "react";
import {Button, Container, Form} from "react-bootstrap";
import axiosClient from "../api/axios-config";

import {HttpStatusCode} from "axios";
import './Login.css'

const Login = () => {
    const nameRef = useRef();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState("");

    useEffect(()=> {
        nameRef.current.focus();
    }, [])

    const handleLogon = async (e) => {
        e.preventDefault();

        try {
            const userName = e.target.username.value;
            const passWord = e.target.password.value;

            const b64Encode = btoa(`${userName}:${passWord}`);
            const authConfig = {
                headers: {
                    Authorization: `Basic ${b64Encode}`
                }
            }

            const resp = await axiosClient.get('/api/v1/auth/me', authConfig);
            const data = resp.data;

             if (resp.status === HttpStatusCode.Ok) {

                 setSubmitSuccess("You have logged in as "+ data.principal.username);
             }
        } catch (error) {
            alert(error);
            setSubmitSuccess('Something went wrong');
        }

    }

    return(
        <Container>
            <header>
                <h4>Login</h4>
            </header>
            <main className="register-container">
                <div className="register-layout">
                    <Form onSubmit={handleLogon}>
                        <Form.Group className="me-2">
                            <Form.Label>
                                Username:
                            </Form.Label>
                            <Form.Control type={"text"} placeholder={"Enter Username"}
                                          id={"username"}
                                          ref={nameRef}
                                          autoComplete={"off"}
                                          onChange={(e) => setUsername(e.target.value)}
                                          value={username}
                            />
                        </Form.Group>
                        <Form.Group className="me-2">
                            <Form.Label>
                                Password:
                            </Form.Label>
                            <Form.Control type={"password"} placeholder={"Enter Password"}
                                          id={"password"}
                                          autoComplete={"off"}
                                          onChange={(e) => setPassword(e.target.value)}
                                          value={password}
                            />
                        </Form.Group>
                        <Button
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