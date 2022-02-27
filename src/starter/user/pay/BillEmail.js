import React, { useEffect, useState } from 'react';
import db from '../../../db';
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import {
    useParams
} from "react-router-dom";

export default function BillEmail() {

    const { oldCart: stringOldCart } = useParams();
    const oldCart = 1 * stringOldCart

    const [cartId, setcartId] = useState(0)
    const [cartIdERR, setcartIdERR] = useState("")


    const [jwtUser, setJwtUser] = useState(db.getJwtUser())

    const vild = async () => {
        const cartUser = cartId && await db.Carts.findByUseridAndId(jwtUser.username, cartId)
        console.log(cartUser && cartUser);
        if (cartUser.length > 0) {
            if (oldCart === cartId*1) {
                window.location = `http://localhost:3000/cartdetails/${cartId}`;
                //if its same as given
                console.log('okay');
            } else {
                setcartIdERR('not vaild code')
            }
        }
        else {
            setcartIdERR('not vaild code')
        }

    }

    return (

        <div>
            <div class="container">
                <div class="row">
                    <div class="col-sm-7" style={{ margin: 'auto' }}>
                        <br></br><br></br><br></br><br></br><br></br>
                        <Table striped bordered hover style={{ width: '50%', height: '200px', margin: 'auto' }}>
                            <thead><tr><th>Enter The Code That Was Given In The Email</th></tr></thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <Form.Control type="number" onChange={event => setcartId(event.target.value)} placeholder="code" value={cartId} />
                                        <span style={{ color: 'red', fontWeight: 'bold' }}> {cartIdERR}</span><br></br><br></br>
                                        <Button variant="primary" onClick={vild}>View Order</Button>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}