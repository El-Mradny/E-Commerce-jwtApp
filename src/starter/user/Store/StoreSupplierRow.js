import React, { useEffect, useState } from 'react';
import db from '../../../db';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

export default function StoreSupplierRow({ store, remove, edit }) {

    const [products, setProducts] = useState(null);
    useEffect(() => (async () => setProducts(await db.Products.findOne(store.productid)))(), [store])

    const [Supp, setSupp] = useState(null)
    useEffect(() => (async () => store && setSupp(await db.Suppliers.findOne(store.supplierid)))(), [store])
  
    const [user, setUser] = useState(null);
    useEffect(() => (async () => Supp && setUser(await db.Users.findOne(Supp.userid)))(), [Supp])

    const overAllToal = store.availableqty * store.productrealprice

    const [valid, setValid] = useState(false)
    useEffect(() => (async () => setValid(
        store.totalpricepaid.length === 0
    ))(), [store])

 
    return (
        products && user &&
        <>
            <tr key={store.id}>
                <td>{user.id}</td>
                <td>{products.name}<br></br>
                    <img alt={`images for ${products.name}`} src={products.image} width='90px' />
                </td>
                <td>{store.productrealprice} QR</td>

                <td>{store.availableqty}</td>

                <td>{overAllToal} QR</td>


                <td>{store.note}</td>

                <td>
                    {store.totalpricepaid * 1 === 0 ? 'Still' : 'Paid'}
                </td>
                <td>

                    <Button variant="secondary" size='sm' disabled={!valid} onClick={() => edit(store.id)}>Edit</Button>
                    <Button variant="danger" size='sm' disabled={!valid} onClick={() => remove(store.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                        </svg>
                    </Button>
                    <Button variant="light" size='sm' style={{ backgroundColor: "black", color: 'white' }} as={Link} to={`/storesupplierrowdetails/${store.id}`}>Details</Button>
                </td>

            </tr>
        </>
    )
}