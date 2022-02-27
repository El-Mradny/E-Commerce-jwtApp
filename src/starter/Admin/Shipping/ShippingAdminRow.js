import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import db from '../../../db'



export default function ShippingAdminRow({ship, edit, remove}) {

    const [validRemove, setValidRemove] = useState(false)
    useEffect(() => (async () => setValidRemove(
        (await db.Carts.findByShippingid(ship.id)).length === 0
    ))(), [ship])

    return (
        <>

            <tr key={ship.id}>
                <td>{ship.userid}</td>
                <td>{ship.country}</td>
                <td>{ship.city}</td>
                <td>{ship.address}</td>
                <td>{ship.pobox}</td>
                <td>{ship.streetnum}</td>
                <td>{ship.email}</td>
                <td>{ship.shippingmethod}</td>
                <td>{ship.phonenumber}</td>
                <td>{ship.longitude}</td>
                <td>{ship.latitude}</td>
                <td><Button variant="link" as={Link} to={`shippingadminuser/${ship.userid}`} >Order list</Button></td>
                <td>
                    <Button variant="secondary" onClick={() => edit(ship.id)} >Edit </Button>
                    <Button variant="danger" onClick={() => remove(ship.id)} disabled={!validRemove}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                    </svg></Button>
                </td>


            </tr>













        </>
    )
}