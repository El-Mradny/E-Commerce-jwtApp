import React, { useEffect, useState } from 'react';
import db from '../../../db';


export default function CartOrderItems({ cartitem }) {
    console.log(cartitem);
    const [product, setProduct] = useState(null);
    useEffect(() => (async () => cartitem && setProduct(cartitem.productid !== null ? await db.Products.findOne(cartitem.productid) : null))(), [cartitem])


    const [packages, setPackages] = useState(null);
    useEffect(() => (async () => cartitem && setPackages(cartitem.packageid !== null ? await db.Packages.findOne(cartitem.packageid) : null))(), [cartitem])
  
    
    // const [packages, setPackage] = useState([])
    // useEffect(() => (async () => setPackage(await db.Packages.findAll()))(), [])
    // console.log(packages);

    if (cartitem && product && cartitem.productid !== null && packages && cartitem.packageid !== null) {
        return (
            <>
            <tr key={cartitem.id}>
                <td>{product.name}</td>
                <td>{cartitem.productqty}</td>
                <td><img src={product.image} alt={`This is ${product.name}`} width="130px"></img></td>
            </tr>
            <tr key={cartitem.id}>
                <td>{packages && packages.name}</td>
                <td>{cartitem.packageqty}</td>
                <td></td>
            </tr>
            </>
        )
    }

    if (cartitem && packages && cartitem.packageid !== null) {
        return (
            <tr key={cartitem.id}>
                <td>{packages && packages.name}</td>
                <td>{cartitem.packageqty}</td>
                <td></td>
            </tr>
        )
    }

    if (cartitem && product && cartitem.productid !== null) {
        return (
            <tr key={cartitem.id}>
                <td>{product.name}</td>
                <td>{cartitem.productqty}</td>
                <td><img src={product.image} alt={`This is ${product.name}`} width="130px"></img></td>
            </tr>
        )
    }
    

    else {
        return (
          <>
          </>
        )
    }

}