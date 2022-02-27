import React, { useContext, useEffect, useState } from 'react';
import db from '../../../db';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import UserContext from '../../../UserContext';
import Form from 'react-bootstrap/Form';
import validator from 'validator';
import {
  useParams
} from "react-router-dom";

export default function Payment() {
  const now = 95;
  const progressInstance = <ProgressBar now={now} animated striped variant="primary" label={`${now}%`} />;

  const { totalCost: stringTotal } = useParams();
  const totalCost = 1 * stringTotal

  const { totalShipping: stringShippingCost } = useParams();
  const totalShipping = 1 * stringShippingCost

  const { ShippingId: stringShippingId } = useParams();
  const ShippingId = 1 * stringShippingId

  // console.log('payment totalCost', totalCost);
  // console.log('payment totalShipping', totalShipping);
  // console.log('Shipping Id', ShippingId);

  const { user } = useContext(UserContext)

  const [payments, setPayments] = useState([])
  useEffect(() => (async () => setPayments(await db.Payments.findAll()))(), [])
  console.log(payments);

  const [id, setId] = useState(0)
  const [method, setMethod] = useState("")
  const [cardnumber, setCardnumber] = useState("")
  const [cardholdername, setCardholdername] = useState("")
  const [cvccode, setCvccode] = useState(0)
  const [expirydate, setExpirydate] = useState(new Date())

  const [cardnumberErr, setCardnumberErr] = useState("")
  const [cardholdernameErr, setCardholdernameErr] = useState("")
  const [cvccodeErr, setCvccodeErr] = useState("")
  const [expirydateErr, setExpirydateErr] = useState("")


  const create = async () => {
    await db.Payments.create(setPayments, { id, method:'Credit card', cardnumber:cardnumber.slice(0, 7), cardholdername, cvccode:cvccode.slice(0, 2), expirydate })
    setId(0)
    setMethod("")
    setCardnumber(0)
    setCardholdername("")
    setCvccode(0)
    setExpirydate(new Date())
  }

  const vaild = async () => {
    if (validator.isCreditCard(cardnumber)) {
      setCardnumberErr('')
    } else {
      setCardnumberErr('Enter valid CreditCard Number')
    }
    if (+expirydate < +new Date()) {
      setExpirydateErr("Its expiryed");
    } else {
      setExpirydateErr("");
    }
    if (cardholdername.length === 0) {
      setCardholdernameErr("Not Vaild");
    } else if (cardholdername.length > 20) {
      setCardholdernameErr("Not Vaild");
    } else {
      setCardholdernameErr("");

    } if (cvccode.length !== 4) {
      setCvccodeErr("4 Num");
    } else if (cvccode < 0) {
      setCvccodeErr("Not Vaild");
    } else {
      setCvccodeErr("");
    }
    if (expirydate > new Date() && cvccode.length === 4 && cvccode > 0 && cardholdername.length < 20 && cardholdername.length !== 0 && validator.isCreditCard(cardnumber)) {
      create()
      window.location =`http://localhost:3000/conformshopping/${totalCost}/${totalShipping}/${ShippingId}`;
    }
  }


  return (
    <>
      <br></br>
      {progressInstance}
      <br></br>
      <h1>Payment</h1>
      <br></br>

      <div className="container">
        <div className="row">
          <div className="col-sm-5" style={{ color: 'black', backgroundColor: '#b9b8b5', borderRadius: '20px', height: '300px', margin: '10px' }}>
            <br></br>
            <img
              src="https://files.fm/thumb_show.php?i=fq7j4psxn"
              alt="card"
              width='13%'
            />

            <div style={{
              marginLeft: '200px',
            }}>

            </div>
            <br></br><br></br><br></br>
            <Form.Control type="text" placeholder="Card number" onChange={event => setCardnumber(event.target.value)} value={cardnumber} />

            <span style={{ fontWeight: 'bold', color: 'red' }}>{cardnumberErr}</span>
            <br></br>

            <div className="row">
              <div className="col-8 col-sm-6">
                <Form.Control type="text" placeholder="Card Holder Name" style={{ color: 'black' }} onChange={event => setCardholdername(event.target.value)} value={cardholdername} />

                <span style={{ fontWeight: 'bold', color: 'red' }}>{cardholdernameErr}</span>
              </div>
              <div className="col-4 col-sm-6">
                <Form.Control type="date" onChange={event => setExpirydate(new Date(event.target.value))} placeholder="date" value={expirydate.toISOString().slice(0, 10)} />

                <span style={{ fontWeight: 'bold', color: 'red' }}>{expirydateErr}</span>
              </div>
            </div>
          </div>

          <div className="col-sm-5" style={{ color: 'black', backgroundColor: '#b9b8b5', borderRadius: '20px', height: '300px', margin: '10px', padding: '0px' }}>
            <br></br>
            <div style={{ color: 'black', backgroundColor: '#000000c7', height: '40px' }}></div>

            <div className="row">
              <br></br><br></br>
              <div className="col-8 col-sm-9">
                <div style={{ color: 'black', backgroundColor: 'white', height: '40px', marginLeft: '20px', width: '100%', paddingTop: '0px' }}>
                  <hr style={{ margin: '7px', border: '1px solid  #ffe680' }}></hr>
                  <hr style={{ margin: '7px', border: '1px solid  #ffe680' }}></hr>
                  <hr style={{ margin: '7px', border: '1px solid  #ffe680' }}></hr>
                  <hr style={{ margin: '7px', border: '1px solid  #ffe680' }}></hr>
                  <hr style={{ margin: '7px', border: '1px solid  #ffe680' }}></hr>
                </div>
              </div>
              <div className="col-4 col-sm-2">
                <Form.Control type="number" placeholder="CVC" style={{ width: '80px', marginTop: '8px' }} onChange={event => setCvccode(event.target.value)} value={cvccode} />
                <span style={{ fontWeight: 'bold', color: 'red' }}>{cvccodeErr}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br></br><br></br><br></br>

      <Button variant="primary" onClick={vaild}>PAY</Button>





    </>
  )
}





