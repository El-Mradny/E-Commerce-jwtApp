import React, { useEffect, useState } from 'react';
import DisplayDiscountRow from './DisplayDiscountRow';
import db from '../../../db'

export default function DisplayDiscount() {

  const [discountCodes, setDiscountCodes] = useState([])
  useEffect(() => (async () => setDiscountCodes(await db.Discounts.findAll()))(), [])

  const x = discountCodes.filter(elem=>elem.publish === 'Published' && elem.enddate > new Date() )
  return (
    <div>
      {
        x.length > 0 ? <h1 style={{ textAlign: 'center', color: '#38b44a' }}>Discount Code</h1> : null
      }
      
      {
        discountCodes.map(code =>
          < DisplayDiscountRow code={code} key={code.id} />
        )
      }
    </div>
  )
}