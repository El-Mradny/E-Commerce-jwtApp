import React, { useEffect, useState } from 'react'
import db from '../../../db'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import UserAdminRow from './UserAdminRow'

export default function UserAdmin() {

    const [users, setUsers] = useState([])
    const [id, setId] = useState("")
    const [role, setRole] = useState("")
    const [gender, setGender] = useState("")
    const [firstname, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [birthdate, setBirthdate] = useState(new Date())
    const [createaccountdate, setCreateAccountdate] = useState(new Date())
    const [picture, setPicture] = useState("")

    useEffect(() => (async () => setUsers(await db.Users.findAll()))(), [])


    const create = async () => {
        await db.Users.create(setUsers, { id, firstname, role, picture: '/images/UsersPictureDefault.png' })
        setId("")
        setRole("")
        setGender("")
        setFirstName("")
        setLastName("")
        setBirthdate(new Date())
        setCreateAccountdate(new Date())
        setPicture("")
    }

    const remove = async id => await db.Users.remove(setUsers, id)

    const edit = async id => {
        const user = await db.Users.findOne(id)
        setId(user.id)
        setRole(user.role)
        setGender(user.gender)
        setFirstName(user.firstname)
        setLastName(user.lastName)
        setBirthdate(new Date())
        setCreateAccountdate(new Date())
        setPicture(user.picture)

    }

    // update is step 2
    const update = async () => {
        await db.Users.update(setUsers, { id, firstname, role, picture, gender, lastName, birthdate, createaccountdate })
        setId("")
        setRole("")
        setGender("")
        setFirstName("")
        setLastName("")
        setBirthdate(new Date())
        setCreateAccountdate(new Date())
        setPicture("")


    }

    const [validUpdate, setValidUpdate] = useState(false)
    useEffect(() => (async () => setValidUpdate(
        role !== "" && firstname !== "" &&

        id !== "" && await db.Users.findOne(id) !== undefined
    ))(), [id, role, firstname])

    return (
        <div>
            <br></br>
            <h1>Users</h1>
            <br></br>
            <Table striped bordered hover responsive variant="success" size="sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <Form.Control size="sm" type="text" onChange={event => setId(event.target.value)} placeholder="ID" value={id} />
                        </td>
                        <td>
                            <Form.Control size="sm" type="text" onChange={event => setFirstName(event.target.value)} placeholder="Name" value={firstname} />
                        </td>
                        <td>
                            <Form.Control size="sm" type="text" onChange={event => setRole(event.target.value)} placeholder="Role" value={role} />
                        </td>
                        <td>
                            <Button variant="warning" onClick={update}  >Update</Button>
                            <Button variant="success" onClick={create} >Create</Button>
                        </td>
                        {/* disabled={!validUpdate} disabled={!createValid} */}
                    </tr>
                    {
                        users.map(user =>
                            <UserAdminRow key={user.id} user={user} edit={edit} remove={remove} />
                        )
                    }
                </tbody>
            </Table>
        </div >
    );
}