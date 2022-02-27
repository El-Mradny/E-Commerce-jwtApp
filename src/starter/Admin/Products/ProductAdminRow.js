import React, { useEffect, useState } from 'react'
import db from '../../../db'
import Button from 'react-bootstrap/Button';


function ProductAdminRow({ product, edit, remove }) {

  const [validRemove, setValidRemove] = useState(false)
  useEffect(() => (async () => setValidRemove(
    (await db.Cartitems.findByProductid(product.id)).length === 0 &&
    (await db.Packageproducts.findByProductid(product.id)).length === 0 &&
    (await db.Sales.findByProductid(product.id)).length === 0 &&
    (await db.Ratings.findByProductid(product.id)).length === 0
  ))(), [product])

  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>{product.sunlight}</td>
      <td>{product.water}</td>
      <td>{product.temperature}</td>
      <td>{product.measures}</td>
      <td>{product.category}</td>
      <td>{product.quantity}</td>
      <td>{product.date.toDateString()}</td>
      <td>{product.description}</td>
      <td><img alt={`images for ${product.image}`} src={product.image} width={'100%'} /></td>
      <td>
        <Button variant="danger" onClick={() => remove(product.id)} disabled={!validRemove}>X</Button>
        <Button variant="secondary" onClick={() => edit(product.id)}  href="#element_target">Edit</Button>
      </td>
    </tr>
  )
}

export default ProductAdminRow;
