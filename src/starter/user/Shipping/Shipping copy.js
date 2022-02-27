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
import ShippingTotal from './ShippingTotal'
export default function Shipping() {
  const { total: stringId } = useParams();
  const total = 1 * stringId


  const now = 60;
  const progressInstance = <ProgressBar now={now} animated striped variant="primary" label={`${now}%`} />;

  const { user } = useContext(UserContext)



  const [shippings, setShipping] = useState([])
  useEffect(() => (async () => setShipping(await db.Shippings.findAll()))(), [])

  //console.log(shippings);

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



  // const [lat, setLat] = useState(null);
  // const [lng, setLng] = useState(null);
  const [statuss, setStatuss] = useState(null);

  const create = async () => {
    await db.Shippings.create(setShipping, { id, userid, status, country: 'Qatar', city, pobox, address, streetnum, email, phonenumber, shippingmethod, longitude, latitude })
    // setId(0)
    // setUserid("")
    // setStatus("")
    // setCity("")
    // setPobox(0)
    // setAddress("")
    // setStreetnum(0)
    // setEmail("")
    // setPhonenumber(0)
    // setShippingmethod("")
    // setLongitude("")
    // setLatitude("")
  }

  const edit = async id => {
    const ship = await db.Shippings.findOne(id)
    setId(id)
    setUserid(ship.userid)
    setStatus(ship.status)
    setCity(ship.country)
    setPobox(ship.pobox)
    setAddress(ship.address)
    setStreetnum(ship.streetnum)
    setEmail(ship.email)
    setPhonenumber(ship.phonenumber)
    setShippingmethod(ship.shippingmethod)
    setLongitude(ship.longitude)
    setLatitude(ship.latitude)
  }


  const update = async () => {
    await db.Shippings.update(setShipping, { id, userid, status, country, city, pobox, address, streetnum, email, phonenumber, shippingmethod, longitude, latitude })
    // setId(0)
    // setUserid("")
    // setStatus("")
    // setCity("")
    // setPobox(0)
    // setAddress("")
    // setStreetnum(0)
    // setEmail("")
    // setPhonenumber(0)
    // setShippingmethod("")
    // setLongitude("")
    // setLatitude("")
  }

  const ShippingCost = () => {
    var Shipping = 0;
    if (total >= 1000 || total === 0) {
      Shipping = 0

    } else {
      Shipping = 50

    }

    return Shipping
  }

  const GrandCost = () => {
    return ShippingCost() + total
  }


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

  const [styleN, setStyleN] = useState({
    display: 'none',
  });

  const [styleBG, setStyleBG] = useState({
    backgroundColor:'#00000073',
    zIndex:'10',
    position:'absolute',

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
    setStyleN({ display: 'block', fontWeight: 'bold' })
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
            <div style={styleBG}>
            <Form.Label style={{ fontWeight: 'bold' }}>Country</Form.Label>
            <Form.Control type="text" size="sm" onChange={event => setCountry(event.target.value)} placeholder="country" value={country} readOnly />
            <br></br>
            <Form.Label style={{ fontWeight: 'bold' }}>City</Form.Label>
            <Form.Control as="select" size="sm" onChange={event => setCity(event.target.value)} placeholder="city" value={city} >
              <option key={""} value={""} disabled>-Select-</option>
              <option key={"Published"} value={"Published"}>Yes</option>
              <option key={"Not Published"} value={"Not Published"}>No</option>
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
            
            {
                          shippings.map(personEmail =>
                            personEmail.userid === userid?
                            <div>
                            <Button variant="primary" onClick={()=>Valid()}>Edit</Button>
                            </div>
                            :<Button variant="primary" onClick={()=>Valid()}>Save</Button>
                            )
            }
            {/* <Button variant="primary" onClick={()=>Valid()}>Save</Button> */}
            <Button variant="primary" style={{ float: 'right' }} onClick={getLocation} >Get Location</Button>
            <br></br><br></br>
            <span style={styleN}>{statuss}</span>

            </div>
          </div>

          <div className="col-sm-5" >
            <h2 style={{ color: 'green' }}>Order summary</h2>
            <h3 style={{ fontSize: '18px' }}>Sub Total <span style={{ float: 'right' }}>{total} QR</span> </h3>

            <h3 style={{ fontSize: '18px' }}>Coupon Discount</h3>
            <h3 style={{ fontSize: '18px', marginBottom: '5px' }}>
              Shipping Cost
            <span style={{ float: 'right' }}>{ShippingCost()} QR</span>


            </h3>
            <hr></hr>
            <h3 style={{ fontSize: '18px' }}>Grand Total<span style={{ float: 'right' }}>{GrandCost()} QR</span> </h3>
            <br></br>
            <Button variant="primary" style={{ float: 'right' }} as={Link} to={`/payment`}>Proceed to Pay</Button>


            <ShippingTotal/>

            <br></br><br></br><br></br><br></br>
            <p><strong>Our plants are packaged with care and delivered from our greenhouse to your door.</strong></p>
            <ul>
              <li>All orders over 1000 QR ship free</li>
              <li>Express Shipping - 3-6 Business days QAR94.90</li>
              <li>Standard Shipping - 5-9 Business days QAR69.35</li>
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

            {
                          shippings.map(personEmail =>
                            <p>{personEmail.address}</p>
                            )
            }
          </div>

        </div>
      </div>






    </>
  )
}