import React, { useContext, useEffect, useState } from 'react';
import db from '../../../db';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import UserContext from '../../../UserContext'
export default function DisplaySalesRow({ sale }) {
    const { user } = useContext(UserContext)
    const [product, setProduct] = useState(null);
    useEffect(() => (async () => setProduct(await db.Products.findOne(sale.productid)))(), [sale.productid])

    function dateDiffInDays(today, date) {
        return Math.round((date - today) / (1000 * 60 * 60 * 24));
    }

    const days = product && dateDiffInDays(new Date(), sale.enddate)
    const afterDiscount = product && product.price - (sale.discountpercent / 100 * product.price)
    const saving = product && product.price - afterDiscount

    return (
        product
        &&
        sale.startdate < new Date() && sale.enddate > new Date() && sale.publish === 'Published' && days > 0 &&
        <div>
            <Card border="success" style={{ width: '18rem', float: 'left', margin: '3px' }}>
                <Card.Header><strong>{product.name}</strong></Card.Header>
                <Card.Body>
                    <Card.Img variant="top" alt={`images for ${product.id}`} src={product.image} height="300" width="200" />
                </Card.Body>
                <Card.Footer>
                    <Card.Text style={{ fontSize: '17px' }}>
                        Was <span style={{ textDecorationLine: 'line-through' }}> {product.price} QR</span>
                        <br></br>

                        <span style={{ color: 'red', fontWeight: 'bold' }}> Now {afterDiscount} QR</span>
                        <br></br>
                        <span style={{ backgroundColor: '#e95c5b', color: 'white', borderRadius: '2px', padding: '2px' }}> {sale.discountpercent}% OFF</span>
                        <br></br>
                        <span style={{ color: 'green' }}>
                            {days}
                            {days >= 1 && days < 5 ?
                                ' days left Hurry up' : ' days left'}
                        </span>
                        <br></br>
                        Save up {saving.toFixed(2)} QR
                        <br></br>
                        <Button variant="outline-success" title="Details" style={{ margin: '3px' }} as={Link} to={`/productdetail/${product.id}/${user.id}`}>Details</Button>
                    </Card.Text>
                </Card.Footer>
                <div style={{ clear: 'left' }}></div>
            </Card>
        </div>





    )
}
