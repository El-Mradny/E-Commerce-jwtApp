import React, { useContext, useState, useEffect } from 'react'
import db from '../../../db';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import UserContext from '../../../UserContext'
import Col from 'react-bootstrap/Col'
import Toast from 'react-bootstrap/Toast'
import Row from 'react-bootstrap/Row'
import { useHistory } from "react-router-dom";
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

export default function ApplicationForm() {
    const { user } = useContext(UserContext)
    const history = useHistory();
    const [applications, setApplications] = useState([])
    useEffect(() => (async () => setApplications(await db.Applications.findAll()))(), [])
    //console.log(applications)

    const [id, setId] = useState(0)
    const [cv, setCv] = useState('')
    const [userid, setUserid] = useState(user.id)
    const [roleapplying, setRoleapplying] = useState("")
    const [applieddate, setApplieddate] = useState(new Date())
    const [status, SetStatus] = useState("")

    const create = async () => {
        await db.Applications.create(setApplications, { id, cv, userid: user.id, roleapplying, applieddate: new Date(), status: '-' })
        setId(0)
        setCv("")
        setRoleapplying("")
        setApplieddate("")
        SetStatus("")
    }

    const [cvError, setCvError] = useState('')
    const [roleError, setRoleError] = useState('')
    const [ApplyingError, setApplyingError] = useState('')
    const [show, setShow] = useState(false);



    const [url, setUrl] = useState('');

    const handleCv = async event => {
        if (event.target.files.length > 0) {
            const file = event.target.files[0]
            const extension = file.name.split('.').pop()
            const newName = `ApplicationDocument-${user.id}.${extension}`
            const cv = await db.Applications.findByUserid(user.id);
            if (cv.length === 0) {
                setStyleForm({
                    display: 'block'
                })
                setStyleText({
                    display: 'none'
                })

                const result = await db.uploadFile(file, newName)
                if (result.ok) {
                    setCv(`/images/${newName}`)
                }

                const files = event.target.files;
                (files.length > 0) && setUrl(URL.createObjectURL(files[0]));

            }
        }

    }

    const [userApplications, setUserApplications] = useState([])
    useEffect(() => (async () => setUserApplications(await db.Applications.findByUserid(user.id)))(), [user.id])
    //console.log(userApplications);

    const vaild = () => {



        if (roleapplying.length > 0) {
            setRoleError('')
        } else {
            setRoleError('Select The Role Your Applying for')
        }

        if (userApplications.length !== 0) {
            setApplyingError(`Dear Applicant You Have Applied Befor as a ${userApplications[0].roleapplying}`)
            setCvError('')
            setRoleError(' ')
        } else {
            setApplyingError('')
        }

        if (cv.length > 0 && roleapplying.length > 0 && userApplications.length === 0) {
            create();
            setStyleForm({
                display: 'none'
            })
            setStyleText({
                display: 'block'
            })
            setShow(true);
            //window.location = "http://localhost:3000/applicationform"
        }
    }

    const [styleForm, setStyleForm] = useState({
        display: 'none',
    });

    const [styleText, setStyleText] = useState({
        display: 'block'
    });



    return (
        <><Row>
            <Col xs={6} style={{ zIndex: '8', position: 'absolute', top: '8%', marginLeft: '20px' }}>
                <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide style={{ backgroundColor: '#38b44aad' }}>
                    <Toast.Header>
                        <img
                            src="holder.js/20x20?text=%20"
                            className="rounded mr-2"
                            alt=""
                        />
                        <strong className="mr-auto">Thank You</strong>
                        <small>just now</small>
                    </Toast.Header>
                    <Toast.Body>We have received your Application Successfully. We will contact you as soon as possible.</Toast.Body>
                </Toast>
            </Col>
        </Row>
            <br></br><br></br>
            <div className="container" style={{ backgroundColor: '#dbdbdbab' }}>
                <div className="row">
                    <div className="col-sm-7" style={{ padding: '0px' }}>
                        <div style={styleText} >
                            <div >
                                <img src="https://i2.wp.com/smart.electronicsforu.com/wp-content/uploads/2018/07/mgbc-home-img.jpg?fit=950%2C368&ssl=1" alt="img" width="100%" ></img>
                            </div>
                            <div >
                                <img src="https://media.istockphoto.com/photos/were-all-responsible-for-creating-a-better-tomorrow-picture-id1009934102?k=6&m=1009934102&s=612x612&w=0&h=BvnaXLbV2-wthTEv1Q3byVulwVFWXaA_zGHrKF7EVDk=" alt="img" width="100%" ></img>
                            </div>
                        </div>
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                            <div style={styleForm}>
                                <div style={{ height: '650px' }}>
                                    {
                                        url
                                            ? (
                                                <div
                                                    style={{
                                                        border: '1px solid rgba(0, 0, 0, 0.3)',
                                                        height: '100%',
                                                    }}
                                                >
                                                    <Viewer fileUrl={url} />
                                                </div>
                                            )
                                            : (
                                                <div
                                                    style={{
                                                        alignItems: 'center',
                                                        border: '2px dashed rgba(0, 0, 0, .3)',
                                                        display: 'flex',
                                                        fontSize: '2rem',
                                                        height: '100%',
                                                        justifyContent: 'center',
                                                        width: '100%',
                                                    }}
                                                >
                                                    Preview area
                                                </div>
                                            )
                                    }
                                </div>
                            </div>
                        </Worker>

                    </div>

                    <div className="col-sm-5">
                        <br></br>
                        <span style={{ fontWeight: 'bold', color: 'red', fontSize: '22px' }}>{ApplyingError}</span>
                        <br></br><br></br>
                        <p>
                            <strong>Dear Applicant,</strong><br></br>
                        The purpose of this form is for applying to become a part of Green World.<br></br>
                        The data records won’t be used for any other purpose or entity we will approve you'er application within 30 business days
                        you can apply to only one of the positions.
                        </p>
                        <br></br>
                        <Form.Label style={{ fontWeight: 'bold' }}>Email address</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                placeholder="Username"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                onChange={event => setUserid(event.target.value)}
                                value={userid}
                                readOnly
                            />
                        </InputGroup>

                        <Form.Label style={{ fontWeight: 'bold' }}>Resume / Company Info (Supplier)</Form.Label>
                        <Form.File
                            custom label="Choose new file"
                            type="file"
                            accept=".pdf"
                            onChange={handleCv}
                        />
                        <span style={{ fontWeight: 'bold', color: 'green' }}>**Only pdf**</span>

                        <br></br>
                        <span style={{ fontWeight: 'bold', color: 'red' }}>{cvError}</span>
                        <br></br>
                        <Form.Label style={{ fontWeight: 'bold' }}>Applying As</Form.Label>
                        <Form.Control as="select" placeholder="roleapplying" onChange={event => setRoleapplying(event.target.value)} value={roleapplying}>
                            <option key={""} value={""} disabled>--Select--</option>
                            <option key={'Supplier'} value={'Supplier'} >Supplier</option>
                            <option key={'Customer Services'} value={'Customer Services'}>Customer Services</option>
                            <option key={'Accountant'} value={'Accountant'}>Accountant</option>
                            <option key={'Marketing Coordinator'} value={'Marketing Coordinator'}>Marketing Coordinator</option>
                        </Form.Control>
                        <span style={{ fontWeight: 'bold', color: 'red' }}>{roleError}</span>

                        <br></br><br></br>
                        <div style={{ textAlign: 'center' }}>
                            <Button variant="warning" onClick={vaild} style={{ margin: '10px' }}>Apply</Button>
                            <Button variant="primary" onClick={() => history.goBack()}>Back</Button>
                        </div>
                        <br></br><br></br>

                    </div>

                </div>

            </div>

        </>
    )
}