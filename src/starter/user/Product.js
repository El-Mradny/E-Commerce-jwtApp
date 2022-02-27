import React, { useContext, useEffect, useState } from 'react'
import db from '../../db'
import ProductShort from './ProductShort'
import UserContext from '../../UserContext'
export default function Product() {

  const [products, setProducts] = useState([])
  useEffect(() => (async () => setProducts(await db.Products.findAll()))(), [])
  console.log(products);

  const [carts, setCarts] = useState([])
  useEffect(() => (async () => setCarts(await db.Carts.findAll()))(), [])
  //console.log('all carts', carts);

  const { user } = useContext(UserContext)

  // const [cart, setCart] = useState([])
  // useEffect(() => (async () => setCart(await db.Carts.findByUseridAndStatus(user.id, 'unpaid')))(), [user.id])
  // console.log('person cart ', cart);

  //console.log(products);

  return (
    <>
      {
        products.map(product => <ProductShort key={product.id} product={product} />)
      }
    </>
  )
}