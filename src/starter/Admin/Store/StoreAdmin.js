import React, { useEffect, useState } from 'react';
import db from '../../../db';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import StoreAdminRow from './StoreAdminRow'


export default function StoreAdmin() {

    const [stores, setStores] = useState([])
    useEffect(() => (async () => setStores(await db.Stores.findAll()))(), [])
    console.log(stores)

    const [products, setProducts] = useState([])
    useEffect(() => (async () => setProducts(await db.Products.findAll()))(), [])

    const [users, setUsers] = useState([])
    useEffect(() => (async () => setUsers(await db.Users.findAll()))(), [])

    const [id, setId] = useState(0)
    const [supplierid, setSupplierid] = useState(0)
    const [userid, setUserId] = useState("")
    const [productid, setProductId] = useState(0)
    const [productrealprice, setProductrealprice] = useState(0)
    const [totalpricepaid, setTotalPricepaId] = useState("")
    const [totalprice, setTotalPrice] = useState("")
    const [paymentdate, setPaymentDate] = useState(new Date())
    const [note, setNote] = useState("")
    const [availableqty, setAvailableQty] = useState(0)

    const create = async () => {
        await db.Stores.create(setStores, { id, supplierid, userid, productid, productrealprice, totalpricepaid, totalprice, paymentdate, note, availableqty })
        setId(0)
        setSupplierid(0)
        setUserId("")
        setProductId(0)
        setProductrealprice(0)
        setTotalPricepaId("")
        setTotalPrice("")
        setPaymentDate(new Date())
        setNote("")
        setAvailableQty(0)
    }

    const remove = async id => {
        await db.Stores.remove(setStores, id)
    }

    const edit = async id => {
        const stor = await db.Stores.findOne(id)
        setId(stor.id)
        setSupplierid(stor.supplierid)
        setUserId(stor.userid)
        setProductId(stor.productid)
        setProductrealprice(stor.productrealprice)
        setTotalPricepaId(stor.totalpricepaid)
        setTotalPrice(stor.totalprice)
        setPaymentDate(stor.paymentdate)
        setNote(stor.note)
        setAvailableQty(stor.availableqty)

    }

    const update = async () => {
        await db.Stores.update(setStores, { id, supplierid, userid, productid, productrealprice, totalpricepaid, totalprice, paymentdate, note, availableqty })
        setId(0)
        setSupplierid(0)
        setUserId("")
        setProductId(0)
        setProductrealprice(0)
        setTotalPricepaId("")
        setTotalPrice("")
        setPaymentDate(new Date())
        setNote("")
        setAvailableQty(0)
    }

    const clear = async () => {
        setId(0)
        setSupplierid(0)
        setUserId("")
        setProductId(0)
        setProductrealprice(0)
        setTotalPricepaId("")
        setTotalPrice("")
        setPaymentDate(new Date())
        setNote("")
        setAvailableQty(0)
    }





    return (
        <>
            <br></br><br></br>
            <Table striped bordered hover responsive variant="success" size="sm">
                <thead>
                    {/* supplierid, userid, productid, productrealprice, totalpricepaid, totalprice, paymentdate, note, availableqty */}
                    <tr>
                        <th>Supplier</th>
                        <th>productid</th>
                        <th>Product Price</th>
                        {/* <th>totalprice</th> */}
                        <th>availableqty</th>
                        <th>total</th>
                        <th>note</th>
                        {/* <th>paymentdate</th>
                        <th>totalpricepaid</th> */}
                        <th></th>
                        <th></th>
                   
                    </tr>
                </thead>
                <tbody>
                    {/* <tr>
                        <td>
                            <Form.Control  size='sm' as="select" value={supplierid} onChange={event => setSupplierid(1 * event.target.value)} placeholder="supplierid"  readOnly>
                                <option key={0} value={0} disabled>-Select-</option>
                                {
                                    users.filter(user => user.role === "Supplier").map(user =>
                                        <option key={user.id} value={user.id} >{user.id}</option>)
                                }
                            </Form.Control>
                        </td>
                        <td>
                            <Form.Control  size='sm' as="select" value={userid} onChange={event => setUserId(1 * event.target.value)} placeholder="userid" readOnly>
                            <option key={""} value={""} disabled>-Select-</option>
                                <option key={'admin@admin.com'} value={'admin@admin.com'} >admin@admin.com</option>
                            </Form.Control>
                        </td>
                        <td>
                            <Form.Control  size='sm' as="select" value={productid} onChange={event => setProductId(1 * event.target.value)} placeholder="productid" readOnly>
                                <option key={0} value={0} disabled>Select Product</option>
                                {
                                    products.filter(product => product.quantity === 0).map(product =>
                                        <option key={product.id} value={product.id} >{product.name}</option>)
                                }
                            </Form.Control>
                        </td>
                        <td>
                            <Form.Control  size='sm'
                                placeholder="productrealprice"
                                type="number" onChange={event => setProductrealprice(event.target.value)} value={productrealprice} readOnly
                            />
                        </td>
                     
                        <td>
                            <Form.Control  size='sm'
                                placeholder="availableqty"
                                type="number" onChange={event => setAvailableQty(event.target.value)} value={availableqty} readOnly
                            />
                        </td>
                        <td></td>
                        <td>
                            <Form.Control  size='sm'
                                placeholder="note"
                                size="sm"  as="textarea" rows={2}   onChange={event => setNote(event.target.value)} value={note} 
                            />
                        </td>
                  
                           
                   
                       <td></td>
                        <td><Button variant="success" size='sm' onClick={create}>Create</Button>
                            <Button variant="warning" size='sm' onClick={update}>Update</Button><br></br>
                            
                            <Button variant="light" size='sm' style={{ backgroundColor: "#4582ec", color: 'white' }} onClick={clear}>Clear</Button>
                        </td>

                    </tr> */}
                    {
                        stores.map(store =>
                            < StoreAdminRow key={store.id} store={store} remove={remove} />
                        )
                    }
                </tbody>
            </Table>
        </>
    )
}