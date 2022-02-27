import React, { useContext, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import db from './db';
import Button from 'react-bootstrap/Button';
import UserContext from './UserContext'
import validator from 'validator'
export default function ProfileSupplier({ set }) {

  const { user } = useContext(UserContext)

  const [suppliers, setSuppliers] = useState([])
  useEffect(() => (async () => setSuppliers(await db.Suppliers.findAll()))(), [])
  console.log(suppliers);

  const [id, setId] = useState(0);
  const [userid, setUserid] = useState("");
  const [companyname, setCompanyname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fax, setFax] = useState("");
  const [pobox, setPobox] = useState("");

  const edit = async id => {
    const supp = await db.Suppliers.findOne(id)
    setId(supp.id)
    setUserid(supp.userid)
    setCompanyname(supp.companyname)
    setEmail(supp.email)
    setPhone(supp.phone)
    setFax(supp.fax)
    setPobox(supp.pobox)

    setStyleForm({
      display: 'block'
    })
    setStyleText({
      display: 'none'
    })
  }


  const update = async () => {
    await db.Suppliers.update(setSuppliers, { id, userid, companyname, email, phone, fax, pobox })
    setId(0)
    setUserid("")
    setCompanyname("")
    setEmail("")
    setPhone("")
    setFax("")
    setPobox("")

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


  const [companynameERR, setCompanynameERR] = useState("");
  const [emailERR, setEmailERR] = useState("");
  const [phoneERR, setPhoneERR] = useState("");
  const [faxERR, setFaxERR] = useState("");
  const [poboxERR, setPoboxERR] = useState("");

  const vaild = () => {
    if (companyname === "") {
      setCompanynameERR("The Companyname is field is empty")
    } else {
      setCompanynameERR("")
    }
    if (phone.length === 8) {
      setPhoneERR("")
    } else {
      setPhoneERR("8 digits ")
    }
    if (pobox.length > 2 && pobox.length < 5) {
      setPoboxERR("")
    } else {
      setPoboxERR("4 digits ")
    }
    if (fax.length === 8) {
      setFaxERR("")
    } else {
      setFaxERR("Select Gender ")
    }

    if (validator.isEmail(email)) {
      setEmailERR("")
    } else {
      setEmailERR("dont vaild ")
    }


    if (validator.isEmail(email) && companyname !== "" && fax.length === 8 && phone.length === 8 && pobox.length > 2 && pobox.length < 5) {
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
                suppliers.map(supp => supp.userid === user.id ? (
                  <dl className="row" key={supp.id}>
                    <dt className="col-sm-3">Email</dt>
                    <dd className="col-sm-9">{supp.email}</dd>
                    <dt className="col-sm-3">Company Name</dt>
                    <dd className="col-sm-9">{supp.companyname}</dd>
                    <dt className="col-sm-3">Phone</dt>
                    <dd className="col-sm-9">{supp.phone}</dd>
                    <dt className="col-sm-3">Fax</dt>
                    <dd className="col-sm-9">{supp.fax}</dd>
                    <dt className="col-sm-3">Pobox</dt>
                    <dd className="col-sm-9">{supp.pobox}</dd>

                  </dl>
                ) : null
                )
              }
            </div>

            <Form style={styleForm}>
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" size="sm" onChange={event => setEmail(event.target.value)} placeholder="email" value={email} disabled />
              <span style={{ color: 'red', fontWeight: 'bold' }}> {emailERR} </span><br></br>

              <br></br>
              <Form.Label>Company Name</Form.Label>
              <Form.Control type="text" size="sm" onChange={event => setCompanyname(event.target.value)} placeholder="companyname" value={companyname} />
              <span style={{ color: 'red', fontWeight: 'bold' }}> {companynameERR} </span><br></br>


              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" size="sm" onChange={event => setPhone(event.target.value)} placeholder="phone" value={phone} />
              <span style={{ color: 'red', fontWeight: 'bold' }}> {phoneERR} </span><br></br>

              <Form.Label>Fax</Form.Label>
              <Form.Control type="text" size="sm" onChange={event => setFax(event.target.value)} placeholder="fax" value={fax} />
              <span style={{ color: 'red', fontWeight: 'bold' }}> {faxERR} </span><br></br>

              <Form.Label>Pobox</Form.Label>
              <Form.Control type="text" size="sm" onChange={event => setPobox(event.target.value)} placeholder="pobox" value={pobox} />

              <span style={{ color: 'red', fontWeight: 'bold' }}> {poboxERR} </span><br></br>




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