import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import db from '../../../db';


export default function SamePack3({ pack }) {

    const [product, setProduct] = useState(null);
    useEffect(() => (async () => pack && setProduct(await db.Products.findOne(pack)))(), [pack])


    return (
        product &&
        <Card.Text>
            <span style={{fontWeight:'10px',color:'green'}}>{product.name}</span>
            <img src={product.image} alt={`This is ${product.name}`} width="100%" ></img> 
        </Card.Text>
      


    )
}