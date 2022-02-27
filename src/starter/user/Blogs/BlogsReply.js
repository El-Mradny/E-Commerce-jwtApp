import React, { useContext, useEffect, useState } from 'react'
import db from '../../../db';
import UserContext from '../../../UserContext'
import {
    useParams
} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export default function BlogsReply({ ComId }) {

    const { user } = useContext(UserContext)

    const [blogcommentsreplys, setBlogCommentsReplay] = useState([])
    useEffect(() => (async () => setBlogCommentsReplay(await db.Blogcommentreplays.findAll()))(), [])
   

    const [id, setID] = useState(0)
    const [replay, setReplay] = useState("")
    const [userid, setUserid] = useState("")
    const [blogcommentid, setBlogcommentid] = useState(0)
    const [commentdate, setCommentdate] = useState(new Date())

    const [blogId, setBlogId] = useState(null)
    useEffect(() => (async () => setBlogId(await db.Blogcomments.findOne(ComId)))(), [ComId])
    const [box, setBox] = useState("Yes");
    const userCommentCreate = async () => {
        setBox('')
        await db.Blogcommentreplays.create(setBlogCommentsReplay, { id, replay, userid: user.id, blogcommentid:ComId, commentdate: new Date() })
        setID(0)
        setReplay("")
        setUserid("")
        setBlogcommentid(0)
        setCommentdate(new Date())
        window.location = `http://localhost:3000/blogsdisplaydetails/${blogId.blogid}`

        
    }

    const clear = () => {
        setID(0)
        setReplay("")
        setUserid("")
        setBlogcommentid(0)
        setCommentdate(new Date())
    }
    const [createValid, setCreateValid] = useState(false)
    useEffect(() => (async () => setCreateValid(
        replay!==""
    ))(), [replay])



    return (
        <>
            {
                box === 'Yes' ? <> <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" >
                    <Form.Control as="textarea" rows={3} placeholder="replay" onChange={event => setReplay(event.target.value)} value={replay} />
                </Form.Group>
                <Button variant="primary" style={{ float: 'right' }} onClick={userCommentCreate} disabled={!createValid}>LEAVE A REPLAY</Button>
            <Button variant="primary" style={{ float: 'right' }} onClick={clear}>CANCEL</Button>
            <br></br><br></br><br></br>
                </> : null
            }

            

           
        </>
    )
}

