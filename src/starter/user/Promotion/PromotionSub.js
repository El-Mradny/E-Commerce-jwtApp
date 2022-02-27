import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card';
import db from '../../../db';
import validator from 'validator'



export default function PromotionSub() {

    const [id, setId] = useState(0)
    const [email, setEmail] = useState("")

    const create = async () => {
        await db.Promotionemails.create(() => { }, { id, email })
        setId(0)
        setEmail("")
    }

    const [emailError, setEmailError] = useState('')

    const [emaill, setEmaill] = useState([])
    useEffect(() => (async () => setEmaill(await db.Promotionemails.findByEmail(email)))(), [email])
 

    const validateEmail = () => {
        if (validator.isEmail(email)) {
            setEmailError('')
        } else {
            setEmailError('Enter valid Email!')
        }
        
 
        if(validator.isEmail(email)){
            create()
        }

        // if (emaill.length ===0) {
        //     setEmailError('')
        // } else {
        //     setEmailError('The Email is orderly registered!')
        // }
    }

    return (
        <>  
            <Card style={{ textAlign: 'center', backgroundColor: '#dfdfdf', borderColor: '#dfdfdf' }}>
            <Card.Title>Subscription</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">________________________</Card.Subtitle>
            <Card.Body>
                <p>Be the first to know about deals by Subscripting.
                            Stay up to date with the latest marketing, sales, events, packages and blogs to make your day perfect.</p>

                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Email"
                        type="text" onChange={event => setEmail(event.target.value)} value={email}
                    />
                    <InputGroup.Append>
                    <Button variant="success" onClick={validateEmail}>Subscribe</Button>
                    </InputGroup.Append>
                </InputGroup>
                <span style={{ fontWeight: 'bold', color: 'red' }}>{emailError}</span>
            </Card.Body>
        </Card>

        </>
    )
}