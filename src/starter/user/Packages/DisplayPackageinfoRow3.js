import React, { useEffect, useState } from 'react';
import db from '../../../db'
import Card from 'react-bootstrap/Card'

export default function DisplayPackageProducts({ pack }) {

    const [product, setProduct] = useState(null);
    useEffect(() => (async () => pack && setProduct(await db.Products.findOne(pack)))(), [pack])

    return (
        product &&
        <Card.Text>
            <span style={{fontWeight:'5px'}}>{product.name}</span>
            {/* <img src={product.image} alt={`This is ${product.name}`} width="100%" ></img>  */}
        </Card.Text>
               
    )
    
}