import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import db from '../../../db'
import { Link } from "react-router-dom";

function ApplicationAdminRow({ application, remove, edit, clear }) {

    const [user, setUser] = useState(null)
    useEffect(() => (async () => setUser(await db.Users.findOne(application.userid)))(), [application.userid])


    return (
        user &&
        <tr key={application.id}>
            <td>{application.userid}</td>
            <td>{user.role}</td>
            
            <td >{application.applieddate.toDateString()}</td>
            <td >{application.roleapplying}</td>
            <td>{application.status}</td>
            <td>
                <img alt={`images for ${user.picture}`} src={user.picture} height={100} width={100} />
            </td>
            <td>
                <Button variant="info" as={Link} to={`/applicationcvadmin/${application.id}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" className="bi bi-file-earmark-person" viewBox="0 0 16 16">
                        <path d="M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2v9.255S12 12 8 12s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h5.5v2z" />
                    </svg>


                </Button>
            </td>
            <td>
                <Button variant="secondary" onClick={() => edit(application.id)} >Edit </Button>
                <Button variant="danger" onClick={() => remove(application.id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                </svg></Button>
            </td>

        </tr>
    )

}


export default ApplicationAdminRow;