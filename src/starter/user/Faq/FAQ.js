import React, { useContext, useState, useEffect } from 'react'
import UserContext from '../../../UserContext'
import Button from 'react-bootstrap/Button'
import db from '../../../db';
import Form from 'react-bootstrap/Form'
import FAQROW from './FAQROW'
import { useHistory } from "react-router-dom";

export default function FAQ() {
    const { user } = useContext(UserContext)

    const history = useHistory();
    const [faqs, setFaqs] = useState([])
    useEffect(() => (async () => setFaqs(await db.Faqs.findAll()))(), []
    )

    const [id, setId] = useState(0)
    const [username, setUserName] = useState(user.id)
    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")
    const [status, setStatus] = useState("")
    const [publish, setPublish] = useState("")

    const create = async () => {
        await db.Faqs.create(setFaqs, { id, username, question, answer, status: 'Sent', publish: 'Not Publish' })
        setId(0)
        setQuestion("")
        setAnswer("")
        setStatus("")
        setPublish("")
   
    }

    const remove = async (id) => {
        await db.Faqs.remove(setFaqs, id)
    }

    const edit = async (id) => {
        const faq = await db.Faqs.findOne(id)
        setId(faq.id)
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
        question !== "" && question.length <= 100 &&
        id > 0 &&
        await db.Faqs.findOne(id) !== undefined &&
        await db.Users.findOne(username) !== undefined
    ))(), [id, username, question])


    const [createValid, setCreateValid] = useState(false)
    useEffect(() => (async () => setCreateValid(
        question !== ""
    ))(), [question])

    // const [createValid, setCreateValid] = useState(false)
    // useEffect(() => (async () => setCreateValid(
    //     id > 0 && await db.Faqs.findByQuestionIgnoreCaseAndUsername(question,username) !== undefined

    // ))(), [id,question,username])

    //findByQuestionIgnoreCaseAndUsername ===0 

    

    return (


        <div className="col-sm-3" style={{ height: '600px', 'overflowY': 'scroll', border: '1px solid black', borderRadius: '10px' }} id="background">

            <div className="row">
                <div className="col-sm" style={{ backgroundColor: '#cacacaba', padding: '10px' }}>
                    <span style={{ float: 'left', marginTop: '10px' }}>{user.id}</span>
                    <span style={{ float: 'right' }}><img alt="" src={`${user.picture}?${new Date().getTime()}`} height="50" width="50" style={{ borderRadius: '50px' }} /></span>
                </div>

            </div>
            <br></br>

            {
                faqs.map(faq =>
                    <FAQROW key={faq.id} faq={faq} edit={edit} remove={remove} />
                )
            }

            <div className="row">
                <div className="col-sm">
                    <Form.Control as="textarea" rows={2} onChange={event => setQuestion(event.target.value)} placeholder="Question" value={question} />
                    {
                        question.length > 100 ? <span style={{ color: 'red', fontWeight: 'bold' }}> Max 100 char </span> : 'Max 100 char'
                    }
                    <Button variant="success" size="sm" style={{ margin: '5px' }} onClick={create} disabled={!createValid}>Send</Button>
                    <Button variant="secondary" size="sm" style={{ margin: '5px' }} onClick={update} disabled={!createUpdate}>Update</Button>

                </div>


            </div>
        </div>
    )
}
