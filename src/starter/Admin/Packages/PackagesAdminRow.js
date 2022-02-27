import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import db from '../../../db';
import Button from 'react-bootstrap/Button';

export default function MarkingManagerPackageRow({ pack, edit,remove,dotRed,dotGreen, dotGray }) {
    

    function dateDiffInDays(today, date) {
        return Math.round((date - today) / (1000 * 60 * 60 * 24));
    }

    const start = pack.startdate
    const end = pack.enddate

    

    const [validEdit, setCreateEdit] = useState(true)
    useEffect(() => (async () => setCreateEdit(
      start < new Date() && end < new Date()
    ))(), [start, end])

   
    const [validRemove, setCreateRemove] = useState(false)
    useEffect(() => (async () => setCreateRemove(
        pack.id && await db.Packageproducts.findByPackageid(pack.id).length > 0
    ))(), [pack.id])


    const days = pack && dateDiffInDays(new Date(), end)
    const periodOfSale = dateDiffInDays(start, end)
    
    

    return (
        pack &&
        <tr key={pack.id}>
            <td>{pack.name}</td>
            <td>{pack.price}</td>
            <td>{pack.qty}</td> 
            <td>{pack.startdate.toDateString()}</td>
            <td>{pack.enddate.toDateString()}</td>
            <td>{pack.publish}</td>
            <td>
                {days <= 0 ? 'expired' :
                    start > new Date() ? `-` : `${days} days left `}

            </td>
            <td>{periodOfSale} days</td>
            <td>
                {
                    start < new Date() && end > new Date() ?
                        <span style={dotGreen}></span> : null
                }{
                    start < new Date() && end < new Date() ?
                        <span style={dotRed}></span> : null
                }{
                    start > new Date() ? 
                        <span style={dotGray}></span> : null
                }
            </td>
            <td><Button variant="light" style={{ backgroundColor: "black", color: 'white' }} as={Link} to={`/displaypackageproductdetail/${pack.id}`}>Details</Button></td>
      
            <td>
                <Button variant="secondary" onClick={() => edit(pack.id)} disabled={validEdit}>Edit</Button>
                <Button variant="danger" onClick={() => remove(pack.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" disabled={!validRemove} width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                    </svg>
                </Button>
            </td>
        </tr>
    )
}