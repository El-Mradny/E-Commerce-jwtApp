import React, { useEffect, useState } from 'react'
import db from '../../../db';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import {
    useParams
} from "react-router-dom";
import { Link } from "react-router-dom";

export default function ShippingAdminUser() {

    const { Userid: stringId } = useParams();
    const Userid = stringId
    console.log(Userid);

    const [id, setId] = useState("")
    const [status, setstatus] = useState("")
    const [userid, setuserid] = useState("")
    const [paymentid, setpaymentid] = useState("")
    const [shippingid, setshippingid] = useState("")
    const [checkoutdate, setcheckoutdate] = useState("")
    const [orderstatus, setOrderstatus] = useState("")
    const [total, settotal] = useState("")

    const [carts, setCarts] = useState([])
    useEffect(() => (async () => Userid && setCarts(await db.Carts.findAll()))(), [])
    console.log(carts);

    const edit = async id => {
        const cart = await db.Carts.findOne(id)
        setId(cart.id)
        setstatus(cart.status)
        setuserid(cart.userid)
        setpaymentid(cart.paymentid)
        setshippingid(cart.shippingid)
        setcheckoutdate(cart.checkoutdate)
        setOrderstatus(cart.orderstatus)
        settotal(cart.total)
    }

    const update = async () => {
        await db.Carts.update(setCarts, { id, status, userid, paymentid, shippingid, checkoutdate, orderstatus, total })
        setId(0)
        setstatus("")
        setuserid("")
        setpaymentid(0)
        setshippingid(0)
        setcheckoutdate(new Date())
        setOrderstatus("")
        settotal(0)
    }


    return (
        <div>
            <br></br>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Cart Id</th>
                        <th>Order status</th>
                        <th>Order Date</th>
                        <th>Products</th>

                       
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td><Form.Control as="select" size="sm" value={orderstatus} onChange={event => setOrderstatus(event.target.value)} placeholder="orderstatus" >
                            <option key={""} value={""} disabled>Select</option>
                            <option key={"Shipped"} value={"Shipped"}>Shipped</option>
                            <option key={"Processing"} value={"Processing"}>Processing</option>
                            <option key={"Delayed Due To Missed Contact"} value={"Delayed Due To Missed Contact"}>Delayed Due To Missed Contact</option>
                            <option key={"Delayed Due To Covid"} value={"Delayed Due To Covid"}>Delayed Due To Covid</option>
                        </Form.Control></td>
                        <td></td>
                        <td> <Button size="sm" variant="warning" onClick={update} >Update</Button></td>

                    </tr>
                    {
                        carts.map(cart =>
                            cart.userid === Userid && cart.status === "paid" && cart.orderstatus !== "Shipped" ?

                                <tr key={cart.id}>
                                    <td>{cart.id}</td>
                                    <td>{cart.orderstatus}</td>
                                    <td>{cart.checkoutdate.toDateString()}</td>
                                    <td><Button variant="secondary" size="sm" onClick={() => edit(cart.id)} >Edit </Button><br></br>
                                  
                                        <Button variant="secondary" size="sm" as={Link} to={`/ShippingAdminUserRow/${cart.id}`} >Product Details </Button>
                                    </td>
                                </tr> : null
                        )
                    }

                </tbody>
            </Table>
        </div>

    )
}


















