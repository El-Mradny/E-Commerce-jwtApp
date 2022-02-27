import React, { useContext, useEffect, useState } from 'react'
import db from '../../../db';
import Button from 'react-bootstrap/Button';
import UserContext from '../../../UserContext'
import { Link } from "react-router-dom";
import BlogsReply from "./BlogsReply";
import BlogsReplyRow from "./BlogsReplyRow";

export default function BlogsDisplayCommentRow({ blogCom, removeCommt, editCommt, blogId }) {
    const { user } = useContext(UserContext)

    const [users, setUsers] = useState(null);
    useEffect(() => (async () => blogCom && setUsers(await db.Users.findOne(blogCom.userid)))(), [blogCom])
    // private Long id;
    // private String replay;
    // private String userid;
    // private Long blogcommentid;
    // private Timestamp commentdate;

    //Id
    // Userid fk
    // Commonid fk 
    // Replay
    // 
    // const [product, setProduct] = useState(null);
    // useEffect(() => (async () => cartitemElem && setProduct(cartitemElem.productid !== null ? await db.Products.findOne(cartitemElem.productid) : null))(), [cartitemElem])


    // const [replys, setReplys] = useState([])
    // useEffect(() => (async () => blogCom && setReplys(await db.Blogcommentreplays.findByBlogcommentidAndBlogid(blogCom.id, blogCom.blogid)))(), [blogCom.id,blogCom.blogid])
    // console.log(replys);


    const [box, setBox] = useState("");
    const replyBox = () => {
        if (box === "") {
            setBox("Yes")
        } else {
            setBox("")
        }
    }

    return (
        users && blogId &&
        <>
            {
                blogId === blogCom.blogid ?
                    <>
                        <br></br>
                        <div class="row" key={blogCom.id}>
                            <div class="col-sm-3">
                                <div class="col"><img alt={`images for ${users.picture}`} src={users.picture} height={100} width={100} style={{ borderRadius: '60px' }} /></div>
                                <br></br>
                                <div class="col">{blogCom.userid.substring(0, blogCom.userid.indexOf("@")) + '*********'}</div>
                                <div class="col">{blogCom.commentdate.toDateString()}</div>
                            </div>
                            <div class="col-sm-6">
                                <div class="col" style={{ marginTop: '10px', marginBottom: '10px' }}> {blogCom.comment}

                                    {
                                        user.id === blogCom.userid ?

                                            <div style={{ float: 'right' }}>
                                                <Button variant="secondary" style={{ margin: '2px' }} onClick={() => editCommt(blogCom.id)} size='sm' href="#element_target">Edit</Button>
                                                <Button variant="danger" style={{ margin: '2px' }} onClick={() => removeCommt(blogCom.id)} size='sm'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                    </svg>
                                                </Button>
                                            </div> : null
                                    }
                                    {/* <Button variant="outline-success" style={{ margin: '3px' }} as={Link} to={`/blogsreply/${blogCom.id}`}>Reply</Button> #fcad38*/}

                                    <div style={{ float: 'right' }}>
                                        {/* <Button variant="outline-success" style={{ margin: '3px' }} onClick={() => replyBox()} >Reply</Button> */}
                                        <Button variant="secondary" size='sm' style={{ margin: '2px' }} onClick={() => replyBox()} >Reply</Button>
                                    </div>


                                </div>

                                {
                                    box === "Yes" ? <BlogsReply ComId={blogCom.id} /> : null
                                }

                                <BlogsReplyRow ComId={blogCom.id} />
                            </div>
                        </div>

                        <hr></hr>

                    </> : null
            }
        </>
    )
}