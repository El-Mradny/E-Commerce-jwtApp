import React, { useEffect, useState } from 'react';
import db from '../../../db';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

export default function CartAdmin() {

  const [carts, setCarts] = useState([])
  useEffect(() => (async () => setCarts(await db.Carts.findAll()))(), [])
  console.log(carts);

  return (
    <>
      <br></br>
      <h1>Cart History</h1>
      <br></br>
      <Table striped bordered hover responsive variant="success" size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Amount</th>
            <th>More</th>
          </tr>
        </thead>
        <tbody>

          {
            carts.map(cart =>
              <tr key={cart.id}>
                <td>{cart.id}</td>
                <td>{cart.status}</td>
                {
                  cart.status === "paid" ? <td>{cart.total}</td> : <td></td>
                }
                {
                  cart.status === "paid" ? <td><Button size="sm" variant="primary" as={Link} to={`/cartadmindetails/${cart.id}`}>Details Link</Button> </td> : <td></td>
                }
              </tr>
            )
          }

        </tbody>
      </Table>



    </>
  )
}