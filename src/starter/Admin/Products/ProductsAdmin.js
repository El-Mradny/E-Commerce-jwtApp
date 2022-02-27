import React, { useEffect, useState } from 'react'
import db from '../../../db'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ProductAdmin from './ProductAdminRow'

export default function ProductsAdmin() {


  const [id, setId] = useState(0)
  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const [sunlight, setSunlight] = useState("")
  const [water, setWater] = useState("")
  const [temperature, setTemperature] = useState("")
  const [measures, setMeasures] = useState("")
  const [category, setCategory] = useState("")
  const [quantity, setQuantity] = useState(0)
  const [date, setDate] = useState(new Date())
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("")
  const [soldcount, setSoldcount] = useState(0)

  const [products, setProducts] = useState([])
  useEffect(() => (async () => setProducts(await db.Products.findAll()))(), [])

  const create = async () => {
    await db.Products.create(setProducts, { id, name, price, sunlight, water, temperature, measures, category, quantity, date: new Date(), image, description, soldcount: 0 })
    setId(0)
    setName("")
    setPrice(0)
    setSunlight("")
    setWater("")
    setTemperature("")
    setMeasures("")
    setCategory("")
    setQuantity(0)
    setDate(new Date())
    setImage("")
    setDescription("")
    setSoldcount(0)
  }

  const remove = async id => await db.Products.remove(setProducts, id)

  const edit = async id => {
    const product = await db.Products.findOne(id)
    setId(product.id)
    setName(product.name)
    setPrice(product.price)
    setSunlight(product.sunlight)
    setWater(product.water)
    setTemperature(product.temperature)
    setMeasures(product.measures)
    setCategory(product.category)
    setQuantity(product.quantity)
    setDate(product.date)
    setImage(product.image)
    setDescription(product.description)
    setSoldcount(product.soldcount)
  }

  // update is step 2
  const update = async () => {
    await db.Products.update(setProducts, { id, name, price, sunlight, water, temperature, measures, category, quantity, date, image, description, soldcount })
    setId(0)
    setName("")
    setPrice(0)
    setSunlight("")
    setWater("")
    setTemperature("")
    setMeasures("")
    setCategory("")
    setQuantity(0)
    setDate(new Date())
    setImage("")
    setDescription("")
    setSoldcount(0)
  }

  const [namee, setNamee] = useState([])
  useEffect(() => (async () => setNamee(await db.Packages.findByName(name)))(), [name])
  console.log(namee && namee.length);

  const [validCreate, setValidCreate] = useState(false)
  useEffect(() => (async () => setValidCreate(
    name !== "" && 
    price > 0 && sunlight.length <= 255 && water.length <= 255 && temperature.length <= 255 && measures.length <= 255 && category !== "" &&  namee.length===0 &&
    quantity > 0 && description.length <= 400
  ))(), [name, price, sunlight, water, temperature, measures, category, quantity, description,namee])


  // const [validName, setValidName] = useState(false)
  // useEffect(() => setValidName(

  // ), [name])



  const [validUpdate, setValidUpdate] = useState(false)
  useEffect(() => (async () => setValidUpdate(
    id > 0 &&
    price > 0 && sunlight.length <= 255 && water.length <= 255 && temperature.length <= 255 && measures.length <= 255 && category !== "" && quantity > 0 && description.length <= 400 &&
    await db.Products.findOne(id) !== undefined
  ))(), [id, name, price, sunlight, water, temperature, measures, category, quantity, description])

  const clear = () => {
    setId(0)
    setName("")
    setPrice(0)
    setSunlight("")
    setWater("")
    setTemperature("")
    setMeasures("")
    setCategory("")
    setQuantity(0)
    setDate(new Date())
    setImage("")
    setDescription("")
    setSoldcount(0)
  }

  const handleImage = async (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      const extension = file.name.split('.').pop()
      const newName = `Product-Admin.${extension}`
      if (price > 0 && sunlight !== "" && water !== "" && temperature !== "" && measures !== "" && category !== "" && quantity > 0 && description !== "") {
        const result = await db.uploadImage(file, newName)
        if (result.ok) {
          setImage(`/images/${newName}`)
        }
      }
    }
  }

  // const handleImage = async event => {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0]
  //     const extension = file.name.split('.').pop()
  //     const newName = `UsersPicture${user.id}.${extension}`
  //     const result = await db.uploadImage(file, newName)
  //     if (result.ok) {
  //       await db.Users.update(() => { }, { ...user, picture: `/images/${newName}` })
  //       set(await db.Users.findOne(user.id))
  //     }
  //   }
  // }

  return (
    <div>
      <h1 id="element_target">Products</h1>
      <div style={{ width: '50%', margin: 'auto' }}>
        <Form.Label style={{ fontWeight: 'bold' }}>Name</Form.Label>
        <Form.Control type="text" onChange={event => setName(event.target.value)} placeholder="Name" value={name} />
        <br></br>
        <Form.Label style={{ fontWeight: 'bold' }}>Price</Form.Label>
        <Form.Control type="number" onChange={event => setPrice(1 * event.target.value)} placeholder="Price" value={price} />
        <br></br>
        <Form.Label style={{ fontWeight: 'bold' }}>Sunlight</Form.Label>
        <Form.Control as="textarea" rows={3} type="textBox" onChange={event => setSunlight(event.target.value)} placeholder="sunlight" value={sunlight} />
        {
          sunlight.length > 300 ? <span style={{ color: 'red' }}> Maximum 255 characters </span> : 'Maximum 255 characters'
        }
        <br></br>
        <Form.Label style={{ fontWeight: 'bold' }}>Water</Form.Label>
        <Form.Control as="textarea" rows={3} type="textBox" onChange={event => setWater(event.target.value)} placeholder="water" value={water} />
        {
          water.length > 300 ? <span style={{ color: 'red' }}> Maximum 255 characters </span> : 'Maximum 255 characters'
        }
        <br></br>
        <Form.Label style={{ fontWeight: 'bold' }}>Temperature</Form.Label>
        <Form.Control as="textarea" rows={3} type="textBox" onChange={event => setTemperature(event.target.value)} placeholder="temperature" value={temperature} />
        {
          temperature.length > 300 ? <span style={{ color: 'red' }}> Maximum 255 characters </span> : 'Maximum 255 characters'
        }
        <br></br>
        <Form.Label style={{ fontWeight: 'bold' }}>Measures</Form.Label>
        <Form.Control as="textarea" rows={3} type="textBox" onChange={event => setMeasures(event.target.value)} placeholder="measures" value={measures} />
        {
          measures.length > 300 ? <span style={{ color: 'red' }}> Maximum 255 characters </span> : 'Maximum 255 characters'
        }
        <br></br>
        <Form.Label style={{ fontWeight: 'bold' }}>Category</Form.Label>
        <Form.Control type="text" onChange={event => setCategory(event.target.value)} placeholder="category" value={category} />
        <br></br>
        <Form.Label style={{ fontWeight: 'bold' }}>Quantity</Form.Label>
        <Form.Control type="number" onChange={event => setQuantity(1 * event.target.value)} placeholder="quantity" value={quantity} />
        <br></br>
        <Form.Label style={{ fontWeight: 'bold' }}>Description</Form.Label>
        <Form.Control as="textarea" rows={4} type="textBox" onChange={event => setDescription(event.target.value)} placeholder="description" value={description} />
        {
          description.length > 400 ? <span style={{ color: 'red' }}> Maximum 400 characters </span> : 'Maximum 400 characters'
        }
        <br></br>
        {/* <Form.Control  type="text" onChange={event => setImage(event.target.value)} placeholder="image" value={image} /> onChange={handleImage} */}
        <Form.Label style={{ fontWeight: 'bold' }}>Picture</Form.Label>
        <Form.File custom label="Choose new picture" onChange={handleImage} />
        <br></br><br></br>
        <Button variant="success" onClick={create} disabled={!validCreate}>Create</Button>
        <Button variant="warning" onClick={update} disabled={!validUpdate}>Update</Button>
        <Button variant="light" style={{ backgroundColor: "#4582ec", color: 'white' }} onClick={clear}>Clear</Button>
        <br></br><br></br>
      </div>




      <Table striped bordered hover responsive variant="success" size="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Sunlight</th>
            <th>Water</th>
            <th>Temperature</th>
            <th>Measures</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Created date</th>
            <th>Description</th>
            <th>Image</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            products.map(product =>
              <ProductAdmin key={product.id} product={product} edit={edit} remove={remove} />
            )
          }
        </tbody>
      </Table>
    </div >
  );
}