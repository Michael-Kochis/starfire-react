import React, {useState, useRef, useEffect} from 'react'
import {Container} from "react-bootstrap";
import {Button} from "react-bootstrap";
import {Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
import axiosClient from '../../components/api/axios-config'

import './register.css'

const Register = () => {
    const nameRef = useRef();
    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);
    const [username, setUsername] = useState('');
    const [validUser, setValidUser] = useState(false);
    const [password, setPassword] = useState('');
    const [validPW, setValidPW] = useState(false);
    const [matchPassword, setMatchPassword] = useState('');
    const [validMPW, setValidMPW] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    useEffect(()=> {
        nameRef.current.focus();
    }, [])

    useEffect( () => {
        if (name.length >= 8)
            setValidName(true)
        else
            setValidName(false)
    }, [name])

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

    useEffect( () => {
        if (validPW && password === matchPassword)
            setValidMPW(true)
        else
            setValidMPW(false)
    }, [password, matchPassword])

    const postData = async (e) => {
        e.preventDefault();
        try {
            const userRegister = {
                name: e.target.name.value,
                username: e.target.username.value,
                roles: "Player",
                password: e.target.password.value
            }

            const response = await axiosClient
                .post('/api/v1/auth/', userRegister)
                .then(setSubmitSuccess('You have registered'));
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
                    <Form onSubmit={postData}>
                        <Form.Group className="me-2">
                            <Form.Label>Name:
                                <span className={validName?"valid":"hide"}>
                                    <FontAwesomeIcon icon={faCheck} className={"valid-icon"} />
                                </span>>
                                <span className={validName?"hide":"valid"}>
                                    <FontAwesomeIcon icon={faTimes} className={"invalid-icon"} />
                                </span>>
                            </Form.Label>
                            <Form.Control type={"text"} placeholder={"Enter Name"}
                                  id={"name"}
                                  ref={nameRef}
                                  autoComplete={"off"}
                                  onChange={(e) => setName(e.target.value)}
                              />
                        </Form.Group>
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
                        <Form.Group className="me-2">
                            <Form.Label>Confirm Password:
                                <span className={validMPW?"valid":"hide"}>
                                    <FontAwesomeIcon icon={faCheck} className={"valid-icon"} />
                                </span>>
                                <span className={validMPW?"hide":"valid"}>
                                    <FontAwesomeIcon icon={faTimes} className={"invalid-icon"} />
                                </span>>
                            </Form.Label>
                            <Form.Control type={"password"} placeholder={"Confirm Password"}
                                          id={"confirm"}
                                          autoComplete={"off"}
                                          onChange={(e) => setMatchPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button disabled={!validMPW || !validName || !validUser || !validPW}
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

export default Register;