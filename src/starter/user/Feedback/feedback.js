import React, { useContext, useEffect, useState } from 'react';
import db from '../../../db';
import UserContext from '../../../UserContext';
import Rate from '../Rating';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Toast from 'react-bootstrap/Toast'
import Row from 'react-bootstrap/Row'
import {useHistory} from "react-router-dom";

export default function Feedback() {
    const { user } = useContext(UserContext);
    const history = useHistory();
    const [id, setId] = useState(0)
    const [comment, setComment] = useState("")
    const [rating, setRating] = useState(0)
    const [userid, setUserid] = useState(user.id)
    const [publish, setPublish] = useState("")
    const [ratingError, setRatingError] = useState('')
    const [commentError, setCommentError] = useState('')
    const [commentErrorEmpty, setPrsetCommentErroroblemErrorEmpty] = useState('')

    const create = async () => {
        await db.Feedbacks.create(() => { }, { id, comment, rating, userid, publish: 'Not Publish' })
        setId(0)
        setComment("")
        setRating("")
        setUserid("")
        setPublish("")
    }

    const [feedback, setfeedback] = useState([])
    useEffect(() => (async () => setfeedback(await db.Feedbacks.findAll()))(), [])
    //console.log(feedback)

    const [show, setShow] = useState(false);
    // const [createValid, setCreateValid] = useState(false)
    // useEffect(() => (async () => setCreateValid(comment !== "" && comment.length > 0 && comment.length < 100 && rating > 0))(), [comment, rating])


    const vaild = () => {
        if (rating === 0) {
            setRatingError("You forgot to rate the stars")
        } else {
            setRatingError("")
        }
        if (comment === "") {
            setCommentError("The comment is empty")
        } else {
            setCommentError("")
        }
        if (comment.length > 100) {
            setPrsetCommentErroroblemErrorEmpty("Comment is to long")
        } else {
            setPrsetCommentErroroblemErrorEmpty("")
        }
        if (comment.length > 0 && comment.length <= 100 && rating > 0) {
            create();
            setShow(true);
        }
    }

    return (
        <>
            <br></br>
            <Row>
                <Col xs={6} style={{ zIndex: '8', position: 'absolute', top: '8%', marginLeft:'30px'}}>
                    <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide style={{ backgroundColor: '#edc012c2' }}>
                        <Toast.Header>
                            <img
                                src="holder.js/20x20?text=%20"
                                className="rounded mr-2"
                                alt=""
                            />
                            <strong className="mr-auto">Feedback</strong>
                            <small>just now</small>
                        </Toast.Header>
                        <Toast.Body>Your Feedback Is Sent Successfully</Toast.Body>
                    </Toast>
                </Col>
            </Row>
            <div className="container">
                <div className="row">
                    <div className="col-sm-7" style={{ margin: 'auto', textAlign: 'center', color: 'black', backgroundColor: '#bababa6e', padding: '40px' }}>
                        <h1>Your feeback is very important</h1>
                        <p style={{ fontSize: '18px' }}>We believe in growing, and you can make it happen together we can grow
                        with your feedback, we can improve for you our service, website design, and much more of what you like
                        We love to read your Feedback</p>

                        <Rate rating={rating} setRating={setRating} />

                        <span style={{ color: 'red', fontWeight: 'bold' }}> {ratingError} </span>

                        <br></br><br></br>

                        <Form.Control as="textarea" rows={4} onChange={event => setComment(event.target.value)} placeholder="comment" value={comment} />

                        <Form.Control type="number" onChange={event => setUserid(1 * event.target.value)} placeholder="userid" value={userid} hidden />

                        <span style={{ color: 'red', fontWeight: 'bold' }}> {commentError} </span>
                        <span style={{ color: 'red', fontWeight: 'bold' }}> {commentErrorEmpty} </span>
                        <br></br>

                        {
                            comment.length > 100 ? <span style={{ color: 'red', fontWeight: 'bold' }}> Maximum 100 characters </span> : 'Maximum 100 characters'
                        }

                        <p>
                            {comment.length > 1 ? comment.length + ' characters' : comment.length === 1 ? comment.length + ' character' : null}
                        </p>

                        <br></br>

                        <Button variant="warning" onClick={vaild} style={{margin:'20px'}}>Submit</Button>
                        <Button variant="primary" onClick={() => history.goBack()}>Back</Button>

                    </div>
                </div>
            </div>


            <br></br>
        </>
    )
}
