import React, { useEffect, useState } from 'react';
import db from '../../../db';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import RatingAdminRow from './RatingAdminRow';

export default function RatingAdmin() {

    const [ratings, setRatings] = useState([])
    useEffect(() => (async () => setRatings(await db.Ratings.findAll()))(), [])

    const [id, setId] = useState(0)
    const [userid, setUserid] = useState("")
    const [reviweComment, setreviwecomment] = useState("")
    const [stars, setStars] = useState(0)
    const [image, setImage] = useState("")
    const [productid, setproductid] = useState(0)
    const [ratingdate, setRatingdate] = useState(new Date())

    const create = async () => {
        await db.Ratings.create(setRatings, { id, userid, reviweComment, stars, image, productid, ratingdate })
        setId(0)
        setUserid("")
        setreviwecomment("")
        setStars(0)
        setImage("")
        setproductid(0)
        setRatingdate(new Date())
    }

    const remove = async id => {
        await db.Ratings.remove(setRatings, id)
    }

    const edit = async id => {
        const rating = await db.Ratings.findOne(id)
        setId(rating.id)
        setUserid(rating.userid)
        setreviwecomment(rating.reviweComment)
        setStars(rating.stars)
        setImage(rating.image)
        setproductid(rating.productid)
        setRatingdate(rating.ratingdate)
    }

    const update = async () => {
        await db.Ratings.update(setRatings, { id, userid, reviweComment, stars, image, productid, ratingdate })
        setId(0)
        setUserid("")
        setreviwecomment("")
        setStars(0)
        setImage("")
        setproductid(0)
        setRatingdate(new Date())
    }

    const clear = async () => {
        setId(0)
        setUserid("")
        setreviwecomment("")
        setStars(0)
        setImage("")
        setproductid(0)
        setRatingdate(new Date())
    }

    const handleImage = async (event) => {
        if (event.target.files.length > 0) {
            const file = event.target.files[0]
            const extension = file.name.split('.').pop()
            const newName = `Product-Admin.${extension}`
            if (stars > 0 && reviweComment !== "" && productid > 0) {
                const result = await db.uploadImage(file, newName)
                if (result.ok) {
                    setImage(`/images/${newName}`)
                }
            }
        }
    }


    const [validCreate, setValidCreate] = useState(false)
    useEffect(() => (async () => setValidCreate(
        reviweComment !== "" && stars > 0 && image !== "" && productid > 0 && ratingdate > new Date() && await db.Products.findOne(productid) !== undefined
    ))(), [reviweComment, stars, image, productid, ratingdate])

    const [validUpdate, setValidUpdate] = useState(false)
    useEffect(() => (async () => setValidUpdate(
        reviweComment !== "" && stars > 0 && image !== "" && await db.Products.findOne(productid) !== undefined && ratingdate > new Date()
    ))(), [reviweComment, stars, image, productid, ratingdate])


    return (
        <>
            <br></br>
            <h1>Rating</h1>
            <br></br><br></br>
            <span id="element_target"></span>
            <Table striped bordered hover responsive variant="success" size="sm">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Stars</th>
                        <th>Image</th>
                        <th>Rating date</th>
                        <th>Reviwe Comment</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <Form.Control placeholder="user" type="text" onChange={event => setUserid(event.target.value)} value={userid} />
                        </td>

                        <td>
                            <Form.Control placeholder="product" type="text" onChange={event => setproductid(event.target.value)} value={productid} />
                        </td>
                        <td></td>
                        <td>
                            <Form.Control placeholder="star" type="number" onChange={event => setStars(event.target.value)} value={stars} />
                        </td>

                        <td>

                            <Form.File custom label="Choose new picture" onChange={handleImage} />
                        </td>

                        <td>
                            <Form.Control placeholder="rating date" type="date" onChange={event => setRatingdate(event.target.value)} value={ratingdate} />
                        </td>

                        <td>
                            <Form.Control placeholder="comment" as="textarea" rows={3} type="textBox" onChange={event => setreviwecomment(event.target.value)} value={reviweComment} />
                        </td>

                        <td>
                            <Button variant="warning" onClick={update} disabled={!validUpdate}>Update</Button>
                            <Button variant="success" onClick={create} disabled={!validCreate}>Create</Button>
                            <Button variant="light" style={{ backgroundColor: "#4582ec", color: 'white' }} onClick={clear}>Clear</Button>
                        </td>
                    </tr>


                    {
                        ratings.map(rating => < RatingAdminRow rating={rating} key={rating.id} remove={remove} edit={edit} />)
                    }


                </tbody>
            </Table>
        </>
    )
}