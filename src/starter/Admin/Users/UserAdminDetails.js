import React, { useEffect, useState } from 'react'
import db from '../../../db'
import {
  useParams
} from "react-router-dom";

export default function UserDetails() {

  const { id: stringId } = useParams();
  const id = stringId

  const [user, setUser] = useState(null)
  useEffect(() => (async () => setUser(await db.Users.findOne(id)))(), [id])


  return (
    user
    &&
    <>
    <br></br>
      <h2>{user.id}</h2>
      <br></br>
      <div className="row">
        <div className="col-sm-2">
          <div><img alt={`images for ${user.picture}`} src={user.picture} width={'90%'} /></div>
        </div>
        <div className="col-sm">
          <dl className="row">
            <dt className="col-sm-3">First Name</dt>
            <dd className="col-sm-9">{user.firstname}</dd>
            <dt className="col-sm-3">Last Name</dt>
            <dd className="col-sm-9">{user.lastname}</dd>
            <dt className="col-sm-3">Gender</dt>
            <dd className="col-sm-9">{user.gender}</dd>
            <dt className="col-sm-3">Role</dt>
            <dd className="col-sm-9">{user.role}</dd>
            <dt className="col-sm-3">Create Account date</dt>
            <dd className="col-sm-9">{user.createaccountdate.toDateString()}</dd>
            <dt className="col-sm-3">Birthdate</dt>
            <dd className="col-sm-9">{
              user.birthdate.toDateString() === "Thu Jan 01 1970" ? <span></span> : user.birthdate.toDateString()}</dd>
          </dl>
        </div>
      </div>
    </>
  )
}