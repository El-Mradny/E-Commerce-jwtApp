import React, { useContext, useEffect, useState } from 'react';
import db from '../../../db';
import UserContext from '../../../UserContext';


export default function CartItemCount() {
  const { user } = useContext(UserContext);

  const [carts, setCarts] = useState([])
  useEffect(() => (async () => setCarts(await db.Carts.findByUseridAndStatus(user.id, "unpaid")))(), [user.id])
  //console.log("cart id ", carts)

  const [cartItems, setCartItems] = useState([])
  useEffect(() => (async () => carts.length > 0 && setCartItems(await db.Cartitems.findByCartid(carts[0].id)))(), [carts,cartItems])

  const dotRed = {
    height: '20px',
    width: '20px',
    backgroundColor: '#ff1a1a',
    borderRadius: '50%',
    display: 'inline-block',
    zIndex: '8',
    position: 'absolute',
    marginLeft: '10px',
    marginTop: '16px',
    padding: '5px'
  }

  return (
    <span>
      {cartItems.length > 0 ?
        <span>
          <span style={dotRed}></span>
          <span style={{ fontSize: '20px', zIndex: '9', position: 'absolute', marginLeft: '14px', marginTop: '11px', color: 'white' }}>
            {cartItems.length}
          </span>
        </span>
        : null}






    </span>

  )
}

