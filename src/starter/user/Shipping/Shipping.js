import React, { useContext, useEffect, useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import UserContext from '../../../UserContext';
import db from '../../../db';
import validator from 'validator'
import {
  useParams
} from "react-router-dom";

import Spinner from 'react-bootstrap/Spinner';

export default function Shipping() {
  const { total: stringId } = useParams();
  const total = 1 * stringId

  //console.log(total);

  const now = 60;
  const progressInstance = <ProgressBar now={now} animated striped variant="primary" label={`${now}%`} />;

  const { user } = useContext(UserContext)

  const [shippings, setShipping] = useState([])
  useEffect(() => (async () => setShipping(await db.Shippings.findAll()))(), [])

  //console.log('shippings',shippings);

  const [shippingsUser, setShippingUser] = useState([])
  useEffect(() => (async () => setShippingUser(await db.Shippings.findByUserid(user.id)))(), [user])




  const [id, setId] = useState(0)
  const [userid, setUserid] = useState(user.id)
  const [status, setStatus] = useState("")
  const [country, setCountry] = useState("Qatar")
  const [city, setCity] = useState("")
  const [pobox, setPobox] = useState(0)
  const [address, setAddress] = useState("")
  const [streetnum, setStreetnum] = useState(0)
  const [email, setEmail] = useState("")
  const [phonenumber, setPhonenumber] = useState(0)
  const [shippingmethod, setShippingmethod] = useState("")
  const [longitude, setLongitude] = useState("")
  const [latitude, setLatitude] = useState("")


  const [statuss, setStatuss] = useState(null);

  const [styleForm, setStyleForm] = useState({
    display: 'none',
  });

  const [styleText, setStyleText] = useState({
    display: 'block'
  });


  const create = async () => {
    await db.Shippings.create(setShipping, { id, userid, status, country: 'Qatar', city, pobox, address, streetnum, email, phonenumber, shippingmethod, longitude, latitude })
    setId(0)
    setUserid("")
    setStatus("")
    setCity("")
    setPobox(0)
    setAddress("")
    setStreetnum(0)
    setEmail("")
    setPhonenumber(0)
    setShippingmethod("")
    setLongitude("")
    setLatitude("")
    window.location = `http://localhost:3000/shipping/${total}`;
  }


  const edit = async id => {
    const ship = await db.Shippings.findOne(id)
    setId(id)
    setUserid(ship.userid)
    setStatus(ship.status)
    setCountry(ship.country)
    setCity(ship.city)
    setPobox(ship.pobox)
    setAddress(ship.address)
    setStreetnum(ship.streetnum)
    setEmail(ship.email)
    setPhonenumber(ship.phonenumber)
    setShippingmethod(ship.shippingmethod)
    setLongitude(ship.longitude)
    setLatitude(ship.latitude)
    setStyleForm({
      display: 'block'
    })
    setStyleText({
      display: 'none'
    })

  }


  const update = async () => {
    await db.Shippings.update(setShipping, { id, userid, status, country, city, pobox, address, streetnum, email, phonenumber, shippingmethod, longitude, latitude })
    setId(0)
    setUserid("")
    setStatus("")
    setCity("")
    setPobox(0)
    setAddress("")
    setStreetnum(0)
    setEmail("")
    setPhonenumber(0)
    setShippingmethod("")
    setLongitude("")
    setLatitude("")
    setStyleForm({
      display: 'none'
    })
    setStyleText({
      display: 'block'
    })


  }


  const [totalShipping, setTotalShipping] = useState(0);
  const [totalShippingPay, setTotalShippingPay] = useState(0);

  useEffect(() => (async () => {
    let totalShipping = 0;
    const ship = await db.Shippings.findByUserid(user.id)
    console.log(ship);

    if (ship && ship.length > 0) {
      if (total >= 1000) {
        totalShipping = 0
        setTotalShipping(totalShipping)
        setTotalShippingPay(total)
      }
      else if (ship[0].shippingmethod === 'Express Shipping') {
        totalShipping = 94
        setTotalShipping(totalShipping)
        setTotalShippingPay(total+94)
      }
      else if (ship[0].shippingmethod === 'Standard Shipping') {
        totalShipping = 69
        setTotalShipping(totalShipping)
        setTotalShippingPay(total+69)
      }
      console.log('okau');
    }



    setTotalShipping(totalShipping)
    //console.log('total', totalShipping);
  })(), [shippingsUser,shippingmethod])


  const [cityERR, setCityERR] = useState("")
  const [poboxERR, setPoboxERR] = useState("")
  const [addressERR, setAddressERR] = useState("")
  const [streetnumERR, setStreetnumERR] = useState("")
  const [emailERR, setEmailERR] = useState("")
  const [phonenumberERR, setPhonenumberERR] = useState("")
  const [shippingmethodERR, setShippingmethodERR] = useState("")


  const Valid = () => {
    if (city === "") {
      setCityERR("Select your City")
    } else {
      setCityERR("")
    } if (pobox.length !== 4) {
      setPoboxERR("Should be 4 Numbers")
    } else {
      setPoboxERR("")
    } if (address === "") {
      setAddressERR("Enter your Address")
    } else {
      setAddressERR("")
    } if (streetnum === 0) {
      setStreetnumERR("Enter your Street Number")
    } else {
      setStreetnumERR("")
    } if (validator.isEmail(email)) {
      setEmailERR("")
    } else {
      setEmailERR("Not valid")
    } if (phonenumber.length !== 8) {
      setPhonenumberERR("Not valid")
    } else {
      setPhonenumberERR("")
    } if (shippingmethod.length === 0) {
      setShippingmethodERR("Select your shipping method")
    } else {
      setShippingmethodERR("")
    }
    if (city !== "" && pobox.length === 4 && address !== "" && streetnum > 0 && validator.isEmail(email) && phonenumber.length === 8 && shippingmethod !== "") {
      create()
    }
  }

  const ValidUpdate = () => {
    if (city === "") {
      setCityERR("Select your City")
    } else {
      setCityERR("")
    } if (pobox > 100 && pobox < 999) {
      setPoboxERR("Should be 4 Numbers")
    } else {
      setPoboxERR("")
    } if (address === "") {
      setAddressERR("Enter your Address")
    } else {
      setAddressERR("")
    } if (streetnum === 0) {
      setStreetnumERR("Enter your Street Number")
    } else {
      setStreetnumERR("")
    } if (validator.isEmail(email)) {
      setEmailERR("")
    } else {
      setEmailERR("Not valid")
    } if (phonenumber > 10000000 && phonenumber < 99999999) {
      setPhonenumberERR("")
    } else {
      setPhonenumberERR("Not valid")
      //console.log(pobox.length);
    } if (shippingmethod.length === 0) {
      setShippingmethodERR("Select your shipping method")
    } else {
      setShippingmethodERR("")
    }
    if (city !== "" && pobox > 100 && pobox < 999 && address !== "" && streetnum > 0 && validator.isEmail(email) && phonenumber > 10000000 && phonenumber < 99999999 && shippingmethod !== "") {
      return true
    }
  }


  const [styleStatuss, setStyleStatuss] = useState({
    display: 'none',
  });

  const [styleButtonPay, setStyleButtonPay] = useState({
    display: 'none',
    float: 'right'
  });

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatuss('Geolocation is not supported by your browser');
    } else {
      setStatuss('Locating...');
      navigator.geolocation.getCurrentPosition((position) => {
        setStatuss('We got your location');
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      }, () => {
        setStatuss('Unable to retrieve your location - Click on the icon that is on the rigth side of the refresh page icon to Allow location ');
      });
    }
    setStyleStatuss({ display: 'block', fontWeight: 'bold' })
  }

  const vaildPay  = async () =>{
    const ship = await db.Shippings.findByUserid(user.id)
    if (ship && ship.length > 0) {
      window.location = `http://localhost:3000/payment/${totalShippingPay}/${totalShipping}/${ship[0].id}`;
    }
  }

  return (
    <>
      <br></br>
      {progressInstance}
      <br></br>
      <h1>Shipping</h1>
      <br></br>
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            {shippingsUser ?
              shippingsUser.length === 0 ?
                <div>
                  <Form.Label style={{ fontWeight: 'bold' }}>Country</Form.Label>
                  <Form.Control type="text" size="sm" onChange={event => setCountry(event.target.value)} placeholder="country" value={country} readOnly />
                  <br></br>
                  <Form.Label style={{ fontWeight: 'bold' }}>City</Form.Label>
                  <Form.Control as="select" size="sm" onChange={event => setCity(event.target.value)} placeholder="city" value={city} >
                    <option key={""} value={""} disabled>-Select-</option>
                    <option key={"Doha"} value={"Doha"}>Doha</option>
                    <option key={"Al Wakrah"} value={"Al Wakrah"}>Al Wakrah</option>
                    <option key={"Al Khor"} value={"Al Khor"}>Al Khor</option>
                    <option key={"Dukhan"} value={"Dukhan"}>Dukhan</option>
                    <option key={"Mesaieed"} value={"Mesaieed"}>Mesaieed</option>
                    <option key={"Al Rayyan"} value={"Al Rayyan"}>Al Rayyan</option>
                    <option key={"Umm Salal Muhammed"} value={"Umm Salal Muhammed"}>Umm Salal Muhammed</option>
                    <option key={"Al Wukair"} value={"Al Wukair"}>Al Wukair</option>
                    <option key={"Al Ruwais"} value={"Al Ruwais"}>Al Ruwais</option>
                  </Form.Control>
                  <span style={{ fontWeight: 'bold', color: 'red' }}>{cityERR}</span><br></br>
                  <Form.Label style={{ fontWeight: 'bold' }}>Pobox</Form.Label>
                  <Form.Control type="number" size="sm" onChange={event => setPobox(event.target.value)} placeholder="pobox" value={pobox} />
                  <span style={{ fontWeight: 'bold', color: 'red' }}>{poboxERR}</span><br></br>

                  <Form.Label style={{ fontWeight: 'bold' }}>Address</Form.Label>
                  <Form.Control type="text" size="sm" onChange={event => setAddress(event.target.value)} placeholder="address" value={address} />
                  <span style={{ fontWeight: 'bold', color: 'red' }}>{addressERR}</span><br></br>

                  <Form.Label style={{ fontWeight: 'bold' }}>Street number</Form.Label>
                  <Form.Control type="number" size="sm" onChange={event => setStreetnum(event.target.value)} placeholder="street number" value={streetnum} />
                  <span style={{ fontWeight: 'bold', color: 'red' }}>{streetnumERR}</span><br></br>

                  <Form.Label style={{ fontWeight: 'bold' }}>Email</Form.Label>
                  <Form.Control type="text" size="sm" onChange={event => setEmail(event.target.value)} placeholder="email" value={email} />
                  <span style={{ fontWeight: 'bold', color: 'red' }}>{emailERR}</span><br></br>

                  <Form.Label style={{ fontWeight: 'bold' }}>Shipping method</Form.Label>
                  <Form.Control as="select" size="sm" onChange={event => setShippingmethod(event.target.value)} placeholder="shipping method" value={shippingmethod} >
                    <option key={""} value={""} disabled>-Select-</option>
                    <option key={"Express Shipping"} value={"Express Shipping"}>Express Shipping</option>
                    <option key={"Standard Shipping"} value={"Standard Shipping"}>Standard Shipping</option>
                  </Form.Control>
                  <span style={{ fontWeight: 'bold', color: 'red' }}>{shippingmethodERR}</span><br></br>

                  <Form.Label style={{ fontWeight: 'bold' }}>Phonenumber</Form.Label>
                  <Form.Control type="number" size="sm" onChange={event => setPhonenumber(event.target.value)} placeholder="phone number" value={phonenumber} />
                  <span style={{ fontWeight: 'bold', color: 'red' }}>{phonenumberERR}</span><br></br>


                  <Button variant="primary" style={{ float: 'right' }} onClick={getLocation} >Get Location</Button>
                  <br></br><br></br>
                  <span style={styleStatuss}>{statuss}</span>
                  <Button variant="primary" onClick={() => Valid()}>Save</Button>
                </div> :
                <div>
                  <div style={styleText}>
                    {
                      shippings.map(ship => ship.userid === user.id ? (
                        <dl className="row" key={ship.id}>
                          <dt className="col-sm-3">Country</dt>
                          <dd className="col-sm-9">{ship.country}</dd>
                          <dt className="col-sm-3">City</dt>
                          <dd className="col-sm-9">{ship.city}</dd>
                          <dt className="col-sm-3">Address</dt>
                          <dd className="col-sm-9">{ship.address}</dd>
                          <dt className="col-sm-3">Street number</dt>
                          <dd className="col-sm-9">{ship.streetnum}</dd>
                          <dt className="col-sm-3">Shipping method</dt>
                          <dd className="col-sm-9">{ship.shippingmethod}</dd>
                          <dt className="col-sm-3">Phonenumber</dt>
                          <dd className="col-sm-9">{ship.phonenumber}</dd>
                          <dt className="col-sm-3">Pobox</dt>
                          <dd className="col-sm-9">{ship.pobox}</dd>
                          <dt className="col-sm-3">Email</dt>
                          <dd className="col-sm-9">{ship.email}</dd>
                        </dl>
                      ) : null)
                    }
                    <Button variant="primary" onClick={() => edit(shippingsUser && shippingsUser[0].id)}>Edit</Button>

                  </div>
                  <div style={styleForm}>
                    <Form.Label style={{ fontWeight: 'bold' }}>Country</Form.Label>
                    <Form.Control type="text" size="sm" onChange={event => setCountry(event.target.value)} placeholder="country" value={country} readOnly />
                    <br></br>
                    <Form.Label style={{ fontWeight: 'bold' }}>City</Form.Label>
                    <Form.Control as="select" size="sm" onChange={event => setCity(event.target.value)} placeholder="city" value={city} >
                      <option key={""} value={""} disabled>-Select-</option>
                      <option key={"Doha"} value={"Doha"}>Doha</option>
                      <option key={"Al Wakrah"} value={"Al Wakrah"}>Al Wakrah</option>
                      <option key={"Al Khor"} value={"Al Khor"}>Al Khor</option>
                      <option key={"Dukhan"} value={"Dukhan"}>Dukhan</option>
                      <option key={"Mesaieed"} value={"Mesaieed"}>Mesaieed</option>
                      <option key={"Al Rayyan"} value={"Al Rayyan"}>Al Rayyan</option>
                      <option key={"Umm Salal Muhammed"} value={"Umm Salal Muhammed"}>Umm Salal Muhammed</option>
                      <option key={"Al Wukair"} value={"Al Wukair"}>Al Wukair</option>
                      <option key={"Al Ruwais"} value={"Al Ruwais"}>Al Ruwais</option>
                    </Form.Control>
                    <span style={{ fontWeight: 'bold', color: 'red' }}>{cityERR}</span><br></br>

                    <Form.Label style={{ fontWeight: 'bold' }}>Pobox</Form.Label>
                    <Form.Control type="number" size="sm" onChange={event => setPobox(event.target.value)} placeholder="pobox" value={pobox} />
                    <span style={{ fontWeight: 'bold', color: 'red' }}>{poboxERR}</span><br></br>

                    <Form.Label style={{ fontWeight: 'bold' }}>Address</Form.Label>
                    <Form.Control type="text" size="sm" onChange={event => setAddress(event.target.value)} placeholder="address" value={address} />
                    <span style={{ fontWeight: 'bold', color: 'red' }}>{addressERR}</span><br></br>

                    <Form.Label style={{ fontWeight: 'bold' }}>Street number</Form.Label>
                    <Form.Control type="number" size="sm" onChange={event => setStreetnum(event.target.value)} placeholder="street number" value={streetnum} />
                    <span style={{ fontWeight: 'bold', color: 'red' }}>{streetnumERR}</span><br></br>

                    <Form.Label style={{ fontWeight: 'bold' }}>Email</Form.Label>
                    <Form.Control type="text" size="sm" onChange={event => setEmail(event.target.value)} placeholder="email" value={email} />
                    <span style={{ fontWeight: 'bold', color: 'red' }}>{emailERR}</span><br></br>

                    <Form.Label style={{ fontWeight: 'bold' }}>Shipping method</Form.Label>
                    <Form.Control as="select" size="sm" onChange={event => setShippingmethod(event.target.value)} placeholder="shipping method" value={shippingmethod} >
                      <option key={""} value={""} disabled>-Select-</option>
                      <option key={"Express Shipping"} value={"Express Shipping"}>Express Shipping</option>
                      <option key={"Standard Shipping"} value={"Standard Shipping"}>Standard Shipping</option>
                    </Form.Control>
                    <span style={{ fontWeight: 'bold', color: 'red' }}>{shippingmethodERR}</span><br></br>

                    <Form.Label style={{ fontWeight: 'bold' }}>Phonenumber</Form.Label>
                    <Form.Control type="number" size="sm" onChange={event => setPhonenumber(event.target.value)} placeholder="phone number" value={phonenumber} />
                    <span style={{ fontWeight: 'bold', color: 'red' }}>{phonenumberERR}</span><br></br>

                    <Button variant="primary" onClick={update}>Update</Button>
                    <Button variant="primary" style={{ float: 'right' }} onClick={getLocation} >Get Location</Button>
                    <br></br><br></br>
                    <span style={styleStatuss}>{statuss}</span>

                  </div>


                </div>
              : <Spinner animation="border" variant="success" />}

          </div>














          <div className="col-sm-5" >
            <h2 style={{ color: 'green' }}>Order summary</h2>
            <h3 style={{ fontSize: '18px' }}>Total <span style={{ float: 'right' }}>{total} QR</span> </h3>


            <h3 style={{ fontSize: '18px', marginBottom: '5px' }}>
              Shipping Cost
            <span style={{ float: 'right' }}>{totalShipping} QR</span>


            </h3>
            <hr></hr>
            <h3 style={{ fontSize: '18px' }}>Grand Total<span style={{ float: 'right' }}>{totalShippingPay} QR</span> </h3>
            <br></br>

            {/* {
              shippingsUser.length > 0 ? <Button variant="primary" as={Link} to={`/payment/${GrandCost()}`}>Proceed to Pay</Button> : null
            } */}
 {
              shippingsUser.length > 0 ? <Button variant="primary" onClick={vaildPay}>Proceed to Pay</Button> : null
            }


            <br></br><br></br><br></br><br></br>
            <p><strong>Our plants are packaged with care and delivered from our greenhouse to your door.</strong></p>
            <ul>
              <li>All orders over 1000 QR ship free</li>
              <li>Express Shipping - 3-6 Business days QAR 94</li>
              <li>Standard Shipping - 5-9 Business days QAR 69</li>
              <li>Express Shipping can be next day of order or within 24h</li>
            </ul>
            <p><strong>Whats included</strong></p>
            <ul>
              <li>Plant Potted</li>
              <li>Add on option of seed kit</li>
              <li>Care instructions</li>
              <li>Care & support tips for the lifetime of your plant</li>
              <li>30-Day Guarantee</li>

            </ul>


          </div>

        </div>
      </div>






    </>
  )
}