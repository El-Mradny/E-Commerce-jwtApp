import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../../UserContext'
import db from '../../../db'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import FaqAdminRow from './faqAdminRow';
import { Link } from "react-router-dom";
export default function FaqAdmin() {

    const { user } = useContext(UserContext)
    //console.log(user)

    const [faqs, setFaqs] = useState([])
    useEffect(() => (async () => setFaqs(await db.Faqs.findAll()))(), []
    )
    //console.log(faqs);

    const [id, setId] = useState(0)
    const [username, setUserName] = useState(user.id)
    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")
    const [status, setStatus] = useState("")
    const [publish, setPublish] = useState("")
 

    //console.log(status);
    //console.log(publish);

    const remove = async (id) => {
        await db.Faqs.remove(setFaqs, id)
    }


    const edit = async (id) => {
        const faq = await db.Faqs.findOne(id)
        setId(id)
        setUserName(faq.username)
        setQuestion(faq.question)
        setAnswer(faq.answer)
        setStatus(faq.status)
        setPublish(faq.publish)
      
    }

    const update = async () => {
        await db.Faqs.update(setFaqs, { id, username, question, answer, status, publish })
        setId(0)
        setQuestion("")
        setAnswer("")
        setStatus("")
        setPublish("")
    
    }

    const [createUpdate, setCreateUpdate] = useState(false)
    useEffect(() => (async () => setCreateUpdate(
        answer !== "" && answer.length <= 300 &&
        id > 0 &&
        await db.Faqs.findOne(id) !== undefined &&
        await db.Users.findOne(username) !== undefined
    ))(), [id, username, answer])


    const clear = async () => {
        setId(0)
        setQuestion("")
        setAnswer("")
        setStatus("")
        setPublish("")
    }

    return (
        <div>
            <br></br>
            <h1>Customers Questions</h1>
            <Button variant="info" style={{ margin: '3px', float: 'right' }} as={Link} to={`/displayfaq`}>Published Questions</Button>
            <Button variant="success" style={{ margin: '3px', float: 'right' }} as={Link} to={`/faq`}>Create</Button>
            <br></br><br></br>
            <Table striped bordered hover responsive variant="success" size="sm" >
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Question</th>
                        <th>Replay</th>
                        <th>Stat</th>
                        <th>Publish</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                       <td></td>

                        <td>
                            <Form.Control as="textarea" rows={2} type="textBox" onChange={event => setQuestion(event.target.value)} placeholder="question" value={question} readOnly />
                        </td>

                        <td>
                            <Form.Control as="textarea" rows={2} type="textBox" onChange={event => setAnswer(event.target.value)} placeholder="answer" value={answer} />

                            {
                                answer.length > 300 ? <span style={{ color: 'red' }}> Maximum 300 characters </span> : 'Maximum 300 characters'
                            }

                            <span>
                                {answer.length > 1 ? answer.length + ' characters' : answer.length === 1 ? answer.length + ' character' : null}
                            </span>
                        </td>
                        <td>
                            <Form.Control as="select" size="sm" onChange={event => setStatus(event.target.value)} placeholder="status" value={status} >
                                <option key={""} value={""} disabled>status</option>
                                <option key={'Answered'} value={'Answered'} >Answered</option>
                                <option key={'Sent'} value={'Sent'}>Sent</option>
                            </Form.Control>
                        </td>

                        <td>
                            <Form.Control as="select" size="sm" onChange={event => setPublish(event.target.value)} placeholder="publish" value={publish} >
                                <option key={""} value={""} disabled>Select</option>
                                <option key={"Published"} value={"Published"}>Yes</option>
                                <option key={"Not Published"} value={"Not Published"}>No</option>
                                <option key={"Not Publish"} value={"Not Publish"} hidden>No</option>
                            </Form.Control>
                        </td>
                     
                        <td>
                            <Button variant="warning" onClick={update} disabled={!createUpdate}>Done</Button>
                            <Button variant="light" style={{ backgroundColor: "#4582ec", color: 'white' }} onClick={clear}>Clear</Button>

                        </td>
                    </tr>

                    {
                        faqs.map(faq =>
                            <FaqAdminRow key={faq.id} faq={faq} remove={remove} edit={edit} clear={clear}/>
                        )
                    }
                </tbody>
            </Table>

        </div>



    )
}

