import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import db from '../../../db';
import Table from 'react-bootstrap/Table'
import validator from 'validator'
import ShippingAdminRow from "./ShippingAdminRow";
export default function ShippingAdmin() {

  

    const [id, setId] = useState(0)
    const [userid, setUserid] = useState("")
    const [status, setStatus] = useState("")
    const [country, setCountry] = useState("")
    const [city, setCity] = useState("")
    const [pobox, setPobox] = useState(0)
    const [address, setAddress] = useState("")
    const [streetnum, setStreetnum] = useState(0)
    const [email, setEmail] = useState("")
    const [phonenumber, setPhonenumber] = useState(0)
    const [shippingmethod, setShippingmethod] = useState("")
    const [longitude, setLongitude] = useState("")
    const [latitude, setLatitude] = useState("")

    const [shippings, setShipping] = useState([])
    useEffect(() => (async () => setShipping(await db.Shippings.findAll()))(), [])


    const create = async () => {
        await db.Shippings.create(setShipping, { id, userid, status, country, city, pobox, address, streetnum, email, phonenumber, shippingmethod, longitude, latitude })
        setId(0)
        setUserid("")
        setStatus("")
        setCity("")
        setPobox(0)
        setAddress("")
        setStreetnum(0)
        setEmail("")
        setPhonenumber(0)
        setShippingmethod("")
        setLongitude("")
        setLatitude("")
    }


    const edit = async id => {
        const ship = await db.Shippings.findOne(id)
        setId(id)
        setUserid(ship.userid)
        setStatus(ship.status)
        setCountry(ship.country)
        setCity(ship.city)
        setPobox(ship.pobox)
        setAddress(ship.address)
        setStreetnum(ship.streetnum)
        setEmail(ship.email)
        setPhonenumber(ship.phonenumber)
        setShippingmethod(ship.shippingmethod)
        setLongitude(ship.longitude)
        setLatitude(ship.latitude)

    }


    const update = async () => {
        await db.Shippings.update(setShipping, { id, userid, status, country, city, pobox, address, streetnum, email, phonenumber, shippingmethod, longitude, latitude })
        setId(0)
        setUserid("")
        setStatus("")
        setCity("")
        setPobox(0)
        setAddress("")
        setStreetnum(0)
        setEmail("")
        setPhonenumber(0)
        setShippingmethod("")
        setLongitude("")
        setLatitude("")

    }

    const remove = async (id) => {
        await db.Shippings.remove(setShipping, id)
    }

    const [createValid, setCreateValid] = useState(false)
    useEffect(() => (async () => setCreateValid(

        city !== "" && pobox.length === 4 && address !== "" && streetnum > 0 && validator.isEmail(email) && phonenumber.length === 8
        && shippingmethod !== ""

    ))(), [city, pobox, address, streetnum, email, phonenumber, shippingmethod])


    const [validUpdate, setValidUpdate] = useState(false)
    useEffect(() => (async () => setValidUpdate(

        city !== "" && pobox.length === 4 && address !== "" && streetnum > 0 && validator.isEmail(email) && phonenumber.length === 8
        && shippingmethod !== ""

    ))(), [city, pobox, address, streetnum, email, phonenumber, shippingmethod])

    const clear = async () => {
        setId(0)
        setUserid("")
        setStatus("")
        setCity("")
        setPobox(0)
        setAddress("")
        setStreetnum(0)
        setEmail("")
        setPhonenumber(0)
        setShippingmethod("")
        setLongitude("")
        setLatitude("")
    }

    return (
        <>
            <br></br>
            <h1>Shipping</h1>
            
            <Button variant="info" style={{ margin: '3px', float: 'right' }} as={Link} to={`/loctioncustomer`}>Locations</Button>
      <br></br><br></br>
            <Table striped bordered hover responsive variant="success" size="sm">
                <thead>
                    <tr><th>userid</th>
                        <th>country</th>
                        <th>city</th>

                        <th>address</th>
                        <th>pobox</th>
                        <th>streetnum</th>
                        <th>email</th>
                        <th>shippingmethod</th>
                        <th>phonenumber</th>

                        <th>longitude</th>
                        <th>latitude</th>
                        <th>Orders</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <Form.Control type="text" size="sm" onChange={event => setUserid(event.target.value)} placeholder="userid" value={userid} />
                        </td>
                        <td>
                            <Form.Control type="text" size="sm" onChange={event => setCountry(event.target.value)} placeholder="country" value={country} />
                        </td>

                        <td>
                            <Form.Control type="text" size="sm" onChange={event => setCity(event.target.value)} placeholder="city" value={city} />
                        </td>
                        <td>
                            <Form.Control type="text" size="sm" onChange={event => setAddress(event.target.value)} placeholder="address" value={address} />

                        </td>
                        <td>
                            <Form.Control type="number" size="sm" onChange={event => setPobox(event.target.value)} placeholder="pobox" value={pobox} />
                        </td>
                        <td>
                            <Form.Control type="number" size="sm" onChange={event => setStreetnum(event.target.value)} placeholder="street number" value={streetnum} />

                        </td>
                        <td>
                            <Form.Control type="text" size="sm" onChange={event => setEmail(event.target.value)} placeholder="email" value={email} />
                        </td>
                        <td>
                            <Form.Control as="select" size="sm" onChange={event => setShippingmethod(event.target.value)} placeholder="shipping method" value={shippingmethod} >
                                <option key={""} value={""} disabled>-Select-</option>
                                <option key={"Express Shipping"} value={"Express Shipping"}>Express Shipping</option>
                                <option key={"Standard Shipping"} value={"Standard Shipping"}>Standard Shipping</option>
                            </Form.Control>
                        </td>
                        <td>
                            <Form.Control type="number" size="sm" onChange={event => setPhonenumber(event.target.value)} placeholder="phone number" value={phonenumber} />
                        </td>

                        <td>
                            <Form.Control type="number" size="sm" onChange={event => setLongitude(event.target.value)} placeholder="longitude" value={longitude} />
                        </td>

                        <td>
                            <Form.Control type="number" size="sm" onChange={event => setLatitude(event.target.value)} placeholder="latitude" value={latitude} />
                        </td>
                        <td></td>

                        <td>
                            <Button variant="success" onClick={create} disabled={!createValid}>Create</Button>
                            <Button variant="warning" onClick={update} disabled={!validUpdate}>Update</Button>
                            <Button variant="light" style={{ backgroundColor: "#4582ec", color: 'white' }} onClick={clear}>Clear</Button>
                        </td>
                    </tr>
                    {
                        shippings.map(ship =>
                            <ShippingAdminRow key={ship.id} ship={ship} edit={edit} remove={remove}/>


                          
                        )
                    }
                </tbody>
            </Table>













        </>
    )
}