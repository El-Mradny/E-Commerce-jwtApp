import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import db from '../../../db';
import ContactReplyShort from './ContactReplyShort'
import Button from 'react-bootstrap/Button'

export default function ContactReply() {

    const [contacts, setContacts] = useState([])
    useEffect(() => (async () => setContacts(await db.Contacts.findAll()))(), []
    )
    //console.log(contacts);
    const history = useHistory()
    return (
        <>
            <br></br>
            <h2>Our Replys to your problem </h2>
            <br></br>
            {
                contacts.map(contact =>
                    
                    <ContactReplyShort contact={contact} key={contact.id} />
                )
            }

            <Button variant="primary" style={{ margin: '5px' }} onClick={() => history.goBack()}>Back</Button>

        </>
    )
}