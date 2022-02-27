import React, { useEffect, useState } from 'react';
import db from '../../../db';
import Button from 'react-bootstrap/Button';
import ReactHtmlParser from 'react-html-parser';
import Card from 'react-bootstrap/Card';


export default function BlogAdminRow({ blog, remove, edit }) {
    const [validRemove, setValidRemove] = useState(false)
    useEffect(() => (async () => setValidRemove(
        (await db.Blogcomments.findByBlogid(blog.id)).length === 0 &&
        (await db.Bloglikes.findByBlogid(blog.id)).length === 0
    ))(), [blog])

    const [blogcomments, setBlogComments] = useState([])
    useEffect(() => (async () => blog && setBlogComments(await db.Blogcomments.findByBlogid(blog.id)))(), [])

    const [LikeLeng, setLikeLeng] = useState([])
    useEffect(() => (async () => setLikeLeng(await db.Bloglikes.findByBlogid(blog.id)))(), [blog,LikeLeng])
    const likes = LikeLeng.reduce((s, e) => s = s + e.likecount, 0);
    const dislikes = LikeLeng.reduce((s, e) => s = s + e.dislikecount, 0);
    return (
        <>
            <Card style={{ fontSize: '20px', width: '45rem', margin: 'auto' }}>
                <img alt={`images for ${blog.title}`} src={blog.image} width={'100%'} />
                <Card.Body>
                    <Card.Title style={{ textAlign: 'center', fontSize: '32px' }}>{blog.title}</Card.Title>
                    <br></br>
                    <Card.Subtitle style={{ textAlign: 'center', fontSize: '22px' }} className="mb-2 text-muted">{blog.readingtime} | {blog.auther} | {blog.publishdate.toDateString()}</Card.Subtitle>
                    <Card.Subtitle style={{ textAlign: 'center', fontSize: '17px' }} className="mb-2 text-muted">

                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-hand-thumbs-up-fill" viewBox="0 0 16 16">
                            <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
                        </svg>
                                     Likes {likes} |

                                     <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-hand-thumbs-down-fill" viewBox="0 0 16 16">
                            <path d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.378 1.378 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51.136.02.285.037.443.051.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.896 1.896 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.856 0-.29-.036-.586-.113-.857a2.094 2.094 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.162 3.162 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28H8c-.605 0-1.07.08-1.466.217a4.823 4.823 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591z" />
                        </svg>
                                     Likes {dislikes} |

                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16" style={{ margin: '6px' }}>
                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                        </svg>
                                     Views {blog.viewscount} |

                                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-chat-left-dots-fill" viewBox="0 0 16 16" style={{ margin: '6px' }}>
                            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793V2zm5 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                        </svg>
                                    Comments {blogcomments.length}
                    </Card.Subtitle>
                    <br></br>
                    <Card.Text>
                        {ReactHtmlParser(blog.text)}
                    </Card.Text>
                    <Button variant="secondary" onClick={() => edit(blog.id)} style={{ margin: '5px' }} href="#up">Edit</Button>
                    <Button variant="danger" disabled={!validRemove} onClick={() => remove(blog.id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                    </svg></Button>
                </Card.Body>
            </Card>
            <br></br><br></br>
        </>
    )

}

{/* <div class="container">
<div class="row">image</div>
<div class="row">
    <div class="col-sm" style={{ textAlign: 'center' }}>
        One of three columns
    </div>
</div>
<div class="row">
    <div class="col-sm" style={{ textAlign: 'center' }}>
        One of three columns
    </div>
</div>
</div> */}
