import React, { useContext, useEffect, useState } from 'react'
import db from '../../../db';
import UserContext from '../../../UserContext'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Rate from '../Rating';

export default function Rating() {

    const [ratings, setRatings] = useState([])
    useEffect(() => (async () => setRatings(await db.Ratings.findAll()))(), [])
    console.log(ratings);

    const { user } = useContext(UserContext)

    const [id, setId] = useState(0)
    const [userid, setUserid] = useState(user.id)
    const [productid, setProductid] = useState(0)
    const [reviwecomment, setreviwecomment] = useState("")
    const [stars, setStars] = useState(0)
    const [image, setImage] = useState("")
    const [ratingdate, setRatingdate] = useState(new Date())

    const create = async () => {
        await db.Ratings.create(setRatings, { id, userid: user.id, productid, reviwecomment, stars, image, ratingdate })
        setId(0)
        setUserid("")
        setProductid(0)
        setreviwecomment("")
        setStars(0)
        setImage("")
        setRatingdate(new Date())
    }
    const [showw, setShoww] = useState(false);

    const handleClose = () => setShoww(false);
    const handleShow = () => setShoww(true);

    const handleImage = async (event) => {
        if (event.target.files.length > 0) {
          const file = event.target.files[0]
          const extension = file.name.split('.').pop()
          const newName = `Product-Admin.${extension}`
        //   if (price > 0 && sunlight !== "" && water !== "" && temperature !== "" && measures !== "" && category !== "" && quantity > 0 && description !== "") {
            const result = await db.uploadImage(file, newName)
            if (result.ok) {
              setImage(`/images/${newName}`)
            }
        //   }
        }
      }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch static backdrop modal
            </Button>

            <Modal
                show={showw}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Rating Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {/* <Form.Control type="number" onChange={event => setProductid(event.target.value)} placeholder="productid" value={productid} />
                    <Form.Control type="date" onChange={event => setRatingdate(new Date(event.target.value))} placeholder="enddate" value={ratingdate.toISOString().slice(0, 10)} /> */}
                    <br></br>
                    <Form.Label>Rating</Form.Label>
                    <Form.Control type="number" onChange={event => setStars(event.target.value)} placeholder="Rating" value={stars} />
                    < Rate rating={stars} setRating={setStars} />
                    <br></br>
                    <Form.Label>Image</Form.Label>
                    {/* <Form.Control type="text" onChange={event => setImage(event.target.value)} placeholder="Question" value={image} /> */}
                    <Form.File custom label="Choose new picture" onChange={handleImage} />
                    <br></br><br></br>
                    <Form.Label>Feedback</Form.Label>
                    <Form.Control as="textarea" rows={3} type="textBox" onChange={event => setreviwecomment(event.target.value)} placeholder="Comment" value={reviwecomment} />
                    <br></br>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="success" style={{ margin: '5px' }} onClick={create} >Send</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}