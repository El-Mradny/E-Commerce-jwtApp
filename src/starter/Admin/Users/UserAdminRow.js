import React, { useEffect, useState } from 'react'
import db from '../../../db'
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

function UserAdminRow({ user, edit, remove }) {

  const [validRemove, setValidRemove] = useState(false)
  useEffect(() => (async () => setValidRemove(
    (await db.Carts.findByUserid(user.id)).length === 0 &&
   (await db.Ratings.findByUserid(user.id)).length === 0 &&
   (await db.Faqs.findByUserid(user.id)).length === 0 &&
   (await db.Contacts.findByUserid(user.id)).length === 0 &&
   (await db.Applications.findByUserid(user.id)).length === 0 &&
   (await db.Wishlists.findByUserid(user.id)).length === 0 &&
   (await db.Compaers.findByUserid(user.id)).length === 0 &&
   (await db.Suppliers.findByUserid(user.id)).length === 0 &&
   (await db.Stores.findByUserid(user.id)).length === 0 
  ))(), [user])

  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.firstname}</td>
      <td>{user.role}</td>
      <td>
        <Button variant="danger" onClick={() => remove(user.id)} disabled={!validRemove}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
          </svg>
        </Button>
        <Button variant="secondary" onClick={() => edit(user.id)}>Edit</Button>
        <Button  variant="info" as={Link} to={`/useradmindetails/${user.id}`}>Details</Button>
      </td>
    </tr>
  )
}

export default UserAdminRow;
