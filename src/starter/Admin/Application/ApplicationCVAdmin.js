import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import db from '../../../db'
import {
    useParams
} from "react-router-dom";

import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import {useHistory} from "react-router-dom";
function ApplicationCVAdmin() {

    const { id: stringId } = useParams();
    const id = 1 * stringId
    const history = useHistory();
    const [application, setApplication] = useState(null)
    useEffect(() => (async () => setApplication(await db.Applications.findOne(id)))(), [id])

    return (
        application &&
        <>
            <br></br>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                <div
                    style={{
                        border: '1px solid rgba(0, 0, 0, 0.3)',
                        height: '690px',
                    }}
                >
                    <Viewer fileUrl={application.cv} />
                </div>
            </Worker>
            <br></br>
            <div style={{float:'right'}}>
            <Button variant="primary" size='lg' onClick={() => history.goBack()}>Back</Button> 
            </div>
            
        </>

    )

}


export default ApplicationCVAdmin;