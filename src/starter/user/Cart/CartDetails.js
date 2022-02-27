import React, { useEffect, useState } from 'react';
import db from '../../../db';
import Table from 'react-bootstrap/Table';
import {
  useParams
} from "react-router-dom";
import Card from 'react-bootstrap/Card';
import CartOrderItems from "./CartOrderItems";
import ProgressBar from 'react-bootstrap/ProgressBar';

export default function CartDetails() {
  const [jwtUser,] = useState(db.getJwtUser())

  const { cartId: stringId } = useParams();
  const cartId = stringId
  console.log(cartId);


  const [cartUser, setCartUser] = useState([])
  useEffect(() => (async () => cartId && setCartUser(await db.Carts.findByUseridAndId(jwtUser.username, cartId)))(), [jwtUser.username, cartId])

  const [carts, setCarts] = useState(null);
  useEffect(() => (async () => cartId && setCarts(await db.Carts.findOne(cartId)))(), [cartId])
  console.log(carts && carts);

  const [users, setUsers] = useState(null)
  useEffect(() => (async () => carts && setUsers(await db.Users.findOne(carts.userid)))(), [carts])
  console.log(users && users.id);

  const [payments, setPayments] = useState(null)
  useEffect(() => (async () => carts && setPayments(carts.paymentid !== null ?await db.Payments.findOne(carts.paymentid): null))(), [carts])
  console.log(payments && payments);

  const [shippings, setShippings] = useState(null)
  useEffect(() => (async () => carts && setShippings(carts.shippingid !== null ? await db.Shippings.findOne(carts.shippingid): null))(), [carts])
  console.log(shippings && shippings.id);

  const [discounts, setDiscounts] = useState(null)
  useEffect(() => (async () => carts && setDiscounts(carts.discountid !== null ? await db.Discounts.findOne(carts.discountid) : null))(), [carts])
  console.log(discounts && discounts);

  const [cartItems, setCartItems] = useState([])
  useEffect(() => (async () => carts && setCartItems(await db.Cartitems.findByCartid(carts.id)))(), [carts])
  console.log(cartItems && cartItems);


  return (
    <>
      {
         cartUser.length > 0 ?
          <>
            <h1>Cart Details</h1>
            <br></br>
            <Card>
              <Card.Header as="h5">Customer details</Card.Header>
              <Card.Body>

                <Card.Text>
                  <dl className="row">
                    <dt className="col-sm-3">Email</dt>
                    <dd className="col-sm-9">{users && users.id}</dd>
                    <dt className="col-sm-3">First Name</dt>
                    <dd className="col-sm-9">{users && users.firstname}</dd>
                    <dt className="col-sm-3">Last Name</dt>
                    <dd className="col-sm-9">{users && users.lastname}</dd>
                    <dt className="col-sm-3">Gender</dt>
                    <dd className="col-sm-9">{users && users.gender}</dd>
                  </dl>
                </Card.Text>

              </Card.Body>
            </Card>
            <br></br>

            <Card>
              <Card.Header as="h5">Payment details</Card.Header>
              <Card.Body>

                <Card.Text>
                  <dl className="row">
                    <dt className="col-sm-3">Method</dt>
                    <dd className="col-sm-9">{payments && payments.method}</dd>
                    <dt className="col-sm-3">Paid By Name</dt>
                    <dd className="col-sm-9">{payments && payments.cardholdername}</dd>
                    <dt className="col-sm-3">Payment Date</dt>
                    <dd className="col-sm-9">{carts && carts.checkoutdate.toDateString()}</dd>
                  </dl>
                </Card.Text>

              </Card.Body>
            </Card>

            <br></br>
            <Card>
              <Card.Header as="h5">Shipping details</Card.Header>
              <Card.Body>

                <Card.Text>
                  <dl className="row">
                    <dt className="col-sm-3">Order Status</dt>
                    <dd className="col-sm-9">{

                    carts && 
                    
                    carts.orderstatus === "Shipped"? <><span>Shipped</span><ProgressBar variant="success" now={100} label={`${100}%`}/></>:
                    carts && carts.orderstatus === "Processing"?
                    <><span>Processing</span><ProgressBar animated variant="warning" now={45} label={`${45}%`}/></>
                    
                    :
                    carts && carts.orderstatus === "Delayed Due To Missed Contact"?<><span>Delayed Due To Missed Contact</span><ProgressBar variant="danger" now={60} label={`${60}%`} /></>:
                    carts && carts.orderstatus === "Delayed Due To Covid"?<><span>Delayed Due To Missed Contact</span><ProgressBar variant="danger" now={60} label={`${60}%`} /></>:null
                    }</dd>




                    <dt className="col-sm-3">city</dt>
                    <dd className="col-sm-9">{shippings && shippings.city}</dd>
                    <dt className="col-sm-3">country</dt>
                    <dd className="col-sm-9">{shippings && shippings.country}</dd>
                    <dt className="col-sm-3">address</dt>
                    <dd className="col-sm-9">{shippings && shippings.address}</dd>
                    <dt className="col-sm-3">pobox</dt>
                    <dd className="col-sm-9">{shippings && shippings.pobox}</dd>
                    <dt className="col-sm-3">streetnum</dt>
                    <dd className="col-sm-9">{shippings && shippings.streetnum}</dd>
                    <dt className="col-sm-3">email</dt>
                    <dd className="col-sm-9">{shippings && shippings.email}</dd>
                    <dt className="col-sm-3">phonenumber</dt>
                    <dd className="col-sm-9">{shippings && shippings.phonenumber}</dd>
                    <dt className="col-sm-3">shippingmethod</dt>
                    <dd className="col-sm-9">{shippings && shippings.shippingmethod}</dd>
                    <dt className="col-sm-3">longitude</dt>
                    <dd className="col-sm-9">{shippings && shippings.longitude}</dd>
                    <dt className="col-sm-3">latitude</dt>
                    <dd className="col-sm-9">{shippings && shippings.latitude}</dd>

                  </dl>

                </Card.Text>

              </Card.Body>
            </Card>

            <br></br>
            <Card>
              <Card.Header as="h5">Order Items</Card.Header>
              <Card.Body>
                <Card.Title></Card.Title>
                <Card.Text>
                  <Table hover responsive variant="Light" size="sm" >
                    <thead>
                      <tr>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Product Image</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        cartItems.map(cartitem =>
                          <CartOrderItems cartitem={cartitem} />
                        )
                      }
                    </tbody>
                  </Table>
                </Card.Text>

              </Card.Body>
            </Card>
            <br></br>
            <Card>
              <Card.Header as="h5">Cost summary</Card.Header>
              <Card.Body>
                <Card.Text>
                  <dl className="row">

                    {
                      carts && carts.discountid !== null ?
                        <>
                          <dt className="col-sm-3">Discount Code Used</dt>
                          <dd className="col-sm-9">{discounts && discounts.discountvalue}% OFF || {discounts && discounts.discountcode}</dd>
                        </> : null
                    }

                    <dt className="col-sm-3">Shipping Cost</dt>
                    <dd className="col-sm-9">
                      {/* {carts && carts.total >= 1000 ? 'Free Shipping' : shippings && shippings.shippingmethod === "Express Shipping" ? 94 : 69} */}
                      {carts && carts.shippingcost}
                    </dd>

                    <dt className="col-sm-3">Total</dt>
                    <dd className="col-sm-9">{carts && carts.total}</dd>
                  </dl>
                </Card.Text>

              </Card.Body>
            </Card>
          </> : null}
    </>
  )
}