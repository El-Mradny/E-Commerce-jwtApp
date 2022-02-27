import React, { useState, useEffect } from 'react'
import db from '../../../db'
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import ProductShortPublic from '../ProductShortPublic'

export default function SearchProductsByName() {

    const [name, setName] = useState("")
    const [products, setProducts] = useState([])
    useEffect(() => (async () => setProducts(await db.Products.findByNameContaining(name)))(), [name])

    return (
        <><br></br>
            <h2>Search Products by Name</h2>
            <br></br>
            <Form.Control size="sm" type="text" onChange={event => setName(event.target.value)} placeholder="Name" value={name} />
            <br></br>

            {
                products.map(product => <ProductShortPublic key={product.id} product={product} />)
            }


        </>
    )
}