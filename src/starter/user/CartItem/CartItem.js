import React, { useContext, useEffect, useState } from 'react';
import db from '../../../db';
import Table from 'react-bootstrap/Table';
import UserContext from '../../../UserContext';
import CartItemShort from './CartItemShort';
import Spinner from 'react-bootstrap/Spinner';
import CartItemTotal from './CartItemTotal';

export default function CartItem() {

  const { user } = useContext(UserContext)


  const [carts, setCarts] = useState([])
  useEffect(() => (async () => setCarts(await db.Carts.findByUseridAndStatus(user.id, "unpaid")))(), [user.id])
  // console.log("cart id ", carts)

  const [id, setId] = useState(0)
  const [cartId, setCartId] = useState(0)
  const [productid, setProdecrId] = useState(0)
  const [packageid, setPackageId] = useState(0)
  const [productqty, setProductqty] = useState(0)
  const [packageqty, setPackageqty] = useState(0)

  const [cartItems, setCartItems] = useState([])
  useEffect(() => (async () => setCartItems(await db.Cartitems.findAll()))(), [])
  console.log("all cartItems", cartItems)

  const [Sales, setSales] = useState([])
  useEffect(() => (async () => setSales(await db.Sales.findAll()))(), [])
  //console.log(Sales);

  const CheckOut = async () => {
    await db.Carts.update(setCarts, { ...carts[0], status: "paid" })
    await db.Carts.create(setCarts, { status: "unpaid", userid: user.id })
    window.location = "http://localhost:3000/";
  }

  const remove = async (id) => {
    await db.Cartitems.remove(setCartItems, id)

  }

  const [QtyErr, setQtyErr] = useState("")

  //add more then 1 and only 5 
  const add = async (idd) => {
    const cartitem = await db.Cartitems.findOne(idd)
    if (cartitem.productid !== null) {
      if (cartitem.productqty === 5) {
        setQtyErr("only 5 Qty")
      } else {
        const addQty = cartitem.productqty + 1;
        await db.Cartitems.update(setCartItems, { id: cartitem.id, cartid: carts[0].id, productid: cartitem.productid, packageid: null, productqty: addQty, packageqty: null })
        setId(0)
        setCartId(0)
        setProdecrId(0)
        setPackageId(0)
        setProductqty(0)
        setPackageqty(0)
      }
    } else {
      if (cartitem.packageqty === 5) {
        setQtyErr("only 5 Qty")
      } else {
        const addQtyy = cartitem.packageqty + 1;
        await db.Cartitems.update(setCartItems, { id: cartitem.id, cartid: carts[0].id, productid: null, packageid: cartitem.packageid, productqty: null, packageqty: addQtyy })
        setId(0)
        setCartId(0)
        setProdecrId(0)
        setPackageId(0)
        setProductqty(0)
        setPackageqty(0)
      }
    }
  }

  const minus = async (idd) => {
    const cartitem = await db.Cartitems.findOne(idd)

    if (cartitem.productid !== null) {
      if (cartitem.productqty === 1) {
        remove(idd)
      } else {
        const minusQty = cartitem.productqty - 1;
        await db.Cartitems.update(setCartItems, { id: cartitem.id, cartid: carts[0].id, productid: cartitem.productid, packageid: null, productqty: minusQty, packageqty: null })
        setId(0)
        setCartId(0)
        setProdecrId(0)
        setPackageId(0)
        setProductqty(0)
        setPackageqty(0)
      }
    } else {
      if (cartitem.packageqty === 1) {
        remove(idd)
      } else {
        const minusQtyy = cartitem.packageqty - 1;
        await db.Cartitems.update(setCartItems, { id: cartitem.id, cartid: carts[0].id, productid: null, packageid: cartitem.packageid, productqty: null, packageqty: minusQtyy })
        setId(0)
        setCartId(0)
        setProdecrId(0)
        setPackageId(0)
        setProductqty(0)
        setPackageqty(0)
      }
    }


    if (cartitem.packageqty <= 5) {
      setQtyErr("")
    }
    if (cartitem.packageqty <= 5) {
      setQtyErr("")
    }

  }

  const [cartItem, setCartItem] = useState([])
  useEffect(() => (async () => carts.length > 0 && setCartItem(await db.Cartitems.findByCartid(carts[0].id)))(), [carts])

  return (
    carts ?
      <><br></br>
        <h1>Shopping Cart{cartItem.length > 0 ? <span style={{ float: 'right', fontSize: '20px', marginTop: '25px' }}>{cartItem.length} item</span> : null}</h1>
        <br></br>
        { cartItem.length > 0 ?
          <Table hover responsive variant="Light" size="sm" >
            <thead>
              <tr>
                <th>Product</th>
                <th></th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                cartItems.map(cartitem =>
                  carts && carts[0] && cartitem &&
                  <CartItemShort key={cartitem.id} remove={remove} cartitemElem={cartitem} carts={carts[0].id} minus={minus} add={add} QtyErr={QtyErr} />
                )
              }
            </tbody>
          </Table> : <p className='text-muted'>This cart doesn't have items yet</p>
        }
        {
          cartItem.length > 0 ? <CartItemTotal /> : null
        }

      </>
      : <Spinner animation="border" variant="success" />
  )
}

// useEffect(() => (async () => {
//   let totalCart = 0;

//   cartItem && cartItem.map(async (item) => {

//     // if (item.packageid !== null) {
//     //   const packageItem = await db.Package.findOne(item.packageid)
//     //   const x2 = totalCart + (packageItem[0].price * item.quantity)
//     //   totalCart = x2 + totalCart
//     //   setTotal(total + x2)
//     // }

//     if (item.productid !== null) {

//       const productSa = await db.Sales.findByProductid(item.productid)
//       console.log(productSa);
//       if (productSa.length>0) {

//         const productTable = await db.Products.findOne(item.productid)

//         const x1 = totalCart + (productTable.price - (productSa[0].discountpercent / 100 * productTable.price) * item.quantity)

//         totalCart = x1 && x1 + totalCart

//         setTotal(total + x1 && x1)

//       } else {
//         const product = await db.Products.findOne(item.productid)



//         const x31 = totalCart + (product.price * item.quantity)



//         totalCart = x31 && x31 + totalCart

//         setTotal(total + x31 && x31)
//       }
//     }


//   });
//   setTotal(totalCart)
// })(), [cartItem])
