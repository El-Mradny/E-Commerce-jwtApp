import React, { useContext, useEffect, useState } from 'react'
import db from '../../../db';
import UserContext from '../../../UserContext'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ImageDisplay from "./ImageDisplay";

export default function BlogsReplyRow({ ComId }) {
    const { user } = useContext(UserContext)
    const [blogcommentsreplys, setBlogCommentsReplay] = useState([])
    useEffect(() => (async () => setBlogCommentsReplay(await db.Blogcommentreplays.findAll()))(), [])

    const [id, setID] = useState(0)
    const [replay, setReplay] = useState("")
    const [userid, setUserid] = useState("")
    const [blogcommentid, setBlogcommentid] = useState(0)
    const [commentdate, setCommentdate] = useState(new Date())

    const [box, setBox] = useState("");

    const removeCommt = async id => {
        await db.Blogcommentreplays.remove(setBlogCommentsReplay, id)
    }


    const editCommt = async id => {
        const commt = await db.Blogcommentreplays.findOne(id)
        setBox('Yes')
        setID(commt.id)
        setReplay(commt.replay)
        setUserid(commt.userid)
        setBlogcommentid(commt.blogcommentid)
        setCommentdate(commt.commentdate)
    }


    const updateCommt = async () => {
        setBox('')
        await db.Blogcommentreplays.update(setBlogCommentsReplay, { id, replay, userid, blogcommentid, commentdate })
        setID(0)
        setReplay("")
        setUserid("")
        setBlogcommentid(0)
        setCommentdate(new Date())
    }

    const [validUpdate, setValidUpdate] = useState(false)
    useEffect(() => (async () => setValidUpdate(
        replay!==""
    ))(), [replay])

    return (

        <>


            {
                blogcommentsreplys.map(elem =>
                    ComId === elem.blogcommentid ?
                        <>
                        <br></br>
                            <div class="row" key={elem.id} style={{ width:'500px',backgroundColor:'#dfdfdf',padding:'10px'}}>
                               
                                <div class="col-sm-4" >
                                    {/* <div class="col"><img alt={`images for ${users.picture}`} src={users.picture} height={100} width={100} style={{ borderRadius: '60px' }} /></div> */}
                                    < ImageDisplay key={elem.id} elem={elem}/>
                                    <br></br>
                                    <div class="col">{elem.userid.substring(0, elem.userid.indexOf("@")) + '*********'}</div>
                                    <div class="col">{elem.commentdate.toDateString()}</div>
                                </div>

                               
                                {/* <span style={{ fontWeight: 'bold', color: 'red' }}>{elem.userid} || {elem.replay}<br></br></span> */}
                                <div class="col-sm-8" style={{ marginTop: '10px', marginBottom: '10px' }}> 
                                <br></br><br></br>
                                    {elem.replay}
                                
                                    {
                                        user.id === elem.userid ?
                                        <>
                                            <br></br><br></br>
                                            <div style={{float:'right' }}>
                                                <Button variant="secondary" style={{ margin: '2px' }} onClick={() => editCommt(elem.id)} size='sm'>Edit</Button>
                                                <Button variant="danger" style={{ margin: '2px' }} onClick={() => removeCommt(elem.id)} size='sm'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                    </svg>
                                                </Button>
                                            </div>  </>: null
                                    }
                                </div>
                            </div> </> : null

                )


            }

            {
                box === 'Yes' ? <> <br></br> <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" >
                    <Form.Control as="textarea" rows={3} placeholder="replay" onChange={event => setReplay(event.target.value)} value={replay} />
                </Form.Group>
                    <Button variant="primary" style={{ float: 'right' }} disabled={!validUpdate} onClick={updateCommt}>UPDATE</Button>
                </> : null
            }



        </>
    )

}

