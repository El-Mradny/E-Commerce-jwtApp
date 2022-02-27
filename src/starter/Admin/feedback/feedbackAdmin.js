import React, { useEffect, useState } from 'react';
import db from '../../../db';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FeedbackAdminRow from './FeedbackAdminRow'
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";

export default function Feedbackadmin() {

  const [feedbacks, setfeedbacks] = useState([])
  useEffect(() => (async () => setfeedbacks(await db.Feedbacks.findAll()))(), [])
  // console.log(feedbacks)

  const [id, setId] = useState(0)
  const [comment, setComment] = useState("")
  const [rating, setRating] = useState(0)
  const [userid, setUserid] = useState("")
  const [publish, setPublish] = useState("")


  const remove = async id =>{ 
    await db.Feedbacks.remove(setfeedbacks, id)
  }

  const edit = async id => {
    const feedback = await db.Feedbacks.findOne(id)
    setId(feedback.id)
    setComment(feedback.comment)
    setRating(feedback.rating)
    setPublish(feedback.publish)
    setUserid(feedback.userid)
  }


  const update = async () => {
    await db.Feedbacks.update(setfeedbacks, {  id, comment, rating, publish ,userid})
    setId(0)
    setComment("")
    setRating(0)
    setPublish("")
    setUserid("")
  }

  const clear = async () => {
    setId(0)
    setComment("")
    setRating(0)
    setPublish("")
    setUserid("")
  }

  const [validUpdate, setValidUpdate] = useState(false)
  useEffect(() => (async () => setValidUpdate(
    comment !== "" &&
    rating > 0 
  ))(), [rating,comment])



  return (
    <>
      <br></br>
      <h1>Customers Feedbacks</h1>
      <Button  variant="info"  style={{margin:'3px', float:'right'}} as={Link} to={`/displayfeedback`}>Published Feedbacks</Button>
      <Button  variant="success"  style={{margin:'3px', float:'right'}} as={Link} to={`/feedback`}>Create</Button>
      <br></br><br></br>
      <Table striped bordered hover responsive variant="success" size="sm">
        <thead>
          <tr>
          <th>Comment</th>
          <th>Rating-out of 5</th>
          <th>User</th>
          <th>Publish</th> 
          <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Form.Control size="sm"  as="textarea" rows={2}  onChange={event => setComment(event.target.value)} placeholder="comment" value={comment} readOnly />
            </td>
            <td>
              <Form.Control size="sm" type="number" onChange={event => setRating(1 * event.target.value)} placeholder="rating" value={rating} readOnly />
            </td>
            <td>
              <Form.Control size="sm" type="text" onChange={event => setUserid(event.target.value)} placeholder="userid" value={userid} readOnly  />
            </td>

            <td>
              <Form.Control as="select" size="sm" onChange={event => setPublish(event.target.value)} placeholder="publish" value={publish} >
                <option key={""} value={""} disabled>Select</option>
                <option key={"Published"} value={"Published"}>Yes</option>
                <option key={"Not Published"} value={"Not Published"}>No</option>
                <option key={"Not Publish"} value={"Not Publish"} hidden>No</option>
              </Form.Control>
            </td>


            <td>
              <Button variant="warning" onClick={update} disabled={!validUpdate}>Update</Button>
              <Button variant="light" style={{ backgroundColor: "#4582ec", color: 'white' }} onClick={clear}>Clear</Button>
            </td>
          </tr>
          {
            feedbacks.map(fk =>
              < FeedbackAdminRow key={fk.id} fk={fk} edit={edit} remove={remove} clear={clear} />
            )
          }
        </tbody>
      </Table>
    </>
  )
}