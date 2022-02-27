import React, { useEffect, useState } from 'react';
import db from '../../../db'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import { Link } from "react-router-dom";
import ContactAdminRow from './ContactAdminRow'

export default function ContactAdmin() {

    const [contacts, setContacts] = useState([])
    useEffect(() => (async () => setContacts(await db.Contacts.findAll()))(), []
    )
    //console.log(contacts);

    const [id, setId] = useState(0)
    const [username, setUserName] = useState("")
    const [problem, setProblem] = useState("")
    const [answer, setAnswer] = useState("")
    const [phonenumber, setPhonenumber] = useState("")
    const [email, setEmail] = useState("")

    const remove = async (id) => {
        await db.Contacts.remove(setContacts, id)
    }

    const edit = async (id) => {
        const faq = await db.Contacts.findOne(id)
        setId(id)
        setUserName(faq.username)
        setProblem(faq.problem)
        setAnswer(faq.answer)
        setPhonenumber(faq.phonenumber)
        setEmail(faq.email)
    }

    const update = async () => {
        await db.Contacts.update(setContacts, { id, username, problem, answer, phonenumber, email })
        setId(0)
        setProblem("")
        setAnswer("")
        setPhonenumber("")
        setEmail("")
    }

    const clear = async () => {
        setId(0)
        setProblem("")
        setUserName("")
        setAnswer("")
        setPhonenumber("")
        setEmail("")
    }

    const [createUpdate, setCreateUpdate] = useState(false)
    useEffect(() => (async () => setCreateUpdate(
        answer !== "" &&
        id > 0 &&
        await db.Contacts.findOne(id) !== undefined &&
        await db.Users.findOne(username) !== undefined
    ))(), [id, username, answer])

    return (
        <>
            <div>
                <br></br>
                <h1>Customers Prombles</h1>
                <Button variant="success" style={{ margin: '3px', float: 'right' }} as={Link} to={`/contactus`}>Create</Button>
                <br></br><br></br>
                <Table striped bordered hover responsive variant="success" size="sm" >
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Problem</th>
                            <th>Answer</th>
                            <th>Phonenumber</th>
                            <th>Email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <Form.Control size="sm" type="text" onChange={event => setUserName(event.target.value)} placeholder="userid" value={username} readOnly />
                            </td>
                            <td>
                                <Form.Control as="textarea" rows={2} type="textBox" onChange={event => setProblem(event.target.value)} placeholder="problem" value={problem} readOnly />
                            </td>

                            <td>
                                <Form.Control as="textarea" rows={2} type="textBox" onChange={event => setAnswer(event.target.value)} placeholder="answer" value={answer} />
                            </td>

                            <td>
                                <Form.Control size="sm" type="text" onChange={event => setPhonenumber(event.target.value)} placeholder="userid" value={phonenumber} readOnly />
                            </td>

                            <td>
                                <Form.Control size="sm" type="text" onChange={event => setEmail(event.target.value)} placeholder="userid" value={email} readOnly />
                            </td>



                            <td>
                            <Button variant="light" style={{ backgroundColor: "#4582ec", color: 'white' }} onClick={clear}>Clear</Button>
                                <Button variant="warning" onClick={update} disabled={!createUpdate}>Done</Button>
                            </td>
                        </tr>

                        {
                            contacts.map(contact =>
                                <ContactAdminRow key={contact.id} contact={contact} remove={remove} edit={edit} clear={clear}/>
                            )
                        }
                    </tbody>
                </Table>

            </div>

        </>
    )
}