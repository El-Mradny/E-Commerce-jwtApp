import React, { useContext, useEffect, useState } from 'react';
import db from '../../../db';
import Button from 'react-bootstrap/Button';
import UserContext from '../../../UserContext';


export default function CartItemShort({ remove, cartitemElem, carts, minus, add, QtyErr }) {
  
  const { user } = useContext(UserContext)

  const [product, setProduct] = useState(null);
  useEffect(() => (async () => cartitemElem && setProduct(cartitemElem.productid !== null ? await db.Products.findOne(cartitemElem.productid) : null))(), [cartitemElem])

  const [packages, setPackages] = useState(null);
  useEffect(() => (async () => cartitemElem && setPackages(cartitemElem.packageid !== null ? await db.Packages.findOne(cartitemElem.packageid) : null))(), [cartitemElem])

  const [sales, setSales] = useState(null)
  useEffect(() => (async () => product && setSales(await db.Sales.findByProductid(product.id)))(), [product])

  const x = sales && product && sales[0] !== undefined ? product.price - (sales[0].discountpercent / 100 * product.price):null

  function dateDiffInDays(today, date) {
    return Math.round((date - today) / (1000 * 60 * 60 * 24));
  }

  if (product && sales && cartitemElem && carts && carts === cartitemElem.cartid && cartitemElem.productid !== null) {
    return (
      <tr>
        <td><img src={product.image} width="130px"></img></td>
        <td>{product.name}</td>
        <td>
          <Button variant="success" size="sm" onClick={() => add(cartitemElem.id)} style={{ margin: '2px' }}><strong>+</strong></Button>
          {cartitemElem.productqty}
          <Button variant="success" size="sm" onClick={() => minus(cartitemElem.id)} style={{ margin: '2px' }} ><strong>-</strong></Button>
          <br></br>
          <span style={{ color: 'green', fontWeight: 'bold' }}>{QtyErr}</span>
        </td>
        {
          sales[0] !== undefined && dateDiffInDays(new Date(), sales[0].enddate) > 0 && sales[0].publish === 'Published' ?
            <td> <span style={{ textDecorationLine: 'line-through' }}> {product.price} QR</span>  <span style={{ color: 'red', fontWeight: 'bold' }}> {x} QR  </span> </td>
            : <td>{product.price} QR</td>
        }
        {
          sales[0] !== undefined && dateDiffInDays(new Date(), sales[0].enddate) > 0 && sales[0].publish === 'Published' ?
            <td>{x * cartitemElem.productqty} QR</td> : <td>{product.price * cartitemElem.productqty} QR</td>
        }

        <td><Button variant="danger" onClick={() => remove(cartitemElem.id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
          <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
        </svg></Button></td>
      </tr>
    )
  }

  if (packages && cartitemElem && carts && carts === cartitemElem.cartid && cartitemElem.packageid !== null) {
    return (
      <tr>
        <td></td>
        <td>{packages.name}</td>
        <td>
          <Button variant="success" size="sm" onClick={() => add(cartitemElem.id)} style={{ margin: '2px' }}><strong>+</strong></Button>
          {cartitemElem.packageqty}
          <Button variant="success" size="sm" onClick={() => minus(cartitemElem.id)} style={{ margin: '2px' }} ><strong>-</strong></Button>
        </td>
        <td>{packages.price} QR</td>
        <td>{packages.price * cartitemElem.packageqty} QR</td>

        <td><Button variant="danger" onClick={() => remove(cartitemElem.id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
          <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
        </svg></Button></td>
      </tr>
    )


  }
  else {
    return (
     <>
     </>
     
    )
  }



  // }
  // return (
  //   <>
  //     { product && packages && carts && carts === cartitemElem.cartid ?
  //       cartitemElem.productid !== null ?
  // <tr>
  //   <td><img src={product.image} width="130px"></img></td>
  //   <td>{product.name}</td>
  //   <td>{product.price}</td>
  //   <td>
  //     <Button variant="success" size="sm" onClick={() => add(cartitemElem.id)} style={{ margin: '2px' }}><strong>+</strong></Button>
  //     {cartitemElem.quantity}
  //     <Button variant="success" size="sm" onClick={() => minus(cartitemElem.id)} style={{ margin: '2px' }} ><strong>-</strong></Button>
  //   </td>

  //   <td>{product.price * cartitemElem.quantity}</td>

  //   <td><Button variant="danger" onClick={() => remove(cartitemElem.id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
  //     <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
  //     <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
  //   </svg></Button></td>
  // </tr>
  //         :
  // <tr>
  //   <td></td>
  //   <td>{packages.name}</td>
  //   <td>{packages.price}</td>
  //   <td>
  //     <Button variant="success" size="sm" onClick={() => add(cartitemElem.id)} style={{ margin: '2px' }}><strong>+</strong></Button>
  //     {cartitemElem.quantity}
  //     <Button variant="success" size="sm" onClick={() => minus(cartitemElem.id)} style={{ margin: '2px' }} ><strong>-</strong></Button>
  //   </td>
  //   <td>{packages.price * cartitemElem.quantity}</td>
  //   <td><Button variant="danger" onClick={() => remove(cartitemElem.id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
  //     <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
  //     <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
  //   </svg></Button></td>
  // </tr>
  //       : null

  //     }

  //   </>
  // )
}



















// const [cartItem, setCartItem] = useState(null);
// useEffect(() => (async () => setCartItem(await db.Cartitems.findOne(cartitem.id)))(), [cartitem.id])


// const [product, setProduct] = useState(null);
// useEffect(() => (async () => cartItem && setProduct(cartItem.productid !== null ? await db.Products.findOne(cartItem.productid) : null))(), [cartItem])


// const add = async () => {
//   const addQty = cartItem.quantity + 1;
//   await db.Cartitems.update(() => { }, { id: cartItem.id, quantity: addQty, cartid: cartItem.cartid, productid: cartItem.productid });
//   setCartItem(await db.Cartitems.findOne(cartitem.id))
//   console.log(cartItem)
// };

// const minus = async () => {
//   const minusQty = cartItem.quantity - 1;
//   await db.Cartitems.update(() => { }, { id: cartItem.id, quantity: minusQty, cartid: cartItem.cartid, productid: cartItem.productid });
//   setCartItem(await db.Cartitems.findOne(cartitem.id))
//   console.log(cartItem)
// };