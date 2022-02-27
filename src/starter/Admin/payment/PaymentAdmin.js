import React, { useEffect, useState } from 'react';
import db from '../../../db';
import Button from 'react-bootstrap/Button';
import { useHistory } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import PaymentAdminRow from "./PaymentAdminRow";

export default function PaymentAdmin() {

  

    const [payments, setPayments] = useState([])
    useEffect(() => (async () => setPayments(await db.Payments.findAll()))(), [])



    const remove = async id => await db.Payments.remove(setPayments, id)

    return (
        <>
            <br></br>
            <h1>Payments History</h1>
            <br></br>
            <Table striped bordered hover responsive variant="success" size="sm">
                <thead>
                    <tr>
                        <th>method</th>
                        <th>cardnumber</th>
                        <th>cardholdername</th>
                        <th>cvccode</th>
                        <th>expirydate</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {/* <tr >
                        <td>
                             <Form.Control type="text" size="sm" onChange={event => setName(event.target.value)} placeholder="name" value={name} /> 
                        </td>
                        <td>
                            <Form.Control type="text" placeholder="Card number" onChange={event => setCardnumber(event.target.value)} value={cardnumber} />
                        </td>
                        <td>
                            <Form.Control type="text" placeholder="Card Holder Name" style={{ color: 'black' }} onChange={event => setCardholdername(event.target.value)} value={cardholdername} />
                        </td>

                        <td>
                            <Form.Control type="date" onChange={event => setExpirydate(new Date(event.target.value))} placeholder="date" value={expirydate.toISOString().slice(0, 10)} />
                        </td>
                        <td>
                            <Form.Control type="number" placeholder="CVC" style={{ width: '80px', marginTop: '8px' }} onChange={event => setCvccode(event.target.value)} value={cvccode} />
                        </td>
                    </tr> */}

                    {
                        payments.map(pay =>
                            <PaymentAdminRow key={pay.id}  pay={pay} remove={remove}/>
                        )
                    }

                </tbody>
            </Table>








        </>
    )
}


