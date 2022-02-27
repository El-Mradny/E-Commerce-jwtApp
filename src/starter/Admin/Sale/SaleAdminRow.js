import React, { useEffect, useState } from 'react';
import db from '../../../db';
import Button from 'react-bootstrap/Button';

export default function SaleProduct({ saleProduct, edit, remove }) {

    const [product, setProduct] = useState(null);
    useEffect(() => (async () => setProduct(await db.Products.findOne(saleProduct.productid)))(), [saleProduct.productid])

    function dateDiffInDays(today, date) {
        return Math.round((date - today) / (1000 * 60 * 60 * 24));
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

    const afterDiscount = product && product.price - (saleProduct.discountpercent / 100 * product.price)
    const start = saleProduct.startdate
    const end = saleProduct.enddate

    const days = dateDiffInDays(new Date(), end)
    const periodOfSale = dateDiffInDays(start, end)

    const [validEdit, setCreateEdit] = useState(true)
    useEffect(() => (async () => setCreateEdit(
        start < new Date() && end < new Date()
    ))(), [start, end])


    return (
        product
        &&
        <tr key={saleProduct.id}>
            <td>{product.name}{product.id}</td>
            <td>{product.price}</td>
            <td>{saleProduct.discountpercent}%</td>
            <td>{afterDiscount}</td>
            {/* <td>Save {product.price-afterDiscount}</td> */}

            <td>{start.toDateString()}</td>
            <td>{end.toDateString()}</td>
            <td>
                {days <= 0 ? 'expired' :
                    start > new Date() ? `-` : `${days} days left `}

            </td>
            <td>{periodOfSale} days</td>
            <td>
                {
                    start < new Date() && end > new Date() ?
                        <span style={dotGreen}></span> : null
                }{
                    start < new Date() && end < new Date() ?
                        <span style={dotRed}></span> : null
                }{
                    start > new Date() ?
                        <span style={dotGray}></span> : null
                }
            </td>
            <td>{saleProduct.publish}</td>
            <td>
                <Button variant="secondary" onClick={() => edit(saleProduct.id)} disabled={validEdit}>Edit</Button>
                <Button variant="danger" onClick={() => remove(saleProduct.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                    </svg>
                </Button>
            </td>

        </tr>
    )
}
