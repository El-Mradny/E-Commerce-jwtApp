import React, { useEffect, useState } from 'react';
import db from '../../../db'
import Button from 'react-bootstrap/Button'


export default function PackageproductAdminRow({ packproduct, edit, remove }) {

    const [products, setProducts] = useState(null);
    useEffect(() => (async () => setProducts(await db.Products.findOne(packproduct.productid)))(), [packproduct.productid])

    const [packages, setPackages] = useState(null)
    useEffect(() => (async () => setPackages(await db.Packages.findOne(packproduct.packageid)))(), [packproduct.packageid])

    //disabled={!validRemove}
    // const [validRemove, setValidRemove] = useState(false)
    // useEffect(() => (async () => setValidRemove(
    //   (await db.Packages.findByPackageProductid(packageid)).length === 0
    // ))(), [product])

    return (
        packages && products
        &&
        <tr key={packproduct.id}>
            <td>{packages.name}</td>
            <td>{products.name}</td>

            <td>
                <Button variant="secondary" onClick={() => edit(packproduct.id)} >Edit</Button>
                <Button variant="danger" onClick={() => remove(packproduct.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                    </svg>
                </Button>
            </td>
        </tr>


    )
}