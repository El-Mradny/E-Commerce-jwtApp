import React, { useContext, useState, useEffect } from 'react'
import UserContext from '../../../UserContext'
import Button from 'react-bootstrap/Button'
import db from '../../../db';
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import validator from 'validator'
import { Link } from "react-router-dom";
import Col from 'react-bootstrap/Col'
import Toast from 'react-bootstrap/Toast'
import Row from 'react-bootstrap/Row'
import {useHistory} from "react-router-dom";

export default function ContactUs() {
    const { user } = useContext(UserContext)

    const history = useHistory();

    const [contacts, setContacts] = useState([])
    useEffect(() => (async () => setContacts(await db.Contacts.findAll()))(), []
    )

    //console.log(contacts);

    const [id, setId] = useState(0)
    const [username, setUserName] = useState(user.id)
    const [problem, setProblem] = useState("")
    const [answer, setAnswer] = useState("")
    const [phonenumber, setPhonenumber] = useState("")
    const [email, setEmail] = useState("")

    const create = async () => {
        await db.Contacts.create(setContacts, { id, username:user.id, problem, answer, phonenumber, email })
        setId(0)
        setProblem("")
        setAnswer("")
        setPhonenumber("")
        setEmail("")
    }

    const [emailError, setEmailError] = useState('')
    const [phoneError, setPhoneError] = useState('')
    const [problemError, setProblemError] = useState('')
    const [show, setShow] = useState(false);

    const vaild = () => {
        if (validator.isEmail(email)) {
            setEmailError("")
        } else {
            setEmailError('Enter a Valid Email')
        }

        if (phonenumber.length === 8) {
            setPhoneError('')
        } else {
            setPhoneError('Enter a Phone number of 8 numbers')
        }
        if (problem.length !== 0) {
            setProblemError('')
        } else {
            setProblemError('There is No Message')
        }

        if (validator.isEmail(email) && phonenumber.length === 8 && problem.length !== 0) {
            create();
            setShow(true);
        }
    }

    return (
        <>
            <br></br><br></br>
            <Row>
                <Col xs={6} style={{zIndex: '8',position: 'absolute', top:'8%', marginLeft:'20px'}}>
                    <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide style={{ backgroundColor: '#38b44aad' }}>
                        <Toast.Header>
                            <img
                                src="holder.js/20x20?text=%20"
                                className="rounded mr-2"
                                alt=""
                            />
                            <strong className="mr-auto">Message</strong>
                            <small>just now</small>
                        </Toast.Header>
                        <Toast.Body>Your Message Is Sent Successfully</Toast.Body>
                    </Toast>
                </Col>
            </Row>
            <div style={{ backgroundColor: '#bababa6e', padding: '5px' }}>

                <div className="container" style={{ textAlign: 'center' }}>
                    <br></br>
                    <h1>Leave Us A Message</h1>
                    <p style={{ fontSize: '18px' }}>Faceing a problem? Reach out to us and we will get back to you as soon as possible to resolve all of your concerns.</p>
                    <br></br>

                    <div className="row">
                        <div className="col-sm" style={{ marginBottom: '20px' }}>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    placeholder="Email"
                                    aria-label="Email"
                                    aria-describedby="basic-addon1"
                                    onChange={event => setEmail(event.target.value)} placeholder="Email" value={email}
                                />
                            </InputGroup>
                            <span style={{ fontWeight: 'bold', color: 'red' }}>{emailError}</span>
                        </div>
                        <div className="col-sm" style={{ marginBottom: '20px' }}>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone" viewBox="0 0 16 16" style={{ marginRight: '5px' }}>
                                        <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                                    </svg>+974</InputGroup.Text>
                                </InputGroup.Prepend>

                                <FormControl
                                    placeholder="Phone Number"
                                    aria-label="phone"
                                    aria-describedby="basic-addon1"
                                    onChange={event => setPhonenumber(event.target.value)} placeholder="Phone Number" value={phonenumber}
                                />
                            </InputGroup>
                            <span style={{ fontWeight: 'bold', color: 'red' }}>{phoneError}</span>
                        </div>
                    </div>
                    <div className="row" >
                        <Form.Control as="textarea" rows={4} placeholder="Message" style={{ borderColor: '#e9ecef' }} onChange={event => setProblem(event.target.value)} value={problem} />
                        <span style={{ fontWeight: 'bold', color: 'red', textAlign: 'center' }}>{problemError}</span>
                    </div>
                    <br></br>
                    <Button variant="warning" style={{margin:'10px'}} onClick={vaild}>Submit</Button>
                    <Button variant="info" style={{margin:'10px'}} as={Link} to={`/contactreply`}>To View Your Reply Click</Button>
                    <Button variant="primary" style={{margin:'10px'}} onClick={() => history.goBack()}>Back</Button>
                    

                </div>
                
                <br></br>
            </div>




        </>
    )
}