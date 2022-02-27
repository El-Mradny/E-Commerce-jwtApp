import React, { useEffect, useState } from 'react';
import db from '../../../db';
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'

export default function DisplayFeedback() {

    const [feedbacks, setFeedBacks] = useState([])
    useEffect(() => (async () => setFeedBacks(await db.Feedbacks.findAll()))(), [])

    const x = feedbacks.filter(elem => elem.publish === 'Published')

    return (
        <>
        {x.length > 0 ? <h1 style={{ textAlign: 'center', color: '#38b44a' }}>Feedbacks</h1> : null }
            {
                feedbacks.map(fk =>
                    fk.publish === "Published" ?
                        < CardGroup style={{ width: '310px', float: 'left', margin: '10px' }} key={fk.id}>
                            <Card>
                                <Card.Header>{fk.comment}
                                    <br></br><br></br> <span style={{ fontSize: '18px' }}> Rating</span> <br></br>out of 5<br></br>

                                    {(() => {
                                        let row = []
                                        for (var i = 0; i < fk.rating; i++) {
                                            row.push(<svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16" style={{ color: '#FFD700' }}>
                                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                            </svg>)
                                        }
                                        return row

                                    })()}

                                </Card.Header>



                            </Card>
                        </CardGroup >
                        : null
                )
            }
        </>

    )



}