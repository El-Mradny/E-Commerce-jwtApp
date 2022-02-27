import React, { useEffect, useState } from 'react'
import db from '../../../db';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import {
    useParams
} from "react-router-dom";
import { Link } from "react-router-dom";
import CartOrderItems from "../Cart/CartOrderItems";
import { useHistory } from "react-router-dom";
export default function ShippingAdminUserRow() {
    //cart id
    const { id: stringId } = useParams();
    const id = stringId * 1
    console.log(id);
    const history = useHistory();
    const [cartItems, setCartItems] = useState([])
    useEffect(() => (async () => id && setCartItems(await db.Cartitems.findByCartid(id)))(), [id])
    console.log(cartItems && cartItems);

    return (
        <>
            <h1>Products</h1>

            <Table hover responsive variant="Light" size="sm" >
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Product Image</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cartItems.map(cartitem =>
                            <CartOrderItems cartitem={cartitem} />
                        )
                    }
                </tbody>
            </Table>
            <Button variant="primary" size='lg' onClick={() => history.goBack()}>Back</Button>
        </>

    )
}


















