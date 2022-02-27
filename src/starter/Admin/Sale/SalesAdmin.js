import React, { useEffect, useState } from 'react';
import db from '../../../db';
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import SaleAdminRow from './SaleAdminRow';
import { Link } from "react-router-dom";

export default function SalesAdmin() {
  const [sales, setSales] = useState([])
  useEffect(() => (async () => setSales(await db.Sales.findAll()))(), [])
  //console.log(sales);

  const [id, setId] = useState(0)
  const [productid, setProducrId] = useState(0)
  const [discountpercent, setDiscountPercent] = useState(0)
  const [startdate, setStartDate] = useState(new Date())
  const [enddate, setEndDate] = useState(new Date())
  const [publish, setPublish] = useState("")

  const [products, setProducts] = useState([]);
  useEffect(() => (async () => setProducts(await db.Products.findAll()))(), [])

  const create = async () => {
    await db.Sales.create(setSales, { id, productid, discountpercent, startdate, enddate, publish })
    setId(0)
    setProducrId(0)
    setDiscountPercent(0)
    setStartDate(new Date())
    setEndDate(new Date())
    setPublish("")
  }

  const remove = async (id) => {
    await db.Sales.remove(setSales, id)
  }

  const edit = async id => {
    const sale = await db.Sales.findOne(id)
    setId(sale.id)
    setProducrId(sale.productid)
    setDiscountPercent(sale.discountpercent)
    setStartDate(sale.startdate)
    setEndDate(sale.enddate)
    setPublish(sale.publish)
  }


  const update = async () => {
    await db.Sales.update(setSales, { id, productid, discountpercent, startdate, enddate, publish })
    setId(0)
    setProducrId(0)
    setDiscountPercent(0)
    setStartDate(new Date())
    setEndDate(new Date())
    setPublish("")
  }

  const handleProduct = event =>
    setProducrId(1 * event.target.value)

  const [createValid, setCreateValid] = useState(false)
  useEffect(() => (async () => setCreateValid(
    discountpercent > 0 && discountpercent < 100
    && (+startdate + new Date() || startdate > new Date()) && enddate > startdate && publish !== ""
  ))(), [startdate, enddate, discountpercent, publish])


  const [validUpdate, setValidUpdate] = useState(false)
  useEffect(() => (async () => setValidUpdate(
    id > 0 && (startdate > new Date() || +startdate + new Date()) && enddate > startdate &&
    id && await db.Sales.findOne(id) !== undefined &&
    productid && await db.Products.findOne(productid) !== undefined &&
    productid > 0 && discountpercent > 0 && discountpercent < 100
  ))(), [id, startdate, enddate, productid, discountpercent])


  const clear = async () => {
    setId(0)
    setProducrId(0)
    setDiscountPercent(0)
    setStartDate(new Date())
    setEndDate(new Date())
    setPublish("")
  }
  const notSaleProduct = products.filter(firstArrayItem => !sales.some(secondArrayItem => firstArrayItem.id === secondArrayItem.productid));

  const dotRed = {
    height: '20px',
    width: '20px',
    backgroundColor: 'red',
    borderRadius: '50%',
    display: 'inline-block'
  }

  const dotGreen = {
    height: '20px',
    width: '20px',
    backgroundColor: 'green',
    borderRadius: '50%',
    display: 'inline-block'
  }

  const dotGray = {
    height: '20px',
    width: '20px',
    backgroundColor: 'gray',
    borderRadius: '50%',
    display: 'inline-block'
  }

  return (
    <div>
      <br></br>
      <h1>Sales</h1>
      <Button variant="info" style={{ margin: '3px', float: 'right' }} as={Link} to={`/displaysales`}>Published Sales Products</Button>
      <br></br><br></br>
      <Table striped bordered hover responsive variant="success" size="sm">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Currte Price</th>
            <th>Discount Percent</th>
            <th>New Price</th>
            <th>Start date</th>
            <th>End date</th>
            <th>Days left to expire</th>
            <th>Sales period</th>
            <th>Status</th>
            <th>Publish</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Form.Control as="select" size="sm" value={productid} onChange={handleProduct} placeholder="producrid" >
                <option key={0} value={0} disabled>Select Product</option>

                {
                  notSaleProduct.filter(product => product.quantity > 0).map(product => {
                    return (
                      <option key={product.id} value={product.id}>{product.id}-{product.name}</option>
                    )
                  })
                }

              </Form.Control>
            </td>

            <td></td>

            <td>
              <Form.Control type="number" size="sm" onChange={event => setDiscountPercent(1 * event.target.value)} placeholder="discountpercent" value={discountpercent} />
            </td>
            <td>
            </td>
            <td>
              <Form.Control type="date" size="sm" onChange={event => setStartDate(new Date(event.target.value))} placeholder="startdate" value={startdate.toISOString().slice(0, 10)} />
            </td>
            <td>
              <Form.Control type="date" size="sm" onChange={event => setEndDate(new Date(event.target.value))} placeholder="enddate" value={enddate.toISOString().slice(0, 10)} />
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <Form.Control as="select" size="sm" value={publish} onChange={event => setPublish(event.target.value)} placeholder="publish" >
                <option key={""} value={""} disabled>Select</option>
                <option key={"Published"} value={"Published"}>Yes</option>
                <option key={"Not Published"} value={"Not Published"}>No</option>
              </Form.Control>
            </td>
            <td>
              <Button variant="success" onClick={create} disabled={!createValid}>Create</Button>
              <Button variant="warning" onClick={update} disabled={!validUpdate}>Update</Button>
              <Button variant="light" style={{ backgroundColor: "#4582ec", color: 'white' }} onClick={clear}>Clear</Button>
            </td>
          </tr>
          {
            sales.map(saleProduct =>
              <SaleAdminRow key={saleProduct.id} saleProduct={saleProduct} edit={edit} remove={remove} />
            )
          }
        </tbody>
      </Table>
      <div>
        <span style={dotGreen}></span> Available <br></br>
        <span style={dotRed}></span> Ended <br></br>
        <span style={dotGray}></span> Still didnt start
      </div>
    </div>
  )
}