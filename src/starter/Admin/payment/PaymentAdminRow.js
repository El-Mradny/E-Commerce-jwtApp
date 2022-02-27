import React, { useEffect, useState } from 'react';
import db from '../../../db';
import Button from 'react-bootstrap/Button';

export default function PaymentAdminRow({pay, remove}) {
    const [validRemove, setValidRemove] = useState(false)
    useEffect(() => (async () => setValidRemove(
      (await db.Carts.findByPaymentid(pay.id)).length === 0
    ))(), [pay])
    return (
        <>

            <tr key={pay.id}>
                <td>{pay.method}</td>
                <td>{pay.cardnumber}</td>
                <td>{pay.cardholdername}</td>
                <td>{pay.cvccode}</td>
                <td>{pay.expirydate.toDateString()}</td>
                <Button variant="danger" onClick={() => remove(pay.id)} disabled={!validRemove}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                    </svg>
                </Button>
            </tr>








        </>
    )
}


