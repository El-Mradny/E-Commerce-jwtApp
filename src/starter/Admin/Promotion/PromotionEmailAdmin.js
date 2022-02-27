import React, { useEffect, useState } from 'react';
import db from '../../../db';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import validator from 'validator';
import Col from 'react-bootstrap/Col'
import Toast from 'react-bootstrap/Toast'
import Row from 'react-bootstrap/Row'
export default function PromotionEmailAdmin() {

  const [promotionemails, setPromotionEmails] = useState([])
  useEffect(() => (async () => setPromotionEmails(await db.Promotionemails.findAll()))(), [])
  //console.log(promotionemails)

  const [id, setId] = useState(0)
  const [email, setEmail] = useState("")

  const create = async () => {
    await db.Promotionemails.create(setPromotionEmails, { id, email })
    setId(0)
    setEmail("")
  }

  const remove = async id => {
    await db.Promotionemails.remove(setPromotionEmails, id)
  }

  const edit = async id => {
    const promotion = await db.Promotionemails.findOne(id)
    setId(promotion.id)
    setEmail(promotion.email)

  }

  const update = async () => {
    await db.Promotionemails.update(setPromotionEmails, { id, email })
    setId(0)
    setEmail("")
  }

  const clear = async () => {
    setId(0)
    setEmail("")
  }


  const [emailError, setEmailError] = useState('')

  const validateEmail = () => {
    if (validator.isEmail(email)) {
      setEmailError('')
    } else {
      setEmailError('Enter valid Email!')
    }

    if (validator.isEmail(email) && email !== "") {
      create()
    }
  }

  const [emailErrorUpdate, setEmailErrorUpdate] = useState('')
  const [show, setShow] = useState(false);

  const validateEmailUpdate = () => {
    if (validator.isEmail(email)) {
      setEmailErrorUpdate('')
    } else {
      setEmailErrorUpdate('Enter valid Email!')
    }

    if (validator.isEmail(email) && email !== "") {
      update()
    }
  }

  const handleEmail = async () => {
    promotionemails.map(async publicEmail => {
      await db.email(
        publicEmail.email,
        `Attention Subscriber!!!`,
        `
      <h1> Green World</h1>
      <h2>Dear Subscriber,</h2>
      <p>Thank you for subscribing, we have some packages within minmi cost available and sale on plants
      hurry up and check our website before its to late. </p> <br>
      <a href="http://localhost:3000/displaypackageinfo">Winthin minmi cost packages</a><br>
      <a href="http://localhost:3000/displaysales">Sale Products</a><br>
      It will be greate if you register If you havent <br><a href="http://localhost:3000/register/">Register</a>
      <p>Our goal is to Provided all kind of plants to make your home more beautiful.<br>
      for Unsubscribeing :(<br>
      <a href="http://localhost:3000/unsubscribe">Unsubscribe</a></p>
      `
      )
    })
    setShow(true);
  }

  return (
    <>
      <br></br>
      <Row>
        <Col xs={6} style={{ zIndex: '8', position: 'absolute', top: '8%' }}>
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
            <Toast.Body>To All The Emails Is Sent Successfully</Toast.Body>
          </Toast>
        </Col>
      </Row>

      <h1>Promotion Eamil for Subscribers</h1>
      <h2>Sale and packages Email:</h2>

      <p> Green World <br></br>Dear Subscriber,<br></br>Thank you for subscribing, we have some packages within minmi cost available and sale on plants
                 hurry up and check our website before its to late. <br></br>
        <a href="http://localhost:3000/displaypackageinfo">Winthin minmi cost packages</a><br></br>
        <a href="http://localhost:3000/displaysales">Sale Products</a><br></br>
                    It will be greate if you register If you havent<br></br>
        <a href="http://localhost:3000/register">Register</a>
        <br></br>
                Our goal is to Provided all kind of plants to make your home more beautiful.
                <br></br>for Unsubscribeing :(<br></br>
        <a href="http://localhost:3000/unsubscribe">Unsubscribe</a>
      </p>

      <Button variant="info" onClick={() => handleEmail()}>
        Sent All <br></br>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
          <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383l-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z" />
        </svg>
      </Button>
      <br></br><br></br>
      <Table striped bordered hover responsive variant="success" size="sm">
        <thead>
          <tr>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Form.Control
                placeholder="Email"
                type="text" onChange={event => setEmail(event.target.value)} value={email}
              />
              <span style={{ fontWeight: 'bold', color: 'red' }}>{emailError}</span>
              <span style={{ fontWeight: 'bold', color: 'red' }}>{emailErrorUpdate}</span>
            </td>

            <td>
              <Button variant="warning" onClick={validateEmailUpdate}>Update</Button>
              <Button variant="success" onClick={validateEmail} >Create</Button>
              <Button variant="light" style={{ backgroundColor: "#4582ec", color: 'white' }} onClick={clear}>Clear</Button>
            </td>
          </tr>
          {
            promotionemails.map(personEmail =>
              <tr key={personEmail.id}>
                <td>{personEmail.email}</td>
                <td>
            
                  <Button variant="secondary" onClick={() => edit(personEmail.id)}>Edit</Button>
                  <Button variant="danger" onClick={() => remove(personEmail.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                      <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                    </svg>
                  </Button>
                </td>
              </tr>
            )
          }
        </tbody>
      </Table>
    </>
  )
}