import React, {  useEffect, useState } from 'react'
import db from '../../db'
import ProductShortPublic from './ProductShortPublic'

export default function ProductPublic() {

  const [products, setProducts] = useState([])
  useEffect(() => (async () => setProducts(await db.Products.findAll()))(), [])
  console.log(products);
  

  return (
    <>
      {
        products.map(product => <ProductShortPublic key={product.id} product={product} />)
      }
    </>
  )
}