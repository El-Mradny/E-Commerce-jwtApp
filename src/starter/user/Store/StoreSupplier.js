import React, { useContext,useEffect, useState } from 'react';
import db from '../../../db';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import StoreSupplierRow from './StoreSupplierRow'
import UserContext from '../../../UserContext'

export default function StoreSupplier() {
    const { user } = useContext(UserContext)
 
    const [stores, setStores] = useState([])
    useEffect(() => (async () => setStores(await db.Stores.findAll()))(), [])
    console.log(stores)

    const [products, setProducts] = useState([])
    useEffect(() => (async () => setProducts(await db.Products.findAll()))(), [])

  
    const [Supp, setSupp] = useState(null)
    useEffect(() => (async () => user && setSupp(await db.Suppliers.findByUserid(user.id)))(), [user])
    console.log(Supp);

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

    const suppId = Supp && Supp[0].id


    const create = async () => {
        await db.Stores.create(setStores, { id, supplierid:suppId, userid:'admin@admin.com', productid, productrealprice, totalpricepaid, totalprice, paymentdate, note, availableqty })
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


    const [createValid, setCreateValid] = useState(false)
    useEffect(() => (async () => setCreateValid(
        availableqty > 0 && availableqty < 100 && productid > 0 &&
        productrealprice != ""

    ))(), [productid, availableqty, productrealprice])


    const [validUpdate, setValidUpdate] = useState(false)
    useEffect(() => (async () => setValidUpdate(
        productid > 0 &&
        productrealprice != "" &&
        productid && await db.Products.findOne(productid) !== undefined &&
        productid > 0 && availableqty > 0 && availableqty < 100

    ))(), [id, productid, availableqty,productrealprice])


    return (
        <>
            <br></br><br></br>
            <Table striped bordered hover responsive variant="success" size="sm">
                <thead>
                    <tr>
                        <th>Me</th>
                        <th>productid</th>
                        <th>Product Price</th>
                        {/* <th>totalprice</th> */}
                        <th>availableqty</th>
                        <th>total</th>
                        <th>note</th>
                        {/* <th>paymentdate</th>
                        <th>totalpricepaid</th> */}
                        <th>Statics</th>
                        <th></th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        
                        <td>
                            <Form.Control size='sm' as="select" value={productid} onChange={event => setProductId(1 * event.target.value)} placeholder="productid" >
                                <option key={0} value={0} disabled>Select Product</option>
                                {
                                    products.filter(product => product.quantity === 0).map(product =>
                                        <option key={product.id} value={product.id} >{product.name}</option>)
                                }
                            </Form.Control>
                        </td>
                        <td>
                            <Form.Control size='sm'
                                placeholder="productrealprice"
                                type="number" onChange={event => setProductrealprice(event.target.value)} value={productrealprice}
                            />
                        </td>
                        {/* <td>
                            <Form.Control
                                placeholder="totalprice"
                                type="text" onChange={event => setTotalPrice(event.target.value)} value={totalprice}
                            />
                        </td> */}

                        <td>
                            <Form.Control size='sm'
                                placeholder="availableqty"
                                type="number" onChange={event => setAvailableQty(event.target.value)} value={availableqty}
                            />
                        </td>
                        <td></td>
                        <td>
                            <Form.Control size='sm'
                                placeholder="note"
                                size="sm" as="textarea" rows={2} onChange={event => setNote(event.target.value)} value={note}
                            />
                        </td>

                        {/* <Form.Control type="date" size="sm" onChange={event => setPaymentDate(new Date(event.target.value))} placeholder="startdate" value={paymentdate.toISOString().slice(0, 10)} /> */}


                        {/* <Form.Control
                                placeholder="totalpricepaid"
                                type="text" onChange={event => setTotalPricepaId(event.target.value)} value={totalpricepaid}
                            /> */}

                        <td></td>
                        <td><Button variant="success" size='sm' onClick={create} disabled={!createValid}>Create</Button>
                            <Button variant="warning" size='sm' onClick={update} disabled={!validUpdate}>Update</Button><br></br>
                            <Button variant="light" size='sm' style={{ backgroundColor: "#4582ec", color: 'white' }} onClick={clear}>Clear</Button>
                        </td>

                    </tr>
                    {
                        stores.map(store =>
                            < StoreSupplierRow key={store.id} store={store} remove={remove} edit={edit} />
                        )
                    }
                </tbody>
            </Table>
        </>
    )
}