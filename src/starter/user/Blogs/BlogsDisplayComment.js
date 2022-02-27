import React, { useContext,useEffect, useState } from 'react';
import db from '../../../db';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import BlogsDisplayCommentRow from './BlogsDisplayCommentRow'
import UserContext from '../../../UserContext'

export default function BlogsDisplayComment({blogId}) {
    const { user } = useContext(UserContext)

    const [blogcomments, setBlogComments] = useState([])
    useEffect(() => (async () => setBlogComments(await db.Blogcomments.findAll()))(), [])
    console.log(blogcomments);

    const [id, setID] = useState(0)
    const [comment, setComment] = useState("")
    const [userid, setUserid] = useState("")
    const [blogid, setBlogid] = useState(0)
    const [commentdate, setCommentdate] = useState(new Date())


    const userCommentCreate = async () => {
        await db.Blogcomments.create(setBlogComments, { id, comment, userid:user.id, blogid:blogId, commentdate: new Date() })
        setID(0)
        setComment("")
        setUserid("")
        setBlogid(0)
        setCommentdate(new Date())
    }

    const clear = () => {
        setID(0)
        setComment("")
        setUserid("")
        setBlogid(0)
        setCommentdate(new Date())
    }

    const removeCommt = async id => {
        await db.Blogcomments.remove(setBlogComments, id)
    }



    const editCommt = async id => {
        const commt = await db.Blogcomments.findOne(id)
        setID(commt.id)
        setComment(commt.comment)
        setUserid(commt.userid)
        setBlogid(commt.blogid)
        setCommentdate(commt.commentdate)
    }


    const updateCommt = async () => {
        await db.Blogcomments.update(setBlogComments, { id, comment, userid, blogid, commentdate })
        setID(0)
        setComment("")
        setUserid("")
        setBlogid(0)
        setCommentdate(new Date())
    }

    const [createValid, setCreateValid] = useState(false)
    useEffect(() => (async () => setCreateValid(
        comment!==""
    ))(), [comment])

    const [validUpdate, setValidUpdate] = useState(false)
    useEffect(() => (async () => setValidUpdate(
        comment!==""
    ))(), [comment])

    return (
        <>
            <span id="element_target"></span>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>WHAT DO YOU THINK?</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Comment" onChange={event => setComment(event.target.value)} value={comment} />
            </Form.Group>

            <Button variant="primary" style={{ float: 'right' }} disabled={!createValid} onClick={userCommentCreate}>LEAVE COMMENT</Button>
            <Button variant="primary" style={{ float: 'right' }} disabled={!validUpdate} onClick={updateCommt}>UPDATE</Button>
            <Button variant="primary" style={{ float: 'right' }} onClick={clear}>CANCEL</Button>
            <br></br><br></br><br></br>

            {
                blogcomments.map(blogCom=>
                   < BlogsDisplayCommentRow key={blogCom.id} blogCom={blogCom} removeCommt={removeCommt} editCommt={editCommt} blogId={blogId}/>
                )
            }

        </>
    )
}