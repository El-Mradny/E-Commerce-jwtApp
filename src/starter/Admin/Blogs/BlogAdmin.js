import React, { useEffect, useState } from 'react';
import db from '../../../db';
import Button from 'react-bootstrap/Button';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactHtmlParser from 'react-html-parser';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import BlogAdminRow from "./BlogAdminRow";

export default function BlogAdmin() {

    const [blogs, setBlogs] = useState([])
    useEffect(() => (async () => setBlogs(await db.Blogs.findAll()))(), [])
    console.log(blogs)

    const [id, setId] = useState(0)
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [auther, setAuther] = useState("")
    const [publishdate, setPublishdate] = useState(new Date())
    const [image, setImage] = useState("")
    const [viewscount, setViewscount] = useState(0)
    const [readingtime, setReadingtime] = useState("")

    const [valuee, setValue] = useState("")

    const handleOnChange = (e, editor1) => {
        const data = editor1.getData()
        setText(data)


        //document.getElementById("hello").innerHTML = `${value}`;
    }

    const create = async () => {
        await db.Blogs.create(setBlogs, { id, title, text, auther, publishdate, image, viewscount, readingtime })
        setStyleForm({
            display: 'nono'
        })
    }

    const remove = async id => {
        await db.Blogs.remove(setBlogs, id)
    }

    const edit = async id => {
        setStyleForm({
            display: 'block'
        })
        const blog = await db.Blogs.findOne(id)
        setId(blog.id)
        setTitle(blog.title)
        setText(blog.text)
        setAuther(blog.auther)
        setPublishdate(blog.publishdate)
        setImage(blog.image)
        setReadingtime(blog.readingtime)
    }


    const update = async () => {
        await db.Blogs.update(setBlogs, { id, title, text, auther, publishdate, image, viewscount, readingtime })
        setId(0)
        setTitle("")
        setText("")
        setAuther("")
        setPublishdate(new Date())
        setImage("")
        setReadingtime("")
        setStyleForm({
            display: 'nono'
        })
    }


    const clear = () => {
        setId(0)
        setTitle("")
        setText("")
        setAuther("")
        setPublishdate(new Date())
        setImage("")
        setReadingtime("")
    }

    const handleImage = async (event) => {
        if (event.target.files.length > 0) {
            const file = event.target.files[0]
            const extension = file.name.split('.').pop()
            const newName = `Blog-Admin.${extension}`
            if (title !== "" && text !== "" && auther !== "" && publishdate !== "" && readingtime != "") {
                const result = await db.uploadImage(file, newName)
                if (result.ok) {
                    setImage(`/images/${newName}`)
                }
            }
        }
    }

    const [styleForm, setStyleForm] = useState({
        display: 'none',
    });


    const [createUpdate, setCreateUpdate] = useState(false)
    useEffect(() => (async () => setCreateUpdate(
        title !== "" && text !== "" && auther !== "" && publishdate < new Date() && readingtime != ""

    ))(), [title, text, auther, publishdate, readingtime])

    const [createValid, setCreateValid] = useState(false)
    useEffect(() => (async () => setCreateValid(
        title !== "" && text !== "" && auther !== "" && publishdate < new Date() && readingtime != ""

    ))(), [title, text, auther, publishdate, readingtime])



    return (
        <>
            <br></br>
            <div style={{ width: '80%', margin: 'auto' }} id='up'>
                <Form.Label style={{ fontWeight: 'bold' }}>Title</Form.Label>
                <Form.Control type="text" onChange={event => setTitle(event.target.value)} placeholder="title" value={title} />
                <br></br>
                <Form.Label style={{ fontWeight: 'bold' }}>Text</Form.Label>
                <CKEditor
                    editor={ClassicEditor}
                    onChange={handleOnChange}

                />
                <Form.Control as="textarea" rows={3} type="textBox" onChange={event => setText(event.target.value)} placeholder="text" value={text} style={styleForm} />
                {
                    text.length > 900000000 ? <span style={{ color: 'red' }}> Maximum 900000000 characters </span> : null
                }
                <br></br>
                <Form.Label style={{ fontWeight: 'bold' }}>Auther</Form.Label>
                <Form.Control type="text" onChange={event => setAuther(event.target.value)} placeholder="By Auther" value={auther} />
                <br></br>
                <Form.Label style={{ fontWeight: 'bold' }}>Reading time</Form.Label>
                <Form.Control type="text" onChange={event => setReadingtime(event.target.value)} placeholder="5-10 min" value={readingtime} />
                <br></br>
                <Form.Label style={{ fontWeight: 'bold' }}>Picture</Form.Label>
                <Form.File custom label="Choose new picture" onChange={handleImage} />
                <br></br><br></br>
                <Form.Label style={{ fontWeight: 'bold' }}>Publish Date</Form.Label>
                <Form.Control type="date" onChange={event => setPublishdate(new Date(event.target.value))} placeholder="publishdate" value={publishdate.toISOString().slice(0, 10)} />

            </div>
            <br></br><br></br>
            <div style={{ textAlign: 'center' }}>
                <Button variant="success" onClick={create} style={{ margin: '5px' }} disabled={!createValid}>Create</Button>
                <Button variant="warning" onClick={update} style={{ margin: '5px' }} disabled={!createUpdate}>Update</Button>
                <Button variant="light" style={{ backgroundColor: "#4582ec", color: 'white' }} onClick={clear}>Clear</Button>
            </div>
            <br></br>
            <Card style={{ fontSize: '20px' }}>
                {ReactHtmlParser(image)}
                <Card.Body>
                    <Card.Title style={{ textAlign: 'center', fontSize: '30px' }}>{ReactHtmlParser(title)}</Card.Title>
                    <br></br>
                    <Card.Subtitle style={{ textAlign: 'center', fontSize: '18px' }} className="mb-2 text-muted">{ReactHtmlParser(readingtime)} | {ReactHtmlParser(auther)} | {ReactHtmlParser(publishdate.toDateString())}</Card.Subtitle>
                    <br></br>
                    <Card.Text>
                        {ReactHtmlParser(text)}
                    </Card.Text>



                </Card.Body>
            </Card>
            <br></br><br></br><br></br><br></br>

            {
                blogs.map(blog =>
                    <BlogAdminRow blog={blog} key={blog.id} remove={remove} edit={edit}/>

                )
            }

        </>
    )
}
