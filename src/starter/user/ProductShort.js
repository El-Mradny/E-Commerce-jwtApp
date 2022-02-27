import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import db from '../../db';

export default function ProductShort({ product }) {
  const [jwtUser,] = useState(db.getJwtUser())

  const [sales, setSales] = useState(null)
  useEffect(() => (async () => setSales(await db.Sales.findByProductid(product.id)))(), [product])

  const dotRed = {
    height: '55px',
    width: '55px',
    backgroundColor: 'red',
    borderRadius: '50%',
    zIndex: '6',
    position: 'absolute',
    margin: '10px',
    padding: '2px'
  }

  function dateDiffInDays(today, date) {
    return Math.round((date - today) / (1000 * 60 * 60 * 24));
  }

  return (
    product && sales && sales[0] !== undefined && dateDiffInDays(new Date(), sales[0].enddate) > 0 &&
      sales[0].startdate < new Date() && sales[0].enddate > new Date() && sales[0].publish === 'Published' ?
      <div className="productImages">

        

        <Card border="success" style={{ width: '17rem', float: 'left', margin: '15px' }}>
          <Card.Header><strong>{product.name}</strong></Card.Header>
          <Card.Body>
            <span style={dotRed}></span>
            <span style={{ fontSize: '20px', zIndex: '8', position: 'absolute', margin: '20px', color: 'white' }}>Sale</span>
            <Card.Img variant="top" src={product.image} alt={product.image} height="300" width="200" />
          </Card.Body>
          <Card.Footer>
            <Card.Text>
              <span style={{ textDecorationLine: 'line-through' }}> {product.price} QR </span>
              <span style={{ color: 'red', fontWeight: 'bold' }}>{product.price - (sales[0].discountpercent / 100 * product.price)} QR</span>
              <br></br>{product.category}<br></br>
              <Button variant="outline-success" title="Details" style={{ margin: '3px' }} as={Link} to={`/productdetail/${product.id}/${jwtUser.username}`}>Details</Button>
            </Card.Text>
          </Card.Footer>
        </Card>
      </div>
      :
      <div className="productImages">

        

        <Card border="success" style={{ width: '17rem', float: 'left', margin: '15px' }}>
          <Card.Header><strong>{product.name}</strong></Card.Header>
          <Card.Body>
            <Card.Img variant="top" src={product.image} alt={product.image} height="300" width="200" />
          </Card.Body>
          <Card.Footer>
            <Card.Text>
              Cost {product.price} QR <br></br>{product.category}<br></br>
              <Button title="Details" variant="outline-success" style={{ margin: '3px' }} as={Link} to={`/productdetail/${product.id}/${jwtUser.username}`}>Details</Button>
            </Card.Text>
          </Card.Footer>
        </Card>
      </div>
  )
}