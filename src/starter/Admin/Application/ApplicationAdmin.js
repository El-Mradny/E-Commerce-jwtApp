import React, { useState, useEffect } from 'react'
import db from '../../../db';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ApplicationAdminRow from './ApplicationAdminRow'
import Table from 'react-bootstrap/Table'

export default function ApplicationAdmin() {

    //const { user } = useContext(UserContext)

    const [applications, setApplications] = useState([])
    useEffect(() => (async () => setApplications(await db.Applications.findAll()))(), [])
    //console.log(applications)

    const [id, setId] = useState(0)
    const [cv, setCv] = useState('')
    const [userid, setUserid] = useState("")
    const [roleapplying, setRoleapplying] = useState("")
    const [applieddate, setApplieddate] = useState(new Date())
    const [status, SetStatus] = useState("")

    const create = async () => {
        await db.Applications.create(setApplications, { id, cv, userid, roleapplying, applieddate, status })
        setId(0)
        setCv("")
        setUserid("")
        setRoleapplying("")
        setApplieddate(new Date())
        SetStatus("")
    }

    const remove = async (id) => {
        await db.Applications.remove(setApplications, id)
    }

    const edit = async (id) => {
        const app = await db.Applications.findOne(id)
        setId(app.id)
        setCv(app.cv)
        setUserid(app.userid)
        setRoleapplying(app.roleapplying)
        setApplieddate(app.applieddate)
        SetStatus(app.status)
    }
    const update = async () => {
        await db.Applications.update(setApplications, { id, cv, userid, roleapplying, applieddate, status })
        setId(0)
        setCv("")
        setUserid("")
        setRoleapplying("")
        setApplieddate(new Date())
        SetStatus("")
    }

    const clear = async () => {
        setId(0)
        setCv("")
        setUserid("")
        setRoleapplying("")
        setApplieddate(new Date())
        SetStatus("")
    }

    // birthdate < new Date()

    // const [cvError, setCvError] = useState('')
    // const [roleError, setRoleError] = useState('')
    // const [DateError, setDateError] = useState('')
    // const [UserError, setUserError] = useState('')
    // const [StatusError, setStatusError] = useState('')
    // const vaild = () => {
    //     if (cv.length > 0) {
    //         setCvError("")
    //     } else {
    //         setCvError('Enter The Resume')
    //     }
    //     if (roleapplying.length > 0) {
    //         setRoleError('')
    //     } else {
    //         setRoleError('Select The Role')
    //     }
    //     if (applieddate < new Date()) {
    //         setDateError('')
    //     } else {
    //         setDateError('Select A Proper Date')
    //     }
    //     if (userid.length > 0 ) {
    //         setUserError('')
    //     } else {
    //         setUserError('Select A User')
    //     }
    //     if (cv.length > 0 && roleapplying.length > 0 && applieddate < new Date() && userid.length > 0) {
    //         console.log("iji");
    //     }
    // }

    const handleCv = async event => {
        if (event.target.files.length > 0) {
            const file = event.target.files[0]
            const extension = file.name.split('.').pop()
            const newName = `ApplicationDocument-${userid}.${extension}`
            const result = await db.uploadFile(file, newName)
            if (result.ok) {
                setCv(`/images/${newName}`)
            }
        }
    }

    const [createUpdate, setCreateUpdate] = useState(false)
    useEffect(() => (async () => setCreateUpdate(
        cv.length > 0 && roleapplying.length > 0 && applieddate > new Date() || +applieddate + new Date()
        && status !== "" && id && await db.Applications.findOne(id) === undefined
    ))(), [ id,cv, roleapplying, applieddate, status])

    const [createValid, setCreateValid] = useState(false)
    useEffect(() => (async () => setCreateValid(
        cv.length > 0 && roleapplying.length > 0 && applieddate >= new Date() 
         && status !== ""
    ))(), [cv, roleapplying, applieddate, status])

    const [users, setUsers] = useState([])
    useEffect(() => (async () => setUsers(await db.Users.findAll()))(), [])

    return (
        <>
            <br></br>
            <h1>Applications</h1>
            <br></br><br></br>
            <Table striped bordered hover responsive variant="success" size="sm">
                <thead><tr><th>User id</th><th>Current Role</th><th>Applied Date</th><th>Role Appiled</th><th>Status</th><th>image</th><th>CV</th><th></th></tr></thead>
                <tbody>
                    <tr>
                        <td>
                            <Form.Control size="sm" as="select" onChange={event => setUserid(event.target.value)} value={userid} placeholder="userid">
                                    <option key={""} value={""} disabled>--Select--</option>
                                    {
                                        users.map(user =>
                                            <option key={user.id} value={user.id}>{user.id}</option>
                                        )
                                    }

                                </Form.Control>
                            {/* <span style={{ fontWeight: 'bold', color: 'red' }}>{UserError}</span> */}
                        </td>
                        <td></td>
                        <td>
                            <Form.Control type="date" onChange={event => setApplieddate(new Date(event.target.value))} placeholder="applieddate" value={applieddate.toISOString().slice(0, 10)} />
                            {/* <span style={{ fontWeight: 'bold', color: 'red' }}>{DateError}</span> */}
                        </td>
                        <td>
                            <Form.Control size="sm" as="select" placeholder="roleapplying" onChange={event => setRoleapplying(event.target.value)} value={roleapplying}>
                                <option key={""} value={""} disabled>--Select--</option>
                                <option key={'Supplier'} value={'Supplier'} >Supplier</option>
                                <option key={'Customer Services'} value={'Customer Services'}>Customer Services</option>
                                <option key={'Accountant'} value={'Accountant'}>Accountant</option>
                                <option key={'Marketing Coordinator'} value={'Marketing Coordinator'}>Marketing Coordinator</option>
                            </Form.Control>
                            {/* <span style={{ fontWeight: 'bold', color: 'red' }}>{roleError}</span> */}
                        </td>
                        

                        <td>
                            <Form.Control size="sm" as="select" placeholder="status" onChange={event => SetStatus(event.target.value)} value={status}>
                                <option key={""} value={""} disabled>--Select--</option>
                                <option key={'Approved'} value={'Approved'} >Approved</option>
                                <option key={'Not Approved'} value={'Not Approved'}>Not Approved</option>
                                <option key={'-'} value={'-'} hidden>-</option>
                            </Form.Control>
                            {/* <span style={{ fontWeight: 'bold', color: 'red' }}>{StatusError}</span> */}
                        </td>
                        <td></td>
                        <td>
                            <Form.Control size="sm" type="file" accept=".pdf" onChange={handleCv} placeholder="Cv" />
                            {/* <span style={{ fontWeight: 'bold', color: 'red' }}>{cvError}</span> */}
                            <span style={{ fontWeight: 'bold', color: 'green' }}>**Only pdf**</span>
                        </td>

                        <td>
                        <Button variant="light" style={{ backgroundColor: "#4582ec", color: 'white' }} onClick={clear}>Clear</Button>
                            <Button variant="warning" onClick={update} disabled={!createUpdate}>Update</Button>
                            <Button variant="success" onClick={create} disabled={!createValid}>Create</Button>

                        </td>
                    </tr>
                    {
                        applications.map(application => <ApplicationAdminRow key={application.id} application={application} remove={remove} edit={edit} clear={clear} />

                        )
                    }
                </tbody>
            </Table>
        </>
    )
}