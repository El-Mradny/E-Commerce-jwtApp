import React, { useEffect, useState } from 'react';
import db from '../../../db'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import DiscountAdminRow from './DiscountAdminRow'
import { Link } from "react-router-dom";

export default function DiscountAdmin() {
    

    const [discounts, setDiscounts] = useState([])

    const [id, setId] = useState(0)
    const [discountvalue, setDiscountvalue] = useState(0)
    const [startdate, setStartdate] = useState(new Date())
    const [enddate, setEnddate] = useState(new Date())
    const [publish, setPublish] = useState("")
    const [description, setDescription] = useState("")
    const [discountcode, setDiscountCode] = useState("")
    useEffect(() => (async () => setDiscounts(await db.Discounts.findAll()))(), [])

    const create = async () => {
        await db.Discounts.create(setDiscounts, { id, discountvalue, startdate, enddate, publish, description, discountcode })
        setId(0)
        setDiscountvalue(0)
        setStartdate(new Date())
        setEnddate(new Date())
        setPublish("")
        setDescription("")
        setDiscountCode("")
    }

    const remove = async (id) => {
        await db.Discounts.remove(setDiscounts, id)
    }

    const edit = async (id) => {
        const discode = await db.Discounts.findOne(id)
        setId(id)
        setDiscountvalue(discode.discountvalue)
        setStartdate(discode.startdate)
        setEnddate(discode.enddate)
        setPublish(discode.publish)
        setDescription(discode.description)
        setDiscountCode(discode.discountcode)
    }

    const update = async () => {
        await db.Discounts.update(setDiscounts, { id, discountvalue, startdate, enddate, publish, description, discountcode })
        setId(0)
        setDiscountvalue(0)
        setStartdate(new Date())
        setEnddate(new Date())
        setPublish("")
        setDescription("")
        setDiscountCode("")
    }


    const [validUpdate, setValidUpdate] = useState(false)
    useEffect(() => (async () => setValidUpdate(
        id > 0 && discountvalue > 0 && discountvalue < 100 &&
        (startdate > new Date() || +startdate + new Date()) && enddate > startdate &&
        id && await db.Discounts.findOne(id) !== undefined &&
        description !== "" && publish !== "" && discountcode !== ""
    ))(), [id, discountvalue, startdate, enddate, description, publish, discountcode])


    const [createValid, setCreateValid] = useState(false)
    useEffect(() => (async () => setCreateValid(
        discountvalue > 0 && discountvalue < 100 &&
        (startdate > new Date() || +startdate + new Date()) && enddate > startdate
        && description !== "" && publish !== "" && discountcode !== ""
        // &&id && await db.Discounts.findOne(id) === undefined

    ))(), [startdate, enddate, discountvalue, description, publish, discountcode])

    const clear = async () => {
        setId(0)
        setDiscountvalue(0)
        setStartdate(new Date())
        setEnddate(new Date())
        setPublish("")
        setDescription("")
        setDiscountCode("")
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
            <h1>Discountcode</h1>
            <Button variant="info" style={{ margin: '3px', float: 'right' }} as={Link} to={`/displaydiscount`}>Published Discount</Button>
            <br></br><br></br>

            <Table striped bordered hover responsive variant="success" size="sm">
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Discount value</th>
                        <th>Start date</th>
                        <th>End date</th>
                        <th>Days left to expire</th>
                        <th>states</th>
                        <th>Publish</th>
                        <th>Code use Description</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <Form.Control type="text" onChange={event => setDiscountCode(event.target.value)} placeholder="discountcode" value={discountcode} />
                        </td>
                        <td>
                            <Form.Control type="text" onChange={event => setDiscountvalue(1 * event.target.value)} placeholder="discountvalue" value={discountvalue} />
                        </td>
                        <td>
                            <Form.Control type="date" onChange={event => setStartdate(new Date(event.target.value))} placeholder="start date" value={startdate.toISOString().split("T")[0]} />
                        </td>
                        <td>
                            <Form.Control type="date" onChange={event => setEnddate(new Date(event.target.value))} placeholder="End date" value={enddate.toISOString().split("T")[0]} />
                        </td>

                        <td></td>
                        <td></td>
                        <td>
                            <Form.Control as="select" size="sm" value={publish} onChange={event => setPublish(event.target.value)} placeholder="publish" >
                                <option key={""} value={""} disabled>Select</option>
                                <option key={"Published"} value={"Published"}>Yes</option>
                                <option key={"Not Published"} value={"Not Published"}>No</option>
                                <option key={"Not Publish"} value={"Not Publish"} hidden>No</option>
                            </Form.Control>
                        </td>

                        <td>
                            <Form.Control as="textarea" rows={3} size="sm" onChange={event => setDescription(event.target.value)} placeholder="description" value={description} />
                        </td>

                        <td>
                            <Button variant="warning" onClick={update} disabled={!validUpdate}>Update</Button>
                            <Button variant="success" onClick={create} disabled={!createValid}>Create</Button>
                            <Button variant="light" style={{ backgroundColor: "#4582ec", color: 'white' }} onClick={clear}>Clear</Button>
                        </td>

                    </tr>
                    {
                        discounts.map(discode => <DiscountAdminRow discode={discode} key={discode.id} edit={edit} remove={remove}
                            dotGreen={dotGreen} dotRed={dotRed} dotGray={dotGray} />

                        )
                    }

                </tbody>
            </Table>
            <div>
                <span style={dotGreen}></span> available <br></br>
                <span style={dotRed}></span> ended <br></br>
                <span style={dotGray}></span> still didnt start
      </div>
        </div>
    )
}