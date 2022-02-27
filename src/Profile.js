import React, { useContext, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import db from './db';
import Button from 'react-bootstrap/Button';
import UserContext from './UserContext'

export default function Profile({ set }) {

  const { user } = useContext(UserContext)

  const [users, setUsers] = useState([])
  useEffect(() => (async () => setUsers(await db.Users.findAll()))(), [])
  console.log(user);
  const [id, setId] = useState("");
  const [firstname, setFirstName] = useState("");
  const [role, setRole] = useState("");
  const [picture, setPicture] = useState("");
  const [gender, setGender] = useState("");
  const [lastname, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState(new Date())
  const [createaccountdate, setCreateaccountdate] = useState(new Date())

  const edit = async id => {
    const user = await db.Users.findOne(id)
    setId(user.id)
    setFirstName(user.firstname)
    setRole(user.role)
    setPicture(user.picture)
    setGender(user.gender)
    setLastName(user.lastname)
    setBirthdate(user.birthdate)
    setCreateaccountdate(user.createaccountdate)
    setStyleForm({
      display: 'block'
    })
    setStyleText({
      display: 'none'
    })
  }


  const update = async () => {
    await db.Users.update(setUsers, { id, firstname, role, picture, gender, lastname, birthdate, createaccountdate })
    setId("")
    setFirstName("")
    setRole("")
    setPicture("")
    setGender("")
    setLastName("")
    setBirthdate(new Date())
    setCreateaccountdate(new Date())

    setStyleForm({
      display: 'none'
    })
    setStyleText({
      display: 'block'
    })
  }

  const [styleForm, setStyleForm] = useState({
    display: 'none',
  });

  const [styleText, setStyleText] = useState({
    display: 'block'
  });
  const handleImage = async event => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      const extension = file.name.split('.').pop()
      const newName = `UsersPicture${user.id}.${extension}`
      const result = await db.uploadImage(file, newName)
      if (result.ok) {
        await db.Users.update(() => { }, { ...user, picture: `/images/${newName}` })
        set(await db.Users.findOne(user.id))
      }
    }
  }

  const [birthdayError, setBirthdayError] = useState('')
  const [genderError, setGenderError] = useState('')
  const [nameErrorEmpty, setPrsetNameErroroblemErrorEmpty] = useState('')

  const vaild = () => {
    if (birthdate < new Date()) {
      setBirthdayError("")
    } else {
      setBirthdayError("The Date is wronge!")
    }
    if (firstname === "" || lastname === "") {
      setPrsetNameErroroblemErrorEmpty("The name field is empty")
    } else {
      setPrsetNameErroroblemErrorEmpty("")
    }
    if (gender !== "") {
      setGenderError("")
    } else {
      setGenderError("Select Gender ")
    }
    if (birthdate < new Date() && gender !== "" && firstname !== "" && lastname !== "") {
      update()
    }
  }

  return (
    user &&
    <>
      <br></br>
      <div className="container">
        <h1>My profile</h1>
        <br></br>
        <div className="row">
          <div className="col">
            <div style={styleText}>
              {
                users.map(person => person.id === user.id ? (
                  <dl className="row" key={person.id}>
                    <dt className="col-sm-3">Email</dt>
                    <dd className="col-sm-9">{person.id}</dd>
                    <dt className="col-sm-3">First Name</dt>
                    <dd className="col-sm-9">{person.firstname}</dd>
                    <dt className="col-sm-3">Last Name</dt>
                    <dd className="col-sm-9">{person.lastname}</dd>
                    <dt className="col-sm-3">Gender</dt>
                    <dd className="col-sm-9">{person.gender}</dd>
                    <dt className="col-sm-3">Birthdate</dt>
                    <dd className="col-sm-9">{
                      person.birthdate.toDateString() === "Thu Jan 01 1970" ? <span></span> : person.birthdate.toDateString()}</dd>
                  </dl>
                ) : null
                )
              }
            </div>


            <Form style={styleForm}>
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" size="sm" onChange={event => setId(event.target.value)} placeholder="id" value={id} disabled />
              <br></br>
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" size="sm" onChange={event => setFirstName(event.target.value)} placeholder="Name" value={firstname} />
              <span style={{ color: 'red', fontWeight: 'bold' }}> {nameErrorEmpty} </span><br></br>
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" size="sm" onChange={event => setLastName(event.target.value)} placeholder="Name" value={lastname} />
              <span style={{ color: 'red', fontWeight: 'bold' }}> {nameErrorEmpty} </span><br></br>
              <Form.Label>Gender</Form.Label>
              <Form.Control as="select" onChange={event => setGender(event.target.value)} placeholder="gender" value={gender} >
                <option key={''} value={''} disabled >--Select-- </option>
                <option key={'Male'} value={'Male'} >Male</option>
                <option key={'Female'} value={'Female'}>Female</option>
              </Form.Control>
              <span style={{ color: 'red', fontWeight: 'bold' }}> {genderError} </span><br></br>
              <Form.Label>Birthdate</Form.Label>
              <Form.Control type="date" size="sm" onChange={event => setBirthdate(event.target.value)} placeholder="birthdate" value={birthdate} />
              <span style={{ color: 'red', fontWeight: 'bold' }}> {birthdayError} </span>
              {/* <Form.Label>Picture</Form.Label> */}
              {/* <Form.File custom label="Choose new picture" onChange={handleImage} /> */}
            </Form>

            <br></br>

            <Button variant="primary" size="sm" onClick={() => edit(user.id)} style={{ marginRight: '10px' }}>Edit</Button>
            <Button variant="success" size="sm" onClick={vaild} >Update</Button>
          </div>


          <div className="col">
            <strong>Picture</strong><br></br><br></br>
            <img alt="" src={`${user.picture}?${new Date().getTime()}`} height="150" width="150" /><br></br><br></br>
            <Form.File custom label="Choose new picture" onChange={handleImage} />
          </div>
        </div>

      </div>



    </>
  )
}