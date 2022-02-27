import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';

export default function DiscountAdminRow({ discode, edit, remove ,dotGreen, dotRed, dotGray}) {

    function dateDiffInDays(today, date) {
        return Math.round((date - today) / (1000 * 60 * 60 * 24));
    }

    const start = discode.startdate
    const end = discode.enddate
    
    const days = dateDiffInDays(new Date(), end)

    const [validEdit, setCreateEdit] = useState(true)
    useEffect(() => (async () => setCreateEdit(
      start < new Date() && end < new Date()
    ))(), [start, end])

    return (
        <tr key={discode.id}>
            <td>{discode.discountcode}</td>
            <td>{discode.discountvalue}%</td>
            <td>{discode.startdate.toDateString()}</td>
            <td>{discode.enddate.toDateString()}</td>
            <td>
                {days <= 0 ? 'expired' 
                : `${days} days left `} 

            </td>
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
            <td>{discode.publish}</td>
            <td>{discode.description}</td>
            
            <td>
                <Button variant="secondary" onClick={() => edit(discode.id)} disabled={validEdit} > Edit</Button>
                <Button variant="danger" onClick={() => remove(discode.id)} >X</Button>

            </td>
        </tr>
    )
}