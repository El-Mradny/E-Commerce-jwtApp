import React, { useEffect, useState } from 'react';
import db from '../../../db';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import { Link } from "react-router-dom";
import PackagesAdminRow from './PackagesAdminRow'

export default function PackagesAdmin() {

    const [packages, setPackages] = useState([])
    const [id, setId] = useState(0)
    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [qty, setQty] = useState(0)
    const [startdate, setStartDate] = useState(new Date())
    const [enddate, setEndDate] = useState(new Date())
    const [publish, setPublish] = useState("")

    useEffect(() => (async () => setPackages(await db.Packages.findAll()))(), [])

    const create = async () => {
        await db.Packages.create(setPackages, { id, name, price, startdate, enddate, publish, qty })
        setId(0)
        setName("")
        setPrice(0)
        setStartDate(new Date())
        setEndDate(new Date())
        setPublish("")
        setQty(0)
    }

    


    const remove = async id => await db.Packages.remove(setPackages, id)

    const edit = async id => {
        const p = await db.Packages.findOne(id)
        setId(p.id)
        setName(p.name)
        setPrice(p.price)
        setStartDate(p.startdate)
        setEndDate(p.enddate)
        setPublish(p.publish)
        setQty(p.qty)
    }

    const update = async () => {
        await db.Packages.update(setPackages, { id, name, price, startdate, enddate, publish, qty })
        setId(0)
        setName("")
        setPrice(0)
        setStartDate(new Date())
        setEndDate(new Date())
        setPublish("")
        setQty(0)
    }

    const [namee, setNamee] = useState([])
    useEffect(() => (async () => setNamee(await db.Packages.findByName(name)))(), [name])
 

    const [createValid, setCreateValid] = useState(false)
    useEffect(() => (async () => setCreateValid(
       price > 0 && qty > 0 && qty <=5 
        && (+startdate + new Date() || startdate > new Date()) && enddate > startdate && publish !== "" && namee.length===0
    ))(), [namee,name, startdate, enddate, price, publish, qty])


    const [validUpdate, setValidUpdate] = useState(false)
    useEffect(() => (async () => setValidUpdate(
      id > 0 && (startdate > new Date() || +startdate + new Date()) && enddate > startdate &&
      id && await db.Packages.findOne(id) !== undefined && 
      price > 0 &&  qty > 0 && name !== "" && publish !== ""
    ))(), [id, startdate, enddate, price, name,qty,publish])

    const clear = async () => {
        setId(0)
        setName("")
        setPrice(0)
        setQty(0)
        setStartDate(new Date())
        setEndDate(new Date())
        setPublish("")
    }

    const dotRed = {
        height: '20px',
        width: '20px',
        backgroundColor: 'red',
        borderRadius: '50%',
        display: 'inline-block'
    }

    const dotGreen = {
        height: '20px',
        width: '20px',
        backgroundColor: 'green',
        borderRadius: '50%',
        display: 'inline-block'
    }


    const dotGray = {
        height: '20px',
        width: '20px',
        backgroundColor: 'gray',
        borderRadius: '50%',
        display: 'inline-block'
    }

    return (
        <div>
            <br></br>
            <h1>Packages</h1>
            <Button variant="info" style={{ margin: '3px', float: 'right' }} as={Link} to={`/displaypackageinfo`}>Published Packages</Button>
            <br></br><br></br>
            <Table striped bordered hover responsive variant="success" size="sm">
                <thead>
                    <tr>
                        <th>Package Name</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Start date</th>
                        <th>End date</th>
                        <th>Publish</th>
                        <th>Days left to expire</th>
                        <th>Package period</th>
                        <th>Status</th>
                        <th>Package Details</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr >
                        <td>
                            <Form.Control type="text" size="sm" onChange={event => setName(event.target.value)} placeholder="name" value={name} />
                        </td>
                        <td>
                            <Form.Control type="number" size="sm" onChange={event => setPrice(1 * event.target.value)} placeholder="price" value={price} />
                        </td>
                        <td>
                            <Form.Control type="number" size="sm" onChange={event => setQty(1 * event.target.value)} placeholder="qty" value={qty} />
                        </td>

                        <td>
                            <Form.Control type="date" size="sm" onChange={event => setStartDate(new Date(event.target.value))} placeholder="startdate" value={startdate.toISOString().slice(0, 10)} />
                        </td>
                        <td>
                            <Form.Control type="date" size="sm" onChange={event => setEndDate(new Date(event.target.value))} placeholder="enddate" value={enddate.toISOString().slice(0, 10)} />
                        </td>
                        <td>
                            <Form.Control as="select" size="sm" value={publish} onChange={event => setPublish(event.target.value)} placeholder="publish" >
                                <option key={""} value={""} disabled>Select</option>
                                <option key={"Published"} value={"Published"}>Yes</option>
                                <option key={"Not Published"} value={"Not Published"}>No</option>
                            </Form.Control>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
    
                            <Button variant="success" onClick={create} disabled={!createValid}>Create</Button>
                            <Button variant="warning" onClick={update} disabled={!validUpdate}>Update</Button>
                            <Button variant="light" style={{ backgroundColor: "#4582ec", color: 'white' }} onClick={clear}>Clear</Button>
                        </td>
                    </tr>

                    {
                        packages.map(pack =>
                            <PackagesAdminRow key={pack.id} pack={pack} edit={edit} remove={remove} dotRed={dotRed} dotGreen={dotGreen} dotGray={dotGray} />
                        )
                    }

                </tbody>
            </Table>
            <div>
                <span style={dotGreen}></span> Available <br></br>
                <span style={dotRed}></span> Ended <br></br>
                <span style={dotGray}></span> Still didnt start <br></br>
                <span>You cant delect a package if it has products in it</span>
            </div>
        </div>
    )
}