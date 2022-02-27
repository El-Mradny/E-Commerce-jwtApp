import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useHistory } from "react-router-dom";
import validator from 'validator'
import db from '../../db'

export default function Authenticate({ type, set }) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [usernameERR, setUsernameERR] = useState("")
    const [passwordERR, setPasswordERR] = useState("")
    const [confirmPasswordERR, setConfirmPasswordERR] = useState("")

    const [usernameLoginERR, setUsernameLoginERR] = useState("")
    const [passwordLoginERR, setPasswordLoginERR] = useState("")

    const history = useHistory()

    const handleAuthenticate = async () => {

        if (validator.isEmail(username)) {
            setUsernameERR("")
        } else {
            setUsernameERR("Not Valid")
        }

        if (validator.isStrongPassword(password, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
        })) {
            setPasswordERR('')
        } else {
            setPasswordERR('Not A Strong Password Must Be 8 Chars Use A Mix Of Lowercase,Uppercase,Numbers and Symbols')
        }

        if (password === confirmPassword) {
            setConfirmPasswordERR("")
        } else {
            setConfirmPasswordERR("Incorrect Must Be Same As Password Above")
        }


        if (validator.isEmail(username) && password === confirmPassword && validator.isStrongPassword(password, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
        })) {
            const response = await fetch(
                `${type.toLowerCase()}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username,
                        password
                    })
                }
            )
            let jwtUser = null
            if (response.ok) {
                jwtUser = await response.json()
                if (jwtUser) {
                    set(jwtUser)
                    history.push("/")
                }
            } else {
                console.log('response not ok', response)
            }

        }
    }

    const handleAuthenticateLogin = async () => {

        if (validator.isEmail(username)) {
            setUsernameLoginERR("")
        } else {
            setUsernameLoginERR("Not Valid")
        }

        if (password !== "") {
            setPasswordLoginERR('')
        } else {
            setPasswordLoginERR('Not Valid')
        }

        if (password !== "" && validator.isEmail(username)) {
            const response = await fetch(
                `${type.toLowerCase()}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username,
                        password
                    })
                }
            )
            let jwtUser = null
            if (response.ok) {
                jwtUser = await response.json()
                if (jwtUser) {
                    set(jwtUser)
                    history.push("/")
                }
            } else {
                console.log('response not ok', response)
            }
        }





    }

    // const [validAuthenticate, setValidAuthenticate] = useState(false)
    // useEffect(() => setValidAuthenticate(
    //     validator.isEmail(username) &&
    //     password !== ""
    // ), [username, password])

    // const [validAuthenticate2, setValidAuthenticate2] = useState(false)
    // useEffect(() => setValidAuthenticate2(
    //     username !== "" && validator.isEmail(username) && validator.isStrongPassword(password, {
    //         minLength: 8, minLowercase: 1,
    //         minUppercase: 1, minNumbers: 1, minSymbols: 1
    //     }) &&
    //     password !== "" &&
    //     confirmPassword !== "" &&
    //     password === confirmPassword
    // ), [username, password, confirmPassword])

    const ShowPassword = () => {
        const myButton = document.getElementById("a");
        if (myButton.type === "password") {
            myButton.type = "text"
        } else {
            myButton.type = "password"
        }
    }



    return (
        <>
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-5">
                            <br></br>
                            <img src="https://i.pinimg.com/564x/d9/b5/e9/d9b5e9440a2973c71c180d5c829eca9a.jpg" alt="" width="100%" />
                        </div>
                        <div className="col-sm-6">
                            <br></br>
                            <div style={{ backgroundColor: 'white', padding: '10px' }}>
                                <h1>{type}</h1>
                                {
                                    type === "Register" ?
                                        <div>
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control type="text" placeholder="example@example.com" onChange={event => setUsername(event.target.value)} value={username} />
                                            <span style={{ fontWeight: 'bold', color: 'red' }}>{usernameERR}</span>
                                            <br></br>
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" placeholder="Password" onChange={event => setPassword(event.target.value)} value={password} />
                                            <span style={{ fontWeight: 'bold', color: 'red' }}>{passwordERR}</span>
                                            <br></br>
                                            <Form.Label>Confirm Password</Form.Label>
                                            <Form.Control type="password" placeholder="Confirm Password" onChange={event => setConfirmPassword(event.target.value)} value={confirmPassword} />
                                            <span style={{ fontWeight: 'bold', color: 'red' }}>{confirmPasswordERR}</span>
                                            <br></br>

                                            <Button variant="success" onClick={handleAuthenticate}>{type}</Button>

                                        </div>
                                        :
                                        <div>

                                            <Form.Label>Username</Form.Label>
                                            <Form.Control type="text" placeholder="example@example.com" onChange={event => setUsername(event.target.value)} value={username} style={{ width: '80%' }} />
                                            <span style={{ fontWeight: 'bold', color: 'red' }}>{usernameLoginERR}</span>
                                            <br></br>
                                            <Form.Label style={{ display: 'block' }} >Password</Form.Label>
                                            <Form.Control id="a" type="password" placeholder="Password" onChange={event => setPassword(event.target.value)} value={password} style={{ width: '80%', display: 'inline' }} />
                                            <span style={{ fontWeight: 'bold', color: 'red' }}>{passwordLoginERR}</span>

                                            <Button variant="secondary" onClick={ShowPassword} style={{ display: 'inline' }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" classNameName="bi bi-eye" viewBox="0 0 16 16">
                                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                                </svg>
                                            </Button><br></br>
                                            <br></br>
                                            <Button variant="success" onClick={handleAuthenticateLogin}>{type}</Button>
                                        </div>
                                }
                            </div>
                        </div>



                    </div>
                </div>

            </div>
        </>


    )

}

