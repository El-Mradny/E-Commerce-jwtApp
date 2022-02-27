import React, { useEffect, useState } from 'react';
import db from '../../../db';
import Card from 'react-bootstrap/Card'

export default function DisplayFaq() {

    const [faqs, setFaqs] = useState([])
    useEffect(() => (async () => setFaqs(await db.Faqs.findAll()))(), [])
    //console.log(faqs);
    return (
        <div>
            <br></br>
            <h1>Most Asked Qustions</h1>

            {
                faqs.map(person => person.publish === "Published" ? (
                    <Card key={person.id} style={{margin:'20px', backgroundColor:'#52ab52'}}>
                        <Card.Body style={{color:'white'}}>
                            <Card.Title className="mb-2">{person.question}</Card.Title> <br></br>
                            <Card.Subtitle className="mb-2">{person.answer}</Card.Subtitle>
                        </Card.Body>
                    </Card>
                     
                ) : null
                )

            }

        </div>
    )
}