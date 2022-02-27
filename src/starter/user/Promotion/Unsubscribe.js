import React, { useEffect, useState } from 'react';
import db from '../../../db'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


export default function Unsubscribe() {

    const [email, setEmail] = useState("")

    const [promotionemail, setPromotionemail] = useState([])
    useEffect(() => (async () => setPromotionemail(await db.Promotionemails.findAll()))(), [])


    const remove = async () => {
        email &&
        promotionemail.map(async elem => elem.email === email?
            await db.Promotionemails.remove(setPromotionemail, elem.id):null
        )
        setEmail("")
    }


    return (

        <div>
            <br></br>
            <Table striped bordered hover style={{ width: '50%', height: '200px', margin: 'auto' }}>
                <thead><tr><th>Email</th></tr></thead>
                <tbody>
                    <tr>
                        <td>
                            <Form.Control type="text" onChange={event => setEmail(event.target.value)} placeholder="email" value={email} />
                            <br></br>
                            <Button variant="danger" onClick={() => remove()} >Unsubscribe :( </Button>
                        </td>
                    </tr>


                </tbody>
            </Table>
        </div>
    )
}